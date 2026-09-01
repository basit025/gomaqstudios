# Gomaq Studios — marketing site

One-page marketing site for a design studio serving self-publishing authors.
Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
```

---

## The logo

The nav and footer render the wordmark **directly on the page background** —
no plate, no chip — via [`components/ui/Logo.tsx`](components/ui/Logo.tsx).

Getting there took a real conversion step. The supplied `public/logo.jpeg` is a
**white** wordmark with an orange accent on a **solid black** square. JPEG has
no alpha, so the black cannot just be switched off — and even once it is, a
white wordmark on a white page is invisible. So
[`scripts/build-logo.py`](scripts/build-logo.py) does both jobs at once:

- derives an **alpha channel from luminance** (the art sits on pure black, so
  brightness *is* coverage) — this keeps the antialiased curves smooth instead
  of leaving the jagged halo a colour-key would produce;
- **recolours by saturation**, mapping the neutral strokes to ink and keeping
  the orange accent.

It writes two transparent PNGs:

| File | Strokes | Use |
|---|---|---|
| `public/logo.png` | ink `#2B211C` | light backgrounds — what the site uses |
| `public/logo-light.png` | white | spare, for any dark section you add later |

```bash
python scripts/build-logo.py     # regenerate after replacing public/logo.jpeg
```

**One deliberate change:** the logo's native orange is `#E8703A`, noticeably
lighter than the site's burnt orange `#C1440E`. Sitting a few pixels from the
nav CTA button, two different oranges read as a mistake — so the accent is
remapped to the brand orange. To keep the original hue instead, set
`ORANGE = NATIVE_ORANGE` at the top of the script and re-run.

Nav renders at 40px tall (`size="sm"`), footer at 52px (`size="md"`); width
follows the intrinsic 3.07:1 ratio. Pass `tone="light"` on a dark background.

If you ever get a proper **vector** export, point `LOGO_SRC` at the `.svg` and
the script becomes unnecessary.

---

## Where the placeholder content lives

Everything you'll want to swap is a plain array at the **top of its section
file**, marked with a `TODO` or `PLACEHOLDER` comment.

| What | File | Look for |
|---|---|---|
| **Prices** ($499 / $1,299 / $2,499) | [`components/sections/Pricing.tsx`](components/sections/Pricing.tsx) | `const TIERS` — each has `price: "..." // PLACEHOLDER` |
| **Hero stats** (120+ covers, 500+ books, 60+ brands, 240+ videos) | [`components/sections/Hero.tsx`](components/sections/Hero.tsx) | `const trustStats` — one per service, see note below |
| **Testimonials** (names + quotes) | [`components/sections/Testimonials.tsx`](components/sections/Testimonials.tsx) | `const TESTIMONIALS` — all six are invented |
| **Portfolio projects** | [`components/sections/Portfolio.tsx`](components/sections/Portfolio.tsx) | `const PROJECTS` — two per service category |
| **Service descriptions** | [`components/sections/Services.tsx`](components/sections/Services.tsx) | `const SERVICES` |
| **Process steps** | [`components/sections/HowItWorks.tsx`](components/sections/HowItWorks.tsx) | `const STEPS` |
| **Email, socials, nav links, genres** | [`lib/site.ts`](lib/site.ts) | all of it — social `href`s are `#` |
| **Hero headline words** | [`components/sections/Hero.tsx`](components/sections/Hero.tsx) | `const HEADLINE_WORDS` — plus retired alternatives in the comment above |
| **Ticker band items** | [`components/sections/Ticker.tsx`](components/sections/Ticker.tsx) | `const ITEMS` |

### Two things to change before launch

1. **Email** — `lib/site.ts` → `site.email` is `hello@gomaqstudios.com`.
2. **Social URLs** — `lib/site.ts` → `socials[].href` are all `#`.

---

## Keeping all four services visible

The site sells four things — **book design, formatting, author branding and
video editing** — and it is very easy for the top of the page to drift back
into reading as a book-formatting shop, because books are the most concrete
thing to write about. Four places above the fold deliberately carry all four
services. If you edit one, check the others still balance:

1. **Hero headline** — a typewriter cycles one word through all four:
   *Your **book**. → Your **brand**. → Your **video**. → Your **launch**.*
   over the fixed second line *"On your quest, by your side."* Edit `HEADLINE_WORDS` in
   `Hero.tsx`. (Retired alternatives are kept in the comment block above it,
   including the original *"Your book. Designed, formatted, and ready to
   publish"* — which named only two of the four services.)
2. **Hero subheadline** — one sentence per service, in service order.
3. **Trust bar** — one stat per service: covers designed, books formatted,
   author brands built, videos edited. Do not collapse these back to four
   book-related numbers; this row is the fastest way a scanning visitor learns
   the range.
4. **Ticker band** — the deliverable list spans design, formatting, branding
   and video rather than listing eight print formats.

Further down, the portfolio carries **two projects per category** so no filter
tab shows a single lonely tile, and video projects get a play badge so they
read as video at a glance rather than as another book cover.

The store names (KDP / IngramSpark / Lulu) moved out of the trust bar into the
ticker band, which is where that credibility signal now lives.

---

## Design system

All colour lives in **one place**: the `:root` block in
[`app/globals.css`](app/globals.css). Change a hex there and the whole site
follows — `tailwind.config.ts` only maps those variables onto Tailwind names.

| Token | Value | Used for |
|---|---|---|
| `primary` | `#C1440E` | CTAs, accents, numerals |
| `primary-dark` | `#8F3209` | hover / pressed |
| `primary-light` | `#FDECE1` | section tints |
| `base` | `#FFFFFF` | page background |
| `ink` | `#2B211C` | body text (not pure black) |
| `muted` | `#7A6F68` | secondary text |
| `line` | `#ECE3DD` | hairline borders |

Each is also exposed as RGB channels (`--color-primary-rgb`) so Tailwind
opacity modifiers work: `bg-primary/10`, `text-ink/70`.

**Type** — [`app/fonts.ts`](app/fonts.ts), three families loaded with `next/font`:

| Family | Tailwind class | Job |
|---|---|---|
| **Instrument Serif** | `font-display` | Headlines only |
| **Instrument Sans** | `font-sans` | Body copy, UI, labels |
| **Ms Madi** | `font-script` | Accents only |

Instrument Serif and Instrument Sans are a designed pair from the same family,
so they agree on proportion without any tuning.

> ### ⚠️ Instrument Serif has no bold
>
> It ships in **weight 400 only**. Never put `font-bold` or `font-semibold` on a
> `font-display` element — the browser will synthesise a smeared faux-bold.
> Size and colour carry the emphasis instead; at display sizes its thick stems
> already read as bold. Its true *italic* is loaded and is used as an accent
> (the word "Designed" in the hero).

**Where the script is used** — five places, all accents, never body text:

1. Hero eyebrow — *"for independent authors"*, flanked by rules like a title-page ornament
2. Contact eyebrow — *"the last page"*, mirroring the hero so the page closes as it opened
3. Testimonial author names — set as signatures
4. Mock book-cover bylines ([`ui/BookCover.tsx`](components/ui/BookCover.tsx))
5. Footer sign-off

Ms Madi is a fine-line hand that gets delicate fast, so it is never set below
~17px and never used for anything a visitor must read to understand the page.
Section eyebrows stay uppercase sans — that contrast is what keeps the script
feeling special rather than decorative.

To swap any family, edit `app/fonts.ts` only; the CSS variables feed Tailwind
automatically. If you replace Instrument Serif with a font that *does* have
bold, you can reinstate `font-semibold` on display headings.

---

## Structure

```
app/
  layout.tsx        root layout, fonts, metadata
  page.tsx          composes the ten sections in order
  globals.css       design tokens + .shell / .eyebrow helpers
  fonts.ts          next/font setup
components/
  sections/         one file per page section
    Header.tsx      sticky nav, mobile slide-in panel
    Hero.tsx        headline, CTAs, animated blobs, trust bar
    DraftDemo.tsx   the 100-Minute Draft widget  ← the interactive one
    Services.tsx    four service cards
    HowItWorks.tsx  four-step process
    Portfolio.tsx   filterable project grid
    Testimonials.tsx  grid on desktop, carousel on mobile
    Pricing.tsx     three tiers
    Contact.tsx     closing CTA + validated form
    Footer.tsx
  ui/               Button, Card, Badge, SectionHeading, Reveal,
                    BookCover, Placeholder, Logo, Stars, Icons
lib/site.ts         nav links, email, socials, genre list
scripts/
  build-logo.py     regenerates the transparent logo PNGs
public/
  logo.jpeg         original source (black background)
  logo.png          generated: ink strokes, transparent
  logo-light.png    generated: white strokes, transparent
```

---

## The 100-Minute Draft widget

`components/sections/DraftDemo.tsx` is the conversion centrepiece and the one
piece of real interactivity: genre → title → a scripted 4-stage build (~5s) →
a mock cover carrying the visitor's own title.

**It is a simulation.** Nothing is generated, sent or stored. That's
intentional and documented in a comment block at the top of the file, which
also lists exactly how to make it real — the highest-value change being to
capture an email on the result step and POST to `app/api/draft/route.ts`.

The `STAGES` array is deliberately shaped like a job queue so it can be driven
by real job status later without restructuring the component.

---

## Forms

The contact form ([`Contact.tsx`](components/sections/Contact.tsx)) has full
client-side validation, per-field error messages, an accessible success state,
and a honeypot field for spam. **It does not submit anywhere yet** — it awaits
a 900ms timer and shows success.

The `TODO` block at the top of that file has the exact `fetch` call to drop in
once you create `app/api/contact/route.ts`.

---

## Motion

The site is meant to feel alive under the cursor. Reusable primitives live in
[`components/ui/motion/`](components/ui/motion/) and are applied across every
section, so behaviour is consistent and tunable in one place.

| Primitive | File | What it does |
|---|---|---|
| `Spotlight` | `motion/pointer.tsx` | Warm glow tracking the cursor across a card |
| `Tilt` | `motion/pointer.tsx` | Card leans toward the cursor in 3D |
| `Magnetic` | `motion/pointer.tsx` | CTA drifts toward the cursor, springs back |
| `Drift` | `motion/pointer.tsx` | Background layers parallax with the pointer |
| `SplitText` | `motion/text.tsx` | Headlines reveal word by word |
| `CountUp` | `motion/text.tsx` | Numbers count from zero when scrolled into view |
| `TypeCycle` | `motion/text.tsx` | Typewriter cycling the hero headline word |
| `RotatingWord` | `motion/text.tsx` | Swaps words in place (available; no current use) |
| `Marquee` | `motion/text.tsx` | The scrolling ticker band |
| `ScrollProgress` | `motion/scroll.tsx` | Bar filling along the header's bottom edge |
| `Parallax` / `DrawLine` | `motion/scroll.tsx` | Scroll-linked drift; the rule that draws itself |

### Three rules everything follows

1. **No re-render on pointer move.** Every pointer effect drives a framer-motion
   `MotionValue`, which writes straight to the compositor. Moving the mouse
   across the page causes zero React renders, and only transform/opacity are
   animated, so nothing triggers layout.
2. **Nothing runs on touch.** All pointer effects are gated on
   `(pointer: fine)` — on a phone they are invisible at best and janky at worst.
3. **`prefers-reduced-motion` is respected.** The app is wrapped in
   `<MotionConfig reducedMotion="user">`, and `Reveal` / `SplitText` / the hero
   sequence additionally render their **final** state directly rather than
   animating to it.

That third point matters more than it looks: these components start at
`opacity: 0` and become visible only when an animation runs. Entrance delays are
therefore kept short and scroll-triggered rather than sitting on long load
timers — otherwise a throttled or backgrounded tab can leave content stuck
invisible. If you add motion, keep delays under ~0.8s and prefer `whileInView`
over `animate` with a long `delay`.

### The hero typewriter

`TypeCycle` types a word in, holds it, backspaces to empty, then types the
next — the same rhythm as the reference site this was modelled on (verified by
sampling its DOM frame by frame, not by eye).

Two things it does that a naive typewriter does not:

- **Reserves the width of the longest word** (`reserve`, on by default). The
  headline is centred, so without this the words before the slot slide sideways
  on every keystroke — about 110px of travel at desktop size. Measured: the
  slot now holds one fixed position for the whole cycle. Turn `reserve` off for
  a left-aligned headline, where reflow is invisible.
- **Stays readable to crawlers and screen readers.** The animated text is
  `aria-hidden` and every word is also rendered in a `sr-only` span, so the
  `<h1>` reads *"Your book, brand, video, launch. On your quest, by your side."*
  rather
  than the empty slot that server-rendered HTML would otherwise contain.

**Keep the words 4–6 characters.** The first line is `whitespace-nowrap`, and at
375px the longest current word already uses 320px of the 335px available. A
longer word will overflow on mobile. ("trailer" was dropped for "video" for
this reason.)

**The tagline below it** — *"On your quest, by your side."* — is sized by a
`clamp()` ceiling (21px mobile → 32px desktop, against an 88px headline) and is
also `whitespace-nowrap`, so it holds one line at every breakpoint. If you
lengthen that copy, lower the clamp values and re-measure at 375px, where it
has ~320px to work with.

### Tuning it down

Turn any effect off by removing the wrapper — every one degrades to plain
markup. To calm the whole site quickly: raise `Tilt`'s `max` toward 0, drop
`Spotlight`'s `intensity`, or lower `Magnetic`'s `strength`.

---

## Notes

- **No location anywhere.** No address, city, region or map — contact is email,
  form and social only, by design. Please keep it that way if you edit copy.
- **Responsive** at 375 / 768 / 1024 / 1440. Mobile-first throughout.
- **Motion** — see the Motion section above.
- **No images required.** Book covers are CSS-only (`ui/BookCover.tsx`) and
  anything else uses `ui/Placeholder.tsx`, so nothing renders broken.
- Pinned to **Next 14.2.35** (the patched 14.x line).
