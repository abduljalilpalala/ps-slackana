import { Image, Speaker, Youtube, Table, Archive, FileText, File, Code, Icon } from 'react-feather'
import { FaFilePowerpoint } from 'react-icons/fa'
import { FileIconType } from '~/shared/types'

import { PDFIcon } from '~/shared/icons/PDFIcon'
import { WordIcon } from '~/shared/icons/WordIcon'
import { IconType } from 'react-icons'

const iconClasses: { [key: string]: FileIconType } = {
  // Media Icons
  image: { name: 'image/*', Icon: Image },
  audio: { name: 'audio/*', Icon: Speaker },
  video: { name: 'video/*', Icon: Youtube },

  //Documents
  'application/pdf': { name: 'application/pdf', Icon: PDFIcon },
  'application/vnd.openxml+formats': { name: 'application/vnd.openxml+formats', Icon: WordIcon },
  'application/msword': { name: 'application/msword', Icon: WordIcon },
  'application/vnd.ms-word': { name: 'application/vnd.ms-word', Icon: WordIcon },
  'application/vnd.oasis.opendocument.text': {
    name: 'application/vnd.oasis.opendocument.text',
    Icon: WordIcon
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml': {
    name: 'application/vnd.openxmlformats-officedocument.wordprocessingml',
    Icon: WordIcon
  },
  'application/vnd.ms-excel': { name: 'application/vnd.ms-excel', Icon: Table },
  'application/vnd.openxmlformats-officedocument.spreadsheetml': {
    name: 'application/vnd.openxmlformats-officedocument.spreadsheetml',
    Icon: Table
  },
  'application/vnd.oasis.opendocument.spreadsheet': {
    name: 'application/vnd.oasis.opendocument.spreadsheet',
    Icon: Table
  },
  'application/vnd.ms-powerpoint': {
    name: 'application/vnd.ms-powerpoint',
    Icon: FaFilePowerpoint
  },
  'application/vnd.openxmlformats-officedocument.presentationml': {
    name: 'application/vnd.openxmlformats-officedocument.presentationml',
    Icon: FaFilePowerpoint
  },
  'application/vnd.oasis.opendocument.presentation': {
    name: 'application/vnd.oasis.opendocument.presentation',
    Icon: FaFilePowerpoint
  },
  'application/gzip': { name: 'application/gzip', Icon: Archive },
  'application/zip': { name: 'application/zip', Icon: Archive },
  'application/json': { name: 'application/json', Icon: Code },
  'text/plain': { name: 'text/plain', Icon: FileText },
  'text/html': { name: 'text/html', Icon: Code }

  // Other Custom Icons can be added. For complete list of MIME types, see http://www.iana.org/assignments/media-types/media-types.xhtml
}

export const MapMimeToFileComponent = (mimeType: string): Icon | IconType => {
  //look for the longest prefix of a given mime type
  const candidate = Object.entries(iconClasses).find(([key]) => mimeType.startsWith(key))
  if (candidate) {
    return candidate[1].Icon
  }
  return File
}
