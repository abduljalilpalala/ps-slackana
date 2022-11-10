import { IniValueType } from '~/shared/types'

type FormatIniValuesType = {
  max_file_size: number
  max_file_uploads: number
}

export const formatIniValues = (iniValues: IniValueType): FormatIniValuesType => {
  // extract the letter from the string max_file_size
  const max_file_size_letter = iniValues.upload_max_filesize.slice(-1)
  // extract the number from the string max_file_size
  const max_file_size_number = parseInt(iniValues.upload_max_filesize.slice(0, -1))
  let max_file_size = 0
  // convert the number to bytes
  if (max_file_size_letter === 'M') {
    max_file_size = max_file_size_number * 1024 * 1024
  } else if (max_file_size_letter === 'K') {
    max_file_size = max_file_size_number * 1024
  } else if (max_file_size_letter === 'G') {
    max_file_size = max_file_size_number * 1024 * 1024 * 1024
  }
  // extract the number from the string max_file_uploads
  const max_file_uploads = parseInt(iniValues.max_file_uploads)
  return {
    max_file_size: max_file_size,
    max_file_uploads: max_file_uploads
  }
}
