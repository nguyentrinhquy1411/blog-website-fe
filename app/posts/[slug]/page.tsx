import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CommentSection } from "@/components/comment-section"
import { TagList } from "@/components/tag-list"
import { formatDate } from "@/lib/utils"
import { mockPosts, mockUsers } from "@/lib/mock-data"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = mockPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const author = mockUsers.find((user) => user.user_id === post.author_id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center mb-6">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={author?.profile_picture || "/placeholder.svg"} alt={author?.full_name} />
            <AvatarFallback>{author?.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author?.full_name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.published_at || post.created_at)} · {post.reading_time || "5 min read"}
            </p>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <TagList tags={post.tags} />

        <Separator className="my-8" />

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2">
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
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              {post.likes || 42}
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
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg>
              {post.comments?.length || 12}
            </Button>
          </div>
          <div>
            <Button variant="ghost" size="sm" className="mr-2">
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
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
              </svg>
              Save
            </Button>
          </div>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={author?.profile_picture || "/placeholder.svg"} alt={author?.full_name} />
              <AvatarFallback>{author?.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{author?.full_name}</h3>
              <p className="text-sm text-muted-foreground">{author?.bio?.substring(0, 100)}...</p>
            </div>
          </div>
          <Button className="w-full">Follow</Button>
        </Card>

        <CommentSection postId={post.post_id} />
      </div>
    </div>
  )
}
