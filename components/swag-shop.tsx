"use client"

import { useState } from "react"
import Image from "next/image"
import { products } from "@/lib/data"
import { ShoppingCart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SwagShop() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const categories = [
    { id: "all", name: "All Items" },
    { id: "apparel", name: "Apparel" },
    { id: "posters", name: "Art Prints" },
    { id: "3d-maps", name: "3D Maps" },
  ]

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-playfair text-xl font-bold">River Swag</h2>
          <div className="flex items-center text-sm text-[#8b5e3c]">
            <ShoppingCart size={16} className="mr-1" />
            <span>Support Local</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-[#8b5e3c] text-white"
                  : "bg-[#f4e9d4] text-[#3a2f1b] hover:bg-[#d9b382]"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative h-40 bg-[#f9f6f0]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-sm mb-1 line-clamp-1">{product.name}</h4>
              <p className="text-[#8b5e3c] font-bold">${product.price}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full text-xs border-[#d9b382] hover:bg-[#f4e9d4] text-[#3a2f1b] flex items-center justify-center gap-1"
                onClick={() => router.push(`/shop/${product.id}`)}
              >
                <span>View Details</span>
                <ExternalLink size={12} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-[#d9b382] bg-opacity-20 rounded-lg text-center">
        <p className="text-sm font-bold mb-1">Support Local River Conservation</p>
        <p className="text-xs">10% of all purchases go to Arkansas River conservation efforts.</p>
      </div>
    </div>
  )
}
