import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { hydrateUserState } from '~/redux/auth/authSlice'
import { getProject } from '~/redux/project/projectSlice'

export const useProjectMethods = (projectID: number) => {
  const dispatch = useAppDispatch()
  const { overviewProject } = useAppSelector((state) => state.project)
  const { user } = useAppSelector((state) => state.auth)
  const permissions = overviewProject?.can
  const [loggedMember, setLoggedMember] = useState<any>(null)

  useEffect(() => {
    dispatch(getProject(projectID))
    setLoggedMember(getMemberFromProject())
  }, [projectID])

  const getMemberFromProject = () => {
    return overviewProject?.members?.filter((member: any) => member.user.id == user.id)[0]
  }
  const canComplete = (id: number) => {
    if (
      loggedMember?.role?.name === 'Project Owner' ||
      loggedMember?.role?.name === 'Team Leader'
    ) {
      return true
    }
    if (loggedMember?.role?.name === 'Member' && id === loggedMember?.id) {
      return true
    }
    return false
  }
  return {
    permissions,
    loggedMember,
    canComplete
  }
}
