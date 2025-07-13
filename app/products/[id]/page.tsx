"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/cart-context"

// Mock product data - in real app, this would come from API
const product = {
  id: "1",
  name: "iPhone 15 Pro Max 256GB",
  price: 159900,
  originalPrice: 179900,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  rating: 4.8,
  reviews: 1250,
  discount: 11,
  category: "Electronics",
  brand: "Apple",
  inStock: true,
  stockCount: 15,
  description:
    "The iPhone 15 Pro Max features a titanium design, A17 Pro chip, and advanced camera system with 5x telephoto zoom.",
  features: [
    "A17 Pro chip with 6-core GPU",
    "6.7-inch Super Retina XDR display",
    "Pro camera system with 48MP main camera",
    "5x telephoto zoom",
    "Titanium design",
    "USB-C connector",
    "Face ID",
    "iOS 17",
  ],
  specifications: {
    Display: "6.7-inch Super Retina XDR",
    Chip: "A17 Pro",
    Storage: "256GB",
    Camera: "48MP + 12MP + 12MP",
    Battery: "Up to 29 hours video playback",
    Weight: "221 grams",
    Colors: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium",
  },
  variants: [
    { name: "128GB", price: 134900, originalPrice: 149900 },
    { name: "256GB", price: 159900, originalPrice: 179900 },
    { name: "512GB", price: 189900, originalPrice: 209900 },
    { name: "1TB", price: 219900, originalPrice: 239900 },
  ],
  colors: [
    { name: "Natural Titanium", value: "natural", color: "#8E8E93" },
    { name: "Blue Titanium", value: "blue", color: "#1E3A8A" },
    { name: "White Titanium", value: "white", color: "#F8F9FA" },
    { name: "Black Titanium", value: "black", color: "#1C1C1E" },
  ],
}

const reviews = [
  {
    id: 1,
    user: "Rahul Sharma",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent phone! The camera quality is outstanding and the titanium build feels premium.",
    helpful: 24,
  },
  {
    id: 2,
    user: "Priya Patel",
    rating: 4,
    date: "2024-01-10",
    comment: "Great performance and battery life. The 5x zoom is really impressive.",
    helpful: 18,
  },
  {
    id: 3,
    user: "Amit Kumar",
    rating: 5,
    date: "2024-01-08",
    comment: "Worth every penny! Fast delivery and genuine product.",
    helpful: 32,
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState("256GB")
  const [selectedColor, setSelectedColor] = useState("natural")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const selectedVariantData = product.variants.find((v) => v.name === selectedVariant)
  const currentPrice = selectedVariantData?.price || product.price
  const currentOriginalPrice = selectedVariantData?.originalPrice || product.originalPrice

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: `${product.id}-${selectedVariant}-${selectedColor}`,
          name: `${product.name} ${selectedVariant}`,
          price: currentPrice,
          image: product.images[0],
          variant: `${selectedVariant} - ${product.colors.find((c) => c.value === selectedColor)?.name}`,
        },
      })
    }
    alert(`${quantity} x ${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    // Add to cart first
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: `${product.id}-${selectedVariant}-${selectedColor}`,
          name: `${product.name} ${selectedVariant}`,
          price: currentPrice,
          image: product.images[0],
          variant: `${selectedVariant} - ${product.colors.find((c) => c.value === selectedColor)?.name}`,
        },
      })
    }
    // Navigate to checkout
    router.push("/checkout")
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    if (!isWishlisted) {
      alert("Added to wishlist!")
    } else {
      alert("Removed from wishlist!")
    }
  }

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Product link copied to clipboard!")
        })
        .catch(() => {
          alert("Unable to copy link. Please copy manually from address bar.")
        })
    } else {
      alert("Sharing not supported. Please copy the URL manually.")
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleReviewHelpful = (reviewId: number) => {
    alert("Thank you for your feedback!")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-orange-500" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(currentPrice)}</span>
                {currentOriginalPrice > currentPrice && (
                  <span className="text-xl text-gray-500 line-through">{formatPrice(currentOriginalPrice)}</span>
                )}
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Save {formatPrice(currentOriginalPrice - currentPrice)}
                </Badge>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>
            </div>

            {/* Storage Variants */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Storage</Label>
              <RadioGroup value={selectedVariant} onValueChange={setSelectedVariant}>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <div key={variant.name}>
                      <RadioGroupItem value={variant.name} id={variant.name} className="peer sr-only" />
                      <Label
                        htmlFor={variant.name}
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 cursor-pointer transition-all"
                      >
                        <span className="font-semibold">{variant.name}</span>
                        <span className="text-sm text-gray-600">{formatPrice(variant.price)}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Color Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Color</Label>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <div key={color.value}>
                      <RadioGroupItem value={color.value} id={color.value} className="peer sr-only" />
                      <Label
                        htmlFor={color.value}
                        className="flex items-center space-x-2 rounded-lg border-2 border-gray-200 bg-white p-3 hover:bg-gray-50 peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 cursor-pointer transition-all"
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.color }}
                        />
                        <span className="text-sm font-medium">{color.name}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Quantity */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Quantity</Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">({product.stockCount} available)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" onClick={handleWishlist}>
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button variant="outline" size="lg" className="w-full bg-transparent" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Truck className="h-6 w-6 text-orange-500" />
                <div>
                  <div className="font-semibold text-sm">Free Delivery</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">2-3 days</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <RotateCcw className="h-6 w-6 text-orange-500" />
                <div>
                  <div className="font-semibold text-sm">Easy Returns</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">30 days</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Shield className="h-6 w-6 text-orange-500" />
                <div>
                  <div className="font-semibold text-sm">Warranty</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">1 year</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                      >
                        <span className="font-medium">{key}</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{review.user}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{review.comment}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{review.helpful} people found this helpful</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReviewHelpful(review.id)}
                            className="text-orange-500 hover:text-orange-600"
                          >
                            Helpful
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
