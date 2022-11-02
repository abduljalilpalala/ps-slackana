import React, { FC } from 'react'

import FileItem from './FIleItem'
import TableHead from './TableHead'
import { Filename } from '~/shared/types'
import { File } from '~/shared/interfaces'
import EditFilenameDialog from './EditFilenameDialog'

type Props = {
  isOpen: boolean
  files: File[]
  filename: Filename
  actions: {
    handleOpenEditModal: (data?: Filename) => void
    handleDeleteFile: (id: string) => Promise<void>
    handleUpdateFilename: (data: Filename) => Promise<void>
  }
}

const FileList: FC<Props> = (props): JSX.Element => {
  if (!props.files) null

  const {
    isOpen,
    filename,
    actions: { handleOpenEditModal, handleDeleteFile, handleUpdateFilename }
  } = props

  return (
    <table className="w-full divide-y divide-slate-300 border-t border-slate-300 text-left text-sm leading-normal">
      <TableHead />
      <tbody className="divide-y divide-slate-300 text-sm text-slate-600">
        {isOpen && (
          /*
           * This is the modal for Edit Filename that
           * will eventually render if `isOpen` props is true
           * P.S: `isOpen` is necessary in order to refresh the state stored
           *       in the variable
           */
          <EditFilenameDialog
            isOpen={isOpen}
            filename={filename}
            closeModal={handleOpenEditModal}
            actions={{ handleUpdateFilename }}
          />
        )}
        {props.files?.map((file, i) => (
          /*
           * This will rendered actual data
           * <tr>
           *  <td>{data goes here}</td>
           * </tr>
           */
          <FileItem key={i} file={file} actions={{ handleOpenEditModal, handleDeleteFile }} />
        ))}
      </tbody>
    </table>
  )
}

export default FileList
