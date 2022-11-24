import { NotificationConstants } from '~/shared/types'

export const NotificationTypes: NotificationConstants = {
  ASSIGN_TASK: 'assignTask',
  COMMIT: 'commit',
  MERGE: 'merge'
} as const

export const NOT_FOUND = '/404'

export const CHAT_LENGTH = 10
