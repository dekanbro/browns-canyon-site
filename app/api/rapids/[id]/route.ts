import { NextResponse } from "next/server"
import { rapids, conditionUpdates } from "@/lib/data"
import { NextRequest } from "next/server"

type RouteContext = {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params

  // Find the rapid by ID
  const rapid = rapids.find((r) => r.id === id)

  if (!rapid) {
    return NextResponse.json({ error: "Rapid not found" }, { status: 404 })
  }

  // Get condition updates for this rapid if they exist
  const updates = conditionUpdates[id] || []

  // Return the rapid with its updates
  return NextResponse.json({
    ...rapid,
    updates,
  })
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params

  // Check if the rapid exists
  const rapid = rapids.find((r) => r.id === id)

  if (!rapid) {
    return NextResponse.json({ error: "Rapid not found" }, { status: 404 })
  }

  try {
    // Get the update data from the request
    const data = await request.json()

    // In a real app, we would validate the data and save it to a database
    // For now, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "Update submitted successfully",
      data,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
  }
}
