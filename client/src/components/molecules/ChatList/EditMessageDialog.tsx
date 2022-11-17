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
import { updateMessage } from '~/redux/chat/chatSlice'
import { useAppDispatch } from '~/hooks/reduxSelector'
import DialogTemplate from '~/components/templates/DialogTemplate'

type Props = {
  isOpen: boolean
  chat: Chat
  closeModal: () => void
}

const EditMessageDialog: FC<Props> = ({ isOpen, closeModal, chat }): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
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
      updateMessage({
        projectId: id,
        messageId: chat.id,
        message: data.message
      })
    )
      .unwrap()
      .then(() => closeModal())
      .catch(() => toast.error(ERROR_MESSAGE))
      .finally(() => setIsLoading(() => false))
  }

  return (
    <DialogTemplate isOpen={isOpen} closeModal={closeModal}>
      <form
        onSubmit={handleSubmit(handleUpdateMessage)}
        onKeyDown={checkKeyDown}
        className="relative rounded-xl bg-white"
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
          className="absolute top-2 right-2 bg-[#f8fafc] py-2 px-2 outline-none"
          disabled={!isValid}
        >
          <SubmitButton isLoading={isLoading} isValid={isValid} />
        </button>
      </form>
    </DialogTemplate>
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

export default EditMessageDialog
