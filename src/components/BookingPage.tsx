import * as React from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { HugeiconsIcon } from "@/components/ui/icon"
import {
  ArrowLeft01Icon,
  Calendar01Icon,
  Location01Icon,
  UserGroupIcon,
  Clock01Icon,
  SentIcon,
  Calendar02Icon,
  Tick01Icon,
  MapsIcon,
  Loading02Icon,
  GpsIcon,
} from "@hugeicons/core-free-icons"
import { useTranslation } from "react-i18next"
import type { CarItem } from "./Catalog"
import { getCarAvailabilityStatus, isDateBooked } from "@/lib/availability"

interface BookingPageProps {
  car: CarItem
  initialLocation?: string
  initialDate?: Date
  onBack: () => void
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

export default function BookingPage({
  car,
  initialLocation = "",
  initialDate,
  onBack,
}: BookingPageProps) {
  const { t } = useTranslation()
  const [bookingDays, setBookingDays] = React.useState<number>(1)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(initialDate || new Date())
  const [location, setLocation] = React.useState<string>(initialLocation)
  const [isDateOpen, setIsDateOpen] = React.useState<boolean>(false)

  const [bookingForm, setBookingForm] = React.useState({
    name: "",
    email: "",
    notes: "",
  })

  // OpenStreetMap Nominatim search states
  const [searchResults, setSearchResults] = React.useState<string[]>([])
  const [isSearching, setIsSearching] = React.useState<boolean>(false)
  const [isLocatingGps, setIsLocatingGps] = React.useState<boolean>(false)

  // Debounced search for OpenStreetMap Nominatim API
  React.useEffect(() => {
    if (!location.trim() || location.length < 3 || isLocatingGps) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=5`
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
  }, [location, isLocatingGps])

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
            setLocation(data.display_name)
          } else {
            setLocation(`GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
          }
        } catch {
          setLocation(`GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`)
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
    if (!location) return
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
    window.open(mapsUrl, "_blank")
  }

  const dailyPrice = parseInt(car.price) || 0
  const totalPrice = dailyPrice * bookingDays
  const availStatus = getCarAvailabilityStatus(car.id, selectedDate || new Date())

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault()
    const formattedDate = selectedDate ? format(selectedDate, "PPP") : "TBD"
    const locationInfo = location ? `\n📍 Lokasi Penjemputan: ${location}` : ""
    const dateInfo = `\n📅 Tanggal Sewa: ${formattedDate}`

    const msg = `Halo Puncak Drive, saya ingin konfirmasi reservasi sewa mobil:

Armada: ${car.name} (${car.transmission})
Durasi: ${bookingDays} hari${dateInfo}${locationInfo}
Nama Pemesan: ${bookingForm.name}
Email: ${bookingForm.email}
Catatan Tambahan: ${bookingForm.notes || "-"}

Total Estimasi: Rp ${totalPrice.toLocaleString("id-ID")}.000`

    window.open(`https://wa.me/6289611384407?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Navigation Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="group gap-2 text-muted-foreground hover:text-foreground pl-0"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            />
            {t("booking.back")}
          </Button>
        </div>

        {/* Page Title & Breadcrumb */}
        <div className="mb-10">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary text-[10px] tracking-widest uppercase font-bold mb-2"
          >
            {t("booking.badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("booking.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("booking.subtitle")}
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: Car Details & Price Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-card border-border rounded-2xl overflow-hidden shadow-xl">
              {/* Car Image Preview Header */}
              <div className="relative aspect-[16/10] bg-muted/60 flex items-center justify-center p-6 border-b border-border">
                <img
                  src={getCarImage(car.name, car.id)}
                  alt={car.name}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
                <Badge
                  variant="outline"
                  className={`absolute top-4 left-4 text-[10px] font-bold ${availStatus.isAvailable
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/30"
                    }`}
                >
                  {availStatus.isAvailable ? t("catalog.available") : t("catalog.booked")}
                </Badge>
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground capitalize">
                    {car.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Unit terawat, bersih, dan siap digunakan untuk perjalanan Anda.
                  </p>
                </div>

                {/* Spec Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-muted rounded-xl flex items-center gap-3 border border-border">
                    <HugeiconsIcon icon={UserGroupIcon} className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{t("booking.capacity")}</p>
                      <p className="text-xs font-bold text-foreground">{car.capacity} Seats</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-xl flex items-center gap-3 border border-border">
                    <HugeiconsIcon icon={Clock01Icon} className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">{t("booking.transmission")}</p>
                      <p className="text-xs font-bold text-foreground capitalize">{car.transmission}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t("booking.dailyRate")}:</span>
                    <span className="font-semibold text-foreground">
                      Rp {dailyPrice.toLocaleString("id-ID")}.000
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t("booking.duration")}:</span>
                    <span className="font-semibold text-foreground">{bookingDays} {t("booking.days")}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-sm font-bold text-foreground">{t("booking.total")}:</span>
                    <span className="text-xl font-black text-primary">
                      Rp {totalPrice.toLocaleString("id-ID")}.000
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="p-4 bg-muted/50 rounded-2xl border border-border space-y-3">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("booking.trust1")}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <HugeiconsIcon icon={Tick01Icon} className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{t("booking.trust2")}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Checkout Form (7 Cols) */}
          <div className="lg:col-span-7">
            <Card className="bg-card border-border rounded-2xl shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-foreground">
                  {t("booking.formTitle")}
                </CardTitle>
                <CardDescription className="text-xs">
                  {t("booking.formSubtitle")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleConfirmBooking} className="space-y-5">

                  {/* Name Input */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("booking.fullName")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      placeholder={t("booking.fullNamePlaceholder")}
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="bg-background border-border h-11 text-xs"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("booking.email")} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder={t("booking.emailPlaceholder")}
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="bg-background border-border h-11 text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Pickup Date Picker */}
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("booking.pickupDate")} <span className="text-destructive">*</span>
                      </Label>
                      <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-xs font-medium h-11 bg-background border-border px-3 gap-2 text-foreground"
                          >
                            <HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4 text-primary shrink-0" />
                            <span className="truncate">
                              {selectedDate ? format(selectedDate, "PPP") : "Pilih Tanggal"}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="dark w-auto p-1" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date)
                              if (date) setIsDateOpen(false)
                            }}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              isDateBooked(date, car.id)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Duration Days */}
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Durasi Sewa (Hari) <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <HugeiconsIcon
                          icon={Calendar02Icon}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
                        />
                        <Input
                          type="number"
                          min={1}
                          max={30}
                          value={bookingDays}
                          onChange={(e) => setBookingDays(Math.max(1, parseInt(e.target.value) || 1))}
                          className="pl-9 bg-background border-border h-11 text-xs"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pickup Location with OpenStreetMap Nominatim Live Search & GPS Track */}
                  <div className="space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {t("booking.pickupLocation")}
                      </Label>

                      {/* GPS Track Button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGetGpsLocation}
                        disabled={isLocatingGps}
                        className="h-7 text-[11px] text-primary hover:text-primary hover:bg-primary/10 gap-1.5 px-2 font-bold"
                      >
                        {isLocatingGps ? (
                          <HugeiconsIcon icon={Loading02Icon} className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <HugeiconsIcon icon={GpsIcon} className="w-3.5 h-3.5" />
                        )}
                        {isLocatingGps ? t("booking.locatingGps") : t("booking.detectGps")}
                      </Button>
                    </div>

                    <div className="relative">
                      <HugeiconsIcon
                        icon={Location01Icon}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 z-10"
                      />
                      <Input
                        placeholder={t("booking.locationPlaceholder")}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-9 pr-24 bg-background border-border h-11 text-xs"
                      />

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
                        {isSearching && (
                          <HugeiconsIcon icon={Loading02Icon} className="w-4 h-4 animate-spin text-primary mr-1" />
                        )}

                        {location && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            title={t("booking.googleMapsTitle")}
                            onClick={handleOpenGoogleMaps}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg"
                          >
                            <HugeiconsIcon icon={MapsIcon} className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>

                      {/* Nominatim Search Recommendations Dropdown */}
                      {searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1 bg-background border border-border rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto p-1 space-y-0.5">
                          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold px-3 py-1 border-b border-border">
                            {t("booking.nominatimTitle")}
                          </p>
                          {searchResults.map((res, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setLocation(res)
                                setSearchResults([])
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-accent hover:text-accent-foreground transition-colors flex items-start gap-2 group"
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
                  </div>

                  {/* Notes Textarea */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t("booking.notes")}
                    </Label>
                    <Textarea
                      placeholder={t("booking.notesPlaceholder")}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      rows={3}
                      className="bg-background border-border text-xs resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full h-12 uppercase tracking-widest text-xs font-black shadow-lg shadow-primary/25 gap-2"
                    >
                      <HugeiconsIcon icon={SentIcon} className="w-4 h-4" />
                      {t("booking.submitBtn")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
