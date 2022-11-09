import moment from 'moment'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'
import ReactMarkdown from 'react-markdown'
import React, { FC, useEffect, useState } from 'react'

import { Chat } from '~/redux/chat/chatType'
import { ThreadMessage } from '~/shared/interfaces'
import EditMessageDialog from './EditMessageDialog'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { showMessage } from '~/redux/chat/chatSlice'
import ThreadOptionDropdown from '../ThreadOptionDropdown'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import handleImageError from '~/helpers/handleImageError'

type Props = {
  isLoadingThread: boolean
  chatData: Chat[]
  threads: Chat[]
  isOpenEditModalThread: boolean
  actions: {
    handleDeleteThread: (payload: {
      messageId: string | string[] | undefined
      threadId: number
    }) => Promise<void>
    handleUpdateThread: (data: ThreadMessage) => Promise<void>
    handleCloseEditModalThreadToggle: () => void
  }
}

const ThreadList: FC<Props> = (props): JSX.Element => {
  const {
    isLoadingThread,
    isOpenEditModalThread,
    threads,
    actions: { handleDeleteThread, handleUpdateThread, handleCloseEditModalThreadToggle }
  } = props

  const { message } = useAppSelector((state) => state.chat)
  const [threadMessage, setThreadMessage] = useState<ThreadMessage>({
    id: 0,
    thread_id: 0,
    message: ''
  })

  const router = useRouter()
  const { id, chat_id } = router.query
  const dispatch = useAppDispatch()
  const { user: author } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (chat_id) {
      onLoadThread()
    }
  }, [chat_id])

  const onLoadThread = async () => {
    if (id && chat_id) {
      const payload = {
        projectId: id,
        messageId: chat_id
      }
      await dispatch(showMessage(payload))
    }
  }

  const handleOpenEditThreadDialog = (thread?: Chat) => {
    const data = {
      thread_id: thread?.id,
      message: thread?.message
    }
    setThreadMessage(data)
    handleCloseEditModalThreadToggle()
  }

  return (
    <div className="flex flex-col">
      {isOpenEditModalThread && (
        <EditMessageDialog
          isOpen={isOpenEditModalThread}
          threadMessage={threadMessage}
          closeModal={handleCloseEditModalThreadToggle}
          actions={{ handleUpdateThread }}
        />
      )}
      {isLoadingThread ? (
        <div className="flex items-center justify-center py-6">
          <Spinner className="h-5 w-5 text-blue-500" />
        </div>
      ) : (
        <>
          <section
            key={message?.id}
            className="mt-2 flex items-start space-x-2 px-4 py-2 transition duration-75 ease-in-out"
          >
            <header className="flex-shrink-0">
              <img
                src={message?.member?.user?.avatar?.url}
                onError={(e) => handleImageError(e, '/images/avatar.png')}
                className="h-8 w-8 rounded-md"
                alt=""
              />
            </header>
            <main className="text-sm text-slate-900">
              <header className="flex items-end space-x-2">
                <h3 className="font-bold line-clamp-1">{message?.member?.user?.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {moment(message?.created_at).fromNow()}
                </p>
              </header>
              <section>
                <article className="prose pb-6">
                  <ReactMarkdown children={`${message?.message}`} />
                </article>
              </section>
            </main>
          </section>
          <Divider threadCount={message?.thread?.length} />
          {!message?.thread?.length ? (
            <p className="text-center text-sm font-normal text-slate-400">No Threads</p>
          ) : (
            <>
              {message?.thread?.map((thread) => {
                const user = thread?.member?.user
                return (
                  <section
                    key={thread.id}
                    className="group-message relative flex items-start space-x-2 px-6 py-2 transition duration-75 ease-in-out hover:bg-slate-100"
                  >
                    <header className="flex-shrink-0">
                      <img
                        src={user?.avatar.url}
                        onError={(e) => handleImageError(e, '/images/avatar.png')}
                        className="h-8 w-8 rounded-md"
                        alt=""
                      />
                    </header>
                    <main className="text-sm text-slate-900">
                      <header className="flex items-end space-x-2">
                        <h3 className="font-bold line-clamp-1">{user?.name}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {moment(thread.created_at).fromNow()}
                        </p>
                      </header>
                      <section>
                        <article className="prose pb-6">
                          <ReactMarkdown children={thread.message} />
                        </article>
                      </section>
                    </main>
                    <aside
                      className={`
                        absolute right-4 -top-4 flex items-center justify-center space-x-0.5 rounded border
                        border-slate-300 bg-white px-0.5 pt-0.5 opacity-0 shadow-lg group-message-hover:opacity-100
                      `}
                    >
                      {author?.id === user?.id && (
                        <ThreadOptionDropdown
                          thread={thread}
                          actions={{ handleDeleteThread, handleOpenEditThreadDialog }}
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
            </>
          )}
        </>
      )}
    </div>
  )
}

type DividerProps = {
  threadCount: number | undefined
}

const Divider = ({ threadCount }: DividerProps) => {
  return (
    <>
      {!!threadCount && (
        <div className="px-6 py-3">
          <div className="relative flex items-center border-b border-slate-200">
            <span className="absolute bg-white pr-2 text-xs font-medium text-slate-500">
              {`${threadCount} ${threadCount === 1 ? 'reply' : 'replies'}`}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default ThreadList
