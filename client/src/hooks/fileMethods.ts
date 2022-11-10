import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { formatIniValues } from '~/utils/formatIniValues'

import {
  getProjectFiles,
  addProjectFile,
  deleteProjectFile,
  renameProjectFile
} from '~/redux/files/fileSlice'

import fileService from '~/redux/files/fileService'

export const useFileMethods = (projectID: number) => {
  const [isFileLoading, setIsFileLoading] = useState(false)
  const dispatch = useAppDispatch()
  const { files, isLoading } = useAppSelector((state) => state.file)

  useEffect(() => {
    setIsFileLoading(true)
    dispatch(getProjectFiles(projectID)).then((_) => setIsFileLoading(false))
  }, [projectID])

  const useHandleCreateFiles = async (data: FileList, callback: () => void): Promise<void> => {
    setIsFileLoading(true)
    // check if data file size is greater than 2MB
    const iniValue = await fileService.getIniValue()
    const { max_file_size, max_file_uploads } = formatIniValues(iniValue)

    const isFileSizeValid = Array.from(data).every((file) => file.size <= max_file_size)
    if (!isFileSizeValid || data.length >= max_file_uploads) {
      !isFileSizeValid &&
        toast.error(`Size of each files must not be greater than ${iniValue.upload_max_filesize}B`)
      data.length >= max_file_uploads &&
        toast.error(`You can only upload less than ${max_file_uploads} files at a time`)
      setIsFileLoading(false)
    } else {
      dispatch(addProjectFile({ projectId: projectID, file: data })).then((_) => {
        setIsFileLoading(false)
        callback()
      })
    }
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

  const useHandleDownloadFile = async (fileID: string): Promise<string | Blob> => {
    setIsFileLoading(true)
    const file = fileService.getProjectFile(projectID, fileID)
    setIsFileLoading(false)
    return file
  }

  return {
    useHandleCreateFiles,
    useHandleDeleteFile,
    useHandleRenameFile,
    useHandleDownloadFile,
    isFileLoading,
    isLoading,
    files
  }
}
