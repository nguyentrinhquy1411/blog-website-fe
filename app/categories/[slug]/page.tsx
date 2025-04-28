import { mockCategories, mockPosts } from "@/lib/mock-data"
import { PostCard } from "@/components/post-card"
import { notFound } from "next/navigation"
import Link from "next/link"

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = mockCategories.find((cat) => cat.slug === params.slug)

  if (!category) {
    notFound()
  }

  // Get posts for this category
  const categoryPosts = mockPosts.filter((post) =>
    post.categories?.some((cat) => cat.category_id === category.category_id),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            ← Back to home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {categoryPosts.length > 0 ? (
          <div className="space-y-6">
            {categoryPosts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No posts in this category</h3>
            <p className="text-gray-500">There are currently no posts in the {category.name} category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
