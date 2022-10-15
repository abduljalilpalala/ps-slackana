import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getProject } from '~/redux/project/projectSlice'

export const useProjectMethods = (projectID: number) => {
  const dispatch = useAppDispatch()
  const { overviewProject } = useAppSelector((state) => state.project)
  const permissions = overviewProject?.can

  useEffect(() => {
    dispatch(getProject(projectID))
  }, [projectID])

  return {
    permissions
  }
}
