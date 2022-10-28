import { useEffect, useState } from 'react'

import { axios } from '~/shared/lib/axios'
import { pusher } from '~/shared/lib/pusher'
import { useAppDispatch, useAppSelector } from './reduxSelector'
import { getSections, setProjectID } from '~/redux/section/sectionSlice'

export const useNotificationMethods = () => {
  const [notifications, setNotifications] = useState([])
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const useGetNotifications = async () => {
    const response = await axios.get(`/api/notification`)
    setNotifications(response.data)
  }
  const useMarkReadNotification = async (id: string, project_id: number) => {
    await axios.put(`/api/notification/${id}`)
    dispatch(setProjectID({ project_id }))
    dispatch(getSections())
    useGetNotifications()
  }
  useEffect(() => {
    useGetNotifications()
  }, [])

  useEffect(() => {
    const channel = pusher.subscribe(`user.${user?.id}.notifications`)
    channel.bind('AssignTaskEvent', (data: any) => {
      useGetNotifications()
    })
    return () => {
      pusher.unsubscribe(`user.${user?.id}.notifications`)
    }
  }, [user])
  return {
    notifications,
    useMarkReadNotification,
    useGetNotifications
  }
}
