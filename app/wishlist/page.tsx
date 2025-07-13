"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

// Mock wishlist data
const mockWishlistItems = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 159900,
    originalPrice: 179900,
    image: "/placeholder.svg?height=300&width=300",
    discount: 11,
    inStock: true,
  },
  {
    id: "3",
    name: "Nike Air Max 270",
    price: 8995,
    originalPrice: 12995,
    image: "/placeholder.svg?height=300&width=300",
    discount: 31,
    inStock: true,
  },
  {
    id: "5",
    name: "MacBook Air M2",
    price: 114900,
    originalPrice: 119900,
    image: "/placeholder.svg?height=300&width=300",
    discount: 4,
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)
  const { dispatch } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const handleAddToCart = (item: (typeof mockWishlistItems)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    })
    alert(`${item.name} added to cart!`)
  }

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
    alert("Item removed from wishlist!")
  }

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      if (item.inStock) {
        dispatch({
          type: "ADD_ITEM",
          payload: {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
          },
        })
      }
    })
    alert("All available items added to cart!")
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save items you love to your wishlist and shop them later.
            </p>
            <Link href="/products">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
            <p className="text-gray-600 dark:text-gray-400">{wishlistItems.length} items saved</p>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleAddAllToCart} className="bg-orange-500 hover:bg-orange-600">
              Add All to Cart
            </Button>
            <Link href="/products">
              <Button variant="outline" className="bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </Link>
                  {item.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">{item.discount}% OFF</Badge>
                  )}
                  {!item.inStock && (
                    <Badge className="absolute top-2 right-2 bg-gray-500 text-white">Out of Stock</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(item.price)}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>

                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
