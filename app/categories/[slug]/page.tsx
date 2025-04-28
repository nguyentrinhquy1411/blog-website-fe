"use client"

import { useState, useEffect } from "react"
import { PostCard } from "@/components/post-card"
import { notFound } from "next/navigation"
import Link from "next/link"
import { categoryService } from "@/lib/category-service"
import { postService } from "@/lib/post-service"
import { Category, Post } from "@/lib/types"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<Category | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategoryAndPosts() {
      try {
        // First fetch the category by slug
        const categories = await categoryService.getCategories()
        const foundCategory = categories.find(cat => cat.slug === params.slug)
        
        if (!foundCategory) {
          setError("Category not found")
          setIsLoading(false)
          return
        }
        
        setCategory(foundCategory)
        
        // Then fetch posts for this category
        const categoryPosts = await postService.getPosts({
          categoryId: foundCategory.category_id,
          published: true
        })
        
        setPosts(categoryPosts)
      } catch (err) {
        console.error("Error fetching category data:", err)
        setError("Failed to load category data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategoryAndPosts()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-6 bg-gray-200 rounded w-24 mb-8 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-8 animate-pulse"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>
          <div className="p-4 text-red-500 bg-red-50 rounded">
            {error || "Category not found"}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-muted-foreground">{category.description || `Posts in the ${category.name} category`}</p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h3 className="text-lg font-medium mb-2">No posts in this category</h3>
            <p className="text-muted-foreground">There are currently no posts in the {category.name} category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
