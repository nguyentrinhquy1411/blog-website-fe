"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { postService } from "@/lib/post-service"
import { Post } from "@/lib/types"

export function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        // Get published posts, limit to 3 for featured section
        const posts = await postService.getPosts({
          published: true,
          limit: 3
        })
        setFeaturedPosts(posts)
      } catch (err: any) {
        console.error("Error fetching featured posts:", err)
        setError("Failed to load featured posts")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedPosts()
  }, [])

  if (isLoading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative h-48 bg-gray-200 animate-pulse"></div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-5 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="p-4 text-red-500 bg-red-50 rounded">{error}</div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPosts.map((post) => {
          // Get the first media item from the post to use as cover image
          const coverImage = post.media && post.media.length > 0 
            ? post.media[0].file_path 
            : post.cover_image || "/placeholder.jpg"
            
          return (
            <Card key={post.post_id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {post.categories && post.categories[0] && (
                      <Link
                        href={`/categories/${post.categories[0].slug}`}
                        className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-muted/80 transition-colors"
                      >
                        {post.categories[0].name}
                      </Link>
                    )}
                    <span className="text-xs text-muted-foreground">{formatDate(post.published_at || post.created_at)}</span>
                  </div>
                  <Link href={`/posts/${post.slug}`}>
                    <h3 className="font-bold hover:text-primary line-clamp-2">{post.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.summary}</p>
                  <div className="flex items-center pt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">By </span>
                      {post.author ? (
                        <Link href={`/profile/${post.author.username}`} className="font-medium hover:text-primary">
                          {post.author.full_name || post.author.username}
                        </Link>
                      ) : (
                        <span className="font-medium">Unknown Author</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
