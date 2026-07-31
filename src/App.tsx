import * as React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Catalog from "./components/Catalog"
import type { CarItem } from "./components/Catalog"
import Services from "./components/Services"
import Faq from "./components/Faq"
import Footer from "./components/Footer"

const BookingPage = React.lazy(() => import("./components/BookingPage"))
const CarDetailPage = React.lazy(() => import("./components/CarDetailPage"))
const AboutPage = React.lazy(() => import("./components/AboutPage"))
const TermsPage = React.lazy(() => import("./components/TermsPage"))
const PrivacyPage = React.lazy(() => import("./components/PrivacyPage"))
const CookiesPage = React.lazy(() => import("./components/CookiesPage"))
const SitemapPage = React.lazy(() => import("./components/SitemapPage"))

import carsData from "./data/cars.json"

const queryClient = new QueryClient()

const HERO_CARS = [
  { id: "avanza", name: "Avanza" },
  { id: "inova", name: "Innova Reborn" },
  { id: "hiace", name: "Toyota HiAce" },
  { id: "calya", name: "Toyota Calya" },
  { id: "rush", name: "Toyota Rush" },
]

type PageRoute = "home" | "detail" | "booking" | "about" | "terms" | "privacy" | "cookies" | "sitemap"

interface RouteState {
  page: PageRoute
  slug?: string
}

function parsePath(): RouteState {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "")
  if (["about", "terms", "privacy", "cookies", "sitemap"].includes(path)) {
    return { page: path as PageRoute }
  }

  const parts = path.split("/")
  if (parts[0] === "armada" && parts[1]) {
    const slug = parts[1]
    if (parts[2] === "booking") {
      return { page: "booking", slug }
    }
    return { page: "detail", slug }
  }

  // Fallback check if path directly matches a car slug (e.g. /toyota-avanza)
  const matchedCar = (carsData as CarItem[]).find(
    (c) => c.slug === path || c.id === path
  )
  if (matchedCar) {
    return { page: "detail", slug: matchedCar.slug }
  }

  return { page: "home" }
}

function MainApp() {
  const [activeCarFilter, setActiveCarFilter] = React.useState<string>("avanza")
  const [searchFilter, setSearchFilter] = React.useState({
    location: "",
    date: "",
    carModel: "",
    pickupLocation: "",
  })

  const [routeState, setRouteState] = React.useState<RouteState>(() => parsePath())
  const [selectedCar, setSelectedCar] = React.useState<CarItem | null>(null)

  // Listen to browser Back / Forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setRouteState(parsePath())
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const navigateTo = React.useCallback((page: PageRoute, slug?: string) => {
    setRouteState({ page, slug })
    let targetUrl = "/"
    if (page === "detail" && slug) {
      targetUrl = `/armada/${slug}`
    } else if (page === "booking" && slug) {
      targetUrl = `/armada/${slug}/booking`
    } else if (page !== "home") {
      targetUrl = `/${page}`
    }
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page, slug }, "", targetUrl)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleNavigateAbout = React.useCallback(() => {
    navigateTo("about")
  }, [navigateTo])

  const handleNavigateLegal = React.useCallback(
    (page: "terms" | "privacy" | "cookies" | "sitemap") => {
      navigateTo(page)
    },
    [navigateTo]
  )

  const handleNavigateHome = React.useCallback(() => {
    navigateTo("home")
  }, [navigateTo])

  const handleSelectCar = React.useCallback((car: CarItem) => {
    setSelectedCar(car)
    navigateTo("detail", car.slug)
  }, [navigateTo])

  const handleProceedToBooking = React.useCallback((car: CarItem) => {
    setSelectedCar(car)
    navigateTo("booking", car.slug)
  }, [navigateTo])

  const brandName = "Puncak Drive"

  // Load cars from clean cars.json
  const { data: cars = [] } = useQuery<CarItem[]>({
    queryKey: ["carsCatalog"],
    queryFn: async () => {
      return (carsData as CarItem[])
    },
    initialData: [],
  })

  // Active car object resolved from slug or state
  const activeCar = React.useMemo(() => {
    if (selectedCar) return selectedCar
    if (routeState.slug) {
      return cars.find((c) => c.slug === routeState.slug || c.id === routeState.slug) || null
    }
    return null
  }, [selectedCar, routeState.slug, cars])

  const handleSearch = React.useCallback((searchParams: typeof searchFilter) => {
    setSearchFilter(searchParams)
    const catalogElement = document.getElementById("catalog")
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  if (routeState.page === "about") {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex flex-col justify-between">
        <div>
          <Header
            brandName={brandName}
            activePage="about"
            onNavigateAbout={handleNavigateAbout}
            onNavigateHome={handleNavigateHome}
          />
          <div className="pt-20">
            <AboutPage onBack={handleNavigateHome} />
          </div>
        </div>
        <Footer
          brandName={brandName}
          onNavigateAbout={handleNavigateAbout}
          onNavigateHome={handleNavigateHome}
          onNavigateLegal={handleNavigateLegal}
        />
      </div>
    )
  }

  if (routeState.page === "terms") {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex flex-col justify-between">
        <div>
          <Header
            brandName={brandName}
            onNavigateAbout={handleNavigateAbout}
            onNavigateHome={handleNavigateHome}
          />
          <div className="pt-20">
            <TermsPage onBack={handleNavigateHome} />
          </div>
        </div>
        <Footer
          brandName={brandName}
          onNavigateAbout={handleNavigateAbout}
          onNavigateHome={handleNavigateHome}
          onNavigateLegal={handleNavigateLegal}
        />
      </div>
    )
  }

  if (routeState.page === "privacy") {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex flex-col justify-between">
        <div>
          <Header
            brandName={brandName}
            onNavigateAbout={handleNavigateAbout}
            onNavigateHome={handleNavigateHome}
          />
          <div className="pt-20">
            <PrivacyPage onBack={handleNavigateHome} />
          </div>
        </div>
        <Footer
          brandName={brandName}
          onNavigateAbout={handleNavigateAbout}
          onNavigateHome={handleNavigateHome}
          onNavigateLegal={handleNavigateLegal}
        />
      </div>
    )
  }

  if (routeState.page === "cookies") {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex flex-col justify-between">
        <div>
          <Header
            brandName={brandName}
            onNavigateAbout={handleNavigateAbout}
            onNavigateHome={handleNavigateHome}
          />
          <div className="pt-20">
            <CookiesPage onBack={handleNavigateHome} />
          </div>
        </div>
        <Footer
          brandName={brandName}
          onNavigateAbout={handleNavigateAbout}
          onNavigateHome={handleNavigateHome}
          onNavigateLegal={handleNavigateLegal}
        />
      </div>
    )
  }

  if (routeState.page === "sitemap") {
    return (
      <div className="dark min-h-screen bg-background text-foreground flex flex-col justify-between">
        <div>
          <Header
            brandName={brandName}
            onNavigateAbout={handleNavigateAbout}
            onNavigateHome={handleNavigateHome}
          />
          <div className="pt-20">
            <SitemapPage onNavigate={(p) => (p === "about" ? handleNavigateAbout() : p === "terms" || p === "privacy" || p === "cookies" || p === "sitemap" ? handleNavigateLegal(p) : handleNavigateHome())} onBack={handleNavigateHome} />
          </div>
        </div>
        <Footer
          brandName={brandName}
          onNavigateAbout={handleNavigateAbout}
          onNavigateHome={handleNavigateHome}
          onNavigateLegal={handleNavigateLegal}
        />
      </div>
    )
  }

  if (routeState.page === "detail" && activeCar) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <CarDetailPage
          car={activeCar}
          onBack={handleNavigateHome}
          onProceedToBooking={(car) => {
            handleProceedToBooking(car)
          }}
        />
      </div>
    )
  }

  if (routeState.page === "booking" && activeCar) {
    return (
      <div className="dark min-h-screen bg-background text-foreground">
        <BookingPage
          car={activeCar}
          initialLocation={searchFilter.pickupLocation || searchFilter.location}
          initialDate={searchFilter.date ? new Date(searchFilter.date) : undefined}
          onBack={() => {
            handleSelectCar(activeCar)
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        <Header
          brandName={brandName}
          activePage="home"
          onNavigateAbout={handleNavigateAbout}
          onNavigateHome={handleNavigateHome}
        />
        <Hero
          sidebarCars={HERO_CARS}
          activeCarFilter={activeCarFilter}
          setActiveCarFilter={setActiveCarFilter}
          onSearch={handleSearch}
        />
        <Catalog
          cars={cars}
          searchFilter={searchFilter}
          onBookCar={handleProceedToBooking}
          onSelectCar={handleSelectCar}
        />
        <Services />
        <Faq />
      </div>
      <Footer
        brandName={brandName}
        onNavigateAbout={handleNavigateAbout}
        onNavigateHome={handleNavigateHome}
        onNavigateLegal={handleNavigateLegal}
      />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
        <MainApp />
      </React.Suspense>
    </QueryClientProvider>
  )
}
