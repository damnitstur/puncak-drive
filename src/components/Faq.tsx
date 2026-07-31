import * as React from "react"
import { HugeiconsIcon } from "@/components/ui/icon"
import {
  HelpCircleIcon,
  ArrowDown01Icon,
  SparklesIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function Faq() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const faqList = [
    {
      q: t("faq.q1"),
      a: t("faq.a1"),
    },
    {
      q: t("faq.q2"),
      a: t("faq.a2"),
    },
    {
      q: t("faq.q3"),
      a: t("faq.a3"),
    },
    {
      q: t("faq.q4"),
      a: t("faq.a4"),
    },
    {
      q: t("faq.q5"),
      a: t("faq.a5"),
    },
    {
      q: t("faq.q6"),
      a: t("faq.a6"),
    },
  ]

  return (
    <section id="faq" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[250px] sm:h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary text-[10px] tracking-widest uppercase font-bold px-3 py-1 gap-1.5"
          >
            <HugeiconsIcon icon={SparklesIcon} className="w-3 h-3 text-primary" />
            {t("faq.badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground tracking-tight uppercase">
            {t("faq.title")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Accordion List using Collapsible */}
        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <Collapsible
                key={index}
                open={isOpen}
                onOpenChange={(open) => setOpenIndex(open ? index : null)}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-card border-primary/40 shadow-lg shadow-primary/5"
                    : "bg-card/60 border-border hover:border-border/80"
                }`}
              >
                <CollapsibleTrigger className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isOpen ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      <HugeiconsIcon icon={HelpCircleIcon} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-foreground leading-snug">
                      {item.q}
                    </span>
                  </div>

                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                  <p className="pt-4">{item.a}</p>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {t("faq.stillHaveQuestions")}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t("faq.contactSupportText")}
            </p>
          </div>

          <Button
            asChild
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 h-auto rounded-xl shadow-lg shadow-emerald-600/25 gap-2 shrink-0"
          >
            <a
              href="https://wa.me/6289611384407?text=Halo%20Puncak%20Drive%2C%20saya%20ingin%20tanya%20seputar%20sewa%20mobil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HugeiconsIcon icon={WhatsappIcon} className="w-4 h-4" />
              <span>{t("faq.chatWhatsapp")}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
