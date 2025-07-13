import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Big <span className="text-gradient">Billion</span> Days
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Unbelievable deals on your favorite products. Up to 80% off on electronics, fashion, and more!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
              >
                <Link href="/deals">View All Deals</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">10M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">99%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="big sale.jpeg"
                alt="Shopping deals"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg animate-pulse">
              80% OFF
            </div>
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Starting from</div>
              <div className="text-xl font-bold text-orange-500">₹99</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
