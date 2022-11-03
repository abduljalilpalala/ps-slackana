import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import { Edit3, Trash, Download } from 'react-feather'

import { Filename } from '~/shared/types'
import { File } from '~/shared/interfaces'
import { fileIconType } from '~/shared/jsons/fileIconType'
import { useAppSelector } from '~/hooks/reduxSelector'

const ReactTooltip = dynamic(() => import('react-tooltip'), { ssr: false })

type Props = {
  file: File
  actions: {
    handleOpenEditModal: (data?: Filename) => void
    handleDeleteFile: (id: string) => Promise<void>
  }
}

const FileItem: FC<Props> = (props): JSX.Element => {
  const {
    file: { id, filename, size, type, date_upload },
    actions: { handleOpenEditModal, handleDeleteFile }
  } = props

  const { userPermission: can } = useAppSelector((state) => state.project)

  const data = {
    id,
    filename
  }

  return (
    <tr className="group transition duration-75 ease-in-out hover:bg-slate-100">
      <td className="flex w-full max-w-[220px] items-center space-x-1 py-2 px-6">
        {fileIconType.map(
          (fileIcon, i) =>
            fileIcon.name.includes(type) && (
              <fileIcon.Icon key={i} className="h-5 w-5 flex-shrink-0 stroke-1" />
            )
        )}
        <span className="line-clamp-1">{filename}</span>
      </td>
      <td className="py-2 px-6">
        <span className="line-clamp-1">{size}</span>
      </td>
      <td className="max-w-[140px] py-2 px-6">
        <span className="line-clamp-1">{type}</span>
      </td>
      <td className="py-2 px-6">
        <span className="line-clamp-1">{date_upload}</span>
      </td>
      <td className="block max-w-[140px] py-2 px-6">
        <div
          className={`
            flex w-full items-center justify-evenly rounded border border-transparent 
            bg-white py-0.5 group-hover:border-slate-300
          `}
        >
          <button
            className={`outline-none active:scale-95 ${can?.renameFile ? '' : 'hidden'}`}
            data-for="actions"
            data-tip="Edit"
            onClick={() => handleOpenEditModal(data)}
          >
            <Edit3 className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            className={`outline-none active:scale-95 ${can?.deleteFile ? '' : 'hidden'}`}
            data-for="actions"
            data-tip="Delete"
            onClick={() => handleDeleteFile(id)}
          >
            <Trash className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            className={`outline-none active:scale-95 ${can?.downloadFile ? '' : 'hidden'}`}
            data-for="actions"
            data-tip="Download"
          >
            <Download className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <ReactTooltip
            place="top"
            type="dark"
            effect="solid"
            id="actions"
            getContent={(dataTip) => dataTip}
            className="!rounded-lg !bg-black !text-xs font-semibold !text-white"
          />
        </div>
      </td>
    </tr>
  )
}

export default FileItem
