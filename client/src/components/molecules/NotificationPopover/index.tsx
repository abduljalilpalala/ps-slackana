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
import handleImageError from '~/helpers/handleImageError'
import { Notification } from '~/shared/interfaces'
import { NotificationTypes } from '~/utils/constants'
import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

const NotificationPopover = (): JSX.Element => {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const {
    notifications,
    hasNotification,
    sidebarProject,
    isPopoverLoading,
    useMarkReadNotification,
    useSeenNotifications
  } = useNotificationMethods()
  formatMoment()

  const handleReadNotification = (notification: Notification, callback: () => void) => {
    useMarkReadNotification(notification?.id, notification?.data.project_id)
    if (notification?.data?.type === NotificationTypes.ASSIGN_TASK) {
      callback()
      window.location.href = `/team/${notification?.data?.project_id}/board?task_id=${notification?.data?.task?.id}`
    }
    if (notification?.data?.type === NotificationTypes.COMMIT) {
      window.open(notification?.data?.commit?.url)
    }
    if (notification?.data?.type === NotificationTypes.MERGE) {
      window.open(notification?.data?.pr_details?.url)
    }
  }

  const handleSeeAllNotification = (callback: () => void) => {
    callback()
    router.push(`/notifications/projects/${sidebarProject[0]?.id}?type=all`)
  }

  const loadingNotification = () => (
    <div key={Math.random()} className="mx-2 mt-1 flex items-center gap-2">
      <div>
        <ImageSkeleton className="max-h-[33px] max-w-[33px] rounded-full " />
      </div>
      <div className="flex flex-col items-start justify-start">
        <LineSkeleton className="mt-[10px] w-48" />
        <LineSkeleton className="w-40" />
      </div>
    </div>
  )

  return (
    <Popover css={styles.popover}>
      {({ open, close }) => (
        <>
          <Popover.Button
            css={styles.popover_button({ open })}
            onClick={() => useSeenNotifications()}
          >
            {hasNotification && (
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
                {isPopoverLoading ? (
                  [...Array(3)].map(() => loadingNotification())
                ) : notifications.length ? (
                  notifications.map((notification: Notification) => {
                    return (
                      <a
                        key={notification?.id}
                        onClick={() => handleReadNotification(notification, () => close())}
                        className={`${!notification?.read_at && 'bg-slate-200'} cursor-pointer`}
                      >
                        {notification?.data?.type === NotificationTypes.ASSIGN_TASK && (
                          <>
                            <div css={globals.avatar}>
                              <img
                                src={`${notification?.data?.assigner?.avatar?.url}`}
                                className="w-full object-cover"
                                alt="avatar"
                                onError={(e) => handleImageError(e, '/images/avatar.png')}
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
                        {notification?.data?.type === NotificationTypes.COMMIT && (
                          <>
                            <div css={globals.avatar}>
                              <img
                                src={`${notification?.data?.sender?.avatar_url}`}
                                className="w-full object-cover"
                                alt="avatar"
                                onError={(e) => handleImageError(e, '/images/avatar.png')}
                              />
                            </div>
                            <p className="mx-2 text-xs text-gray-600">
                              <span className="font-bold">{notification?.data?.sender?.login}</span>{' '}
                              has committed to project -{' '}
                              <span className="font-bold text-blue-600">
                                {notification?.data?.repository?.full_name}
                              </span>
                              . {moment(notification?.created_at).add('hours').fromNow(true)}
                            </p>
                          </>
                        )}
                        {notification?.data?.type === NotificationTypes.MERGE && (
                          <>
                            <div css={globals.avatar}>
                              <img
                                src={`${notification?.data?.merged_by?.avatar_url}`}
                                className="w-full object-cover"
                                alt="avatar"
                                onError={(e) => handleImageError(e, '/images/avatar.png')}
                              />
                            </div>
                            <p className="mx-2 text-xs text-gray-600">
                              <span className="font-bold">
                                {notification?.data?.merged_by?.login}
                              </span>{' '}
                              has merged this pull request -{' '}
                              <span className="font-bold text-blue-600">
                                {notification?.data?.pr_details?.title}
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
                <a
                  className=" cursor-pointer"
                  onClick={() => handleSeeAllNotification(() => close())}
                >
                  See all notifications
                </a>
              </footer>
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

export default NotificationPopover
