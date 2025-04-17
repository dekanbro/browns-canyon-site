import { NextResponse } from "next/server"
import { products } from "@/lib/data"

export async function GET(request: Request) {
  // Get the URL from the request
  const { searchParams } = new URL(request.url)

  // Check if a category filter was provided
  const category = searchParams.get("category")

  if (category && category !== "all") {
    // Filter products by category
    const filteredProducts = products.filter((product) => product.category === category)
    return NextResponse.json(filteredProducts)
  }

  // Return all products if no category filter
  return NextResponse.json(products)
}
