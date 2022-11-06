import moment from 'moment'
import ReactMde from 'react-mde'
import ReactTooltip from 'react-tooltip'
import ReactMarkdown from 'react-markdown'
import { ChevronRight } from 'react-feather'
import { NextRouter, useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import React, { FC, useEffect, useRef, useState } from 'react'

import { Chat } from '~/redux/chat/chatType'
import { Message } from '~/shared/interfaces'
import SendIcon from '~/shared/icons/SendIcon'
import { converter } from '~/utils/mdeOptions'
import DownRight from '~/shared/icons/DownRightIcon'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { useAppSelector } from '~/hooks/reduxSelector'
import DialogBox from '~/components/templates/DialogBox'
import MessageOptionDropdown from '../MessageOptionDropdown'
import ThreadMessageIcon from '~/shared/icons/ThreadMessageIcon'

type Props = {
  chatData: Chat[]
  isOpenEditModal: boolean
  actions: {
    handleDeleteMessage: (messageId: number) => Promise<void>
    handleUpdateMessage: (data?: Message) => Promise<void>
    handleCloseEditModalToggle: () => void
  }
}

const ChatList: FC<Props> = (props): JSX.Element => {
  const messageRef = useRef<HTMLDivElement>(null)
  const { user: author } = useAppSelector((state) => state.auth)
  const {
    chatData,
    isOpenEditModal,
    actions: { handleDeleteMessage, handleUpdateMessage, handleCloseEditModalToggle }
  } = props

  const [chatMessage, setChatMessage] = useState<Message>({
    id: 0,
    message: ''
  })

  const router: NextRouter = useRouter()

  const handleOpenEditMessageDialog = (message: Message): void => {
    setChatMessage(message)
    handleCloseEditModalToggle()
  }

  const { id } = router.query

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }, [chatData])

  return (
    <div className="flex flex-col py-4" ref={messageRef}>
      {isOpenEditModal && (
        <EditMessageDialog
          isOpen={isOpenEditModal}
          chatMessage={chatMessage}
          closeModal={handleCloseEditModalToggle}
          actions={{ handleUpdateMessage }}
        />
      )}
      {chatData.map((chat) => {
        const user = chat?.member?.user
        return (
          <section
            key={chat.id}
            className="group-message relative flex items-start space-x-2 px-6 py-2 transition duration-75 ease-in-out hover:bg-slate-100"
          >
            <header className="flex-shrink-0">
              <img src={user?.avatar?.url} className="h-8 w-8 rounded-md" alt="" />
            </header>
            <main className="text-sm text-slate-900">
              <header className="flex items-end space-x-2">
                <h3 className="font-bold line-clamp-1">{user.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {moment(chat.created_at).fromNow()}
                </p>
              </header>
              <section>
                <article className="prose pb-6">
                  <ReactMarkdown children={chat.message} />
                </article>
                {chat.thread?.length ? (
                  <button
                    onClick={() => router.push(`/team/${id}/chat/?chat_id=${chat.id}`)}
                    className="group -mx-1 flex w-[300px] items-center justify-between rounded border border-transparent p-1 text-xs hover:border-slate-200 hover:bg-white"
                  >
                    <div className="flex items-center space-x-2">
                      <DownRight className="h-5 w-5 fill-current text-slate-500" />
                      <h4 className="shrink-0 font-semibold text-blue-600 hover:underline">
                        {chat.thread.length} replies
                      </h4>
                      <span className="font-medium text-slate-500 group-hover:hidden">
                        {moment(chat.created_at).fromNow()}
                      </span>
                      <span className="hidden shrink-0 font-medium text-slate-500 group-hover:block">
                        View Thread
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500 opacity-0 group-hover:opacity-100" />
                  </button>
                ) : null}
              </section>
            </main>
            <aside
              className={`
                absolute right-4 -top-4 flex items-center justify-center space-x-0.5 rounded border
              border-slate-300 bg-white px-0.5 pt-0.5 opacity-0 shadow-lg group-message-hover:opacity-100
              `}
            >
              <button
                onClick={() => router.push(`/team/${id}/chat/?chat_id=${chat.id}`)}
                data-for="actions"
                data-tip="Reply to thread"
                className="rounded p-1 text-slate-400 focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900"
              >
                <ThreadMessageIcon className="h-5 w-5 fill-current" />
              </button>
              {author?.id === user?.id && (
                <MessageOptionDropdown
                  chat={chat}
                  actions={{ handleDeleteMessage, handleOpenEditMessageDialog }}
                />
              )}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                id="actions"
                getContent={(dataTip) => dataTip}
                className="!rounded-lg !bg-black !text-xs font-semibold !text-white"
              />
            </aside>
          </section>
        )
      })}
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
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')
  const {
    isOpen,
    closeModal,
    chatMessage,
    actions: { handleUpdateMessage }
  } = props

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid }
  } = useForm<Message>({
    defaultValues: {
      id: chatMessage.id,
      message: chatMessage.message
    }
  })

  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal} bodyClass="px-0 -my-20">
      <form onSubmit={handleSubmit(handleUpdateMessage)} className="relative -mt-4 mb-10">
        <input {...register('id')} hidden type="text" defaultValue={chatMessage.id} />
        <Controller
          name="message"
          control={control}
          defaultValue={chatMessage.message}
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

export default ChatList
