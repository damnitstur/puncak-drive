import * as React from "react"
import { format } from "date-fns"
import { HugeiconsIcon } from "@/components/ui/icon"
import {
  Location01Icon,
  Calendar01Icon,
  Search01Icon,
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
  Loading02Icon,
  Mouse01Icon,
  ArrowDownDoubleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { isDateBooked } from "@/lib/availability"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { LogoLandscape } from "./logo"

import { useTranslation } from "react-i18next"

interface HeroProps {
  sidebarCars: { id: string; name: string }[]
  activeCarFilter: string
  setActiveCarFilter: (id: string) => void
  onSearch: (params: { location: string; date: string; carModel: string; pickupLocation: string }) => void
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/puncakdrive", Icon: InstagramIcon },
  { label: "TikTok", href: "#", Icon: TiktokIcon },
  { label: "WhatsApp", href: "https://wa.me/6289611384407", Icon: WhatsappIcon },
]


const CAR_IMAGES: Record<string, string> = {
  avanza: "/katalog1.webp",
  inova: "/inova.webp",
  invova: "/inova.webp",
  hiace: "/hiace.webp",
  calya: "/calya.webp",
  rush: "/rush.webp",
}

function Hero({ sidebarCars, activeCarFilter, setActiveCarFilter, onSearch }: HeroProps) {
  const { t } = useTranslation()
  const [location, setLocation] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined)

  // Dynamic car image based on sidebar selection
  const currentCarImage = CAR_IMAGES[activeCarFilter.toLowerCase()] || "/katalog1.webp"

  // Location Maps Search & Suggestion states
  const [isLocationOpen, setIsLocationOpen] = React.useState(false)
  const [isDateOpen, setIsDateOpen] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<string[]>([])
  const [isSearching, setIsSearching] = React.useState(false)

  // Debounced search for Nominatim OpenStreetMap API
  React.useEffect(() => {
    if (!location.trim() || location.length < 3) {
      setSearchResults([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location
          )}&countrycodes=id&limit=5`
        )
        const data = await res.json()
        if (Array.isArray(data)) {
          setSearchResults(data.map((item: any) => item.display_name))
        }
      } catch (err) {
        console.error("Maps search error:", err)
      } finally {
        setIsSearching(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [location])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
    onSearch({ location, date: formattedDate, carModel: activeCarFilter, pickupLocation: location })
  }

  // Carousel slide navigation logic
  const activeIndex = React.useMemo(() => {
    const idx = sidebarCars.findIndex(
      (car) => car.id.toLowerCase() === activeCarFilter.toLowerCase()
    )
    return idx >= 0 ? idx : 0
  }, [sidebarCars, activeCarFilter])

  const handlePrevSlide = React.useCallback(() => {
    const newIdx = (activeIndex - 1 + sidebarCars.length) % sidebarCars.length
    setActiveCarFilter(sidebarCars[newIdx].id)
  }, [activeIndex, sidebarCars, setActiveCarFilter])

  const handleNextSlide = React.useCallback(() => {
    const newIdx = (activeIndex + 1) % sidebarCars.length
    setActiveCarFilter(sidebarCars[newIdx].id)
  }, [activeIndex, sidebarCars, setActiveCarFilter])

  // Touch Swipe Handlers for mobile car image slider
  const touchStartX = React.useRef<number | null>(null)
  const touchEndX = React.useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      handleNextSlide()
    } else if (distance < -minSwipeDistance) {
      handlePrevSlide()
    }
  }

  return (
    <section
      className="dark relative w-full overflow-hidden flex flex-col min-h-svh lg:h-svh bg-background bg-gradient-to-r from-25% via-50% to-75% from-background via-muted to-background"
    >
      <div className="absolute inset-0 bg-background opacity-60 bg-gradient-to-b from-background via-card to-background"></div>
      {/* GPU Hardware-Accelerated Ambient Light Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none transform-gpu"></div>
      <div className="absolute bottom-10 right-10 w-[300px] sm:w-[500px] h-[250px] sm:h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none transform-gpu"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* MAIN CONTENT — flex-1, pt-20 offset untuk header fixed */}
      <div className="flex-1 min-h-0 flex flex-col pt-24 pb-6 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex-1 min-h-0 flex flex-col">

          {/* Responsive Layout: Mobile Stack -> Desktop 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_260px] flex-1 h-full min-h-0 gap-6 lg:gap-0">

            {/* COL 1 — Car list filter (Desktop vertical list only; mobile uses image swipe slider) */}
            <div className="hidden lg:flex flex-col justify-between py-4 pr-4 order-1">
              <div className="flex-1 flex flex-col justify-center">
                <ul className="flex flex-col gap-3 py-1 items-start">
                  {sidebarCars.map((car) => {
                    const isActive = activeCarFilter.toLowerCase() === car.id.toLowerCase()
                    return (
                      <li key={car.id} className="w-full">
                        <button
                          onClick={() => setActiveCarFilter(car.id)}
                          className={`transition-all duration-200 tracking-widest uppercase font-bold text-xs ${isActive
                            ? "text-primary text-sm font-black"
                            : "text-muted-foreground hover:text-foreground text-xs"
                            }`}
                        >
                          {car.name}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* Landscape logo */}
              <div className="flex-shrink-0 text-foreground pt-4">
                <LogoLandscape className="w-auto h-7" />
              </div>
            </div>

            {/* COL 2 — Headline + car image + search bar */}
            <div className="relative flex flex-col items-center justify-between py-2 lg:py-4 overflow-hidden min-h-0 order-1 lg:order-2">
              {/* Headline — RENT CAR / FOR LESS */}
              <div className="text-center z-10 flex-shrink-0 leading-none pt-2">
                <h1 className="font-heading text-foreground uppercase leading-[0.92] text-4xl sm:text-6xl lg:text-7xl block tracking-tight">
                  <span className="font-semibold tracking-wide">{t("hero.rentCar")}</span>
                  <br />
                  <span className="font-bold text-muted-foreground">{t("hero.forLess")}</span>
                </h1>
              </div>

              {/* Car image showcase — Touch Swipe enabled on mobile, click/list selection on desktop */}
              <div
                className="relative flex-1 w-full max-w-3xl flex items-end justify-center min-h-[180px] sm:min-h-[260px] lg:min-h-0 select-none my-4"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Mobile Left & Right Swipe Arrow Buttons */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous Car"
                  className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/60 backdrop-blur-md border border-border text-foreground/80 hover:text-foreground hover:bg-background/90 transition-all shadow-lg active:scale-95"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next Car"
                  className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/60 backdrop-blur-md border border-border text-foreground/80 hover:text-foreground hover:bg-background/90 transition-all shadow-lg active:scale-95"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
                </button>

                {/* Car Image (Identical layout to original desktop view) */}
                <img
                  key={activeCarFilter}
                  src={currentCarImage}
                  alt={activeCarFilter}
                  className="w-full object-contain transition-all duration-300 animate-in fade-in zoom-in-95 max-h-[220px] sm:max-h-[320px] lg:max-h-full pointer-events-none"
                  style={{ objectPosition: "bottom" }}
                />

                {/* Mobile Carousel Indicators & Car Name Badge */}
                <div className="lg:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-auto">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full shadow-sm">
                    {sidebarCars[activeIndex]?.name || activeCarFilter}
                  </span>

                  {/* Dots indicator */}
                  <div className="flex items-center gap-1.5">
                    {sidebarCars.map((car, idx) => (
                      <button
                        key={car.id}
                        type="button"
                        onClick={() => setActiveCarFilter(car.id)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex
                          ? "w-5 bg-primary"
                          : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                          }`}
                        aria-label={`Select ${car.name}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* SEARCH BAR — Mobile-stacked & Desktop horizontal */}
              <div className="relative z-20 w-full flex-shrink-0">
                <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl overflow-hidden shadow-2xl bg-card/80 backdrop-blur-md border border-border p-1 sm:p-0">

                    {/* 📍 DESTINATION LOCATION FILTER */}
                    <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-border cursor-pointer hover:bg-accent/50 transition-colors group">
                          <HugeiconsIcon
                            icon={Location01Icon}
                            className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold leading-none mb-1">
                              {t("hero.filterLocation")}
                            </p>
                            <p className="text-foreground text-xs font-semibold truncate leading-tight">
                              {location || t("hero.selectLocation")}
                            </p>
                          </div>
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="dark w-80 p-3" align="start">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-primary flex-shrink-0" />
                            <Input
                              autoFocus
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder={t("hero.typeLocationPlaceholder")}
                              className="h-9 text-xs bg-background text-foreground border-border flex-1"
                            />
                            {isSearching && (
                              <HugeiconsIcon icon={Loading02Icon} className="w-4 h-4 animate-spin text-primary flex-shrink-0" />
                            )}
                          </div>

                          {/* Live Search Suggestions (If matches found) */}
                          {searchResults.length > 0 && (
                            <div className="space-y-1 max-h-48 overflow-y-auto pr-1 pt-2 border-t border-border">
                              {searchResults.map((res, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    setLocation(res)
                                    setIsLocationOpen(false)
                                  }}
                                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground transition-colors flex items-start gap-2 group"
                                >
                                  <HugeiconsIcon
                                    icon={Location01Icon}
                                    className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5"
                                  />
                                  <span className="line-clamp-2 leading-snug">{res}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>

                    {/* 📅 SHADCN DATE PICKER (POPOVER + CALENDAR) */}
                    <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-border cursor-pointer hover:bg-accent/50 transition-colors group">
                          <HugeiconsIcon
                            icon={Calendar01Icon}
                            className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform"
                          />
                          <div className="min-w-0">
                            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold leading-none mb-1">
                              {t("hero.filterDate")}
                            </p>
                            <p className="text-foreground text-xs font-semibold truncate leading-tight">
                              {selectedDate ? format(selectedDate, "PPP") : t("hero.selectDate")}
                            </p>
                          </div>
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-1 dark" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            if (date) {
                              setSelectedDate(date)
                              setIsDateOpen(false)
                            }
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                            isDateBooked(date, activeCarFilter)
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    {/* Search button */}
                    <div className="px-2 py-2 flex-shrink-0">
                      <Button
                        type="submit"
                        className="w-full sm:w-auto rounded-xl px-5 py-3 h-auto uppercase tracking-widest text-[11px] font-black shadow-lg shadow-primary/30"
                      >
                        <HugeiconsIcon icon={Search01Icon} className="w-3.5 h-3.5" />
                        {t("hero.searchBtn")}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* COL 3 — Tagline & Social Icons */}
            <div className="flex flex-col justify-between py-2 lg:py-4 lg:pl-8 relative order-3">
              {/* Tagline */}
              <div className="flex-1 flex flex-col justify-center">
                <div>
                  <h2
                    className="font-heading font-black uppercase leading-[1.05] tracking-tight text-foreground mb-2 sm:mb-3 text-lg sm:text-2xl lg:text-3xl"
                  >
                    {t("hero.tagline").split("\n").map((part, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        <span>{part}</span>
                      </React.Fragment>
                    ))}
                  </h2>
                  <p className="text-muted-foreground text-xs leading-relaxed max-w-full lg:max-w-[190px]">
                    {t("hero.subtext")}
                  </p>
                </div>
              </div>

              {/* Bottom: Social icons */}
              <div className="flex items-center justify-between lg:justify-end gap-4 pt-4 lg:pt-0">
                <div className="lg:hidden text-foreground">
                  <LogoLandscape className="w-auto h-6" />
                </div>
                <div className="flex items-center gap-4">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <HugeiconsIcon icon={s.Icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Scroll indicator (Desktop only) */}
              <div className="hidden lg:flex absolute bottom-24 right-0 flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-300">
                <HugeiconsIcon icon={Mouse01Icon} className="w-8 h-8" />
                <HugeiconsIcon icon={ArrowDownDoubleIcon} className="w-8 h-8 animate-bounce" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Hero)
