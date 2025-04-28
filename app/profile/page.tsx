"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/lib/api-service"
import { useToast } from "@/hooks/use-toast"
import { postService } from "@/lib/post-service"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    full_name: user?.full_name || ""
  })
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0
  })

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      const fetchStats = async () => {
        try {
          const userPosts = await postService.getPostsByAuthor(user.user_id)
          
          setStats({
            totalPosts: userPosts.length,
            publishedPosts: userPosts.filter(post => post.is_published).length,
            draftPosts: userPosts.filter(post => !post.is_published).length
          })
        } catch (error) {
          console.error("Failed to fetch user stats:", error)
        }
      }
      
      fetchStats()
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authService.updateUserProfile(formData)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        variant: "default"
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile.",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  if (!user) {
    return null // We'll redirect in the useEffect
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar_url || "/placeholder-user.jpg"} alt={user.username} />
                  <AvatarFallback>{user.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center">{user.username}</CardTitle>
                <CardDescription className="text-center">{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-2" asChild>
                <a href="/profile/settings">Edit Profile</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="w-full md:w-3/4">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="posts">My Posts</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="comments">My Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>My Published Posts</CardTitle>
                    <Button asChild>
                      <a href="/posts/create">Create New Post</a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <iframe src="/profile/posts" className="w-full min-h-[60vh] border-none"></iframe>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="drafts">
              <Card>
                <CardHeader>
                  <CardTitle>My Draft Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe src="/profile/drafts" className="w-full min-h-[60vh] border-none"></iframe>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <CardTitle>My Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe src="/profile/comments" className="w-full min-h-[60vh] border-none"></iframe>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-6">My Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <Button type="submit">Save Changes</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button 
                type="button" 
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Posts</CardTitle>
              <CardDescription>All your blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalPosts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Published</CardTitle>
              <CardDescription>Posts visible to readers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.publishedPosts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Drafts</CardTitle>
              <CardDescription>Posts not yet published</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.draftPosts}</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Link href="/profile/posts">
            <Button>Manage My Posts</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
