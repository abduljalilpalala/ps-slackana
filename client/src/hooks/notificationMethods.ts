import { useEffect, useState } from 'react'

import { axios } from '~/shared/lib/axios'
import { pusher } from '~/shared/lib/pusher'
import { useAppDispatch, useAppSelector } from './reduxSelector'
import { getSections, setProjectID } from '~/redux/section/sectionSlice'

export const useNotificationMethods = () => {
  const [notifications, setNotifications] = useState([])
  const [hasNotification, setHasNotification] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const useGetNotifications = async () => {
    const response = await axios.get(`/api/notification`)
    setNotifications(response.data)
  }
  const useGetNotificationsOnMount = async () => {
    const response = await axios.get(`/api/notification`)
    const hasUnreadNotifications = response.data.some((notification: any) => !notification.is_seen)
    setHasNotification(hasUnreadNotifications)
    setNotifications(response.data)
  }
  const useSeenNotifications = async () => {
    await axios.put(`/api/project/notification/seen`)
    setHasNotification(false)
  }
  const useMarkReadNotification = async (id: string, project_id: number) => {
    await axios.put(`/api/notification/${id}`)
    dispatch(setProjectID({ project_id }))
    dispatch(getSections())
    useGetNotifications()
  }
  useEffect(() => {
    useGetNotificationsOnMount()
  }, [])

  useEffect(() => {
    const channel = pusher.subscribe(`user.${user?.id}.notifications`)
    channel.bind('AssignTaskEvent', (data: any) => {
      setHasNotification(true)
      useGetNotifications()
    })
    return () => {
      pusher.unsubscribe(`user.${user?.id}.notifications`)
    }
  }, [user])
  return {
    notifications,
    hasNotification,
    useMarkReadNotification,
    useGetNotifications,
    setHasNotification,
    useSeenNotifications
  }
}
