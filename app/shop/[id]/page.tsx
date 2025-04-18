import ProductDetail from "@/components/product-detail"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetail productId={parseInt(params.id)} />
} 