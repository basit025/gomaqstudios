"""
Build transparent logo variants from the supplied black-background JPEG.

    python scripts/build-logo.py

WHY THIS EXISTS
The supplied artwork (`public/logo.jpeg`) is a WHITE wordmark with an ORANGE
accent on a SOLID BLACK square. A JPEG has no alpha channel, so the black
cannot simply be "turned off" — and even if it could, a white wordmark on the
site's white background would be invisible.

So this script does two things at once:

  1. Derives an alpha channel from luminance. The art sits on pure black, so a
     pixel's brightness IS its coverage. That keeps the antialiased curve edges
     smooth instead of producing the jagged halo you get from a colour-key.

  2. Recolours by classifying each pixel as "neutral" or "orange" using
     saturation, then remapping:
        neutral -> INK   (dark, for light backgrounds)  -> logo.png
        neutral -> WHITE (for dark backgrounds)         -> logo-light.png
        orange  -> ORANGE (see note below)

ORANGE NOTE
The logo's native orange is ~#E8703A, which is lighter and brighter than the
site's burnt orange (#C1440E). Sitting 8px from the nav CTA button, two
different oranges read as a mistake — so by default the accent is remapped to
the brand orange for a coherent nav. To keep the logo's original orange
instead, set ORANGE = NATIVE_ORANGE below and re-run.

Outputs (both cropped tight to the artwork, both transparent):
    public/logo.png        ink wordmark   — used on the light site
    public/logo-light.png  white wordmark — spare, for any dark section
"""

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "logo.jpeg"

# --- palette (matches app/globals.css) ---------------------------------------
INK = (43, 33, 28)  # --color-ink      #2B211C
WHITE = (255, 255, 255)  # --color-base     #FFFFFF
BRAND_ORANGE = (193, 68, 14)  # --color-primary  #C1440E
NATIVE_ORANGE = (232, 112, 58)  # the logo file's own orange, ~#E8703A

ORANGE = BRAND_ORANGE  # <- swap to NATIVE_ORANGE to keep the original hue

# --- tuning ------------------------------------------------------------------
# Brightness below this is treated as background. Kills JPEG ringing around the
# strokes, which would otherwise show up as a grey halo on a white page.
ALPHA_FLOOR = 26
# Saturation band over which a pixel blends from neutral to orange. Blending
# rather than hard-thresholding keeps the seam between the white and orange
# arcs smooth.
SAT_LO, SAT_HI = 0.30, 0.55
# Breathing room added around the cropped artwork, as a fraction of its height.
PAD = 0.04


def build(neutral: tuple[int, int, int], out_path: Path) -> None:
    rgb = np.asarray(Image.open(SRC).convert("RGB"), dtype=np.float32)

    # 1. Coverage from brightness (art on black => brightness == coverage).
    m = rgb.max(axis=2)
    alpha = np.clip((m - ALPHA_FLOOR) / (255.0 - ALPHA_FLOOR), 0.0, 1.0)

    # 2. Un-premultiply to recover each pixel's true hue, then measure
    #    saturation. Neutral (white) -> 0. Orange -> ~0.85.
    safe = np.maximum(m, 1.0)[:, :, None]
    norm = rgb / safe
    sat = 1.0 - norm.min(axis=2)

    # 3. Blend between the neutral and orange targets across the sat band.
    t = np.clip((sat - SAT_LO) / (SAT_HI - SAT_LO), 0.0, 1.0)[:, :, None]
    colour = np.array(neutral, dtype=np.float32) * (1 - t) + np.array(
        ORANGE, dtype=np.float32
    ) * t

    out = np.dstack([colour, alpha[:, :, None] * 255.0]).astype(np.uint8)
    img = Image.fromarray(out, mode="RGBA")

    # 4. Crop to the artwork, then re-pad evenly.
    box = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    img = img.crop(box)
    pad = int(img.height * PAD)
    padded = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    padded.paste(img, (pad, pad))

    padded.save(out_path)
    print(f"  {out_path.name:16} {padded.width}x{padded.height}  {out_path.stat().st_size:,} bytes")


if __name__ == "__main__":
    print(f"source: {SRC.name}")
    build(INK, ROOT / "public" / "logo.png")
    build(WHITE, ROOT / "public" / "logo-light.png")
