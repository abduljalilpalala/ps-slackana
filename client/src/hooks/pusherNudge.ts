import { useEffect } from 'react'

import { pusher } from '~/shared/lib/pusher'
import { nudgeMember } from '~/utils/nudgeMember'
import { useAppSelector } from './reduxSelector'

export const usePusherNudge = () => {
  const {
    auth: { user },
    project: { overviewProject, project }
  } = useAppSelector((state) => state)

  const unsubscribePusher = () => {
    project?.forEach(({ id }: any) => {
      pusher.unsubscribe(`project.${id}.member.${user.id}`)
    })
  }

  useEffect(() => {
    if (!overviewProject.id) return
    if (overviewProject.isArchived) {
      unsubscribePusher()
      return
    }

    if (project) {
      project.forEach(({ id }: any) => {
        const channel = pusher.subscribe(`project.${id}.member.${user?.id}`)
        channel.bind('NudgeMemberEvent', (data: any) => {
          const { name, avatar } = data.user
          nudgeMember(avatar.url, data?.projectTitle, name)
        })
      })
    }
    return () => {
      unsubscribePusher()
    }
  }, [project, overviewProject.isArchived])
}
