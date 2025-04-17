import { NextResponse } from "next/server"
import { rapids } from "@/lib/data"

export async function GET() {
  return NextResponse.json(rapids)
}
