"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { postService } from "@/lib/post-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Post } from "@/lib/types"
import Link from "next/link"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MyPostsPage() {
  const { user, isLoading } = useAuth()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return
      try {
        const userPosts = await postService.getUserPosts(user.id)
        setPosts(userPosts)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
        toast({
          title: "Error",
          description: "Failed to load your posts. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setIsLoadingPosts(false)
      }
    }

    if (user) {
      fetchPosts()
    }
  }, [user, toast])

  const handleDeletePost = async () => {
    if (!postToDelete) return

    try {
      await postService.deletePost(postToDelete.id)
      setPosts(posts.filter(post => post.id !== postToDelete.id))
      toast({
        title: "Post deleted",
        description: "Your post has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive"
      })
    } finally {
      setPostToDelete(null)
    }
  }

  if (isLoading || isLoadingPosts) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="mb-4">You need to be logged in to view your posts.</p>
        <Link href="/auth/login">
          <Button>Log In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Posts</h2>
        <Link href="/posts/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-lg mb-4">You haven't created any posts yet.</p>
          <Link href="/posts/create">
            <Button>Create Your First Post</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.categories?.map(category => (
                    <Badge key={category.id} variant="outline">
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
                <div className="mt-2 text-sm text-muted-foreground">
                  {post.published ? (
                    <Badge variant="default" className="bg-green-500">Published</Badge>
                  ) : (
                    <Badge variant="outline">Draft</Badge>
                  )}
                  <span className="ml-4">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/posts/${post.id}`}>
                  <Button variant="outline">View</Button>
                </Link>
                <div className="flex gap-2">
                  <Link href={`/posts/edit/${post.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-red-500"
                    onClick={() => setPostToDelete(post)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!postToDelete} onOpenChange={() => setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post
              and remove it from the website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}