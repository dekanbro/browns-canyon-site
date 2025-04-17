// USGS API utilities and types

export interface USGSTimeSeriesResponse {
  value: {
    timeSeries: {
      sourceInfo: {
        siteName: string
        siteCode: {
          value: string
          network: string
          agencyCode: string
        }[]
      }
      variable: {
        variableName: string
        variableDescription: string
        unit: {
          unitCode: string
        }
      }
      values: {
        value: {
          value: string
          dateTime: string
          qualifiers: string[]
        }[]
      }[]
    }[]
  }
}

export interface ProcessedFlowData {
  siteName: string
  siteCode: string
  currentFlow: number
  lastUpdated: string
  unit: string
  flowHistory: {
    time: string
    cfs: number
    dateTime: string
  }[]
}

// Arkansas River near Nathrop, CO - Site 07091200
// This is the USGS station for Brown's Canyon
export const BROWNS_CANYON_SITE_CODE = "07091200"

// Format the date for USGS API
export function formatDateForUSGS(date: Date): string {
  return date.toISOString().split(".")[0] + "Z"
}

// Process the USGS response into a more usable format
export function processUSGSResponse(data: USGSTimeSeriesResponse): ProcessedFlowData | null {
  try {
    const timeSeries = data.value.timeSeries[0]
    if (!timeSeries) return null

    const siteName = timeSeries.sourceInfo.siteName
    const siteCode = timeSeries.sourceInfo.siteCode[0]?.value || ""
    const unit = timeSeries.variable.unit.unitCode

    const values = timeSeries.values[0]?.value || []

    // Sort values by date (newest first)
    const sortedValues = [...values].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())

    // Get the most recent flow value
    const currentFlow = sortedValues.length > 0 ? Number.parseFloat(sortedValues[0].value) : 0
    const lastUpdated = sortedValues.length > 0 ? sortedValues[0].dateTime : ""

    // Format the flow history data
    const flowHistory = sortedValues
      .map((item) => ({
        time: new Date(item.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        cfs: Number.parseFloat(item.value),
        dateTime: item.dateTime,
      }))
      .reverse() // Reverse to get chronological order

    return {
      siteName,
      siteCode,
      currentFlow,
      lastUpdated,
      unit,
      flowHistory,
    }
  } catch (error) {
    console.error("Error processing USGS data:", error)
    return null
  }
}

// Get the water temperature from a separate parameter code
export async function fetchWaterTemperature(siteCode: string): Promise<number | null> {
  try {
    // Parameter 00010 is water temperature
    const endDate = new Date()
    const startDate = new Date()
    startDate.setHours(startDate.getHours() - 2) // Get last 2 hours of data

    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteCode}&parameterCd=00010&startDT=${formatDateForUSGS(startDate)}&endDT=${formatDateForUSGS(endDate)}`
    
    console.log("Fetching water temperature from:", url)

    const response = await fetch(url)
    if (!response.ok) {
      console.error("USGS API error:", response.status, response.statusText)
      throw new Error(`USGS API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("USGS temperature response:", JSON.stringify(data, null, 2))

    const values = data.value.timeSeries[0]?.values[0]?.value || []
    console.log("Temperature values found:", values.length)

    if (values.length > 0) {
      // Get the most recent temperature value (in Celsius)
      const tempC = Number.parseFloat(values[values.length - 1].value)
      // Convert to Fahrenheit
      const tempF = (tempC * 9) / 5 + 32
      const roundedTemp = Math.round(tempF * 10) / 10 // Round to 1 decimal place
      console.log("Temperature calculated:", { tempC, tempF, roundedTemp })
      return roundedTemp
    }

    console.log("No temperature values found in response")
    return null
  } catch (error) {
    console.error("Error fetching water temperature:", error)
    return null
  }
}
