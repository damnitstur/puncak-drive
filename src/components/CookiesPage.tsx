import * as React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { HugeiconsIcon } from "@/components/ui/icon"
import { ArrowLeft01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

interface CookiesPageProps {
  onBack: () => void
}

export default function CookiesPage({ onBack }: CookiesPageProps) {
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
            {t("cookies.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight">
            {t("cookies.title")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t("cookies.updated")}
          </p>
        </div>

        {/* Document Content */}
        <Card className="p-6 sm:p-10 space-y-8 bg-card border-border rounded-3xl shadow-xl">
          
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-primary uppercase tracking-wide flex items-center gap-2">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 text-primary shrink-0" />
              {t("cookies.sec1Title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("cookies.sec1Text")}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-primary uppercase tracking-wide flex items-center gap-2">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 text-primary shrink-0" />
              {t("cookies.sec2Title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("cookies.sec2Text")}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-primary uppercase tracking-wide flex items-center gap-2">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5 text-primary shrink-0" />
              {t("cookies.sec3Title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("cookies.sec3Text")}
            </p>
          </div>

        </Card>

      </div>
    </div>
  )
}
