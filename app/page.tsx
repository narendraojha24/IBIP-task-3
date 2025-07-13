import Hero from "@/components/hero"
import SearchBar from "@/components/search-bar"
import Categories from "@/components/categories"
import FeaturedProducts from "@/components/featured-products"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SearchBar />
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  )
}
