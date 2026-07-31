import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogoLandscape } from "./logo"
import { HugeiconsIcon } from "@/components/ui/icon"
import { CallIcon, MapsIcon, InstagramIcon, WhatsappIcon, Mail01Icon } from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"
import companyData from "@/data/company-profile.json"

interface FooterProps {
  brandName: string
  onNavigateAbout?: () => void
  onNavigateHome?: () => void
  onNavigateLegal?: (type: "terms" | "privacy" | "cookies" | "sitemap") => void
}

function Footer({ brandName, onNavigateAbout, onNavigateHome, onNavigateLegal }: FooterProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const handleScrollTo = (id: string) => {
    if (window.location.pathname !== "/") {
      onNavigateHome?.()
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const quickLinks = [
    { label: t("nav.home"), action: () => onNavigateHome?.() },
    { label: t("nav.cars"), action: () => handleScrollTo("catalog") },
    { label: t("nav.services"), action: () => handleScrollTo("services") },
    { label: t("nav.about"), action: () => onNavigateAbout?.() },
    { label: t("nav.contact"), href: "https://wa.me/6289611384407" },
  ]

  return (
    <footer className="dark bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
      {/* Soft Ambient Glow Accent */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-4">
            <LogoLandscape className="h-8 w-auto text-foreground" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                <a href={companyData.company.contact.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <HugeiconsIcon icon={InstagramIcon} className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                <a href={companyData.company.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <HugeiconsIcon icon={WhatsappIcon} className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                <a href={companyData.company.contact.mapsOffice} target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
                  <HugeiconsIcon icon={MapsIcon} className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.action ? (
                    <button
                      onClick={link.action}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href || "#"} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              {t("footer.contactTitle")}
            </h4>
            <div className="space-y-3 text-xs text-muted-foreground">
              <a
                href={companyData.company.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-primary transition-colors group"
              >
                <HugeiconsIcon icon={CallIcon} className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>+62 896-1138-4407</span>
              </a>

              <a
                href={companyData.company.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-primary transition-colors group"
              >
                <HugeiconsIcon icon={InstagramIcon} className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>@puncakdrive</span>
              </a>

              <a
                href={companyData.company.contact.emailUrl}
                className="flex items-center gap-2.5 hover:text-primary transition-colors group"
              >
                <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span>{companyData.company.contact.email}</span>
              </a>
            </div>
          </div>

          {/* Office Location */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              {t("footer.officeLocation")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              {companyData.company.contact.address}
            </p>
            <Button size="sm" asChild className="gap-2 text-xs rounded-xl">
              <a href={companyData.company.contact.mapsOffice} target="_blank" rel="noopener noreferrer">
                <HugeiconsIcon icon={MapsIcon} className="w-4 h-4 shrink-0" />
                {t("footer.openInMaps")}
              </a>
            </Button>
          </div>

        </div>

        <Separator className="mb-6 bg-border/50" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center text-[11px] text-muted-foreground">
          <p>
            &copy; {year} {brandName}. {t("footer.rights")}
          </p>

          {/* Terms, Privacy, Cookies, Sitemap links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold">
            <button
              onClick={() => onNavigateLegal?.("terms")}
              className="hover:text-primary transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => onNavigateLegal?.("privacy")}
              className="hover:text-primary transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigateLegal?.("cookies")}
              className="hover:text-primary transition-colors"
            >
              Cookies
            </button>
            <button
              onClick={() => onNavigateLegal?.("sitemap")}
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default React.memo(Footer)
