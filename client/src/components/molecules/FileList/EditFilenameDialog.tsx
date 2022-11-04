import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Filename } from '~/shared/types'
import { styles } from '~/shared/twin/auth.styles'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import DialogBox from '~/components/templates/DialogBox'
import { EditFilenameModal } from './EditFilenameModal'
import { useAppSelector } from '~/hooks/reduxSelector'

type Props = {
  isOpen: boolean
  filename: Filename
  closeModal: (data?: Filename) => void
  actions: {
    handleUpdateFilename: (data: Filename) => Promise<void>
  }
}

type FormData = {
  filename: string
  id: string
}

const EditFilenameDialog: FC<Props> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    filename: { id, filename },
    actions: { handleUpdateFilename }
  } = props

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<Filename>({
    defaultValues: {
      id: id,
      filename
    }
  })

  const files = useAppSelector((state) => state.file.files)

  const onSubmit = async (data: FormData) => {
    const { filename } = data
    // Check if there are duplicates
    const duplicateFiles = files.filter((file) => {
      const filename = file.filename.split('.')[0]
      return filename === data.filename && file.id !== data.id
    })

    if (duplicateFiles.length > 0) {
      EditFilenameModal(
        'The file has duplicates, do you want to continue?',
        '',
        async (confirmed: boolean) => {
          if (confirmed) {
            // Look for all files that starts with the file name
            const fileMatches = files.filter((file) => {
              const filename = file.filename.split('.')[0]
              return filename.startsWith(data.filename) && file.id !== data.id
            })
            const newFileName = `${filename}-(${fileMatches.length})`
            await handleUpdateFilename({ id: data.id, filename: newFileName })
            closeModal({ id: data.id, filename: newFileName })
          }
        }
      )
    } else {
      // if there are no duplicates, just rename the file
      await handleUpdateFilename({ id, filename })
      closeModal({ id, filename })
    }
  }

  return (
    <DialogBox
      isOpen={isOpen}
      closeModal={closeModal}
      hasHeader={true}
      headerTitle="Edit Filename"
      bodyClass="px-8"
    >
      <form className="-mt-4 mb-10" onSubmit={handleSubmit(onSubmit)}>
        {/*
         * This will partially stored the `id` for filename to conditionally
         * update into the database
         */}
        <input {...register('id')} hidden type="text" defaultValue={id} />
        <div>
          {/*
           * This is the `filename` input field ready to edit
           */}
          <input
            type="text"
            {...register('filename', { required: true })}
            autoFocus
            defaultValue={filename}
            className="w-full overflow-hidden rounded-lg border border-slate-300 transition duration-150 ease-in-out"
          />
          {errors?.filename && <span className="error">{`${errors?.filename?.message}`}</span>}
        </div>
        <div className="mt-3">
          <button type="submit" css={styles.form_submit} disabled={isSubmitting}>
            {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save'}
          </button>
        </div>
      </form>
    </DialogBox>
  )
}

export default EditFilenameDialog
