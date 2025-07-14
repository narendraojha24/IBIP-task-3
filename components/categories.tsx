"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { id: 1, name: "Electronics", image: "electronics.jpeg", count: "10,000+ items" },
  { id: 2, name: "Fashion", image: "fashion.jpeg", count: "25,000+ items" },
  { id: 3, name: "Home & Kitchen", image: "home & kitchen.jpeg", count: "15,000+ items" },
  { id: 4, name: "Books", image: "books.jpeg", count: "50,000+ items" },
  { id: 6, name: "Beauty", image: "beauty.jpeg", count: "12,000+ items" },
  { id: 5, name: "Sports", image: "sports.jpeg", count: "8,000+ items" },
  { id: 7, name: "Toys", image: "toys.jpeg", count: "5,000+ items" },
  { id: 8, name: "Automotive", image: "automotive.jpeg", count: "7,000+ items" },
]

export default function Categories() {
  const router = useRouter()

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/products?category=${categoryName.toLowerCase()}`)
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
          <p className="text-gray-600 dark:text-gray-400">Discover amazing products across all categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <button key={category.id} onClick={() => handleCategoryClick(category.name)} className="w-full">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-0 bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4 text-center">
                  <div className="relative mb-3">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={80}
                      height={80}
                      className="mx-auto rounded-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{category.count}</p>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
