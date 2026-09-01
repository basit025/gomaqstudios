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

The supplied `logo.jpeg` has been copied to **`public/logo.jpeg`** and is wired
into the header and footer via [`components/ui/Logo.tsx`](components/ui/Logo.tsx).

That artwork is a white + orange wordmark on a **solid black square** with wide
margins, so the component renders it inside a black rounded chip and crops the
dead space with `object-cover`. On a white nav bar that reads as an intentional
brand lockup rather than an accident.

**If you export a transparent version later** (recommended — an `.svg` or a
transparent `.png`), drop it in `public/` and edit the two constants at the top
of `Logo.tsx`:

```ts
const LOGO_SRC = "/logo.svg";
const LOGO_HAS_BLACK_BACKGROUND = false;   // removes the black chip
```

Nav logo renders at 44px tall (`size="sm"`), footer at 56px (`size="md"`).

---

## Where the placeholder content lives

Everything you'll want to swap is a plain array at the **top of its section
file**, marked with a `TODO` or `PLACEHOLDER` comment.

| What | File | Look for |
|---|---|---|
| **Prices** ($499 / $1,299 / $2,499) | [`components/sections/Pricing.tsx`](components/sections/Pricing.tsx) | `const TIERS` — each has `price: "..." // PLACEHOLDER` |
| **Hero stats** (500+ books, 4.9/5 …) | [`components/sections/Hero.tsx`](components/sections/Hero.tsx) | `const trustStats` |
| **Testimonials** (names + quotes) | [`components/sections/Testimonials.tsx`](components/sections/Testimonials.tsx) | `const TESTIMONIALS` — all six are invented |
| **Portfolio projects** | [`components/sections/Portfolio.tsx`](components/sections/Portfolio.tsx) | `const PROJECTS` |
| **Service descriptions** | [`components/sections/Services.tsx`](components/sections/Services.tsx) | `const SERVICES` |
| **Process steps** | [`components/sections/HowItWorks.tsx`](components/sections/HowItWorks.tsx) | `const STEPS` |
| **Email, socials, nav links, genres** | [`lib/site.ts`](lib/site.ts) | all of it — social `href`s are `#` |
| **Hero headline alternates** | [`components/sections/Hero.tsx`](components/sections/Hero.tsx) | comment block at the top — options A / B / C, A is live |

### Two things to change before launch

1. **Email** — `lib/site.ts` → `site.email` is `hello@gomaqstudios.com`.
2. **Social URLs** — `lib/site.ts` → `socials[].href` are all `#`.

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
public/logo.jpeg
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

## Notes

- **No location anywhere.** No address, city, region or map — contact is email,
  form and social only, by design. Please keep it that way if you edit copy.
- **Responsive** at 375 / 768 / 1024 / 1440. Mobile-first throughout.
- **Motion** uses `whileInView` with `once: true`, and the whole site respects
  `prefers-reduced-motion` (handled globally in `globals.css`).
- **No images required.** Book covers are CSS-only (`ui/BookCover.tsx`) and
  anything else uses `ui/Placeholder.tsx`, so nothing renders broken.
- Pinned to **Next 14.2.35** (the patched 14.x line).
