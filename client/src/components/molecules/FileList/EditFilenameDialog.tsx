import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Filename } from '~/shared/types'
import { styles } from '~/shared/twin/auth.styles'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import DialogBox from '~/components/templates/DialogBox'

type Props = {
  isOpen: boolean
  filename: Filename
  closeModal: (data?: Filename) => void
  actions: {
    handleUpdateFilename: (data: Filename) => Promise<void>
  }
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

  return (
    <DialogBox
      isOpen={isOpen}
      closeModal={closeModal}
      hasHeader={true}
      headerTitle="Edit Filename"
      bodyClass="px-8"
    >
      <form className="-mt-4 mb-10" onSubmit={handleSubmit(handleUpdateFilename)}>
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
