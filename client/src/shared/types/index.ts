import { Icon } from 'react-feather'
import { IconType } from 'react-icons'
import { MouseEventHandler } from 'react'

import { File } from './../interfaces'

export type IniValueType = {
  upload_max_filesize: string
  max_file_uploads: string
}

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

export type ChatMessageValues = {
  message: string
}

export type Filename = {
  id: string
  filename: string
}

export type FileIconType = {
  name: string
  Icon: IconType | Icon
}

export type NotificationConstants = {
  ASSIGN_TASK: string
  COMMIT: string
  MERGE: string
}

export type Security = {
  current_password: string
  new_password: string
  confirm_password: string
}

export type SortKeys = keyof File

export type SortOrder = 'ASC' | 'DESC'

export type SortFileProps = {
  tableData: File[]
  sortKey: SortKeys
  reverse: boolean
}

export type SortButtonProps = {
  label: string
  sortOrder: SortOrder
  columnKey: SortKeys
  sortKey: SortKeys
  onClick: MouseEventHandler<HTMLButtonElement>
}

export type MemberType = {
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
