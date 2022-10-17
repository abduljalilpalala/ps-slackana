import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { hydrateUserState } from '~/redux/auth/authSlice'
import { getProject } from '~/redux/project/projectSlice'

export const useProjectMethods = (projectID: number) => {
  const dispatch = useAppDispatch()
  const { overviewProject } = useAppSelector((state) => state.project)
  const { user } = useAppSelector((state) => state.auth)
  const permissions = overviewProject?.can

  useEffect(() => {
    dispatch(getProject(projectID))
  }, [projectID])

  const getMemberFromProject = () => {
    return overviewProject?.members?.filter((member: any) => member?.user?.id == user?.id)[0]
  }
  const canComplete = (id: number) => {
    if (
      getMemberFromProject()?.role?.name === 'Project Owner' ||
      getMemberFromProject()?.role?.name === 'Team Leader'
    ) {
      return true
    }
    if (getMemberFromProject()?.role?.name === 'Member' && id === getMemberFromProject()?.id) {
      return true
    }
    return false
  }
  return {
    permissions,
    canComplete,
    getMemberFromProject
  }
}
