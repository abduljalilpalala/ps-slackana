import ReactMde from 'react-mde'
import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { converter } from '~/utils/mdeOptions'
import SendIcon from '~/shared/icons/SendIcon'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import DialogBox from '~/components/templates/DialogBox'
import { Message, Thread, ThreadMessage } from '~/shared/interfaces'

type Props = {
  isOpen: boolean
  threadMessage: ThreadMessage
  closeModal: () => void
  actions: {
    handleUpdateThread: (data: ThreadMessage) => Promise<void>
  }
}

const EditMessageDialog: FC<Props> = (props): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')
  const {
    isOpen,
    closeModal,
    threadMessage,
    actions: { handleUpdateThread }
  } = props

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid }
  } = useForm<ThreadMessage>({
    defaultValues: {
      thread_id: threadMessage.id,
      message: threadMessage.message
    }
  })

  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal} bodyClass="px-0 -my-20">
      <form onSubmit={handleSubmit(handleUpdateThread)} className="relative -mt-4 mb-10">
        <input
          {...register('thread_id')}
          hidden
          type="text"
          defaultValue={threadMessage.thread_id}
        />
        <Controller
          name="message"
          control={control}
          defaultValue={threadMessage.message}
          rules={{ required: 'You must a message to reply.' }}
          render={({ field }) => (
            <ReactMde
              {...field}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
              childProps={{
                writeButton: {
                  tabIndex: -1
                }
              }}
            />
          )}
        />
        <button type="submit" className="absolute top-0.5 right-0 py-3.5 px-4 outline-none">
          {!isSubmitting ? (
            <SendIcon
              className={`
                h-5 w-5 fill-current text-slate-400
                ${isDirty || isValid || isSubmitting ? 'text-blue-500' : ''}
              `}
            />
          ) : (
            <Spinner className="h-5 w-5 fill-current text-slate-400" />
          )}
        </button>
      </form>
    </DialogBox>
  )
}

export default EditMessageDialog
