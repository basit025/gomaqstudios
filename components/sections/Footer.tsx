import Logo from "@/components/ui/Logo";
import { ArrowRight, socialIcons } from "@/components/ui/Icons";
import { cta, navLinks, site, socials } from "@/lib/site";

/**
 * Footer. Deliberately contains NO address, city or region — contact is
 * email and social only, per brief.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* Brand */}
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              {site.tagline} From the last sentence to launch day.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 font-display text-lg font-normal text-ink transition-colors hover:text-primary"
            >
              {site.email}
            </a>

            <ul className="mt-6 flex gap-2.5">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    {/* TODO: real profile URLs live in lib/site.ts */}
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-muted ring-1 ring-inset ring-line transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:ring-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Nav + closing CTA */}
          <div className="grid gap-10 sm:grid-cols-2 md:gap-8">
            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
                Explore
              </h2>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group relative inline-block text-[14px] text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink">
                Ready when you are
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-muted">
                Send the manuscript. We will tell you what it needs.
              </p>
              <a
                href={cta.href}
                className="group mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-[13px] text-muted">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          {/* Script accent #5 — a sign-off, not a slogan. */}
          <p className="font-script text-xl leading-none text-muted">
            Built for authors, not algorithms.
          </p>
        </div>
      </div>
    </footer>
  );
}
