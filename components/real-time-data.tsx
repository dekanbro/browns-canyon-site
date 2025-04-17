"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Droplet, Thermometer, Clock, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

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

export default function RealTimeData() {
  const [flowData, setFlowData] = useState<FlowData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("24h")

  const fetchFlowData = async (period = "24h") => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/flow-data?period=${period}`)
      if (!response.ok) {
        throw new Error(`Error fetching flow data: ${response.status}`)
      }

      const data = await response.json()
      setFlowData(data)

      if (data.error) {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch flow data. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFlowData(timeRange)
  }, [timeRange])

  const handleRefresh = () => {
    fetchFlowData(timeRange)
  }

  // Determine flow status
  const getFlowStatus = (cfs: number) => {
    if (cfs < 700) return { text: "Low", color: "text-yellow-600" }
    if (cfs < 900) return { text: "Medium", color: "text-green-600" }
    if (cfs < 1200) return { text: "High", color: "text-blue-600" }
    return { text: "Very High", color: "text-red-600" }
  }

  const flowStatus = flowData ? getFlowStatus(flowData.currentFlow) : { text: "Unknown", color: "text-gray-600" }

  // Format the last updated time
  const formatLastUpdated = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr)
      return date.toLocaleString()
    } catch (e) {
      return dateTimeStr
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-playfair text-xl font-bold">Current River Conditions</h2>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          disabled={loading}
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4">
          <p className="font-bold">Error</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-1">Showing sample data instead.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Droplet className="text-[#4c837b] mr-2" size={20} />
            <h3 className="font-playfair font-bold">Current Flow</h3>
          </div>
          {loading ? (
            <Skeleton className="h-10 w-32 mb-2" />
          ) : (
            <>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold mr-2">{flowData?.currentFlow}</span>
                <span className="text-lg">CFS</span>
              </div>
              <div className={`mt-1 font-bold ${flowStatus.color}`}>{flowStatus.text}</div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center mb-2">
          <Clock className="text-[#4c837b] mr-2" size={20} />
          <h3 className="font-playfair font-bold">Last Updated</h3>
        </div>
        {loading ? (
          <Skeleton className="h-6 w-40 mb-2" />
        ) : (
          <div>
            <span className="text-sm">{flowData ? formatLastUpdated(flowData.lastUpdated) : ""}</span>
          </div>
        )}
        {flowData?.siteCode && (
          <a
            href={`https://waterdata.usgs.gov/nwis/uv?site_no=${flowData.siteCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-[#8b5e3c] hover:text-[#7a4e2c] font-bold text-sm flex items-center gap-1"
          >
            <span>View on USGS</span>
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-playfair font-bold text-lg">Flow History</h3>
          <div className="flex space-x-2">
            <Button
              variant={timeRange === "24h" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("24h")}
              className={timeRange === "24h" ? "bg-[#8b5e3c] hover:bg-[#7a4e2c]" : ""}
              disabled={loading}
            >
              24h
            </Button>
            <Button
              variant={timeRange === "7d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("7d")}
              className={timeRange === "7d" ? "bg-[#8b5e3c] hover:bg-[#7a4e2c]" : ""}
              disabled={loading}
            >
              7d
            </Button>
            <Button
              variant={timeRange === "30d" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("30d")}
              className={timeRange === "30d" ? "bg-[#8b5e3c] hover:bg-[#7a4e2c]" : ""}
              disabled={loading}
            >
              30d
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#8b5e3c] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={flowData?.flowHistory || []} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="time"
                  tickFormatter={(value, index) => {
                    // For 7d and 30d, show fewer labels
                    if (timeRange !== "24h") {
                      // Show every 6th label for 7d, every 24th for 30d
                      const skipFactor = timeRange === "7d" ? 6 : 24
                      return index % skipFactor === 0 ? value : ""
                    }
                    return value
                  }}
                />
                <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fdfaf6",
                    borderColor: "#d9b382",
                    fontFamily: "var(--font-source-serif)",
                  }}
                  formatter={(value: number) => [`${value} CFS`, "Flow"]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="cfs"
                  stroke="#4c837b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: "#8b5e3c" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="bg-[#d9b382] bg-opacity-20 p-4 rounded-lg">
        <h3 className="font-playfair font-bold mb-2">Recommended Flow Levels</h3>
        <ul className="space-y-2 font-source-serif">
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
            <span>
              <strong>400-700 CFS:</strong> Technical, good for beginners with guides
            </span>
          </li>
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
            <span>
              <strong>700-900 CFS:</strong> Optimal flow, balanced challenge and fun
            </span>
          </li>
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
            <span>
              <strong>900-1200 CFS:</strong> More challenging, bigger waves
            </span>
          </li>
          <li className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
            <span>
              <strong>1200+ CFS:</strong> High water, experienced paddlers only
            </span>
          </li>
        </ul>
      </div>

      {flowData?.siteName && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Data source: USGS {flowData.siteName} (Site {flowData.siteCode})
        </div>
      )}
    </div>
  )
}
