"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { mockPosts } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [isLoading, user, router])

  // Get user's posts
  const userPosts = user ? mockPosts.filter((post) => post.author_id === user.user_id) : []

  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profile_picture || "/placeholder.svg"} alt={user.full_name} />
                <AvatarFallback>{user.full_name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">{user.full_name}</h1>
                <p className="text-gray-500 mb-2">@{user.username}</p>
                <p className="text-gray-600 mb-4">{user.bio || "No bio yet"}</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList className="mb-6">
            <TabsTrigger value="posts">Posts ({userPosts.length})</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            {userPosts.length > 0 ? (
              <div className="space-y-6">
                {userPosts.map((post) => (
                  <PostCard key={post.post_id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-4">You haven't published any posts yet.</p>
                <Button>Create your first post</Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="saved">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No saved posts</h3>
              <p className="text-gray-500">Posts you save will appear here.</p>
            </div>
          </TabsContent>
          <TabsContent value="comments">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No comments yet</h3>
              <p className="text-gray-500">Comments you make will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
