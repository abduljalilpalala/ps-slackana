import ReactMde from 'react-mde'
import { useForm, Controller } from 'react-hook-form'
import React, { FC, useEffect, useState } from 'react'

import SendIcon from '~/shared/icons/SendIcon'
import { ChatMessageValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { converter, save } from '~/utils/mdeOptions'

type Props = {
  value?: string
  handleMessage: (data: ChatMessageValues) => void
}

const ChatEditor: FC<Props> = ({ value, handleMessage }): JSX.Element => {
  const {
    reset,
    control,
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
    <form onSubmit={handleSubmit(handleMessage)} className="relative mb-[120px]">
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
  )
}

export default ChatEditor
