"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Globe } from "lucide-react"
import type { Rapid } from "@/lib/types"
import { generateAllRapidsGoogleEarthUrl } from "@/lib/google-earth"

interface RiverMapProps {
  rapids: Rapid[]
  onRapidClick: (rapid: Rapid) => void
}

interface FlowData {
  siteName: string
  siteCode: string
  currentFlow: number
  waterTemp: number | null
  lastUpdated: string
  unit: string
  flowHistory: {
    time: string
    cfs: number
    dateTime: string
  }[]
  period: string
  error?: string
}

export default function RiverMap({ rapids, onRapidClick }: RiverMapProps) {
  const [hoveredRapid, setHoveredRapid] = useState<string | null>(null)
  const [flowData, setFlowData] = useState<FlowData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlowData = async () => {
      try {
        const response = await fetch('/api/flow-data?period=24h')
        if (!response.ok) {
          throw new Error('Failed to fetch flow data')
        }
        const data = await response.json()
        setFlowData(data)
      } catch (error) {
        console.error('Error fetching flow data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFlowData()
  }, [])

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full overflow-y-auto">
        {/* Map image */}
        <div className="relative w-[1000px] h-[1500px] translate-x-[-35%] translate-y-[0%]">
          <Image
            src="/images/browns-canyon-map.png"
            alt="Brown's Canyon Topographic Map"
            fill
            className="object-cover"
            priority
            sizes="1000px"
          />
        </div>

        {/* Rapids markers */}
        <div className="absolute inset-0 w-[1000px] h-[1500px] translate-x-[-35%] translate-y-[0%]">
          {rapids.map((rapid) => (
            <button
              key={rapid.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
              style={{
                left: `${rapid.position.x}%`,
                top: `${rapid.position.y}%`,
              }}
              onClick={() => onRapidClick(rapid)}
              onMouseEnter={() => setHoveredRapid(rapid.id)}
              onMouseLeave={() => setHoveredRapid(null)}
              aria-label={`${rapid.name} Rapid, Class ${rapid.class}`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center
                    ${
                      rapid.class.includes("IV")
                        ? "bg-[#ad2e24]"
                        : rapid.class.includes("III")
                          ? "bg-[#8b5e3c]"
                          : "bg-[#4c837b]"
                    }
                    text-white shadow-md transition-transform duration-200
                    ${hoveredRapid === rapid.id ? "scale-125" : ""}
                    group-hover:scale-110 group-focus:scale-110
                  `}
                >
                  <MapPin size={rapid.class.includes("IV") ? 18 : 16} />
                </div>
                <div
                  className={`
                    absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm text-xs font-bold 
                    whitespace-nowrap transition-opacity duration-200
                    ${hoveredRapid === rapid.id ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus:opacity-100"}
                  `}
                >
                  {rapid.name} (Class {rapid.class})
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed Controls Container */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#e8d5b5] to-transparent h-48 pointer-events-none" />

      {/* Current Flow Display */}
      <div className="absolute bottom-40 right-4 bg-white/90 p-4 md:p-8 rounded-lg shadow-lg z-10">
        <div className="text-center">
          <div className="text-sm md:text-lg text-gray-600 mb-1 md:mb-2">Current Flow</div>
          <div className="text-3xl md:text-7xl font-bold text-[#4c837b]">{flowData?.currentFlow || '--'}</div>
          <div className="text-lg md:text-3xl text-gray-600">CFS</div>
        </div>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md text-sm">
        <h3 className="font-playfair font-bold mb-2">Legend</h3>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-[#4c837b] mr-2"></div>
          <span>Class II Rapid</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 rounded-full bg-[#8b5e3c] mr-2"></div>
          <span>Class III Rapid</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-[#ad2e24] mr-2"></div>
          <span>Class IV Rapid</span>
        </div>
      </div>

      {/* Google Earth button */}
      <div className="absolute top-4 right-4 z-10">
        <a
          href={generateAllRapidsGoogleEarthUrl(rapids)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white transition-colors text-[#3a2f1b] font-bold"
          aria-label="View in Google Earth"
        >
          <Globe className="text-[#4c837b]" size={20} />
          <span>View in Google Earth</span>
        </a>
      </div>
    </div>
  )
}
