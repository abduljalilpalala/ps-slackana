import React, { FC } from 'react'
import { Menu } from '@headlessui/react'
import ReactTooltip from 'react-tooltip'
import { Trash, MoreVertical, Edit3 } from 'react-feather'

import { Chat } from '~/redux/chat/chatType'
import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  chat: Chat
  actions: {
    handleDeleteMessage: (messageId: number) => Promise<void>
    handleOpenEditMessageDialog: (chat: any) => void
  }
}

const MessageOptionDropdown: FC<Props> = (props): JSX.Element => {
  const { chat, actions } = props

  return (
    <Menu as="div" className="relative z-20 inline-block text-left">
      <Menu.Button
        data-for="act"
        data-tip="More Actions"
        className="rounded p-1 text-slate-400 outline-none focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900"
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
                onClick={() => actions?.handleOpenEditMessageDialog(chat)}
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
                onClick={() => actions?.handleDeleteMessage(chat?.id)}
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

export default MessageOptionDropdown
