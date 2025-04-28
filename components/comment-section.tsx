"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { mockComments, mockUsers } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import type { Comment, User } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import Link from "next/link"

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get comments for this post
    const postComments = mockComments
      .filter((comment) => comment.post_id === postId)
      .sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateB.getTime() - dateA.getTime()
      })

    setComments(postComments)

    // Check if user is logged in
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [postId])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      // Redirect to login or show login prompt
      return
    }

    if (!newComment.trim()) return

    setIsLoading(true)

    // Create new comment
    const comment: Comment = {
      comment_id: uuidv4(),
      content: newComment,
      post_id: postId,
      user_id: user.user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Add to comments (in a real app, you'd send to API)
    setTimeout(() => {
      setComments([comment, ...comments])
      setNewComment("")
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>

      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.profile_picture || "/placeholder.svg"} alt={user.full_name} />
              <AvatarFallback>{user.full_name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Button type="submit" disabled={isLoading || !newComment.trim()}>
                {isLoading ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-muted p-4 rounded-lg mb-8 text-center">
          <p className="mb-2">Sign in to leave a comment</p>
          <Link href="/auth/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => {
            const commentUser = mockUsers.find((u) => u.user_id === comment.user_id)

            return (
              <div key={comment.comment_id} className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={commentUser?.profile_picture || "/placeholder.svg"} alt={commentUser?.full_name} />
                  <AvatarFallback>{commentUser?.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{commentUser?.full_name}</span>
                    <span className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</span>
                  </div>
                  <p>{comment.content}</p>
                  <div className="flex gap-4 mt-2">
                    <button className="text-sm text-muted-foreground hover:text-foreground">Reply</button>
                    <button className="text-sm text-muted-foreground hover:text-foreground">Like</button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-8 bg-muted rounded-lg">
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  )
}
