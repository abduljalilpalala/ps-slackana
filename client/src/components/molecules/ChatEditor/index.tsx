import ReactMde from 'react-mde'
import React, { FC, useEffect, useState } from 'react'
import { useForm, Controller, UseFormReset } from 'react-hook-form'

import { converter } from '~/utils/mdeOptions'
import SendIcon from '~/shared/icons/SendIcon'
import { ChatMessageValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'

type Props = {
  value?: string
  isLoadingEnterPress: boolean
  handleMessage: (data: ChatMessageValues) => Promise<void>
  checkKeyDown: (
    event: React.KeyboardEvent<HTMLFormElement>,
    data: ChatMessageValues,
    reset: UseFormReset<ChatMessageValues>
  ) => void
}

const ChatEditor: FC<Props> = (props): JSX.Element => {
  const { value, handleMessage, checkKeyDown, isLoadingEnterPress } = props

  const {
    reset,
    control,
    getValues,
    formState,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid }
  } = useForm<ChatMessageValues>({
    mode: 'onChange',
    defaultValues: {
      message: ''
    }
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ message: '' })
    }
  }, [formState, reset])

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')

  return (
    <form
      onSubmit={handleSubmit(handleMessage)}
      className="relative mb-[120px]"
      onKeyDown={(e) =>
        checkKeyDown(
          e,
          {
            message: getValues('message')
          },
          reset
        )
      }
    >
      <Controller
        name="message"
        control={control}
        defaultValue={value}
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
        {!isSubmitting && !isLoadingEnterPress ? (
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
  )
}

export default ChatEditor
