import * as React from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { getCarAvailabilityStatus, isDateBooked } from "@/lib/availability"
import { HugeiconsIcon } from "@/components/ui/icon"
import {
  UserGroupIcon,
  Alert01Icon,
  Location01Icon,
  Calendar01Icon,
  Search01Icon,
  Car01Icon,
  GpsIcon,
  Loading02Icon,
  MapsIcon,
} from "@hugeicons/core-free-icons"

import { useTranslation } from "react-i18next"

export interface CarItem {
  id: string
  slug: string
  name: string
  transmission: string   // kept for single page (CarDetailPage/BookingPage), not shown in catalog listing
  capacity: string
  pricePerDay: number
  image: string
  isPopular?: boolean
  rating?: number
  totalRentals?: number
  tag?: string
  shortDesc?: string
}

interface CatalogProps {
  cars: CarItem[]
  searchFilter?: { location: string; date: string; carModel: string; pickupLocation: string }
  onBookCar?: (car: CarItem) => void
  onSelectCar?: (car: CarItem) => void
}

const CAR_IMAGES_MAP: Record<string, string> = {
  avanza: "/katalog1.webp",
  inova: "/inova.webp",
  invova: "/inova.webp",
  innova: "/inova.webp",
  hiace: "/hiace.webp",
  calya: "/calya.webp",
  rush: "/rush.webp",
}

function getCarImage(carName: string, carId: string): string {
  const key = carId.toLowerCase()
  const nameKey = carName.toLowerCase()
  for (const [k, img] of Object.entries(CAR_IMAGES_MAP)) {
    if (key.includes(k) || nameKey.includes(k)) return img
  }
  return "/katalog1.webp"
}

export default function Catalog({ cars, searchFilter, onBookCar, onSelectCar }: CatalogProps) {
  const { t } = useTranslation()
  // Catalog Header Filter States
  const [filterCarModel, setFilterCarModel] = React.useState<string>("all")
  const [filterPickupDate, setFilterPickupDate] = React.useState<Date | undefined>(undefined)
  const [filterPickupLocation, setFilterPickupLocation] = React.useState<string>("")
  const [isDateOpen, setIsDateOpen] = React.useState<boolean>(false)
  const [isLocationOpen, setIsLocationOpen] = React.useState<boolean>(false)

  // Synchronize Hero search form params when user submits search in Hero
  React.useEffect(() => {
    if (searchFilter?.date) {
      const parts = searchFilter.date.split("-").map(Number)
      if (parts.length === 3) {
        setFilterPickupDate(new Date(parts[0], parts[1] - 1, parts[2]))
      }
    }
    if (searchFilter?.location) {
      setFilterPickupLocation(searchFilter.location)
    }
  }, [searchFilter])

  // OpenStreetMap Nominatim search & GPS states
  const [searchResults, setSearchResults] = React.useState<string[]>([])
  const [isSearching, setIsSearching] = React.useState<boolean>(false)
  const [isLocatingGps, setIsLocatingGps] = React.useState<boolean>(false)

  // Debounced search for OpenStreetMap Nominatim API
  React.useEffect(() => {
    if (!filterPickupLocation.trim() || filterPickupLocation.length < 3 || isLocatingGps) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(filterPickupLocation)}&limit=5`
        )
        const data = await res.json()
        if (Array.isArray(data)) {
          setSearchResults(data.map((item: any) => item.display_name))
        }
      } catch (err) {
        console.error("Nominatim search error:", err)
      } finally {
        setIsSearching(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [filterPickupLocation, isLocatingGps])

  // GPS Tracking via Browser Geolocation Permission API
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung fitur Geolocation GPS.")
      return
    }

    setIsLocatingGps(true)
    setSearchResults([])

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await res.json()
          if (data && data.display_name) {
            setFilterPickupLocation(data.display_name)
          } else {
            setFilterPickupLocation(`GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
          }
        } catch {
          setFilterPickupLocation(`GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
        } finally {
          setIsLocatingGps(false)
        }
      },
      (err) => {
        console.error("GPS error:", err)
        setIsLocatingGps(false)
        alert("Izin GPS ditolak atau lokasi Anda tidak dapat ditemukan.")
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  // Open Google Maps view for selected location
  const handleOpenGoogleMaps = () => {
    if (!filterPickupLocation) return
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(filterPickupLocation)}`
    window.open(mapsUrl, "_blank")
  }

  // Dynamically derive unique car models from cars data prop
  const uniqueModels = React.useMemo(() => {
    const map = new Map<string, string>()
    cars.forEach((car) => {
      if (car.name && !map.has(car.name.toLowerCase())) {
        map.set(car.name.toLowerCase(), car.name)
      }
    })
    return Array.from(map.entries())
  }, [cars])

  // Sub-filter: Popular Only
  const [popularOnly, setPopularOnly] = React.useState<boolean>(false)

  const filteredCars = React.useMemo(() => {
    return cars.filter((car) => {
      // Popular filter
      if (popularOnly && !car.isPopular) {
        return false
      }
      // Car Model filter
      if (
        filterCarModel !== "all" &&
        !car.name.toLowerCase().includes(filterCarModel.toLowerCase()) &&
        !car.id.toLowerCase().includes(filterCarModel.toLowerCase())
      ) {
        return false
      }
      // Date Availability filter (if date selected, check if booked)
      if (filterPickupDate && isDateBooked(filterPickupDate, car.id)) {
        return false
      }
      return true
    })
  }, [cars, filterCarModel, filterPickupDate, popularOnly])

  return (
    <section id="catalog" className="py-20 border-t border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 space-y-6">
          <div className="p-2 sm:p-3 bg-card border border-border rounded flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* 1. CAR MODEL */}
            <div className="flex-1 min-w-[160px]">
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold px-3 pt-1">
                Car Model
              </p>
              <Select value={filterCarModel} onValueChange={setFilterCarModel}>
                <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0 text-xs font-semibold h-9 px-3">
                  <div className="flex items-center gap-2 text-foreground truncate">
                    <HugeiconsIcon icon={Car01Icon} className="w-4 h-4 text-primary shrink-0" />
                    <SelectValue placeholder="All Models" />
                  </div>
                </SelectTrigger>
                <SelectContent className="dark bg-background border-border">
                  <SelectItem value="all">All Models (Semua)</SelectItem>
                  {uniqueModels.map(([value, label]) => (
                    <SelectItem key={value} value={value} className="capitalize">
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator orientation="vertical" className="hidden md:block h-8" />

            {/* 2. PICKUP DATE */}
            <div className="flex-1 min-w-[160px]">
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold px-3 pt-1">
                Pickup Date
              </p>
              <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start text-xs font-semibold h-9 px-3 gap-2 text-foreground hover:bg-accent/50">
                    <HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">
                      {filterPickupDate ? format(filterPickupDate, "PPP") : "Pilih Tanggal"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="dark w-auto p-1" align="start">
                  <Calendar
                    mode="single"
                    selected={filterPickupDate}
                    onSelect={(date) => {
                      setFilterPickupDate(date)
                      if (date) setIsDateOpen(false)
                    }}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Separator orientation="vertical" className="hidden md:block h-8" />

            {/* 3. PICKUP LOCATION */}
            <div className="flex-1 min-w-[160px]">
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold px-3 pt-1">
                Pickup Location
              </p>
              <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start text-xs font-semibold h-9 px-3 gap-2 text-foreground hover:bg-accent/50">
                    <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">
                      {filterPickupLocation || "Lokasi Penjemputan..."}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="dark w-80 p-3" align="start">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-border">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                        <HugeiconsIcon icon={Location01Icon} className="w-3 h-3 text-primary" />
                        Lokasi Penjemputan
                      </span>

                      {/* GPS Button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGetGpsLocation}
                        disabled={isLocatingGps}
                        className="h-6 text-[10px] text-primary hover:text-primary hover:bg-primary/10 gap-1 px-1.5 font-bold"
                      >
                        {isLocatingGps ? (
                          <HugeiconsIcon icon={Loading02Icon} className="w-3 h-3 animate-spin" />
                        ) : (
                          <HugeiconsIcon icon={GpsIcon} className="w-3 h-3" />
                        )}
                        {isLocatingGps ? "GPS..." : "Deteksi GPS"}
                      </Button>
                    </div>

                    <div className="relative flex items-center gap-2">
                      <Input
                        autoFocus
                        value={filterPickupLocation}
                        onChange={(e) => setFilterPickupLocation(e.target.value)}
                        placeholder="Ketik lokasi (misal: Puncak, Bandung...)"
                        className="h-9 text-xs bg-background text-foreground border-border flex-1 pr-14"
                      />

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {isSearching && (
                          <HugeiconsIcon icon={Loading02Icon} className="w-3.5 h-3.5 animate-spin text-primary mr-0.5" />
                        )}

                        {filterPickupLocation && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            title="Buka di Google Maps"
                            onClick={handleOpenGoogleMaps}
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg"
                          >
                            <HugeiconsIcon icon={MapsIcon} className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Nominatim Search Results */}
                    {searchResults.length > 0 && (
                      <div className="space-y-1 max-h-48 overflow-y-auto pr-1 pt-1 border-t border-border">
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold px-2 py-1">
                          Hasil Pencarian Peta
                        </p>
                        {searchResults.map((res, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFilterPickupLocation(res)
                              setSearchResults([])
                              setIsLocationOpen(false)
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground transition-colors flex items-start gap-2 group"
                          >
                            <HugeiconsIcon
                              icon={Location01Icon}
                              className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5"
                            />
                            <span className="line-clamp-2 leading-snug">{res}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* 4. SEARCH BUTTON & RESET */}
            <div className="shrink-0 flex items-center gap-2">
              <Button
                className="w-full md:w-auto px-6 py-2.5 h-10 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20"
                onClick={() => {
                  // State filters trigger dynamic filtering
                }}
              >
                <HugeiconsIcon icon={Search01Icon} className="w-4 h-4" />
                Search
              </Button>

              {(filterCarModel !== "all" || filterPickupDate || filterPickupLocation) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setFilterCarModel("all")
                    setFilterPickupDate(undefined)
                    setFilterPickupLocation("")
                  }}
                >
                  Reset
                </Button>
              )}
            </div>

          </div>

          {/* Sub-filter: Popular Toggle & Count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <p className="text-xs text-muted-foreground font-medium">
              {t("catalog.showing")} <span className="font-bold text-foreground">{filteredCars.length}</span> {t("catalog.fleetSelection")}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={popularOnly ? "default" : "outline"}
                size="sm"
                className={`text-xs tracking-wide rounded-xl font-bold h-7 px-3 gap-1.5 transition-all ${popularOnly ? "hover:bg-amber-600" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                onClick={() => setPopularOnly(!popularOnly)}
              >
                {popularOnly ? t("catalog.popularFilter") : t("catalog.popularBtn")}
              </Button>
            </div>
          </div>
        </div>

        {/* Car Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => {
              const availStatus = getCarAvailabilityStatus(car.id)
              return (
                <Card
                  key={car.id}
                  className="group relative overflow-hidden"
                >
                  {/* Car Image Header */}
                  <div
                    onClick={() => onSelectCar?.(car)}
                    className="relative aspect-[16/10] bg-muted/60 flex items-center justify-center p-4 border-b border-border overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={getCarImage(car.name, car.id)}
                      alt={car.name}
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300 z-0"
                    />

                    {/* Status & Popular Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-bold ${availStatus.isAvailable
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          }`}
                      >
                        {availStatus.isAvailable ? t("catalog.available") : t("catalog.booked")}
                      </Badge>

                      {car.isPopular ? (
                        <Badge className="bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 shadow-md">
                          TERPOPULER
                        </Badge>
                      ) : car.tag ? (
                        <Badge variant="secondary" className="text-[10px] font-bold">
                          {car.tag}
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 cursor-pointer" onClick={() => onSelectCar?.(car)}>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl font-bold text-card-foreground capitalize group-hover:text-primary transition-colors duration-200">
                        {car.name}
                      </h3>
                    </div>

                    {car.tag && (
                      <p className="text-[11px] font-semibold text-primary mt-1">
                        {car.tag}
                      </p>
                    )}

                    {car.shortDesc && (
                      <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                        {car.shortDesc}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <HugeiconsIcon icon={UserGroupIcon} className="w-3.5 h-3.5 text-primary" />
                        <span>{car.capacity} Seats</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className='justify-between'>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{t("catalog.ratePerDay")}</p>
                      <p className="text-base sm:text-lg font-black text-foreground">
                        Rp {car.pricePerDay.toLocaleString("id-ID")}.000
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="uppercase tracking-widest text-[10px] font-bold shadow-md shadow-primary/20"
                        onClick={() => onSelectCar ? onSelectCar(car) : onBookCar?.(car)}
                      >
                        {t("catalog.bookBtn")}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="bg-card text-card-foreground border-border p-12 rounded-2xl text-center flex flex-col items-center max-w-lg mx-auto">
            <HugeiconsIcon icon={Alert01Icon} className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-bold text-foreground">{t("catalog.noCars")}</h3>
            <Button className="mt-6 uppercase tracking-widest text-xs font-bold" size="sm" onClick={() => { setFilterCarModel("all"); setFilterPickupDate(undefined); setFilterPickupLocation("") }}>
              {t("catalog.resetFilter")}
            </Button>
          </Card>
        )}
      </div>
    </section>
  )
}
