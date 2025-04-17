"use client"

import { useState } from "react"
import { Map, Droplet, Calendar, ShoppingCart, BookOpen, Menu, X } from "lucide-react"
import RealTimeData from "@/components/real-time-data"
import LocalCalendar from "@/components/local-calendar"
import GuideStories from "@/components/guide-stories"
import SwagShop from "@/components/swag-shop"
import RiverMap from "@/components/river-map"
import type { Rapid } from "@/lib/types"

interface NavigationMenuProps {
  activeSection: string
  setActiveSection: (section: string) => void
  rapids: Rapid[]
  onRapidClick: (rapid: Rapid) => void
}

export default function NavigationMenu({ 
  activeSection, 
  setActiveSection,
  rapids,
  onRapidClick
}: NavigationMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "flow", label: "River Flow", icon: <Droplet size={20} /> },
    { id: "map", label: "Map", icon: <Map size={20} />, mobileOnly: true },
    { id: "stories", label: "Guide Stories", icon: <BookOpen size={20} /> },
    { id: "calendar", label: "Events", icon: <Calendar size={20} /> },
    { id: "shop", label: "Canyon Swag", icon: <ShoppingCart size={20} /> },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
        <button onClick={toggleMobileMenu} className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md text-[#3a2f1b] hover:text-[#8b5e3c] transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation menu */}
      <div
        className={`
          md:block w-full
          ${isMobileMenuOpen ? "block" : "hidden"}
          fixed md:static top-16 left-4 right-4 md:left-0 md:right-0 bg-white/95 backdrop-blur-sm md:bg-[#f4e9d4] rounded-lg md:rounded-none shadow-lg md:shadow-none z-40
        `}
      >
        <div className="md:hidden p-4 border-b border-[#d9b382]">
          <h2 className="font-playfair text-lg font-bold">Brown's Canyon</h2>
          <p className="font-source-serif text-sm text-[#3a2f1b]/80">Arkansas River, Colorado</p>
        </div>
        <nav className="border-b border-[#d9b382]">
          <ul>
            {menuItems.map((item) => (
              item.mobileOnly ? (
                <li key={item.id} className="md:hidden">
                  <button
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`
                      w-full flex items-center px-6 py-3 text-left
                      ${activeSection === item.id ? "bg-[#d9b382] bg-opacity-30 font-bold" : "hover:bg-[#d9b382] hover:bg-opacity-20"}
                      transition-colors
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ) : (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveSection(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`
                      w-full flex items-center px-6 py-3 text-left
                      ${activeSection === item.id ? "bg-[#d9b382] bg-opacity-30 font-bold" : "hover:bg-[#d9b382] hover:bg-opacity-20"}
                      transition-colors
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              )
            ))}
          </ul>
        </nav>
      </div>

      {/* Content area */}
      <div className={`flex-grow ${activeSection === "map" ? "md:block hidden" : ""}`}>
        {activeSection !== "map" && (
          <div className="h-full overflow-y-auto pt-16 md:pt-6">
            <div className="p-4 md:p-6">
              {activeSection === "flow" && <RealTimeData />}
              {activeSection === "stories" && <GuideStories />}
              {activeSection === "calendar" && <LocalCalendar />}
              {activeSection === "shop" && <SwagShop />}
            </div>
          </div>
        )}
      </div>

      {/* Map view */}
      {activeSection === "map" && (
        <div className="fixed inset-0 z-30 md:static md:z-auto">
          <div className="h-full pt-16 md:pt-0">
            <RiverMap rapids={rapids} onRapidClick={onRapidClick} />
          </div>
        </div>
      )}
    </div>
  )
}
