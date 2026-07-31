import * as React from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@/components/ui/icon"
import {
  Calendar01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  UserCheck01Icon,
  Airplane01Icon,
  Compass01Icon,
  Building01Icon,
  Car01Icon,
  CallIcon,
} from "@hugeicons/core-free-icons"

function Services() {
  const { t } = useTranslation()

  const serviceItems = [
    {
      icon: <HugeiconsIcon icon={Calendar01Icon} className="w-6 h-6 text-primary" />,
      title: t("services.daily"),
      description: t("services.dailyDesc"),
    },
    {
      icon: <HugeiconsIcon icon={Clock01Icon} className="w-6 h-6 text-primary" />,
      title: t("services.weekly"),
      description: t("services.weeklyDesc"),
    },
    {
      icon: <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-6 h-6 text-primary" />,
      title: t("services.monthly"),
      description: t("services.monthlyDesc"),
    },
    {
      icon: <HugeiconsIcon icon={UserCheck01Icon} className="w-6 h-6 text-primary" />,
      title: t("services.driver"),
      description: t("services.driverDesc"),
    },
    {
      icon: <HugeiconsIcon icon={Airplane01Icon} className="w-6 h-6 text-primary" />,
      title: t("services.airport"),
      description: t("services.airportDesc"),
    },
    {
      icon: <HugeiconsIcon icon={Compass01Icon} className="w-6 h-6 text-primary" />,
      title: t("services.tour"),
      description: t("services.tourDesc"),
    },
    {
      icon: <HugeiconsIcon icon={Building01Icon} className="w-6 h-6 text-primary" />,
      title: t("services.business"),
      description: t("services.businessDesc"),
    },
    {
      icon: <HugeiconsIcon icon={Car01Icon} className="w-6 h-6 text-primary" />,
      title: t("services.charter"),
      description: t("services.charterDesc"),
    },
  ]

  const trustBadges = [
    t("booking.trust1"),
    t("booking.trust2"),
    t("services.trust3"),
    t("services.trust4"),
  ]

  return (
    <section id="services" className="py-24 border-t border-border/60 scroll-mt-20 relative overflow-hidden bg-background">
      {/* Soft Background Accent Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-left mx-auto mb-16 space-y-3">
          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
            {t("services.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground tracking-tight uppercase">
            {t("services.title")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Cards Grid — 8 Premium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((item, index) => (
            <Card
              key={index}
              className="bg-card border-border rounded-2xl transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="p-3 bg-secondary/80 rounded-xl w-fit group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust & Commitment Banner */}
        <Card className="mt-16 overflow-hidden">
          <CardContent className="p-8 md:p-10 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
              <div className="max-w-2xl space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4" />
                  <span>{t("services.commitmentBadge")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">
                  {t("services.commitmentHeadline")}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("services.commitmentSubtext")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-4 w-full lg:w-auto shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-foreground bg-muted/50 px-3 py-2 rounded-xl border border-border/50">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-[11px]">{badge}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="sm" className="rounded-xl text-xs uppercase tracking-wider font-bold shadow-lg shadow-primary/20 gap-2">
                  <a href="https://wa.me/6289611384407?text=Halo%20Puncak%20Drive,%20saya%20ingin%20tanya%20layanan%20sewa" target="_blank" rel="noopener noreferrer">
                    <HugeiconsIcon icon={CallIcon} className="w-4 h-4" />
                    {t("services.contactSupport")}
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  )
}

export default React.memo(Services)
