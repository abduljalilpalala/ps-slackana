import { useEffect, useState } from 'react'

import { axios } from '~/shared/lib/axios'
import { pusher } from '~/shared/lib/pusher'
import { useAppDispatch, useAppSelector } from './reduxSelector'
import { getSections, setProjectID } from '~/redux/section/sectionSlice'
import { getSidebarProjects } from '~/redux/project/projectSlice'
import { Notification } from '~/shared/interfaces'

export const useNotificationMethods = (id: number = 0) => {
  const [notifications, setNotifications] = useState([])
  const [notificationsTable, setNotificationsTable] = useState([])
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false)
  const [isPopoverLoading, setIsPopoverLoading] = useState<boolean>(false)
  const [hasNotification, setHasNotification] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { sidebarProject, isSidebarLoading, overviewProject } = useAppSelector(
    (state) => state.project
  )

  useEffect(() => {
    dispatch(getSidebarProjects())
  }, [])

  const useGetNotifications = async () => {
    const response = await axios.get(`/api/notification`)
    setNotifications(response.data)
  }
  const useGetNotificationsTable = async (
    project_id: number | null = sidebarProject[0]?.id,
    type: string = 'all'
  ) => {
    setIsTableLoading(true)
    const response = await axios.get(`/api/notification?project=${project_id}&type=${type}`)
    setIsTableLoading(false)
    setNotificationsTable(response.data)
  }
  const useGetNotificationsTableOnUpdate = async (project_id: number) => {
    const response = await axios.get(`/api/notification?project=${project_id}&type=all`)
    if (id === project_id) {
      setNotificationsTable(response.data)
    }
  }
  const useGetNotificationsTableNoLoading = async (project_id: number) => {
    const response = await axios.get(`/api/notification?project=${project_id}&type=all`)
    setNotificationsTable(response.data)
  }
  const useGetNotificationsOnMount = async () => {
    setIsPopoverLoading(true)
    const response = await axios.get(`/api/notification`)
    const hasUnreadNotifications = response.data.some(
      (notification: Notification) => !notification.is_seen
    )
    setIsPopoverLoading(false)
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
    useGetNotificationsTableNoLoading(project_id)
  }
  useEffect(() => {
    useGetNotificationsOnMount()
  }, [])

  const unsubscribePusher = () => {
    pusher.unsubscribe(`user.${user?.id}.notifications`)
  }

  useEffect(() => {
    if (!overviewProject.id) return
    if (overviewProject.isArchived) {
      unsubscribePusher()
      return
    }
    const channel = pusher.subscribe(`user.${user?.id}.notifications`)
    channel.bind('NotificationEvent', (data: any) => {
      setHasNotification(true)
      useGetNotifications()
      useGetNotificationsTableOnUpdate(data?.project?.id)
    })
    return () => {
      unsubscribePusher()
    }
  }, [overviewProject.isArchived])
  return {
    notifications,
    hasNotification,
    sidebarProject,
    notificationsTable,
    isTableLoading,
    isSidebarLoading,
    isPopoverLoading,
    setIsTableLoading,
    useGetNotificationsTable,
    useMarkReadNotification,
    useGetNotifications,
    setHasNotification,
    useSeenNotifications
  }
}
