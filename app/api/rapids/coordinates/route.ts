import { NextResponse } from "next/server"
import { rapids } from "@/lib/data"

// This is a utility function to fetch and process the CSV data
async function fetchRapidCoordinates() {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brown_s_Canyon_Rapids__Full_List_%20%281%29-J0E60E4CLJctoB17WXCAWgqps8zTvO.csv",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch coordinates: ${response.status}`)
    }

    const csvText = await response.text()

    // Parse CSV (simple implementation)
    const rows = csvText.split("\n").filter((row) => row.trim() !== "")
    const headers = rows[0].split(",").map((header) => header.trim())

    const coordinates = rows.slice(1).map((row) => {
      const values = row.split(",").map((value) => value.trim())
      const record: Record<string, string | number> = {}

      headers.forEach((header, index) => {
        // Convert latitude and longitude to numbers
        if (header === "latitude" || header === "longitude") {
          record[header] = Number.parseFloat(values[index])
        } else {
          record[header] = values[index]
        }
      })

      return record
    })

    return coordinates
  } catch (error) {
    console.error("Error fetching rapid coordinates:", error)
    return []
  }
}

export async function GET() {
  const coordinates = await fetchRapidCoordinates()

  // Create a map of rapid names to coordinates
  const coordinatesMap = coordinates.reduce(
    (map, item) => {
      if (typeof item.name === "string" && typeof item.latitude === "number" && typeof item.longitude === "number") {
        map[item.name.toLowerCase().replace(/\s+/g, "-")] = {
          latitude: item.latitude,
          longitude: item.longitude,
        }
      }
      return map
    },
    {} as Record<string, { latitude: number; longitude: number }>,
  )

  // Add coordinates to rapids
  const rapidsWithCoordinates = rapids.map((rapid) => {
    // Try to find coordinates by name
    const rapidName = rapid.name.toLowerCase().replace(/\s+/g, "-")
    const coords = coordinatesMap[rapidName]

    if (coords) {
      return {
        ...rapid,
        coordinates: coords,
      }
    }

    return rapid
  })

  return NextResponse.json(rapidsWithCoordinates)
}
