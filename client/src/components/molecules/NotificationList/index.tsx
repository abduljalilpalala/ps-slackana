import moment from 'moment'
import React, { FC } from 'react'
import { GitHub } from 'react-feather'
import { BsGithub } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'

import { Notification } from '~/shared/interfaces'

type Props = {
  notifications: Notification[]
}

const NotificationList: FC<Props> = (props): JSX.Element => {
  if (!props.notifications) null

  const notificationIconType = [
    {
      name: 'committed',
      Icon: GitHub
    },
    {
      name: 'merged',
      Icon: BsGithub
    },
    {
      name: 'assigned',
      Icon: FaRegUser
    }
  ]

  const showNotificationTypeText = (text: string) => {
    switch (text) {
      case 'assigned':
        return (text = 'has assigned you a task -')
      case 'merged':
        return (text = 'has merged this pull request -')
      case 'committed':
        return (text = 'has committed to project')
    }
  }

  return (
    <table className="min-w-2xl w-full flex-1 divide-y divide-slate-300 overflow-auto border-t border-slate-300 text-left text-sm leading-normal">
      <tbody className="w-full divide-y divide-slate-300 text-sm text-slate-600">
        {props.notifications?.map((notification, i) => (
          <tr
            key={i}
            className="group flex-1 shrink-0 text-sm transition duration-75 ease-in-out hover:bg-slate-100"
          >
            <td className="flex flex-1 items-center px-6 md:justify-between">
              <div className="flex flex-wrap items-center space-x-2 py-2 text-slate-600">
                {notificationIconType.map(
                  (notifIcon, i) =>
                    notifIcon.name.includes(notification.notification_type) && (
                      <notifIcon.Icon key={i} className="h-4 w-4 shrink-0" />
                    )
                )}
                <div className="shrink-0 font-semibold text-slate-900">{notification?.name}</div>
                <span className="flex-shrink-0 font-normal">
                  {showNotificationTypeText(notification.notification_type)}
                </span>
                <a
                  href={notification.link}
                  className="font-semibold text-slate-900 underline line-clamp-1"
                >
                  {notification.task_name}
                </a>
              </div>
              <span className="shrink-0 text-sm font-light text-slate-500">
                {moment(notification.created_at).fromNow()}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default NotificationList
