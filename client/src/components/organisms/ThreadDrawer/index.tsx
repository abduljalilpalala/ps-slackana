import moment from 'moment'
import { Hash, X } from 'react-feather'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'
import ReactMarkdown from 'react-markdown'
import React, { FC, useEffect, useRef, useState } from 'react'

import { Spinner } from '~/shared/icons/SpinnerIcon'
import { showMessage } from '~/redux/chat/chatSlice'
import handleImageError from '~/helpers/handleImageError'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import ThreadOptionDropdown from '~/components/molecules/ThreadOptionDropdown'
import ChatThreadEditor from '~/components/molecules/ChatEditor/ChatThreadEditor'
import { NOT_FOUND } from '~/utils/constants'

const ThreadDrawer: FC = (): JSX.Element => {
  const drawerThredRef = useRef<HTMLDivElement>(null)

  const {
    overviewProject: { title }
  } = useAppSelector((state) => state.project)

  const { message } = useAppSelector((state) => state.chat)

  const router = useRouter()
  const { id, chat_id } = router.query
  const dispatch = useAppDispatch()
  const { user: author } = useAppSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onLoad = () => {
    setIsLoading(() => true)
    dispatch(showMessage({ projectId: id, messageId: chat_id }))
      .unwrap()
      .then(() => setIsLoading(() => false))
      .catch(() => router.push(NOT_FOUND))
  }

  useEffect(() => {
    if (chat_id) {
      onLoad()
    }
  }, [chat_id])

  useEffect(() => {
    if (drawerThredRef.current) {
      drawerThredRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }, [message])

  return (
    <>
      {chat_id && (
        <section
          className="absolute inset-0 z-10 block bg-slate-900/10 lg:hidden"
          onClick={() => router.push(`/team/${router.query.id}/chat`)}
        ></section>
      )}
      <section
        className={`
          fixed right-0 z-20 flex h-full w-full flex-1 flex-shrink-0 flex-col overflow-hidden
           bg-white text-slate-900 transition-all duration-300 ease-in-out sm:max-w-[351px] 
          ${chat_id ? 'block translate-x-0 lg:hidden' : 'translate-x-full'}
        `}
      >
        <header className="flex w-full flex-shrink-0 items-center justify-between border-b border-slate-300 py-3 px-4 text-slate-600">
          <div className="flex items-center space-x-1">
            <h1 className="py-0.5 text-lg font-bold text-slate-900">Thread</h1>
            <p className="flex items-center text-sm text-slate-500">
              <Hash className="ml-2 h-4 w-4" />
              {title}
            </p>
          </div>
          <button
            className="rounded p-0.5 hover:bg-slate-200 active:scale-95"
            onClick={() => router.push(`/team/${id}/chat`)}
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <main className="default-scrollbar flex h-full flex-col overflow-y-auto">
          {isLoading ? (
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
              <Divider threadCount={message?.threadCount} />
              {!message?.threadCount ? (
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
                            <p className="text-xs text-rose-500 line-clamp-1">
                              {thread.id < 1
                                ? 'Message not sent (This message will be removed after refresh)'
                                : ''}
                            </p>
                          </header>
                          <section>
                            <article className="prose pb-6">
                              <ReactMarkdown children={thread.message} />
                            </article>
                          </section>
                        </main>
                        {author?.id === user?.id && thread.id >= 1 && (
                          <aside
                            className={`
                            absolute right-4 -top-4 flex items-center justify-center space-x-0.5 rounded border
                            border-slate-300 bg-white px-0.5 pt-0.5 opacity-0 shadow-lg group-message-hover:opacity-100
                          `}
                          >
                            <ThreadOptionDropdown chat={thread} />
                            <ReactTooltip
                              place="top"
                              type="dark"
                              effect="solid"
                              id="actions"
                              getContent={(dataTip) => dataTip}
                              className="!rounded-lg !bg-black !text-xs font-semibold !text-white"
                            />
                          </aside>
                        )}
                      </section>
                    )
                  })}
                </>
              )}
            </>
          )}
          <div className="px-4 py-2" ref={drawerThredRef}>
            <ChatThreadEditor />
          </div>
        </main>
      </section>
    </>
  )
}

type DividerProps = {
  threadCount: number | undefined
}

const Divider = ({ threadCount }: DividerProps) => {
  return (
    <>
      {threadCount ? (
        <div className="px-6 py-3">
          <div className="relative flex items-center border-b border-slate-200">
            <span className="absolute bg-white pr-2 text-xs font-medium text-slate-500">
              {`${threadCount} ${threadCount === 1 ? 'reply' : 'replies'}`}
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ThreadDrawer
