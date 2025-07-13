"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

const featuredProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 159900,
    originalPrice: 179900,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 1250,
    discount: 11,
    category: "Electronics",
  },
  {
    id: "2",
    name: "Samsung Galaxy Watch 6",
    price: 29999,
    originalPrice: 35999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 890,
    discount: 17,
    category: "Electronics",
  },
  {
    id: "3",
    name: "Nike Air Max 270",
    price: 8995,
    originalPrice: 12995,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 2100,
    discount: 31,
    category: "Fashion",
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    price: 24990,
    originalPrice: 29990,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 1580,
    discount: 17,
    category: "Electronics",
  },
  {
    id: "5",
    name: "MacBook Air M2",
    price: 114900,
    originalPrice: 119900,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 950,
    discount: 4,
    category: "Electronics",
  },
  {
    id: "6",
    name: "Adidas Ultraboost 22",
    price: 12999,
    originalPrice: 16999,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 1200,
    discount: 24,
    category: "Fashion",
  },
]

export default function FeaturedProducts() {
  const { dispatch } = useCart()
  const router = useRouter()
  const [wishlist, setWishlist] = useState<string[]>([])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    })

    alert(`${product.name} added to cart!`)
  }

  const handleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category.toLowerCase()}`)
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trending Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Best deals on top-rated products</p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">{product.discount}% OFF</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                      wishlist.includes(product.id) ? "text-red-500" : "text-gray-600"
                    }`}
                    onClick={() => handleWishlist(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>

                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                    </div>

                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Deals Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Best Deals</h2>
            <p className="text-gray-600 dark:text-gray-400">Limited time offers you can't miss</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button onClick={() => handleCategoryClick("Electronics")} className="w-full">
              <Card className="gradient-orange text-white overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-left">
                      <h3 className="text-xl font-bold mb-2">Electronics Sale</h3>
                      <p className="text-orange-100">Up to 70% off on gadgets</p>
                    </div>
                    <Badge className="bg-white text-orange-500">Hot</Badge>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Shop Electronics
                  </Button>
                </CardContent>
              </Card>
            </button>

            <button onClick={() => handleCategoryClick("Fashion")} className="w-full">
              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-left">
                      <h3 className="text-xl font-bold mb-2">Fashion Week</h3>
                      <p className="text-purple-100">Trendy clothes & accessories</p>
                    </div>
                    <Badge className="bg-white text-purple-500">New</Badge>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Shop Fashion
                  </Button>
                </CardContent>
              </Card>
            </button>

            <button onClick={() => handleCategoryClick("Home")} className="w-full">
              <Card className="bg-gradient-to-br from-green-500 to-blue-500 text-white overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-left">
                      <h3 className="text-xl font-bold mb-2">Home Essentials</h3>
                      <p className="text-green-100">Everything for your home</p>
                    </div>
                    <Badge className="bg-white text-green-500">Sale</Badge>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Shop Home
                  </Button>
                </CardContent>
              </Card>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
