import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import ReactTooltip from 'react-tooltip'
import { Trash, MoreVertical, Edit3 } from 'react-feather'

import { Chat } from '~/redux/chat/chatType'
import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  thread: Chat
  actions: {
    handleDeleteThread: (payload: {
      messageId: string | string[] | undefined
      threadId: number
    }) => Promise<void>
    handleOpenEditThreadDialog: (thread?: Chat) => void
  }
}

const ThreadOptionDropdown: FC<Props> = ({ thread, actions }): JSX.Element => {
  const router = useRouter()
  const { chat_id } = router.query

  const payload = { messageId: chat_id, threadId: thread?.id }

  return (
    <Menu as="div" className="relative z-20 inline-block text-left">
      <Menu.Button
        data-for="act"
        data-tip="More Actions"
        className="rounded p-1 text-slate-400 focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900"
      >
        <MoreVertical className="h-5 w-5" />
        <ReactTooltip
          place="top"
          type="dark"
          effect="solid"
          id="act"
          getContent={(dataTip) => dataTip}
          className="!rounded-lg !bg-black !text-xs font-semibold !text-white"
        />
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          className={`
            absolute right-0 z-50 mt-1 w-44 origin-top-right divide-y divide-slate-200 overflow-hidden
            rounded-md bg-white shadow-xl ring-1 ring-slate-900 ring-opacity-5 focus:outline-none
          `}
        >
          <Menu.Item>
            {({ active }) => (
              <button
                className={`
                  flex w-full items-center overflow-hidden px-3 py-2 text-sm
                  font-medium transition duration-150 ease-in-out
                  ${active ? 'bg-blue-600 text-white' : 'text-slate-600'}
                `}
                onClick={() => actions?.handleOpenEditThreadDialog(thread)}
              >
                <Edit3 className="mr-2 h-4 w-4" aria-hidden="true" />
                Edit Message
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`
                  flex w-full items-center overflow-hidden px-3 py-2 text-sm
                  font-medium transition duration-150 ease-in-out
                  ${active ? 'bg-rose-500 text-white' : 'text-slate-600'}
                `}
                onClick={() => actions?.handleDeleteThread(payload)}
              >
                <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
                Delete Message
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default ThreadOptionDropdown
