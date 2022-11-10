import moment from 'moment'
import { NextRouter, useRouter } from 'next/router'
import React, { FC } from 'react'
import { GitHub } from 'react-feather'
import { BsGithub } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'

import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import { useAppSelector } from '~/hooks/reduxSelector'
import { Notification } from '~/shared/interfaces'
import { NotificationTypes } from '~/utils/constants'

type Props = {
  notifications: Notification[]
  isLoading: boolean
  actions: {
    handleReadNotification: (e: Notification) => void
  }
}

const NotificationList: FC<Props> = (props): JSX.Element => {
  const router: NextRouter = useRouter()
  const {
    actions: { handleReadNotification }
  } = props
  const { user } = useAppSelector((state) => state.auth)
  if (!props.notifications) null

  const notificationIconType = [
    {
      name: NotificationTypes.COMMIT,
      Icon: GitHub
    },
    {
      name: NotificationTypes.MERGE,
      Icon: BsGithub
    },
    {
      name: NotificationTypes.ASSIGN_TASK,
      Icon: FaRegUser
    }
  ]

  const showNotificationTypeText = (text: string, pronoun: string = '') => {
    switch (text) {
      case NotificationTypes.ASSIGN_TASK:
        return (text = `assigned ${pronoun} to a task -`)
      case NotificationTypes.MERGE:
        return (text = 'has merged this pull request -')
      case NotificationTypes.COMMIT:
        return (text = 'has committed to project -')
    }
  }

  const TableLoading: FC = (): JSX.Element => (
    <tr className={`group flex-1 shrink-0  text-sm `}>
      <td className="flex flex-1 items-center px-6 md:justify-between">
        <div className="flex flex-wrap items-center space-x-2 py-2 text-slate-600">
          <ImageSkeleton className="max-h-[30px] max-w-[30px] rounded-md" />
          <LineSkeleton className="h-[10px] w-40" />
          <LineSkeleton className="h-[10px] w-6" />
          <LineSkeleton className="h-[10px] w-96" />
        </div>
        <span className="shrink-0 text-sm font-light text-slate-500">
          <LineSkeleton className=" h-[10px] w-40" />
        </span>
      </td>
    </tr>
  )

  return (
    <table className="min-w-2xl w-full flex-1 divide-y divide-slate-300 overflow-auto border-t border-slate-300 text-left text-sm leading-normal">
      <tbody className="w-full divide-y divide-slate-300 text-sm text-slate-600">
        {props.isLoading ? (
          [...Array(5)].map((e, i) => <TableLoading key={i} />)
        ) : props.notifications?.length ? (
          props.notifications?.map((notification, i) => {
            let pronoun = notification.data.assigner?.id === user?.id
            return (
              <tr
                key={i}
                className={`group flex-1 shrink-0 ${
                  !notification.read_at && 'bg-slate-200'
                } text-sm transition duration-75 ease-in-out hover:bg-slate-100`}
              >
                <td className="flex flex-1 items-center px-6 md:justify-between">
                  <a
                    onClick={() => handleReadNotification(notification)}
                    className="flex flex-1 cursor-pointer items-center md:justify-between"
                  >
                    <div className="flex flex-wrap items-center space-x-2 py-2 text-slate-600">
                      {notificationIconType.map(
                        (notifIcon, i) =>
                          notifIcon.name.includes(notification.data.type) && (
                            <notifIcon.Icon key={i} className="h-4 w-4 shrink-0" />
                          )
                      )}
                      <div className="shrink-0 font-semibold text-slate-900">
                        {notification.data.type === NotificationTypes.ASSIGN_TASK && pronoun
                          ? 'You'
                          : notification.data.assigner?.name}
                        {notification.data.type === NotificationTypes.COMMIT &&
                          notification.data.sender?.login}
                        {notification.data.type === NotificationTypes.MERGE &&
                          notification.data.merged_by?.login}
                      </div>
                      <span className="flex-shrink-0 font-normal">
                        {showNotificationTypeText(
                          notification.data.type,
                          pronoun ? 'yourself' : 'you'
                        )}
                      </span>
                      <span className="font-semibold text-slate-900 underline line-clamp-1">
                        {notification.data.type === NotificationTypes.ASSIGN_TASK &&
                          notification.data.task?.name}
                        {notification.data.type === NotificationTypes.COMMIT &&
                          notification.data.repository?.full_name}
                        {notification.data.type === NotificationTypes.MERGE &&
                          notification.data.pr_details?.title}
                      </span>
                    </div>
                    <span className="shrink-0 text-sm font-light text-slate-500">
                      {moment(notification.created_at).fromNow()}
                    </span>
                  </a>
                </td>
              </tr>
            )
          })
        ) : (
          <tr className={`group shrink-0 text-center  text-sm transition duration-75 ease-in-out`}>
            <td className=" p-6 ">No notifications available</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default NotificationList
