import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

import {
  getProjectFiles,
  addProjectFile,
  deleteProjectFile,
  renameProjectFile
} from '~/redux/files/fileSlice'

export const useFileMethods = (projectID: number) => {
  const [isFileLoading, setIsFileLoading] = useState(false)
  const dispatch = useAppDispatch()
  const files = useAppSelector((state) => state.file.files)
  const isLoading = useAppSelector((state) => state.file.isLoading)

  useEffect(() => {
    setIsFileLoading(true)
    dispatch(getProjectFiles(projectID)).then((_) => setIsFileLoading(false))
  }, [projectID])

  const useHandleCreateFiles = async (data: any, callback: () => void): Promise<void> => {
    setIsFileLoading(true)
    dispatch(addProjectFile({ projectId: projectID, file: data })).then((_) => {
      setIsFileLoading(false)
      callback()
    })
  }

  const useHandleDeleteFile = async (fileID: string, callback: () => void): Promise<void> => {
    setIsFileLoading(true)
    dispatch(deleteProjectFile({ projectId: projectID, fileId: fileID })).then((_) => {
      setIsFileLoading(false)
      callback()
    })
  }

  const useHandleRenameFile = async (
    fileID: string,
    name: string,
    callback: () => void
  ): Promise<void> => {
    setIsFileLoading(true)
    dispatch(renameProjectFile({ projectId: projectID, fileId: fileID, name })).then((_) => {
      setIsFileLoading(false)
      callback()
    })
  }

  return {
    useHandleCreateFiles,
    useHandleDeleteFile,
    useHandleRenameFile,
    isFileLoading,
    isLoading,
    files
  }
}
