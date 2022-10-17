import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { ChevronRight } from 'react-feather'

import DownRight from '~/shared/icons/DownRightIcon'
import Tooltip from '~/components/templates/Tooltip'
import MessageOptionDropdown from './../MessageOptionDropdown'
import ThreadMessageIcon from '~/shared/icons/ThreadMessageIcon'

type Props = {
  chatData: any
}

const ChatList: FC<Props> = ({ chatData }): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  return (
    <div className="flex flex-col">
      {chatData.map((chat: any, i: number) => (
        <section
          key={i}
          className="group-message relative isolate flex items-start space-x-2 px-6 py-2 transition duration-75 ease-in-out hover:bg-slate-100"
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
              <p
                className="font-normal leading-6"
                dangerouslySetInnerHTML={{ __html: chat.message }}
              ></p>
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
              <MessageOptionDropdown />
            </Tooltip>
          </aside>
        </section>
      ))}
    </div>
  )
}

export default ChatList
