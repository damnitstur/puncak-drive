import * as React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Catalog from "./components/Catalog"
import type { CarItem } from "./components/Catalog"
import Services from "./components/Services"
import Footer from "./components/Footer"

import BookingPage from "./components/BookingPage"
import CarDetailPage from "./components/CarDetailPage"
import AboutPage from "./components/AboutPage"
import TermsPage from "./components/TermsPage"
import PrivacyPage from "./components/PrivacyPage"
import CookiesPage from "./components/CookiesPage"
import SitemapPage from "./components/SitemapPage"

import catalogData from "./data/data-katalog.json"

const queryClient = new QueryClient()

const HERO_CARS = [
  { id: "avanza", name: "Avanza" },
  { id: "inova", name: "Innova Reborn" },
  { id: "hiace", name: "Toyota HiAce" },
  { id: "calya", name: "Toyota Calya" },
  { id: "rush", name: "Toyota Rush" },
]

type PageRoute = "home" | "detail" | "booking" | "about" | "terms" | "privacy" | "cookies" | "sitemap"

function getPageFromPath(): PageRoute {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "")
  if (["about", "terms", "privacy", "cookies", "sitemap"].includes(path)) {
    return path as PageRoute
  }
  return "home"
}

function MainApp() {
  const [activeCarFilter, setActiveCarFilter] = React.useState<string>("avanza")
  const [searchFilter, setSearchFilter] = React.useState({
    location: "",
    date: "",
    carModel: "",
    pickupLocation: "",
  })

  const [viewPage, setViewPage] = React.useState<PageRoute>(() => getPageFromPath())
  const [selectedCar, setSelectedCar] = React.useState<CarItem | null>(null)

  const navigateTo = React.useCallback((page: PageRoute) => {
    setViewPage(page)
    const targetUrl = page === "home" ? "/" : `/${page}`
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, "", targetUrl)
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Listen to browser Back / Forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      setViewPage(getPageFromPath())
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
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
    setViewPage("detail")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleProceedToBooking = React.useCallback((car: CarItem) => {
    setSelectedCar(car)
    setViewPage("booking")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const brandName = "Puncak Drive"

  // Use TanStack Query to fetch catalog cars
  const { data: cars = [] } = useQuery<CarItem[]>({
    queryKey: ["carsCatalog"],
    queryFn: async () => {
      const rawDummy = catalogData.katalog.dummy

      const parsedCars: CarItem[] = Object.entries(rawDummy).map(([key, rawCar]: [string, any]) => {
        let capacity = "7"
        if (rawCar.capacity?.$value) {
          capacity = rawCar.capacity.$value
        } else if (key.toLowerCase() === "hiace") {
          capacity = "14-15"
        }

        let transmission = "Manual"
        if (rawCar.transmisi?.$value) {
          transmission = rawCar.transmisi.$value
        } else if (rawCar.tranmisi?.$value) {
          transmission = rawCar.tranmisi.$value
        } else if (key.toLowerCase() === "inova" || key.toLowerCase() === "avanza new") {
          transmission = "Otomatis"
        }

        let price = "400"
        if (rawCar.pirce?.$value) {
          price = rawCar.pirce.$value
        } else if (key.toLowerCase() === "avanza new") {
          price = "500"
        } else if (key.toLowerCase() === "hiace") {
          price = "800"
        } else if (key.toLowerCase() === "inova") {
          price = "700"
        } else if (key.toLowerCase() === "avanza") {
          price = "350"
        }

        let isPopular = false
        let rating = 4.8
        let totalRentals = 95
        let tag = "Armada Prima"

        const keyLower = key.toLowerCase()
        if (keyLower.includes("inova") || keyLower.includes("innova")) {
          isPopular = true
          rating = 4.9
          totalRentals = 148
          tag = "Terpopuler di Puncak"
        } else if (keyLower.includes("hiace")) {
          isPopular = true
          rating = 4.9
          totalRentals = 125
          tag = "Paling Laris Rombongan"
        } else if (keyLower.includes("avanza")) {
          isPopular = true
          rating = 4.8
          totalRentals = 192
          tag = "Favorit Keluarga"
        } else if (keyLower.includes("rush")) {
          rating = 4.7
          totalRentals = 84
          tag = "SUV Tangguh"
        } else if (keyLower.includes("calya")) {
          rating = 4.7
          totalRentals = 96
          tag = "Hemat & Nyaman"
        }

        return {
          id: key,
          name: rawCar.name?.$value || key,
          transmission,
          capacity,
          price,
          image: "",
          isPopular,
          rating,
          totalRentals,
          tag,
        }
      })

      return parsedCars
    },
    initialData: [],
  })

  const handleSearch = React.useCallback((searchParams: typeof searchFilter) => {
    setSearchFilter(searchParams)
    const catalogElement = document.getElementById("catalog")
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  if (viewPage === "about") {
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

  if (viewPage === "terms") {
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

  if (viewPage === "privacy") {
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

  if (viewPage === "cookies") {
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

  if (viewPage === "sitemap") {
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

  if (viewPage === "detail" && selectedCar) {
    return (
      <div className="dark min-h-screen bg-background text-foreground">
        <CarDetailPage
          car={selectedCar}
          onBack={() => {
            setViewPage("home")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          onProceedToBooking={(car) => {
            setSelectedCar(car)
            setViewPage("booking")
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      </div>
    )
  }

  if (viewPage === "booking" && selectedCar) {
    return (
      <div className="dark min-h-screen bg-background text-foreground">
        <BookingPage
          car={selectedCar}
          initialLocation={searchFilter.pickupLocation || searchFilter.location}
          initialDate={searchFilter.date ? new Date(searchFilter.date) : undefined}
          onBack={() => {
            setViewPage("detail")
            window.scrollTo({ top: 0, behavior: "smooth" })
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
      <MainApp />
    </QueryClientProvider>
  )
}
