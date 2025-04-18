"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { products } from "@/lib/data"
import { useRouter } from "next/navigation"

interface ProductDetailProps {
  productId: number
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const router = useRouter()
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="p-4 text-center">
        <p>Product not found</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Shop
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Shop
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-[300px] md:h-[400px] bg-[#f9f6f0] rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-4">
          <h1 className="font-playfair text-2xl font-bold">{product.name}</h1>
          <p className="text-[#8b5e3c] text-xl font-bold">${product.price}</p>
          <p className="text-[#3a2f1b]">{product.description}</p>
          
          <div className="pt-4">
            <Button
              className="w-full bg-[#8b5e3c] hover:bg-[#6b4a2c] text-white"
              size="lg"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </Button>
          </div>

          <div className="mt-6 p-4 bg-[#d9b382] bg-opacity-20 rounded-lg">
            <p className="text-sm font-bold mb-1">Support Local River Conservation</p>
            <p className="text-xs">10% of all purchases go to Arkansas River conservation efforts.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 