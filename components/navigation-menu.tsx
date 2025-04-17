"use client"

import { useState } from "react"
import { Map, Droplet, Calendar, ShoppingCart, BookOpen, Menu, X } from "lucide-react"
import RealTimeData from "@/components/real-time-data"
import LocalCalendar from "@/components/local-calendar"
import GuideStories from "@/components/guide-stories"
import SwagShop from "@/components/swag-shop"

interface NavigationMenuProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function NavigationMenu({ activeSection, setActiveSection }: NavigationMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "flow", label: "River Flow", icon: <Droplet size={20} /> },
    { id: "map", label: "Map", icon: <Map size={20} /> },
    { id: "stories", label: "Guide Stories", icon: <BookOpen size={20} /> },
    { id: "calendar", label: "Events", icon: <Calendar size={20} /> },
    { id: "shop", label: "Canyon Swag", icon: <ShoppingCart size={20} /> },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex justify-between items-center p-4 border-b border-[#d9b382]">
        <span className="font-playfair font-bold">{menuItems.find((item) => item.id === activeSection)?.label}</span>
        <button onClick={toggleMobileMenu} className="text-[#3a2f1b] hover:text-[#8b5e3c] transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation menu */}
      <div
        className={`
        md:block w-full
        ${isMobileMenuOpen ? "block" : "hidden"}
        md:static absolute left-0 right-0 bg-[#f4e9d4] z-20
      `}
      >
        <nav className="border-b border-[#d9b382]">
          <ul>
            {menuItems.map((item) => (
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
            ))}
          </ul>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 w-full">
        {activeSection === "flow" && <RealTimeData />}
        {activeSection === "stories" && <GuideStories />}
        {activeSection === "calendar" && <LocalCalendar />}
        {activeSection === "shop" && <SwagShop />}
        {activeSection === "map" && (
          <div className="h-full flex flex-col justify-center items-center text-center p-4">
            <h2 className="font-playfair text-xl font-bold mb-2">Brown's Canyon Map</h2>
            <p className="font-source-serif mb-4">Explore the rapids by clicking on the markers.</p>
            <div className="bg-[#d9b382] bg-opacity-30 p-4 rounded-lg">
              <p className="text-sm italic">
                The Arkansas River flows through Brown's Canyon, offering some of Colorado's best whitewater rafting
                experiences.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
