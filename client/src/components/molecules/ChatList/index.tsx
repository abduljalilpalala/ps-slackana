import moment from 'moment'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'
import ReactMarkdown from 'react-markdown'
import { ChevronRight } from 'react-feather'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { GithubType } from '~/redux/chat/chatType'
import DownRight from '~/shared/icons/DownRightIcon'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { NotificationTypes } from '~/utils/constants'
import useChatLazyLoad from '~/hooks/useChatLazyLoad'
import handleImageError from '~/helpers/handleImageError'
import { setMessageLoading } from '~/redux/chat/chatSlice'
import MessageOptionDropdown from '../MessageOptionDropdown'
import ThreadMessageIcon from '~/shared/icons/ThreadMessageIcon'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

const ChatList: FC = (): JSX.Element => {
  const messageRef = useRef<HTMLDivElement>(null)
  const { chats, isDoneSendingChatMessage, isFetchingMoreData, hasMore } = useAppSelector(
    (state) => state.chat
  )
  const { user: author } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { id, chat_id } = router.query
  const observer = useRef<IntersectionObserver | null>(null)
  const [prevNode, setPrevNode] = useState<HTMLElement | null>(null)
  const { setPageNumber } = useChatLazyLoad()
  const lastChatElementRef = useCallback(
    (node: HTMLElement) => {
      if (isFetchingMoreData) {
        prevNode?.scrollIntoView({
          block: 'end',
          inline: 'nearest'
        })
        return
      }
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPrevNode(node)
          setPageNumber((prev) => prev + 1)
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [isFetchingMoreData, hasMore]
  )

  const scrollBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        block: 'end',
        inline: 'nearest'
      })
      dispatch(setMessageLoading(false))
    }
  }

  useEffect(() => {
    if (isDoneSendingChatMessage) {
      scrollBottom()
    }
  }, [isDoneSendingChatMessage])

  useEffect(() => {
    scrollBottom()
  }, [])

  

  return (
    <>
      <div className="flex flex-col py-4">
        {isFetchingMoreData ? (
          <div className="my-2 flex items-center justify-center">
            <Spinner className="h-6 w-6 text-blue-500" />
          </div>
        ) : null}
        {chats.map((chat, index) => {
          const user = chat?.member && chat?.member?.user
          const githubMessage: GithubType = !chat?.member && JSON.parse(chat?.message)
          return (
            <section
              chat-id={chat.id}
              key={chat.id}
              ref={index === 0 ? lastChatElementRef : null}
              className={`
              ${
                !chat?.member && githubMessage?.type === NotificationTypes.COMMIT
                  ? 'bg-green-100'
                  : githubMessage?.type === NotificationTypes.MERGE
                  ? 'bg-purple-100'
                  : ''
              }
              group-message relative flex items-start space-x-2 border border-transparent px-6 py-1 transition duration-75 ease-in-out
              ${
                chat_id === chat.id.toString()
                  ? 'border-y border-amber-100 bg-amber-50'
                  : !chat?.member?.is_removed && 'hover:bg-slate-100'
              }
            `}
            >
              {chat?.member ? (
                <>
                  <header className="flex-shrink-0">
                    <img
                      src={user?.avatar?.url}
                      onError={(e) => handleImageError(e, '/images/avatar.png')}
                      className={`
                      h-8 w-8 rounded-md ${chat?.member?.is_removed && 'grayscale saturate-50'}
                    `}
                      alt=""
                    />
                  </header>
                  <main className="text-sm text-slate-900">
                    <header className="flex items-center space-x-2">
                      <h3
                        className={`font-bold line-clamp-1 ${
                          !chat.member.is_removed ? 'text-slate-900' : 'select-none text-slate-500'
                        }`}
                      >{`${
                        !chat.member.is_removed ? user?.name : `${user?.name} (deactivated)`
                      }`}</h3>
                      {!chat.member.is_removed && (
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {moment(chat.created_at).fromNow()}
                        </p>
                      )}
                      <p className="text-xs text-rose-500 line-clamp-1">
                        {chat.id < 1
                          ? 'Message not sent (This message will be removed after refresh)'
                          : ''}
                      </p>
                    </header>
                    <section>
                      <article
                        className={`
                        prose pb-6 ${
                          chat.member.is_removed
                            ? 'select-none text-sm italic text-slate-500'
                            : 'text-slate-700'
                        }
                        `}
                      >
                        {!chat.member.is_removed ? (
                          <ReactMarkdown children={chat.message} />
                        ) : (
                          'The account has been deactivated!'
                        )}
                      </article>
                      {chat.threadCount ? (
                        <button
                          onClick={() =>
                            router.push(`/team/${id}/chat/?chat_id=${chat.id}`, undefined, {
                              shallow: true
                            })
                          }
                          className="group -mx-1 flex w-[300px] items-center justify-between rounded border border-transparent p-1 text-xs hover:border-slate-200 hover:bg-white"
                        >
                          <div className="flex items-center space-x-2">
                            <DownRight className="h-5 w-5 fill-current text-slate-500" />
                            <h4 className="shrink-0 font-semibold text-blue-600 hover:underline">
                              {chat.threadCount} replies
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
                  {!chat.member.is_removed && chat.id >= 1 && (
                    <aside
                      className={`
                      absolute right-4 -top-4 flex items-center justify-center space-x-0.5 rounded border
                    border-slate-300 bg-white px-0.5 pt-0.5 opacity-0 shadow-lg group-message-hover:opacity-100
                    `}
                    >
                      <button
                        onClick={() =>
                          router.push(`/team/${id}/chat/?chat_id=${chat.id}`, undefined, {
                            shallow: true
                          })
                        }
                        data-for="actions"
                        data-tip="Reply to thread"
                        className="mb-0.5 rounded p-1 text-slate-400 focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900"
                      >
                        <ThreadMessageIcon className="h-5 w-5 fill-current" />
                      </button>
                      {author?.id === user?.id && <MessageOptionDropdown chat={chat} />}
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
                </>
              ) : (
                <>
                  <header className="flex-shrink-0">
                    <img src={githubMessage?.avatar} className="h-8 w-8 rounded-md" alt="" />
                  </header>
                  <main className="text-sm text-slate-900">
                    <header className="flex items-end space-x-2">
                      <h3 className="font-bold line-clamp-1">GitHub</h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {moment(chat.created_at).fromNow()}
                      </p>
                    </header>
                    <section>
                      <article>
                        {githubMessage?.type === NotificationTypes.COMMIT && (
                          <a target={'_blank'} href={githubMessage?.commit_url}>
                            <span className="font-semibold">{githubMessage?.name}</span>
                            <span>{` has commited to this project repository - `}</span>
                            <span className="font-semibold">{githubMessage?.repository}</span>
                          </a>
                        )}
                        {githubMessage?.type === NotificationTypes.MERGE && (
                          <a target={'_blank'} href={githubMessage?.pr_url}>
                            <span className="font-semibold">{githubMessage?.name}</span>
                            <span>{` has merged this pull request - `}</span>
                            <span className="font-semibold">{githubMessage?.pr_title}</span>
                          </a>
                        )}
                      </article>
                    </section>
                  </main>
                </>
              )}
            </section>
          )
        })}
      </div>
      <div ref={messageRef}></div>
    </>
  )
}

export default ChatList
