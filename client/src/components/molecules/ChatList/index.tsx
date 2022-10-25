import { useForm } from 'react-hook-form'
import React, { FC, useState } from 'react'
import { ChevronRight } from 'react-feather'
import { NextRouter, useRouter } from 'next/router'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { styles } from '~/shared/twin/auth.styles'
import { Chat, Message } from '~/shared/interfaces'
import DownRight from '~/shared/icons/DownRightIcon'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import Tooltip from '~/components/templates/Tooltip'
import DialogBox from '~/components/templates/DialogBox'
import MessageOptionDropdown from '../MessageOptionDropdown'
import ThreadMessageIcon from '~/shared/icons/ThreadMessageIcon'

type Props = {
  chatData: Chat[]
  isOpenEditModal: boolean
  actions: {
    handleDeleteMessage: (id: string) => Promise<void>
    handleUpdateMessage: (data: Message) => Promise<void>
    handleCloseEditModalToggle: () => void
  }
}

const ChatList: FC<Props> = (props): JSX.Element => {
  const {
    chatData,
    isOpenEditModal,
    actions: { handleDeleteMessage, handleUpdateMessage, handleCloseEditModalToggle }
  } = props

  const [chatMessage, setChatMessage] = useState<Message>({
    id: '',
    message: ''
  })

  const router: NextRouter = useRouter()

  const handleOpenEditMessageDialog = (message: Message): void => {
    setChatMessage(message)
    handleCloseEditModalToggle()
  }

  const { id } = router.query

  return (
    <div className="flex flex-col">
      {isOpenEditModal && (
        <EditMessageDialog
          isOpen={isOpenEditModal}
          chatMessage={chatMessage}
          closeModal={handleCloseEditModalToggle}
          actions={{ handleUpdateMessage }}
        />
      )}
      {chatData.map((chat: Chat, i: number) => (
        <section
          key={chat?.id}
          className="group-message relative flex items-start space-x-2 px-6 py-2 transition duration-75 ease-in-out hover:bg-slate-100"
        >
          <header className="flex-shrink-0">
            <img src={chat.avatar_url} className="h-8 w-8 rounded-md" alt="" />
          </header>
          <main className="text-sm text-slate-900">
            <header className="flex items-end space-x-2">
              <h3 className="font-bold line-clamp-1">{chat.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-1">{chat.created_at}</p>
            </header>
            <section>
              <p className="font-normal leading-6">{chat.message}</p>
              {chat.threads && (
                <button
                  onClick={() => router.push(`/team/${id}/chat/?chat_id=${chat.id}`)}
                  className="group -mx-1 flex w-full max-w-md items-center justify-between rounded border border-transparent p-1 text-xs hover:border-slate-200 hover:bg-white"
                >
                  <div className="flex items-center space-x-2">
                    <DownRight className="h-5 w-5 fill-current text-slate-500" />
                    <h4 className="font-semibold text-blue-600 hover:underline">
                      {chat.reply_count} replies
                    </h4>
                    <span className="font-medium text-slate-500 group-hover:hidden">
                      24 hours ago
                    </span>
                    <span className="hidden font-medium text-slate-500 group-hover:block">
                      View Thread
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100" />
                </button>
              )}
            </section>
          </main>
          <aside
            className={`
              absolute right-4 -top-4 flex items-center justify-center space-x-0.5 rounded border
              border-slate-300 bg-white px-0.5 pt-0.5 opacity-0 shadow-lg group-message-hover:opacity-100
            `}
          >
            <Tooltip text="Reply in thread">
              <button
                onClick={() => router.push(`/team/${id}/chat/?chat_id=${chat.id}`)}
                className="rounded p-1 text-slate-400 focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900"
              >
                <ThreadMessageIcon className="h-5 w-5 fill-current" />
              </button>
            </Tooltip>
            <Tooltip text="Options">
              <MessageOptionDropdown
                chat={chat}
                actions={{ handleDeleteMessage, handleOpenEditMessageDialog }}
              />
            </Tooltip>
          </aside>
        </section>
      ))}
    </div>
  )
}

type EditMessageDialogProps = {
  isOpen: boolean
  chatMessage: Message
  closeModal: () => void
  actions: {
    handleUpdateMessage: (data: Message) => Promise<void>
  }
}

const EditMessageDialog: FC<EditMessageDialogProps> = (props): JSX.Element => {
  const {
    isOpen,
    closeModal,
    chatMessage,
    actions: { handleUpdateMessage }
  } = props

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<Message>({
    defaultValues: {
      id: chatMessage.id,
      message: chatMessage.message
    }
  })

  return (
    <DialogBox
      isOpen={isOpen}
      closeModal={closeModal}
      hasHeader={true}
      headerTitle="Edit Message"
      bodyClass="px-8"
    >
      <form className="-mt-4 mb-10" onSubmit={handleSubmit(handleUpdateMessage)}>
        <input {...register('id')} hidden type="text" defaultValue={chatMessage.id} />
        <div>
          <ReactTextareaAutosize
            {...register('message', { required: true })}
            autoFocus
            defaultValue={chatMessage.message}
            className="min-h-[150px] w-full resize-none overflow-hidden rounded-lg border border-slate-300 transition duration-150 ease-in-out"
          />
          {errors?.message && <span className="error">{`${errors?.message?.message}`}</span>}
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

export default ChatList
