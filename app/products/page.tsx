"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star, Filter, Grid, List, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"

const products = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    price: 159900,
    originalPrice: 179900,
    image: "Apple IPhone 15 Pro Max Natural Titanium PNG.jpeg",
    rating: 4.8,
    reviews: 1250,
    discount: 11,
    category: "Electronics",
    brand: "Apple",
    inStock: true,
    description: "Latest iPhone with A17 Pro chip and titanium design",
  },
  {
    id: "2",
    name: "Samsung Galaxy Watch 6 Classic",
    price: 29999,
    originalPrice: 35999,
    image: "The Happy Shoppe's Amazon Page.jpeg",
    rating: 4.6,
    reviews: 890,
    discount: 17,
    category: "Electronics",
    brand: "Samsung",
    inStock: true,
    description: "Premium smartwatch with health monitoring",
  },
  {
    id: "3",
    name: "Nike Air Max 270 React",
    price: 8995,
    originalPrice: 12995,
    image: "Nike Air Max 270 React SE.jpeg",
    rating: 4.7,
    reviews: 2100,
    discount: 31,
    category: "Fashion",
    brand: "Nike",
    inStock: true,
    description: "Comfortable running shoes with React technology",
  },
  {
    id: "4",
    name: "Sony WH-1000XM5 Headphones",
    price: 24990,
    originalPrice: 29990,
    image: "Sony Noise Canceling Headphones Sony WH-1000XM6 Headphones.jpeg",
    rating: 4.9,
    reviews: 1580,
    discount: 17,
    category: "Electronics",
    brand: "Sony",
    inStock: true,
    description: "Industry-leading noise canceling headphones",
  },
  {
    id: "5",
    name: "MacBook Air M2 13-inch",
    price: 114900,
    originalPrice: 119900,
    image: "Buy APPLE MacBook Air 15.jpeg",
    rating: 4.8,
    reviews: 950,
    discount: 4,
    category: "Electronics",
    brand: "Apple",
    inStock: false,
    description: "Powerful laptop with M2 chip and all-day battery",
  },
  {
    id: "6",
    name: "Adidas Ultraboost 22 Running",
    price: 12999,
    originalPrice: 16999,
    image: "adidas Ultraboost 22 GTX.jpeg",
    rating: 4.5,
    reviews: 1200,
    discount: 24,
    category: "Fashion",
    brand: "Adidas",
    inStock: true,
    description: "Energy-returning running shoes for all distances",
  },
  {
    id: "7",
    name: "OnePlus 11 5G 128GB",
    price: 56999,
    originalPrice: 61999,
    image: "OnePlus United States - OnePlus (United States).jpeg",
    rating: 4.4,
    reviews: 850,
    discount: 8,
    category: "Electronics",
    brand: "OnePlus",
    inStock: true,
    description: "Flagship smartphone with Snapdragon 8 Gen 2",
  },
  {
    id: "8",
    name: "Levi's 511 Slim Fit Jeans",
    price: 2999,
    originalPrice: 4999,
    image: "Levi's Men's 511 Slim Fit Stretch Jeans.jpeg",
    rating: 4.3,
    reviews: 1800,
    discount: 40,
    category: "Fashion",
    brand: "Levi's",
    inStock: true,
    description: "Classic slim fit jeans in premium denim",
  },
]

const categories = ["All", "Electronics", "Fashion", "Home", "Books", "Sports"]
const brands = ["All", "Apple", "Samsung", "Nike", "Sony", "Adidas", "OnePlus", "Levi's"]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [searchQuery, setSearchQuery] = useState("")
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  const { dispatch } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Handle URL parameters
  useEffect(() => {
    const urlSearch = searchParams.get("search")
    const urlCategory = searchParams.get("category")
    const urlSort = searchParams.get("sort")

    if (urlSearch) {
      setSearchQuery(urlSearch)
    }
    if (urlCategory) {
      setSelectedCategory(urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1))
    }
    if (urlSort) {
      setSortBy(urlSort)
    }
  }, [searchParams])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price)
  }

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStock = !showInStockOnly || product.inStock

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch && matchesStock
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount)
        break
      default:
        // Keep original order for 'featured'
        break
    }

    return filtered
  }, [selectedCategory, selectedBrands, priceRange, searchQuery, showInStockOnly, sortBy])

  const handleAddToCart = (product: (typeof products)[0]) => {
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

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory("All")
    setSelectedBrands([])
    setPriceRange([0, 200000])
    setSearchQuery("")
    setShowInStockOnly(false)
    setSortBy("featured")
    router.push("/products")
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Clear Filters */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-orange-500">
          Clear All
        </Button>
      </div>

      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium">
          Search Products
        </Label>
        <Input
          id="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-1"
        />
      </div>

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium">Categories</Label>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
              />
              <Label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <Label className="text-sm font-medium">Brands</Label>
        <div className="mt-2 space-y-2">
          {brands
            .filter((brand) => brand !== "All")
            .map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <Label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </Label>
              </div>
            ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium">Price Range</Label>
        <div className="mt-2 space-y-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200000}
            min={0}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="flex items-center space-x-2">
        <Checkbox id="inStock" checked={showInStockOnly} onCheckedChange={setShowInStockOnly} />
        <Label htmlFor="inStock" className="text-sm cursor-pointer">
          In Stock Only
        </Label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length} of {products.length} products
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="discount">Best Discount</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter products by category, brand, price and more</SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6">
              <FilterSidebar />
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
                        {product.discount > 0 && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">{product.discount}% OFF</Badge>
                        )}
                        {!product.inStock && (
                          <Badge className="absolute top-2 right-2 bg-gray-500 text-white">Out of Stock</Badge>
                        )}
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
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <Button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="relative w-48 h-48 flex-shrink-0">
                          <Link href={`/products/${product.id}`}>
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          {product.discount > 0 && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                              {product.discount}% OFF
                            </Badge>
                          )}
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <Link href={`/products/${product.id}`}>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-orange-500 transition-colors">
                                  {product.name}
                                </h3>
                              </Link>

                              <p className="text-gray-600 dark:text-gray-400 mb-3">{product.description}</p>

                              <div className="flex items-center mb-3">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                                    {product.rating} ({product.reviews} reviews)
                                  </span>
                                </div>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</span>
                              </div>

                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {formatPrice(product.price)}
                                  </span>
                                  {product.originalPrice > product.price && (
                                    <span className="text-lg text-gray-500 line-through">
                                      {formatPrice(product.originalPrice)}
                                    </span>
                                  )}
                                </div>
                                {!product.inStock && <Badge className="bg-gray-500 text-white">Out of Stock</Badge>}
                              </div>
                            </div>

                            <div className="flex flex-col space-y-2 ml-6">
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`${wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"} hover:text-red-500`}
                                onClick={() => handleWishlist(product.id)}
                              >
                                <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                              </Button>
                              <Button
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6"
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.inStock}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters} className="bg-orange-500 hover:bg-orange-600">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
