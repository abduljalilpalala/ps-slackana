import ReactMde from 'react-mde'
import toast from 'react-hot-toast'
import React, { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { useRouter } from 'next/router'
import { converter } from '~/utils/mdeOptions'
import SendIcon from '~/shared/icons/SendIcon'
import { ERROR_MESSAGE } from '~/utils/messages'
import { ChatMessageValues, MemberType } from '~/shared/types'
import { addMessage, setAddedMessage } from '~/redux/chat/chatSlice'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import moment from 'moment'

const ChatEditor: FC = (): JSX.Element => {
  const {
    reset,
    control,
    getValues,
    handleSubmit,
    formState: { isValid }
  } = useForm<ChatMessageValues>({
    mode: 'onChange'
  })

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id } = router.query
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    project: { overviewProject },
    auth: { user }
  } = useAppSelector((state) => state)

  const getMemberFromProject = () => {
    return overviewProject?.members?.filter(
      (member: MemberType) => member?.user?.id === user?.id
    )[0]
  }

  const handleMessage = ({ message }: ChatMessageValues) => {
    setIsLoading(() => true)
    dispatch(addMessage({ projectId: id, message }))
      .unwrap()
      .then(() => reset({ message: '' }))
      .catch(() => {
        reset({ message: '' })
        dispatch(
          setAddedMessage({
            id: Math.random(),
            member: getMemberFromProject(),
            message: message,
            threadCount: undefined,
            thread: [],
            created_at: moment().toString()
          })
        )
      })
      .finally(() => setIsLoading(() => false))
  }

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>, message: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isValid) {
        handleMessage({ message })
      }
    }
  }

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')

  return (
    <form
      onSubmit={handleSubmit(handleMessage)}
      className="relative mb-[120px]"
      onKeyDown={(e) => checkKeyDown(e, getValues('message'))}
    >
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
        disabled={!isValid || isLoading}
      >
        <SubmitButton isLoading={isLoading} isValid={isValid} />
      </button>
    </form>
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

export default ChatEditor
