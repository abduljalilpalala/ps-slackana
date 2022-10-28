import React, { useEffect } from 'react'
import { Bell } from 'react-feather'
import { Popover } from '@headlessui/react'
import moment from 'moment'
import { useRouter } from 'next/router'

import { globals } from '~/shared/twin/globals.styles'
import { styles } from '~/shared/twin/notification-popover.styles'
import PopoverTransition from '~/components/templates/PopoverTransition'
import { useNotificationMethods } from '~/hooks/notificationMethods'
import { useAppSelector } from '~/hooks/reduxSelector'
import { formatMoment } from '~/utils/formatMoment'

const NotificationPopover = (): JSX.Element => {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const { notifications, useMarkReadNotification, useGetNotifications } = useNotificationMethods()
  const hasUnreadNotifications = notifications.some(
    (notification: any) => notification.read_at === null
  )
  formatMoment()
  const handleReadNotification = (id: string, project_id: number, task_id: number) => {
    useMarkReadNotification(id, project_id)
    router.push(`/team/${project_id}/board?task_id=${task_id}`)
  }
  return (
    <Popover css={styles.popover}>
      {({ open }) => (
        <>
          <Popover.Button css={styles.popover_button({ open })}>
            {hasUnreadNotifications && (
              <div className="absolute -top-0 -right-0 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900"></div>
            )}
            <Bell fill={open ? 'currentColor' : 'transparent'} />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel css={styles.popover_panel}>
              <header css={styles.header}>
                <h1>Notifications</h1>
              </header>
              <main css={styles.main} className="scroll-show-on-hover default-scrollbar">
                {notifications.length ? (
                  notifications.map((notification: any) => {
                    return (
                      <a
                        key={notification?.id}
                        onClick={() =>
                          handleReadNotification(
                            notification?.id,
                            notification?.data?.project_id,
                            notification?.data?.task?.id
                          )
                        }
                        className={`${!notification?.read_at && 'bg-slate-200'} cursor-pointer`}
                      >
                        {notification?.data?.type === 'assignTask' && (
                          <>
                            <div css={globals.avatar}>
                              <img
                                src={`${notification?.data?.assigner?.avatar?.url}`}
                                className="w-full object-cover"
                                alt="avatar"
                              />
                            </div>
                            <p className="mx-2 text-xs text-gray-600">
                              <span className="font-bold">
                                {notification?.data?.assigner?.id === user?.id
                                  ? 'You'
                                  : notification?.data?.assigner?.name}
                              </span>{' '}
                              assigned{' '}
                              {notification?.data?.assigner?.id === user?.id ? 'yourself' : 'you'}{' '}
                              to a task -{' '}
                              <span className="font-bold text-blue-600">
                                {notification?.data?.task?.name}
                              </span>
                              . {moment(notification?.created_at).add('hours').fromNow(true)}
                            </p>
                          </>
                        )}
                      </a>
                    )
                  })
                ) : (
                  <p className="text-center text-xs text-gray-600">No unread notifications</p>
                )}
              </main>
              <footer css={styles.footer}>
                <a href="#">See all notifications</a>
              </footer>
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

export default NotificationPopover
