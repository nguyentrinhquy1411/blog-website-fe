"use client"

import { useState, useEffect } from "react"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { postService } from "@/lib/post-service"
import { Post } from "@/lib/types"

export function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        // Get the 5 most recent published posts
        const posts = await postService.getPosts({
          published: true,
          limit: 5
        })
        setRecentPosts(posts)
      } catch (err: any) {
        console.error("Error fetching recent posts:", err)
        setError("Failed to load recent posts")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentPosts()
  }, [])

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/search">View all</Link>
          </Button>
        </div>
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/search">View all</Link>
          </Button>
        </div>
        <div className="p-4 text-red-500 bg-red-50 rounded">{error}</div>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/search">View all</Link>
        </Button>
      </div>
      <div className="space-y-6">
        {recentPosts.map((post) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
    </section>
  )
}
