import { FeaturedPosts } from "@/components/featured-posts"
import { RecentPosts } from "@/components/recent-posts"
import { CategoryList } from "@/components/category-list"
import Image from "next/image"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background image with overlay */}
          <div className="relative w-full h-[400px]">
            <Image 
              src="/placeholder.jpg" 
              alt="Blog Hero Background" 
              fill 
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          </div>
          
          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to BlogHub</h1>
              <h2 className="text-xl md:text-2xl font-medium mb-6">Discover stories, thinking, and expertise</h2>
              <p className="text-gray-100 mb-8">Explore thousands of articles on technology, science, culture, and more.</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm backdrop-blur-sm transition-colors">Technology</button>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm backdrop-blur-sm transition-colors">Science</button>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm backdrop-blur-sm transition-colors">Culture</button>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm backdrop-blur-sm transition-colors">Programming</button>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm backdrop-blur-sm transition-colors">Design</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedPosts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2">
          <RecentPosts />
        </div>
        <div className="space-y-8">
          <CategoryList />
        </div>
      </div>
    </div>
  )
}
