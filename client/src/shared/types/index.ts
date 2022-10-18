export type SignInUpFormValues = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type AxiosResponseError = {
  status: number | undefined
  content: any
}

export type SignInUpFormFields = 'name' | 'email' | 'password' | 'password_confirmation'

export type User = {
  id?: number
  name: string
  email: string
  notification: any
  avatar: {
    fileName: string
    url: string
  }
  isLoggedIn: number
}

export type SectionFormFields = {
  id: number
  project_id: number
  name?: string | undefined
}

export type Section = {
  id?: number
  project_id?: number
  name: string
  tasks?: []
}

export type Task = {
  id?: number
  section_id?: number
  assignee?: {
    id: number
    user?: {
      id: number
      name: string
      email: string
      avatar: {
        fileName: string
        url: string
      }
      isLoggedIn: boolean
      created_at: string
      updated_at: string
    }
    role?: {}
    teams?: []
    is_removed: boolean
    is_mvp: boolean
    date_joined: string
  } | null
  name: string
  description?: string
  is_completed?: boolean
  position?: number
  due_date?: string
  estimated_time?: number
  actual_time_finished?: number
  created_at: string
  updated_at: string
}
