import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

import DialogBox from '~/components/templates/DialogBox'
import FileUploadImage from '~/shared/icons/FileUploadImage'
import { useAppSelector } from '~/hooks/reduxSelector'

type Props = {
  isOpen: boolean
  isSubmitting: boolean
  closeModal: () => void
  actions: {
    handleUploadFiles: (data: FileList | File[], callback: () => void) => Promise<void>
    onClick: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  children: React.ReactNode
}

const DragFileUploadDialog: FC<Props> = (props): JSX.Element => {
  const { error, isError } = useAppSelector((state) => state.file)
  const { isOpen, closeModal, isSubmitting, actions, children } = props

  const onDrop = (acceptedFiles: FileList | File[]) => {
    props.closeModal()
    if (acceptedFiles && !isSubmitting) {
      actions.handleUploadFiles(acceptedFiles, () => {
        if (isError) {
          toast.error(`${error.content}`)
        } else {
          Object.entries(acceptedFiles).forEach((entry) => {
            const [_, value] = entry
            const filename = value.name.split('.').slice(0, -1).join('.')
            toast.success(`${filename} uploaded successfully!`)
          })
        }
      })
    }
  }
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <DialogBox
      isOpen={isOpen}
      closeModal={closeModal}
      hasHeader={true}
      headerTitle="Drag and drop files here"
      bodyClass=""
    >
      <div
        {...getRootProps()}
        className={`flex h-full w-full cursor-pointer flex-col items-center justify-center border-8 border-dashed shadow outline-none transition duration-150 ease-in-out active:scale-95 ${
          isSubmitting ? 'hidden' : ''
        }`}
        onClick={actions.onClick}
      >
        <FileUploadImage className="h-64 w-64 text-primary" />
        <div className="mt-4 text-center">
          <input
            {...getInputProps({
              multiple: true,
              onChange: props.actions.onChange
            })}
          />
          <p className="text-center text-primary">Drag and drop files here to upload</p>
          <p className="text-center text-primary">or click to select files to upload</p>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mt-4">{children}</div>
      </div>
    </DialogBox>
  )
}

export default DragFileUploadDialog
