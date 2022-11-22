import { NextPage } from 'next'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Upload, Link2 as LinkIcon, Search } from 'react-feather'

import { Filename } from '~/shared/types'
import { useFileMethods } from '~/hooks/fileMethods'
import { useAppSelector } from '~/hooks/reduxSelector'
import FileList from '~/components/molecules/FileList'
import Pagination from '~/components/atoms/Pagination'
import ProjectLayout from '~/components/templates/ProjectLayout'
import PaginationSkeleton from '~/components/molecules/PaginationSkeleton'
import DragFileUploadDialog from '~/components/molecules/FileList/DragFileUploadDialog'
import { DeleteConfirmModal } from '~/components/molecules/FileList/DeleteConfirmModal'

const Files: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id: projectIDFiles } = router.query
  const {
    isLoading: isFileMethodLoading,
    files,
    useHandleCreateFiles,
    useHandleRenameFile,
    useHandleDeleteFile
  } = useFileMethods(parseInt(projectIDFiles as string))
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDragUpload, setIsOpenDragUpload] = useState<boolean>(false)
  const { error, isError } = useAppSelector((state) => state.file)
  const [searchFilename, setSearchFilename] = useState<string>('')
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

  const handleOpenDragUploadDialog = (): void => setIsOpenDragUpload(!isOpenDragUpload)

  /*
   * This is the toggle for Edit Modal
   */
  const handleOpenEditModal = (data?: Filename): void => {
    setFilename({
      id: data?.id,
      filename: data?.filename?.split('.')[0]
    })
    setIsOpen(!isOpen)
  }

  /*
   * Handle Update Filename
   */
  const handleUpdateFilename = async (data: Filename): Promise<void> => {
    useHandleRenameFile(filename.id, data.filename, () => {
      if (isError) {
        toast.error(`${filename.filename} renaming to ${data.filename} failed! ${error.content}`)
      } else {
        toast.success(`${filename.filename} renamed to ${data.filename}!`)
      }
    })
    handleOpenEditModal(data)
  }

  /*
   * Handle Delete the File
   */
  const handleDeleteFile = async (id: string, fileName: string): Promise<void> => {
    DeleteConfirmModal(() => {
      useHandleDeleteFile(id, () => {
        const name = fileName.split('.').slice(0, -1).join('.')
        if (isError) {
          toast.error(`${name} failed to delete! ${error.content}`)
        } else {
          toast.success(`${name} deleted!`)
        }
      })
    })
  }

  return (
    <ProjectLayout metaTitle="Files">
      <section className="mx-auto flex w-full max-w-7xl flex-col justify-between overflow-hidden bg-white px-4 pt-5 pb-4">
        <FileHeader
          useHandleCreateFiles={useHandleCreateFiles}
          isSubmitting={isFileMethodLoading}
          isOpenDragUpload={isOpenDragUpload}
          handleOpenDragUploadDialog={handleOpenDragUploadDialog}
          setSearchFilename={setSearchFilename}
        />
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
            isUpdating={isFileMethodLoading}
            length={files.length}
            projectID={parseInt(projectIDFiles as string)}
            searchFilename={searchFilename}
          />
        </main>
        <footer className="mt-3 flex items-center justify-center ">
          {/*
           * This will render
           * the table pagination
           */}
          {pageCount > 1 ? (
            isFileMethodLoading ? (
              <PaginationSkeleton />
            ) : (
              <Pagination
                length={files?.length}
                pageNumber={pageNumber}
                pageCount={pageCount}
                actions={{ changePage }}
              />
            )
          ) : null}
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
type FileHeaderProps = {
  useHandleCreateFiles: (data: any, callback: () => void) => Promise<void>
  isSubmitting: boolean
  isOpenDragUpload: boolean
  handleOpenDragUploadDialog: () => void
  setSearchFilename: React.Dispatch<React.SetStateAction<string>>
}

const FileHeader = (props: FileHeaderProps): JSX.Element => {
  const error = useAppSelector((state) => state.file.error)
  const isError = useAppSelector((state) => state.file.isError)
  const { userPermission: can } = useAppSelector((state) => state.project)
  /*
   * Add files
   */
  const { useHandleCreateFiles, isSubmitting, setSearchFilename } = props
  const hiddenFileInput = React.useRef<HTMLInputElement>(null)
  const handleClick = (): void => {
    hiddenFileInput.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fileUploaded = e.target.files

    if (fileUploaded && !isSubmitting) {
      props.handleOpenDragUploadDialog()

      useHandleCreateFiles(fileUploaded, () => {
        if (isError) {
          toast.error(`${error.content}`)
        } else {
          Object.entries(fileUploaded).forEach((entry) => {
            const [_, value] = entry
            const filename = value.name.split('.').slice(0, -1).join('.')
            toast.success(`${filename} uploaded successfully!`)
          })
        }
        e.target.value = ''
      })
    }
  }

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
      {/* Create a button for toggling DragFileUploadDialog component */}

      {can?.uploadFile ? (
        <div className="flex items-center space-x-2">
          <div className="group relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-24 rounded border-slate-300 py-1 pl-8 text-sm sm:w-32 md:w-40 lg:w-full"
              onChange={(e) => setSearchFilename(e.target.value)}
            />
            <Search className="absolute left-2 h-4 w-4 text-slate-400 group-focus-within:text-blue-600" />
          </div>
          <button
            type="button"
            className={`flex cursor-pointer items-center space-x-2 rounded border border-blue-700 bg-blue-600 px-2 py-[0.26rem] text-sm
            text-white shadow outline-none transition duration-150 ease-in-out focus:bg-blue-600 hover:bg-blue-700 active:scale-95 ${
              isSubmitting ? 'hidden' : ''
            }`}
            onClick={props.handleOpenDragUploadDialog}
          >
            <Upload className="h-4 w-4" />
            <span> Upload Files</span>
          </button>
        </div>
      ) : null}

      <DragFileUploadDialog
        isOpen={props.isOpenDragUpload}
        closeModal={props.handleOpenDragUploadDialog}
        isSubmitting={isSubmitting}
        actions={{
          handleUploadFiles: useHandleCreateFiles,
          onClick: handleClick,
          onChange: handleChange
        }}
      >
        <div className="flex justify-center">
          {can?.uploadFile ? (
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              id="upload"
              className="hidden"
              multiple
            />
          ) : null}
        </div>
      </DragFileUploadDialog>
    </header>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Files
