export type GithubType = {
  type: string
  name: string
  avatar: string
  pr_title?: string
  pr_url?: string
  repository: string
  commit_url: string
}

export type Chat = {
  id: number
  member?: {
    id: number
    user: {
      id: number
      name: string
      email: string
      avatar: {
        fileName: string
        url: string
      }
      isLoggedIn: number
      created_at: string
      updated_at: string
    }
    is_removed: number
    is_mvp: number
    date_joined: string
  }
  message: string
  threadCount: number | undefined
  thread: Chat[]
  created_at: string
}
