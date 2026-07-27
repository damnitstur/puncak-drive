import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@/components/ui/icon"
import { LogoIcon, LogoLandscape } from "./logo"

import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  Location01Icon,
  CallIcon,
  InstagramIcon,
  MapsIcon,
  Target01Icon,
  Car01Icon,
  SparklesIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"

import companyData from "@/data/company-profile.json"

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const { t } = useTranslation()
  const compContact = companyData.company.contact

  const missionList = (t("about.missionList", { returnObjects: true }) as string[]) || []
  const targetCustomers = (t("about.targetCustomers", { returnObjects: true }) as string[]) || []
  const whyList = (t("about.whyList", { returnObjects: true }) as Array<{ title: string; description: string }>) || []
  const valuesList = (t("about.valuesList", { returnObjects: true }) as Array<{ name: string; description: string }>) || []

  return (
    <div className="min-h-svh bg-background pb-16">
      <div className="max-w-6xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8">

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

        {/* Section 1: col 1: Logo 1:1 | col 2: Puncak Drive, Alamat, Sejarah, Motto */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Col 1: Logo 1:1 Icon */}
            <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center justify-center">
              <LogoIcon className="w-28 h-28 sm:w-36 sm:h-36 text-foreground drop-shadow-lg" />
            </div>

            {/* Col 2: Title, Motto, Address, Story/History */}
            <div className="md:col-span-8 lg:col-span-9 space-y-5">
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold text-foreground uppercase tracking-tight">
                  PUNCAK DRIVE
                </h1>
                <p className="text-sm sm:text-base font-bold text-primary italic">
                  "{t("about.motto")}"
                </p>
              </div>

              <a
                href={compContact.mapsOffice}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-xl border border-border/50 hover:border-primary/40 hover:text-foreground transition-all group"
              >
                <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{t("about.address")}</span>
              </a>

              <div className="space-y-3 border-t border-border/60 pt-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
                  <HugeiconsIcon icon={Car01Icon} className="w-4.5 h-4.5 text-primary shrink-0" />
                  {t("about.storyBadge")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t("about.storyText")}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Our Vision (col-span-full) */}
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-2 text-primary uppercase font-bold text-xs tracking-widest pb-4">
            <HugeiconsIcon icon={Target01Icon} className="w-5 h-5" />
            <span>{t("about.visionBadge")}</span>
          </div>
          <p className="text-foreground tracking-tight max-w-3xl  leading-snug">
            "{t("about.visionText")}"
          </p>
        </div>

        {/* Section 3: col 1: Our Mission | col 2: Logo Landscape */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

          {/* Col 1: Our Mission */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center uppercase gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5" />
                <span>{t("about.missionBadge")}</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                {Array.isArray(missionList) && missionList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Customers Badges */}
            <div className="border-t border-border/60 pt-4 mt-4 space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t("about.targetTitle")}</span>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(targetCustomers) && targetCustomers.map((cust, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[11px] px-3 py-1 font-semibold rounded-lg">
                    {cust}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Logo Landscape */}
          <div className="md:col-span-5 items-end flex justify-end">
            <div>
              <LogoLandscape className="h-14 sm:h-20 w-auto text-foreground drop-shadow-lg" />
            </div>
          </div>

        </div>

        {/* Section 4: Why Choose Puncak Drive (6 Features Grid) */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground uppercase tracking-tight">
              {t("about.whyTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(whyList) && whyList.map((item, idx) => (
              <Card key={idx} className="bg-card border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 shadow-md">
                <CardContent className="p-0 space-y-2">
                  <div className="p-2.5 bg-primary/10 rounded-xl w-fit text-primary mb-3">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 5: Our Core Values (4 Grid Cards) */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium text-foreground uppercase tracking-tight">
              {t("about.valuesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(valuesList) && valuesList.map((val, idx) => (
              <Card key={idx} className="bg-card border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 shadow-md space-y-3">
                <div className="p-2.5 bg-primary/10 rounded-xl w-fit text-primary">
                  <HugeiconsIcon icon={SparklesIcon} className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {val.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {val.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Office Location & Contact Section */}
        <Card className="bg-card border-border rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border">
            <div>
              <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase tracking-widest font-bold mb-2">
                {t("about.contactBadge")}
              </Badge>
              <h2 className="text-2xl font-medium text-foreground uppercase tracking-tight">
                {t("about.contactTitle")}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                {t("about.address")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild size="sm" variant="outline" className="gap-2 text-xs font-bold rounded-xl">
                <a href={compContact.mapsOffice} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={MapsIcon} className="w-4 h-4 text-primary" />
                  {t("footer.openInMaps")}
                </a>
              </Button>
              <Button asChild size="sm" className="gap-2 text-xs font-bold rounded-xl shadow-lg shadow-primary/20">
                <a href={compContact.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={CallIcon} className="w-4 h-4" />
                  {t("about.contactBadge")}
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <a
              href={compContact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border/50 hover:border-primary/40 transition-all flex items-center gap-3 group"
            >
              <HugeiconsIcon icon={CallIcon} className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">WhatsApp Official</p>
                <p className="font-bold text-foreground">{compContact.phone}</p>
              </div>
            </a>

            <a
              href={compContact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border/50 hover:border-primary/40 transition-all flex items-center gap-3 group"
            >
              <HugeiconsIcon icon={InstagramIcon} className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Instagram</p>
                <p className="font-bold text-foreground">@{compContact.instagram}</p>
              </div>
            </a>

            <a
              href={compContact.emailUrl}
              className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border/50 hover:border-primary/40 transition-all flex items-center gap-3 group"
            >
              <HugeiconsIcon icon={Mail01Icon} className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Email Official</p>
                <p className="font-bold text-foreground">{compContact.email}</p>
              </div>
            </a>

            <a
              href={compContact.mapsOffice}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-muted/40 hover:bg-accent rounded-2xl border border-border/50 hover:border-primary/40 transition-all flex items-center gap-3 group"
            >
              <HugeiconsIcon icon={Location01Icon} className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Area Layanan</p>
                <p className="font-bold text-foreground">{t("about.contactArea")}</p>
              </div>
            </a>
          </div>
        </Card>

      </div>
    </div>
  )
}
