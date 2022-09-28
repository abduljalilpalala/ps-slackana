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
  team_name: string,
  icon: string,
  date: string,
  status: string,
} 
