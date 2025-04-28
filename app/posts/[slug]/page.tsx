"use client"

import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CommentSection } from "@/components/comment-section"
import { TagList } from "@/components/tag-list"
import { formatDate } from "@/lib/utils"
import { postService } from "@/lib/post-service"
import { Post } from "@/lib/types"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

export default function PostPage({ params }: { params: { slug: string } }) {
  const { user } = useAuth()
  // Remove the React.use call and use params directly
  const slug = params.slug
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await postService.getPostBySlug(slug)
        setPost(fetchedPost)
        setLikeCount(fetchedPost.likes || 0)
        
        // Check if post is already liked by user (this would need a backend endpoint)
        // For now we'll simulate this behavior
        setIsLiked(false)
      } catch (err: any) {
        console.error("Error fetching post:", err)
        setError("Failed to load post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const handleLikePost = async () => {
    if (!user) {
      // Would need proper toast notification here
      alert("Please log in to like posts")
      return
    }

    try {
      if (isLiked) {
        // Unlike post (this is a placeholder for the actual API call)
        // await postService.unlikePost(post!.post_id)
        setIsLiked(false)
        setLikeCount(prev => prev - 1)
      } else {
        // Like post (this is a placeholder for the actual API call)
        // await postService.likePost(post!.post_id)
        setIsLiked(true)
        setLikeCount(prev => prev + 1)
      }
    } catch (error) {
      console.error("Error updating like status:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-32 mb-8 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 animate-pulse"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-40 mb-1 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
          <div className="relative h-64 md:h-96 mb-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-4 text-red-500 bg-red-50 rounded">
            {error || "Post not found. Please try again later."}
          </div>
          <div className="mt-4">
            <Link href="/" className="text-primary hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Get the first media item from the post to use as cover image
  const coverImage = post.media && post.media.length > 0 
    ? post.media[0].file_path 
    : post.cover_image || null

  // Parse HTML content if available, otherwise use plain text
  const renderContent = () => {
    // If content contains HTML tags, render as HTML
    if (post.content && /<\/?[a-z][\s\S]*>/i.test(post.content)) {
      return (
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )
    }
    
    // Otherwise render as plain text with paragraphs
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
        {post.content?.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>

        {/* User actions for post owner */}
        {user && post && post.author && user.user_id === post.author.user_id && (
          <div className="flex gap-2 mb-4 justify-end">
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <Link href={`/posts/edit/${post.post_id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                </svg>
                Edit Post
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
                  try {
                    await postService.deletePost(post.post_id);
                    window.location.href = "/profile/posts";
                  } catch (error) {
                    console.error("Error deleting post:", error);
                    alert("Failed to delete post. Please try again.");
                  }
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              Delete
            </Button>
          </div>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map(category => (
              <Link
                key={category.category_id}
                href={`/categories/${category.slug}`}
                className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        {/* Author info */}
        <div className="flex items-center mb-6">
          <Avatar className="h-10 w-10 mr-3">
            {post.author && (
              <>
                <AvatarImage 
                  src={post.author.profile_picture || "/placeholder-user.jpg"} 
                  alt={post.author.full_name || post.author.username}
                />
                <AvatarFallback>
                  {post.author.full_name 
                    ? post.author.full_name.substring(0, 2).toUpperCase() 
                    : post.author.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{post.author?.full_name || post.author?.username}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.published_at || post.created_at)} · {post.reading_time || "5 min read"}
            </p>
          </div>
        </div>

        {/* Featured image */}
        {coverImage && (
          <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}

        {/* Additional media gallery */}
        {post.media && post.media.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {post.media.slice(1).map((media, index) => (
              <div key={media.media_id} className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={media.file_path}
                  alt={`${post.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* Post content */}
        {renderContent()}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <TagList tags={post.tags} />
        )}

        <Separator className="my-8" />

        {/* Engagement buttons */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant={isLiked ? "default" : "ghost"} 
              size="sm" 
              className="mr-2"
              onClick={handleLikePost}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              {likeCount}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                const commentSection = document.getElementById('comments-section')
                if (commentSection) {
                  commentSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg>
              {post.comments?.length || 0}
            </Button>
          </div>
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert("Link copied to clipboard!")
                // Ideally use a toast notification here
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
              Save
            </Button>
          </div>
        </div>

        {/* Author card */}
        {post.author && (
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage 
                  src={post.author.profile_picture || "/placeholder-user.jpg"} 
                  alt={post.author.full_name || post.author.username}
                />
                <AvatarFallback>
                  {post.author.full_name 
                    ? post.author.full_name.substring(0, 2).toUpperCase() 
                    : post.author.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-lg">{post.author.full_name || post.author.username}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.author.bio || "No bio available"}</p>
                <div className="flex justify-center md:justify-start gap-2">
                  <Button className="w-full md:w-auto">Follow</Button>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Link href={`/profile/${post.author.username}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Comments section */}
        <div id="comments-section">
          <CommentSection postId={post.post_id} />
        </div>
      </div>
    </div>
  )
}
