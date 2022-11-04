import moment from 'moment'

import { File } from '~/shared/interfaces'
import { ProjectFileType } from '~/redux/files/fileType'
/*
 * Match the schema of backend and frontend
 *
 */

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)} MB`
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`
  }
}

const formatFiles = (files: ProjectFileType[] | string): File[] | string => {
  if (typeof files === 'string') {
    return files
  }
  return files.map((file) => {
    return {
      id: file.uuid,
      filename: file.name + '.' + file.extension,
      type: file.mime_type,
      size: formatFileSize(file.size),
      date_upload: moment(file.created_at).format('MMMM DD, YYYY'),
      url: file.url
    }
  })
}

export default formatFiles
