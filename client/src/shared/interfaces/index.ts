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
  id: number
  message: string
}

export interface ThreadMessage {
  id?: number | undefined
  thread_id: number | undefined
  message: string | undefined
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
    sender?: {
      login: string
      avatar_url: string
    }
    repository?: {
      full_name: string
    }
    commit?: {
      message: string
      url: string
    }
    merged_by?: {
      login: string
      avatar_url: string
    }
    pr_details?: {
      title: string
      url: string
    }
    project_id: number
  }
  read_at: string
  is_seen: boolean
  created_at: string
}

export interface IProject {
  id: number
  title: string
  description: string
  repository: null | undefined
  icon: {
    fileName: string
    url: string
  }
  status: {
    id: number
    name: string
  }
  can: {
    addMember: boolean
    removeMember: boolean
    nudgeMember: boolean
    assignTeamLeader: boolean
    setMVP: boolean
    archiveProject: boolean
    addTeam: boolean
    editTeam: boolean
    removeTeam: boolean
    createSection: boolean
    renameSection: boolean
    removeSection: boolean
    assignDueDates: boolean
    createTask: boolean
    renameTask: boolean
    deleteTask: boolean
    assignTask: boolean
    setTaskAsCompleted: boolean
    moveTask: boolean
    uploadFile: boolean
    downloadFile: boolean
    deleteFile: boolean
    renameFile: boolean
  }
  settings: {
    muteNudge: number | boolean
  }
  numberOfActiveMembers: number | boolean
  role: number
  isArchived: number
  created_at: string
  updated_at: string
}
