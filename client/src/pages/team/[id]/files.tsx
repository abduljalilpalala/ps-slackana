import { NextPage } from 'next'
import React, { useState } from 'react'
import { Upload, Link2 as LinkIcon } from 'react-feather'

import { Filename } from '~/shared/types'
import { files } from '~/shared/jsons/filesData'
import FileList from '~/components/molecules/FileList'
import Pagination from '~/components/atoms/Pagination'
import ProjectLayout from '~/components/templates/ProjectLayout'

const Files: NextPage = (): JSX.Element => {
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  /*
   * This will partially store the id and filename in modal
   */
  const [filename, setFilename] = useState<any>({
    id: '',
    filename: ''
  })

  /*
   * This is the logic for creating a custom pagination
   */
  const filesPerPage = 14
  const pagesVisited = pageNumber * filesPerPage
  const displayFiles = files.slice(pagesVisited, pagesVisited + filesPerPage)
  const pageCount = Math.ceil(files.length / filesPerPage)
  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)

  /*
   * This is the toggle for Edit Modal
   */
  const handleOpenEditModal = (data?: Filename): void => {
    setFilename(data)
    setIsOpen(!isOpen)
  }

  /*
   * Handle Update Filename
   */
  const handleUpdateFilename = async (data: Filename): Promise<void> => {
    alert(JSON.stringify(data, null, 2))
    handleOpenEditModal()
  }

  /*
   * Handle Delete the File
   */
  const handleDeleteFile = async (id: string): Promise<void> => {
    if (confirm('Do you want to delete?')) {
      alert(`deleted ${id}`)
    }
  }

  return (
    <ProjectLayout metaTitle="Files">
      <section className="mx-auto flex w-full max-w-7xl flex-col justify-between overflow-hidden bg-white px-4 pt-5 pb-4">
        <FileHeader />
        <main
          className={`
            h-full overflow-y-auto rounded-b-md border-x border-b border-slate-300 bg-white 
            scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md
          `}
        >
          {/*
           * This will render the table
           * - Filename
           * - Size
           * - Type
           * - Date Upload
           * - Actions
           */}
          <FileList
            isOpen={isOpen}
            filename={filename}
            files={displayFiles}
            actions={{ handleOpenEditModal, handleDeleteFile, handleUpdateFilename }}
          />
        </main>
        <footer className="mt-3 flex items-center justify-center ">
          {/*
           * This will render
           * the table pagination
           */}
          <Pagination
            length={files?.length}
            pageNumber={pageNumber}
            pageCount={pageCount}
            actions={{ changePage }}
          />
        </footer>
      </section>
    </ProjectLayout>
  )
}

/*
 * Details
 * - List of Files
 * - Upload Files button
 */
const FileHeader = (): JSX.Element => {
  return (
    <header
      className={`
        sticky top-0 left-0 z-10 flex w-full flex-1 items-center justify-between rounded-t-md border-x border-t border-slate-300 bg-white
        px-6 py-2
      `}
    >
      <div className="flex items-center space-x-2 text-slate-600">
        <LinkIcon className="h-5 w-5" />
        <h1 className="text-sm font-medium">List of Files</h1>
      </div>
      <label
        htmlFor="upload"
        className={`
          flex cursor-pointer items-center rounded border border-blue-700 bg-blue-600 px-2 py-[0.26rem] text-sm text-white
          shadow outline-none transition duration-150 ease-in-out focus:bg-blue-600 hover:bg-blue-700 active:scale-95 
        `}
      >
        <input type="file" id="upload" className="hidden" />
        <Upload className="mr-2 h-4 w-4" />
        Upload Files
      </label>
    </header>
  )
}

export default Files
