import React, { FC } from 'react'
import fileDownload from 'js-file-download'

import FileItem from './FIleItem'
import { BlankSlateTableIcon } from '~/shared/icons/BlankSlateTableIcon'
import TableHead from './TableHead'
import { Filename } from '~/shared/types'
import { File } from '~/shared/interfaces'
import EditFilenameDialog from './EditFilenameDialog'
import FileListSkeleton from '../FileListSkeleton'
import { useFileMethods } from '~/hooks/fileMethods'

type Props = {
  isOpen: boolean
  files: File[]
  filename: Filename
  actions: {
    handleOpenEditModal: (data?: Filename) => void
    handleDeleteFile: (id: string) => Promise<void>
    handleUpdateFilename: (data: Filename) => Promise<void>
  }
  isUpdating: boolean
  length: number
  projectID: number
}

const BlankTable = (): JSX.Element => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-5">
      <BlankSlateTableIcon />
      <p className="mt-2 text-center text-slate-500">No files added to this project yet. </p>
      <p className="text-center text-slate-500">Add a file by clicking the upload a file button.</p>
    </div>
  )
}

const FileList: FC<Props> = (props): JSX.Element => {
  const { useHandleDownloadFile } = useFileMethods(props.projectID)
  if (!props.files) null

  const {
    isOpen,
    filename,
    actions: { handleOpenEditModal, handleDeleteFile, handleUpdateFilename },
    length
  } = props

  const handleDownloadFile = async (fileID: string, fileName: string): Promise<void> => {
    const dataBlob = (await useHandleDownloadFile(fileID)) as Blob
    fileDownload(dataBlob, fileName)
  }

  return props.isUpdating ? (
    // Conditionally set the length of the skeleton if there are no files
    <FileListSkeleton length={length + 1} />
  ) : length === 0 ? (
    <BlankTable />
  ) : (
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
          <FileItem
            key={i}
            file={file}
            actions={{ handleOpenEditModal, handleDeleteFile, handleDownloadFile }}
          />
        ))}
      </tbody>
    </table>
  )
}

export default FileList
