import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { HugeiconsIcon } from "@/components/ui/icon"
import { ArrowLeft01Icon, CheckmarkCircle02Icon, CallIcon } from "@hugeicons/core-free-icons"

interface SitemapPageProps {
  onNavigate: (page: "home" | "catalog" | "services" | "about" | "terms" | "privacy" | "cookies" | "sitemap") => void
  onBack: () => void
}

export default function SitemapPage({ onNavigate, onBack }: SitemapPageProps) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background text-foreground py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="group gap-2 text-muted-foreground hover:text-foreground pl-0 text-xs font-semibold"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            />
            {t("detail.back")}
          </Button>
        </div>

        {/* Hero Title */}
        <div className="space-y-3 border-b border-border pb-6">
          <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase font-bold tracking-widest px-3 py-1">
            {t("sitemap.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight">
            {t("sitemap.title")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t("sitemap.sub")}
          </p>
        </div>

        {/* Document Content */}
        <Card className="p-6 sm:p-10 space-y-8 bg-card border-border rounded-3xl shadow-xl">
          
          {/* Main Navigation */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
              {t("sitemap.mainTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate("home")}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.home")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/</span>
              </button>

              <button
                onClick={() => { onNavigate("home"); setTimeout(() => { document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }) }, 100); }}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.catalog")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/</span>
              </button>

              <button
                onClick={() => { onNavigate("home"); setTimeout(() => { document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }) }, 100); }}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.services")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/</span>
              </button>

              <button
                onClick={() => { onNavigate("home"); setTimeout(() => { document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }) }, 100); }}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.faq")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/</span>
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.about")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/about</span>
              </button>
            </div>
          </div>

          {/* Legal Documents Section */}
          <div className="space-y-4 border-t border-border pt-6">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider">
              {t("sitemap.legalTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => onNavigate("terms")}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.terms")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/terms</span>
              </button>

              <button
                onClick={() => onNavigate("privacy")}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.privacy")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/privacy</span>
              </button>

              <button
                onClick={() => onNavigate("cookies")}
                className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border text-left transition-colors flex items-center justify-between group font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-primary shrink-0" />
                  <span>{t("sitemap.cookies")}</span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-primary font-mono">/cookies</span>
              </button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-foreground">{t("sitemap.contactSupport")}</h3>
              <p className="text-xs text-muted-foreground">{t("booking.trust2")}</p>
            </div>
            <Button asChild size="sm" className="rounded-xl text-xs font-bold shrink-0 gap-2">
              <a href="https://wa.me/6289611384407" target="_blank" rel="noopener noreferrer">
                <HugeiconsIcon icon={CallIcon} className="w-4 h-4" />
                WhatsApp Admin
              </a>
            </Button>
          </div>

        </Card>

      </div>
    </div>
  )
}
