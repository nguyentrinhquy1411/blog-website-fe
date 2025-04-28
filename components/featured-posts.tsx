import { Card, CardContent } from "@/components/ui/card"
import { mockPosts, mockUsers } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function FeaturedPosts() {
  // Get 3 featured posts (in a real app, you'd have a featured flag)
  const featuredPosts = mockPosts.filter((post) => post.is_published).slice(0, 3)

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPosts.map((post) => {
          const author = mockUsers.find((user) => user.user_id === post.author_id)

          return (
            <Card key={post.post_id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={post.cover_image || "/placeholder.svg?height=400&width=600"}
                  alt={post.title}
                  fill
                  className="object-cover"
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
                      <Link href={`/profile/${author?.username}`} className="font-medium hover:text-primary">
                        {author?.full_name}
                      </Link>
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
