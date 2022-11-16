import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import ReactTooltip from 'react-tooltip'
import React, { FC, useRef, useState } from 'react'
import { Trash, MoreVertical, Edit3 } from 'react-feather'

import { Chat } from '~/redux/chat/chatType'
import { ERROR_MESSAGE } from '~/utils/messages'
import { confirmAlert } from 'react-confirm-alert'
import { deleteThread } from '~/redux/chat/chatSlice'
import { useAppDispatch } from '~/hooks/reduxSelector'
import MenuTransition from '~/components/templates/MenuTransition'
import EditMessageThreadDialog from '~/components/molecules/ThreadList/EditMessageThreadDialog'

type Props = {
  chat: Chat
}

const ThreadOptionDropdown: FC<Props> = ({ chat }): JSX.Element => {
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const router = useRouter()
  const { chat_id } = router.query
  const dispatch = useAppDispatch()
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleDeleteThread = async (onClose: () => void) => {
    if (deleteButtonRef.current) {
      deleteButtonRef.current.innerHTML = 'Deleting...'
      dispatch(deleteThread({ messageId: chat_id, threadId: chat.id }))
        .unwrap()
        .catch(() => toast.error(ERROR_MESSAGE))
        .finally(() => {
          if (deleteButtonRef.current) deleteButtonRef.current.innerHTML = 'Yes'
          onClose()
        })
    }
  }

  const openDeleteModal = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="rounded-lg border border-slate-200 bg-white px-8 py-6 shadow-xl">
            <h1 className="text-center text-xl font-bold">Are you sure?</h1>
            <p className="mt-2 text-sm font-medium">You want to delete this message?</p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white">
              <button
                onClick={onClose}
                className="rounded-lg bg-slate-500 py-1 px-6 transition duration-100 ease-in-out hover:bg-slate-600"
              >
                No
              </button>
              <button
                ref={deleteButtonRef}
                onClick={() => handleDeleteThread(onClose)}
                className="rounded-lg bg-blue-500 py-1 px-6 transition duration-100 ease-in-out hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        )
      }
    })
  }

  return (
    <>
      {isOpenEditModal ? (
        <EditMessageThreadDialog
          isOpen={isOpenEditModal}
          chat={chat}
          closeModal={() => setIsOpenEditModal(() => false)}
        />
      ) : null}
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
                  onClick={() => setIsOpenEditModal(() => true)}
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
                  onClick={openDeleteModal}
                >
                  <Trash className="mr-2 h-4 w-4" aria-hidden="true" />
                  Delete Message
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </MenuTransition>
      </Menu>
    </>
  )
}

export default ThreadOptionDropdown
