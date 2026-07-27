import * as React from "react"
import { useTranslation } from "react-i18next"
import { HugeiconsIcon } from "@/components/ui/icon"
import { GlobalIcon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

const LANGUAGES = [
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
]

export default React.memo(function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const currentLng = i18n.language || "id"
  const selectedLang = LANGUAGES.find((l) => l.code === currentLng) || LANGUAGES[0]

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside, { passive: true })
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = React.useCallback(
    (code: string) => {
      i18n.changeLanguage(code)
      setIsOpen(false)
    },
    [i18n]
  )

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 h-8 px-2.5 bg-card/80 hover:bg-card border border-border text-xs font-semibold rounded-xl text-foreground transition-colors shadow-sm"
      >
        <HugeiconsIcon icon={GlobalIcon} className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-[11px] font-bold tracking-wider">{selectedLang.short}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl py-1 z-50 animate-in fade-in-50 zoom-in-95">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-accent rounded-xl ${
                lang.code === currentLng ? "text-primary font-bold bg-primary/10" : "text-foreground"
              }`}
            >
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{lang.short}</span>
              <span className="text-[11px] tracking-wide">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
