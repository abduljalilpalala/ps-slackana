import { useForm } from 'react-hook-form'
import React, { FC, useEffect } from 'react'

import SendIcon from '~/shared/icons/SendIcon'
import { ChatMessageValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'

import TextEditorButtons from '~/components/atoms/TextEditorButtons'

type Props = {
  value?: string
  handleMessage: (data: ChatMessageValues) => void
}

const ChatEditor: FC<Props> = ({ value, handleMessage }): JSX.Element => {
  const {
    register,
    reset,
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

  return (
    <footer
      className={`
        mb-[120px] w-full flex-shrink-0 bg-white text-slate-400 focus-within:text-slate-900
        ${isSubmitting ? 'bg-opacity-50' : ''}
    `}
    >
      <form
        onSubmit={handleSubmit(handleMessage)}
        className={`
          group overflow-hidden rounded-lg border border-slate-200 transition duration-200 
          ease-in-out focus-within:border-slate-300 focus-within:shadow-sm
      `}
      >
        <TextEditorButtons isSubmitting={isSubmitting} />
        <div className="flex items-center px-2">
          <input
            type="text"
            {...register('message', { required: true })}
            placeholder="Message #Team 6 Digits"
            disabled={isSubmitting}
            defaultValue={value}
            className={`
              w-full select-none border-none py-3.5 text-sm outline-none 
            placeholder:text-slate-400 focus:border-slate-600 focus:ring-0 
              focus:placeholder:text-slate-500 disabled:bg-opacity-50
            `}
            autoComplete="off"
          />
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
        </div>
      </form>
    </footer>
  )
}

export default ChatEditor
