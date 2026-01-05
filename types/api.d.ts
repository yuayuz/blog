interface PostTypeItem {
  type_key: String
  name: String
  parent_type: String
  color: String
}

interface BlogPost {
  id: number
  title: string
  type: string | null
  description: string | null
  file_url: string
  cover_image_url: string | null
  status: string
  created_at: string
  updated_at: string | null
  published_at: string | null
  slug: string
  meta_title: string | null
  meta_description: string | null
  keywords: string | null
}
