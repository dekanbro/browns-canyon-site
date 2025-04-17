import { NextResponse } from "next/server"
import { guideStories } from "@/lib/data"

export async function GET() {
  return NextResponse.json(guideStories)
}
