import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCategories } from "@/lib/mock-data"
import Link from "next/link"

export function CategoryList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <Link
              key={category.category_id}
              href={`/categories/${category.slug}`}
              className="flex items-center justify-between py-2 hover:text-primary"
            >
              <span>{category.name}</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {category.post_count || Math.floor(Math.random() * 20)}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
