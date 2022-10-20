import { useState } from 'react'
import { axios } from '~/shared/lib/axios'

export const useNudgeMember = (projectID: number) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const nudge = async (userId: number, isLoggedIn: boolean) => {
    if (!isLoggedIn) return
    await axios.get(`/api/project/${projectID}/member/${userId}/nudge-member`)
  }

  return {
    nudge,
    isClicked
  }
}
