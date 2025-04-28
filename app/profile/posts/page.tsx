"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { postService } from "@/lib/post-service"
import { Post } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function ManagePostsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [deletePostId, setDeletePostId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    if (user) {
      fetchPosts()
    }
  }, [user])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const userPosts = await postService.getPostsByAuthor(user?.user_id || "")
      setPosts(userPosts)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
      toast({
        title: "Error",
        description: "Failed to load your posts. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async () => {
    if (!deletePostId) return

    try {
      await postService.deletePost(deletePostId)
      setPosts(posts.filter(post => post.id !== deletePostId))
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete post:", error)
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive"
      })
    } finally {
      setDeletePostId(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const openDeleteDialog = (postId: string) => {
    setDeletePostId(postId)
    setIsDeleteDialogOpen(true)
  }

  const renderPostsTable = (isPublished: boolean) => {
    const filteredPosts = posts.filter(post => post.is_published === isPublished)
    
    if (filteredPosts.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          {isPublished 
            ? "You haven't published any posts yet." 
            : "You don't have any draft posts."}
        </div>
      )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map(post => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>{formatDate(post.created_at)}</TableCell>
              <TableCell>{formatDate(post.updated_at)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/posts/${post.slug}`}>
                    <Button size="icon" variant="outline" title="View post">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/posts/edit/${post.id}`}>
                    <Button size="icon" variant="outline" title="Edit post">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="text-destructive" 
                    title="Delete post"
                    onClick={() => openDeleteDialog(post.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Link href="/posts/new">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="published">
        <TabsList className="mb-4">
          <TabsTrigger value="published">
            Published 
            <Badge variant="secondary" className="ml-2">
              {posts.filter(post => post.is_published).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts
            <Badge variant="secondary" className="ml-2">
              {posts.filter(post => !post.is_published).length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="published" className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading your published posts...</div>
          ) : (
            renderPostsTable(true)
          )}
        </TabsContent>
        
        <TabsContent value="drafts" className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading your draft posts...</div>
          ) : (
            renderPostsTable(false)
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}