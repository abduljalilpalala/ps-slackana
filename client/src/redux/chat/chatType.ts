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

export type AddMessageType = {
  projectId: string | string[] | undefined
  message: string
}
export type UpdateMessageType = {
  projectId: string | string[] | undefined
  messageId: number
  message: string
}

export type DeleteMessageType = {
  projectId: string | string[] | undefined
  messageId: number
}

export type AddMessageThreadType = {
  projectId: string | string[] | undefined
  messageId: string | string[] | undefined
  message: string
}

export type DeleteMessageThreadType = {
  messageId: string | string[] | undefined
  threadId: number
}

export type UpdateMessageThreadType = {
  messageId: string | string[] | undefined
  threadId: number
  message: string
}

export type MessageThreadResponse = {
  threadMessage: Chat | number
  message: Chat
}
