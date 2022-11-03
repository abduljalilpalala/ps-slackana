import { Image } from 'react-feather'

import { FileIcon } from './../interfaces'
import { PDFIcon } from '~/shared/icons/PDFIcon'
import { WordIcon } from '~/shared/icons/WordIcon'

export const fileIconType: FileIcon[] = [
  {
    name: 'image/webp',
    Icon: Image
  },
  {
    name: 'image/png',
    Icon: Image
  },
  {
    name: 'application/pdf',
    Icon: PDFIcon
  },
  {
    name: 'application/vnd.openxmlformats',
    Icon: WordIcon
  }
]
