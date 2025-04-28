import type { Tag } from "@/lib/types"
import Link from "next/link"

interface TagListProps {
  tags?: Tag[]
}

export function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Link
          key={tag.tag_id}
          href={`/tags/${tag.slug}`}
          className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  )
}
