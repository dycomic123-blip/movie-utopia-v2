export interface CommentAuthor {
  id: number
  name: string
  avatar: string | null
}

export interface CommentItem {
  id: number
  videoId: number
  authorId: number
  content: string
  parentId: number | null
  likesCount: number
  createdAt: string
  updatedAt: string
  author: CommentAuthor
  replies?: CommentItem[]
}

export interface CommentCreateInput {
  videoId: number
  authorId: number
  content: string
  parentId?: number | null
}

export interface CommentUpdateInput {
  content: string
}

export interface CommentsResponse {
  comments: CommentItem[]
  total: number
}
