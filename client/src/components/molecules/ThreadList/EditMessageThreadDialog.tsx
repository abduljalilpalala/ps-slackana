import ReactMde from 'react-mde'
import toast from 'react-hot-toast'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { useRouter } from 'next/router'
import { Chat } from '~/redux/chat/chatType'
import { Message } from '~/shared/interfaces'
import { converter } from '~/utils/mdeOptions'
import SendIcon from '~/shared/icons/SendIcon'
import { ERROR_MESSAGE } from '~/utils/messages'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { updateThread } from '~/redux/chat/chatSlice'
import { useAppDispatch } from '~/hooks/reduxSelector'
import DialogBox from '~/components/templates/DialogBox'

type Props = {
  isOpen: boolean
  chat: Chat
  closeModal: () => void
}

const EditMessageThreadDialog: FC<Props> = ({ isOpen, closeModal, chat }): JSX.Element => {
  const router = useRouter()
  const { chat_id } = router.query
  const dispatch = useAppDispatch()
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { isValid }
  } = useForm<Message>({
    mode: 'onChange',
    defaultValues: {
      id: chat.id,
      message: chat.message
    }
  })

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isValid) {
        handleUpdateMessage({ id: chat.id, message: getValues('message') })
      }
    }
  }

  const handleUpdateMessage = (data: Message) => {
    setIsLoading(() => true)
    dispatch(
      updateThread({
        messageId: chat_id,
        threadId: chat.id,
        message: data.message
      })
    )
      .unwrap()
      .then(() => closeModal())
      .catch(() => toast.error(ERROR_MESSAGE))
      .finally(() => setIsLoading(() => false))
  }

  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal} bodyClass="px-0 -my-20">
      <form
        onSubmit={handleSubmit(handleUpdateMessage)}
        onKeyDown={checkKeyDown}
        className="relative -mt-4 mb-10"
      >
        <input {...register('id')} hidden type="text" />
        <Controller
          name="message"
          control={control}
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
        <button
          type="submit"
          className="absolute top-0.5 right-0 py-3.5 px-4 outline-none"
          disabled={!isValid}
        >
          <SubmitButton isLoading={isLoading} isValid={isValid} />
        </button>
      </form>
    </DialogBox>
  )
}

const SubmitButton = ({ isLoading, isValid }: { isLoading: boolean; isValid: boolean }) => {
  if (isLoading) return <Spinner className="h-5 w-5 fill-current text-slate-400" />
  const buttonColor = isValid || isLoading ? 'text-blue-500' : ''
  const disabledState = !isValid ? 'cursor: cursor-not-allowed' : ''

  return (
    <SendIcon className={`h-5 w-5 fill-current text-slate-400 ${buttonColor} ${disabledState}`} />
  )
}

export default EditMessageThreadDialog
