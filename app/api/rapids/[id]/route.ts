import { NextResponse } from "next/server"
import { rapids, conditionUpdates } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

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

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

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
