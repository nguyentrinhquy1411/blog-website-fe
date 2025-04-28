"use client"

import { FeaturedPosts } from "@/components/featured-posts"
import { RecentPosts } from "@/components/recent-posts"
import { CategoryList } from "@/components/category-list"
import { useState, useEffect } from "react"
import { categoryService } from "@/lib/category-service"
import { Category } from "@/lib/types"
import Image from "next/image"
import Link from "next/link"

// Array of blog-related stock images that match the website theme
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?q=80&w=1920&auto=format&fit=crop"
];

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [heroImage, setHeroImage] = useState<string>("/placeholder.jpg")

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await categoryService.getCategories({ limit: 5 })
        setCategories(data)
        
        // Pick a random hero image
        const randomImageIndex = Math.floor(Math.random() * HERO_IMAGES.length);
        setHeroImage(HERO_IMAGES[randomImageIndex]);
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background image with overlay */}
          <div className="relative w-full h-[400px]">
            <Image 
              src={heroImage}
              alt="Blog Hero Background" 
              fill 
              className="object-cover opacity-80"
              sizes="(max-width: 1200px) 100vw, 1200px"
              quality={85}
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
                {isLoading ? (
                  // Skeleton loading for categories
                  <>
                    {[...Array(5)].map((_, index) => (
                      <div 
                        key={index} 
                        className="h-8 w-24 bg-white/10 animate-pulse rounded-full"
                      />
                    ))}
                  </>
                ) : (
                  // Actual categories from API
                  <>
                    {categories.map((category) => (
                      <Link 
                        key={category.category_id} 
                        href={`/categories/${category.slug}`}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm backdrop-blur-sm transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </>
                )}
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
