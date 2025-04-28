export interface User {
  user_id: string
  username: string
  email: string
  password_hash?: string
  full_name: string
  bio?: string
  profile_picture?: string
  is_active: boolean
  is_superuser: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  category_id: string
  name: string
  description?: string
  slug: string
  post_count?: number
  created_at: string
  updated_at: string
}

export interface Tag {
  tag_id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface Post {
  post_id: string
  title: string
  slug: string
  content: string
  summary?: string
  cover_image?: string
  is_published: boolean
  published_at?: string
  author_id: string
  categories?: Category[]
  tags?: Tag[]
  comments?: Comment[]
  views?: number
  likes?: number
  reading_time?: string
  created_at: string
  updated_at: string
}

export interface Comment {
  comment_id: string
  content: string
  post_id: string
  user_id: string
  parent_id?: string
  likes?: number
  created_at: string
  updated_at: string
}

export interface Media {
  media_id: string
  file_name: string
  file_path: string
  mime_type: string
  post_id?: string
  user_id: string
  created_at: string
  updated_at: string
}
