"use client"

import { useState, useEffect } from "react"
import { Playfair_Display, Source_Serif_4 } from "next/font/google"
import RiverMap from "@/components/river-map"
import RapidDrawer from "@/components/rapid-drawer"
import NavigationMenu from "@/components/navigation-menu"
import type { Rapid } from "@/lib/types"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
})

export default function Home() {
  const [rapids, setRapids] = useState<Rapid[]>([])
  const [selectedRapid, setSelectedRapid] = useState<Rapid | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("flow")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch rapids data with coordinates from API
    const fetchRapids = async () => {
      try {
        const response = await fetch("/api/rapids/coordinates")
        if (!response.ok) {
          throw new Error("Failed to fetch rapids")
        }
        const data = await response.json()
        setRapids(data)
      } catch (error) {
        console.error("Error fetching rapids:", error)
        // Fallback to regular rapids endpoint if coordinates endpoint fails
        try {
          const fallbackResponse = await fetch("/api/rapids")
          if (!fallbackResponse.ok) {
            throw new Error("Failed to fetch rapids from fallback")
          }
          const fallbackData = await fallbackResponse.json()
          setRapids(fallbackData)
        } catch (fallbackError) {
          console.error("Error fetching rapids from fallback:", fallbackError)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRapids()
  }, [])

  const handleRapidClick = (rapid: Rapid) => {
    setSelectedRapid(rapid)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <main
      className={`${playfair.variable} ${sourceSerif.variable} h-screen flex flex-col md:flex-row overflow-hidden bg-[#f4e9d4] text-[#3a2f1b]`}
    >
      {/* Left side - Navigation and content */}
      <div className="w-full md:w-auto flex flex-col h-full border-r border-[#d9b382] min-w-[400px] flex-grow">
        <div className="p-4 md:p-6 border-b border-[#d9b382]">
          <h1 className="font-playfair text-2xl md:text-3xl font-bold">Brown's Canyon</h1>
          <p className="font-source-serif text-sm md:text-base">Arkansas River, Colorado</p>
        </div>

        <NavigationMenu activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* Right side - Map */}
      <div className="relative w-[650px] h-full bg-[#e8d5b5] flex-shrink-0">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#e8d5b5]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#8b5e3c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-playfair">Loading map...</p>
            </div>
          </div>
        ) : (
          <RiverMap rapids={rapids} onRapidClick={handleRapidClick} />
        )}
      </div>

      {/* Rapid detail drawer */}
      <RapidDrawer rapid={selectedRapid} isOpen={isDrawerOpen} onClose={closeDrawer} />
    </main>
  )
}
