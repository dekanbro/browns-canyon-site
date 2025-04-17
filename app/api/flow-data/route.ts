import { NextResponse } from "next/server"
import { BROWNS_CANYON_SITE_CODE, formatDateForUSGS, processUSGSResponse, fetchWaterTemperature } from "@/lib/usgs"

export async function GET(request: Request) {
  try {
    // Get the URL parameters
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "24h"

    // Calculate the start date based on the period
    const endDate = new Date()
    const startDate = new Date()

    switch (period) {
      case "7d":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "30d":
        startDate.setDate(startDate.getDate() - 30)
        break
      case "24h":
      default:
        startDate.setDate(startDate.getDate() - 1)
        break
    }

    // Format dates for the USGS API
    const startDateStr = formatDateForUSGS(startDate)
    const endDateStr = formatDateForUSGS(endDate)

    // Build the USGS API URL for discharge data (parameter 00060)
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${BROWNS_CANYON_SITE_CODE}&parameterCd=00060&startDT=${startDateStr}&endDT=${endDateStr}`

    // Fetch the flow data
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`USGS API error: ${response.status}`)
    }

    const data = await response.json()
    const processedData = processUSGSResponse(data)

    if (!processedData) {
      throw new Error("Failed to process USGS data")
    }

    // Fetch water temperature in parallel
    const waterTemp = await fetchWaterTemperature(BROWNS_CANYON_SITE_CODE)

    // Return the combined data
    return NextResponse.json({
      ...processedData,
      waterTemp,
      period,
    })
  } catch (error) {
    console.error("Error fetching flow data:", error)

    // Return a fallback response with sample data
    return NextResponse.json(
      {
        error: "Failed to fetch real-time data from USGS",
        siteName: "Arkansas River near Nathrop, CO",
        siteCode: BROWNS_CANYON_SITE_CODE,
        currentFlow: 950,
        waterTemp: 52,
        lastUpdated: new Date().toISOString(),
        unit: "ft3/s",
        flowHistory: [
          { time: "00:00", cfs: 850, dateTime: new Date().toISOString() },
          { time: "02:00", cfs: 830, dateTime: new Date().toISOString() },
          { time: "04:00", cfs: 820, dateTime: new Date().toISOString() },
          { time: "06:00", cfs: 800, dateTime: new Date().toISOString() },
          { time: "08:00", cfs: 810, dateTime: new Date().toISOString() },
          { time: "10:00", cfs: 840, dateTime: new Date().toISOString() },
          { time: "12:00", cfs: 900, dateTime: new Date().toISOString() },
          { time: "14:00", cfs: 950, dateTime: new Date().toISOString() },
          { time: "16:00", cfs: 980, dateTime: new Date().toISOString() },
          { time: "18:00", cfs: 1000, dateTime: new Date().toISOString() },
          { time: "20:00", cfs: 980, dateTime: new Date().toISOString() },
          { time: "22:00", cfs: 920, dateTime: new Date().toISOString() },
        ],
        period,
      },
      { status: 200 },
    )
  }
}
