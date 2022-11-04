import { AxiosResponseError } from '~/shared/types'
import { File } from '~/shared/interfaces'

export type ProjectFileType = {
  uuid: string
  file_name: string
  name: string
  extension: string
  mime_type: string
  size: number
  created_at: string
  updated_at: string
  url: string
}

export type FileStateType = {
  files: Array<File>
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  error: AxiosResponseError
}
