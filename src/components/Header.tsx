import * as React from "react"
import { Button } from "@/components/ui/button"
import { LogoIcon } from "./logo"
import { HugeiconsIcon } from "@/components/ui/icon"
import { CallIcon, Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

import { useTranslation } from "react-i18next"
import LanguageSwitcher from "./LanguageSwitcher"

interface HeaderProps {
  brandName: string
  activePage?: "home" | "catalog" | "services" | "about"
  onNavigateAbout?: () => void
  onNavigateHome?: () => void
}

function Header({ brandName, activePage = "home", onNavigateAbout, onNavigateHome }: HeaderProps) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const getLinkClass = (pageName: string) => {
    const isActive = activePage === pageName
    return `text-xs font-bold tracking-widest uppercase transition-colors ${
      isActive ? "text-primary font-black underline underline-offset-8 decoration-2" : "text-muted-foreground hover:text-foreground"
    }`
  }

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button onClick={onNavigateHome} className="flex items-center gap-3 group">
            <LogoIcon className="h-9 w-9" />
            <span className="sr-only">{brandName}</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className={getLinkClass("home")}
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => handleScrollTo("catalog")}
              className={getLinkClass("catalog")}
            >
              {t("nav.cars")}
            </button>
            <button
              onClick={() => handleScrollTo("services")}
              className={getLinkClass("services")}
            >
              {t("nav.services")}
            </button>
            <button
              onClick={onNavigateAbout}
              className={getLinkClass("about")}
            >
              {t("nav.about")}
            </button>
          </nav>

          {/* CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild size="sm" className="rounded-full text-xs shadow-lg shadow-primary/20">
              <a href="https://wa.me/6289611384407?text=Halo%20Puncak%20Drive" target="_blank" rel="noopener noreferrer">
                <HugeiconsIcon icon={CallIcon} className="w-4 h-4" />
                {t("nav.contact")}
              </a>
            </Button>
          </div>

          {/* Mobile Toggle & Language Switcher */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" /> : <HugeiconsIcon icon={Menu01Icon} className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-5 space-y-2">
            {[
              { label: t("nav.home"), action: () => onNavigateHome?.() },
              { label: t("nav.cars"), action: () => handleScrollTo("catalog") },
              { label: t("nav.services"), action: () => handleScrollTo("services") },
              { label: t("nav.about"), action: () => onNavigateAbout?.() },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsOpen(false)
                  if (item.action) item.action()
                }}
                className="block w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full rounded-full uppercase tracking-widest text-xs h-11 shadow-lg shadow-primary/20">
                <a href="https://wa.me/6289611384407" target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={CallIcon} className="w-4 h-4" />
                  {t("nav.contact")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default React.memo(Header)
