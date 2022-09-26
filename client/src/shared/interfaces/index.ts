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
