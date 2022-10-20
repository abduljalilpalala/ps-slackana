import { useEffect } from 'react'

import { User } from '~/shared/types'
import { pusher } from '~/shared/lib/pusher'
import { nudgeMember } from '~/utils/nudgeMember'
import { useAppSelector } from './reduxSelector'

export const usePusherNudge = (id: string) => {
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const channel = pusher.subscribe(`project.${id}.member.${user.id}`)
    channel.bind('NudgeMemberEvent', (data: { user: User }) => {
      const { name, avatar } = data.user
      nudgeMember(avatar.url, name)
    })

    return () => {
      pusher.unsubscribe(`project.${id}.member.${user.id}`)
    }
  }, [])
}
