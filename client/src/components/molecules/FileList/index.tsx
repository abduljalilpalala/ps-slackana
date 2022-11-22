import fileDownload from 'js-file-download'
import React, { FC, useCallback, useState } from 'react'

import FileItem from './FIleItem'
import { File } from '~/shared/interfaces'
import SortIcon from '~/shared/icons/SortIcon'
import FileListSkeleton from '../FileListSkeleton'
import { useFileMethods } from '~/hooks/fileMethods'
import EditFilenameDialog from './EditFilenameDialog'
import { BlankSlateTableIcon } from '~/shared/icons/BlankSlateTableIcon'
import { Filename, SortButtonProps, SortFileProps, SortKeys, SortOrder } from '~/shared/types'

type Props = {
  isOpen: boolean
  files: File[]
  filename: Filename
  actions: {
    handleOpenEditModal: (data?: Filename) => void
    handleDeleteFile: (id: string, fileName: string) => Promise<void>
    handleUpdateFilename: (data: Filename) => Promise<void>
  }
  isUpdating: boolean
  length: number
  projectID: number
  searchFilename: string
}

const FileList: FC<Props> = (props): JSX.Element => {
  const { useHandleDownloadFile } = useFileMethods(props.projectID)
  if (!props.files) null

  const [sortKey, setSortKey] = useState<SortKeys>('date_upload')
  const [sortOrder, setSortOrder] = useState<SortOrder>('DESC')

  const {
    isOpen,
    filename,
    actions: { handleOpenEditModal, handleDeleteFile, handleUpdateFilename },
    length,
    searchFilename
  } = props

  const handleDownloadFile = async (fileID: string, fileName: string): Promise<void> => {
    const dataBlob = (await useHandleDownloadFile(fileID)) as Blob
    fileDownload(dataBlob, fileName)
  }

  const sortFileData = ({ tableData, sortKey, reverse }: SortFileProps) => {
    if (!sortKey) return tableData

    const sortedData = props?.files.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1
    })
    if (reverse) {
      return sortedData.reverse()
    }
    return sortedData
  }

  const sortedFileData = useCallback(
    () => sortFileData({ tableData: props?.files, sortKey, reverse: sortOrder === 'DESC' }),
    [props.files, sortKey, sortOrder]
  )

  const changeSort = (key: SortKeys) => {
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    setSortKey(key)
  }

  const headers: { key: SortKeys; label: string }[] = [
    {
      key: 'filename',
      label: 'Filename'
    },
    {
      key: 'size',
      label: 'Size'
    },
    {
      key: 'type',
      label: 'Type'
    },
    {
      key: 'date_upload',
      label: 'Date upload'
    }
  ]

  return props.isUpdating ? (
    // Conditionally set the length of the skeleton if there are no files
    <FileListSkeleton length={length + 1} />
  ) : length === 0 ? (
    <BlankTable />
  ) : (
    <>
      {isOpen ? (
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
      ) : null}
      <table className="w-full divide-y divide-slate-300 border-t border-slate-300 text-left text-sm leading-normal">
        <thead className="text-slate-700">
          <tr>
            {headers.map((row) => (
              <th key={row.key} className="px-6 py-2 font-semibold">
                <SortButton
                  label={row.label}
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey
                  }}
                />
              </th>
            ))}
            <th className="px-6 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-300 text-sm text-slate-600">
          {sortedFileData()
            ?.filter(
              (row: File) =>
                !searchFilename?.length ||
                row?.filename
                  .toString()
                  .toLowerCase()
                  .includes(searchFilename.toString().toLocaleLowerCase())
            )
            ?.map((file, i) => (
              <FileItem
                key={i}
                file={file}
                actions={{ handleOpenEditModal, handleDeleteFile, handleDownloadFile }}
              />
            ))}
        </tbody>
      </table>
    </>
  )
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

const SortButton = ({ label, onClick }: SortButtonProps) => {
  return (
    <button
      type="button"
      className="flex items-center outline-none active:scale-95"
      onClick={onClick}
    >
      {label}
      <SortIcon className="ml-2 h-3 w-3 flex-shrink-0 text-slate-500" />
    </button>
  )
}

export default FileList
