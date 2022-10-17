import { useForm } from 'react-hook-form'
import React, { FC, useEffect } from 'react'
import { Bold, Italic, Link, List, Code } from 'react-feather'

import SendIcon from '~/shared/icons/SendIcon'
import { ChatMessageValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import ListNumberIcon from '~/shared/icons/ListNumberIcon'
import BlockquoteIcon from '~/shared/icons/BlockquoteIcon'
import StrikeThroughIcon from '~/shared/icons/StrikeThroughIcon'

type Props = {
  handleMessage: (data: ChatMessageValues) => void
}

const ChatEditor: FC<Props> = ({ handleMessage }): JSX.Element => {
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
        <header className="flex flex-1 items-center space-x-2 bg-slate-50 px-3 py-1 group-focus-within:bg-slate-100">
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
              group-focus-within:text-slate-500 hover:bg-slate-200
              
            `}
          >
            <Bold className="p-1" />
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
              group-focus-within:text-slate-500 hover:bg-slate-200
             
            `}
          >
            <Italic className="p-1" />
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed
              group-focus-within:text-slate-500
              hover:bg-slate-200  
            `}
          >
            <StrikeThroughIcon className="h-6 w-6 fill-current p-1 text-slate-400 group-focus-within:text-slate-500" />
          </button>
          <span className="h-4 w-[1px] bg-slate-300"></span>
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
              group-focus-within:text-slate-500 hover:bg-slate-200
              
            `}
          >
            <Link className="p-1" />
          </button>
          <span className="h-4 w-[1px] bg-slate-300"></span>
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
              group-focus-within:text-slate-500 hover:bg-slate-200
              
            `}
          >
            <ListNumberIcon className="h-6 w-6 fill-current p-1 text-slate-400 group-focus-within:text-slate-500" />
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
              group-focus-within:text-slate-500 hover:bg-slate-200
              
            `}
          >
            <List className="stroke-1.5 p-0.5" />
          </button>
          <span className="h-4 w-[1px] bg-slate-300"></span>
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
              group-focus-within:text-slate-500 hover:bg-slate-200
              
            `}
          >
            <BlockquoteIcon className="h-6 w-6 fill-current p-1 text-slate-400 group-focus-within:text-slate-500" />
          </button>
          <span className="h-4 w-[1px] bg-slate-300"></span>
          <button
            type="button"
            disabled={isSubmitting}
            className={`
              rounded outline-none focus:bg-slate-200 disabled:cursor-pointer 
              group-focus-within:text-slate-500 hover:bg-slate-200  
            `}
          >
            <Code className="p-1" />
          </button>
        </header>
        <div className="flex items-center px-2">
          <input
            type="text"
            {...register('message', { required: true })}
            placeholder="Message #Team 6 Digits"
            disabled={isSubmitting}
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
