import * as icons from 'react-feather'
import { IconType } from 'react-icons'

export interface Team {
  id: number
  name: string
  notif: number
}

export interface Link {
  href: string
  name: string
  Icon: IconType
}

export interface ProjectList {
  team_name: string
  icon: string
  date: string
  status: string
}

export interface Board {
  id: number | string
  name: string
  tasks?: Task[]
}

export interface Task {
  id: number
  position: number
  name: string
  assignee: {
    id: number
    name: string
    avatar: {
      url: string
      filename?: string
    }
  }
  is_completed: boolean
  due_date: string
  estimated_time: string
  actual_time_finished: string
}

export interface Message {
  id: string
  message: string
}

export interface Chat {
  id: string
  user_id: string
  name: string
  avatar_url: string
  created_at: string
  reply_count?: number
  message: string
  threads?: Thread
}

export interface Thread {
  id: string
  chat_id: string
  users: User[]
}

export interface User {
  id: string
  user_id: string
  name: string
  avatar_url: string
  created_at: string
  message: string
}

export interface File {
  id: string
  filename: string
  size: string
  type: string
  date_upload: string
  url: string
}

export type IconName = keyof typeof icons

export interface FileIcon {
  name: string
  Icon: any
}

export interface SidebarProject {
  id: number
  title: string
}

export interface Notification {
  id: string
  data: {
    type: string
    task?: {
      id: number
      name: string
      assignee?: {
        id: number
        user?: {
          id: number
          name: number
          avatar?: {
            url: string
          }
        }
      }
    }
    assigner?: {
      id: number
      name: string
      avatar?: {
        url: string
      }
    }
    project_id: number
  }
  read_at: string
  is_seen: boolean
  created_at: string
}
