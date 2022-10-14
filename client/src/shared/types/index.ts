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
} 
