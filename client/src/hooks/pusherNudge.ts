import { useEffect } from 'react'

import { User } from '~/shared/types'
import { pusher } from '~/shared/lib/pusher'
import { nudgeMember } from '~/utils/nudgeMember'
import { useAppSelector } from './reduxSelector'

export const usePusherNudge = () => {
  const {
    auth: { user },
    project
  } = useAppSelector((state) => state)

  useEffect(() => {
    if (project.project) {
      const projects = project.project
      projects?.forEach(({ id }: any) => {
        const channel = pusher.subscribe(`project.${id}.member.${user.id}`)
        channel.bind('NudgeMemberEvent', (data: any) => {
          const { name, avatar } = data.user
          nudgeMember(avatar.url, data?.projectTitle, name)
        })
      })
      return () => {
        projects?.forEach(({ id }: any) => {
          const channel = pusher.subscribe(`project.${id}.member.${user.id}`)
          channel.bind('NudgeMemberEvent', (data: any) => {
            const { name, avatar } = data.user
            nudgeMember(avatar.url, data?.projectTitle, name)
          })
        })
      }
    }
  }, [project.project])
}