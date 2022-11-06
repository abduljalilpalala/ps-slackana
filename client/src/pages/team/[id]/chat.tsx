import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'

import { Message, ThreadMessage } from '~/shared/interfaces'
import { ChatMessageValues } from '~/shared/types'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import ChatList from '~/components/molecules/ChatList'
import ChatEditor from '~/components/molecules/ChatEditor'
import ThreadList from '~/components/molecules/ThreadList'
import ProjectLayout from '~/components/templates/ProjectLayout'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import {
  addMessage,
  getMessages,
  deleteMessage,
  updateMessage,
  getThreads,
  addThread,
  deleteThread,
  updateThread,
  setChats,
  setThreads
} from '~/redux/chat/chatSlice'
import { pusher } from '~/shared/lib/pusher'

const Chat: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id, chat_id } = router.query
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(true)
  const [isLoadingThread, setIsLoadingThread] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const { chats, threads } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.auth)
  const { projectDescription } = useAppSelector((state) => state.project)
  const { title: projectTitle } = projectDescription || {}

  useEffect(() => {
    dispatch(getMessages(id)).then(() => setIsLoadingMessage(false))
  }, [id])

  useEffect(() => {
    if (chat_id) dispatch(getThreads(chat_id)).then(() => setIsLoadingThread(false))
  }, [chat_id])

  useEffect(() => {
    const channel = pusher.subscribe(`project.${id}.chat`)
    channel.bind('SendProjectMessage', (data: any) => {
      dispatch(setChats(data.result))
    })
    return () => {
      pusher.unsubscribe(`project.${id}.chat`)
    }
  }, [id])

  useEffect(() => {
    const channel = pusher.subscribe(`chat.${chat_id}.thread`)
    channel.bind('SendProjectMessageThread', (data: any) => {
      dispatch(setThreads(data))
    })
    return () => {
      pusher.unsubscribe(`chat.${chat_id}.thread`)
    }
  }, [chat_id])

  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false)
  const [isOpenEditModalThread, setIsOpenEditModalThread] = useState<boolean>(false)

  const handleCloseEditModalToggle = (): void => setIsOpenEditModal(!isOpenEditModal)
  const handleCloseEditModalThreadToggle = (): void =>
    setIsOpenEditModalThread(!isOpenEditModalThread)

  // Add Message
  const handleMessage = async (data: ChatMessageValues): Promise<void> => {
    const request = {
      projectId: id,
      payload: {
        member_id: user?.id,
        message: data?.message
      }
    }
    await dispatch(addMessage(request))
  }

  // Update Message
  const handleUpdateMessage = async (data?: Message): Promise<void> => {
    const payload = {
      projectId: router.query.id,
      memberId: data?.id,
      message: data?.message
    }

    await dispatch(updateMessage(payload)).then(() => handleCloseEditModalToggle())
  }

  // Delete Message
  const handleDeleteMessage = async (messageId: number): Promise<void> => {
    const payload = {
      projectId: id,
      messageId
    }

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
                onClick={async (e) => {
                  e.currentTarget.innerHTML = 'Deleting...'
                  await dispatch(deleteMessage(payload))
                  onClose()
                }}
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

  // Reply in the Thread
  const handleReplyThread = async (data: ChatMessageValues): Promise<void> => {
    const request = {
      messageId: chat_id,
      payload: {
        member_id: user?.id,
        message: data?.message
      }
    }

    await dispatch(addThread(request))
  }

  // Delete Thread Message
  const handleDeleteThread = async (payload: {
    messageId: string | string[] | undefined
    threadId: number
  }): Promise<void> => {
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
                onClick={async (e) => {
                  e.currentTarget.innerHTML = 'Deleting...'
                  await dispatch(deleteThread(payload))
                  onClose()
                }}
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

  // Update Thread Message
  const handleUpdateThread = async (data: ThreadMessage): Promise<void> => {
    const request = {
      message_id: router.query.chat_id,
      thread_id: data?.thread_id,
      payload: {
        member_id: user?.id,
        message: data?.message
      }
    }

    // alert(JSON.stringify(request, null, 2))
    await dispatch(updateThread(request)).then(() => handleCloseEditModalThreadToggle())
  }

  return (
    <ProjectLayout metaTitle="Chat">
      <div className="flex space-x-0.5 divide-x divide-slate-300 overflow-hidden">
        <section className="flex h-screen flex-1 flex-col">
          <main
            className={`default-scrollbar flex h-full flex-col justify-between
             overflow-y-auto scroll-smooth scrollbar-thumb-slate-400`}
          >
            {isLoadingMessage ? (
              <div className="flex min-h-full items-end justify-center py-6">
                <Spinner className="h-6 w-6 text-blue-500" />
              </div>
            ) : (
              <>
                {!chats.length ? (
                  <p className="text-center text-sm font-normal text-slate-400">No Conversation</p>
                ) : (
                  <>
                    {projectTitle && (
                      <h1 className="py-3 text-center text-sm font-medium text-slate-400">
                        {projectTitle}
                      </h1>
                    )}
                    <ChatList
                      chatData={chats}
                      isOpenEditModal={isOpenEditModal}
                      actions={{
                        handleDeleteMessage,
                        handleUpdateMessage,
                        handleCloseEditModalToggle
                      }}
                    />
                  </>
                )}
              </>
            )}
          </main>
          <div className="px-6">
            <ChatEditor handleMessage={handleMessage} />
          </div>
        </section>
        {chat_id && (
          <section
            className={`
            default-scrollbar flex h-screen w-[350px] flex-shrink-0 flex-col 
            overflow-y-auto scrollbar-thumb-slate-400`}
          >
            <ThreadList
              chatData={chats}
              threads={threads}
              isLoadingThread={isLoadingThread}
              isOpenEditModalThread={isOpenEditModalThread}
              actions={{
                handleDeleteThread,
                handleUpdateThread,
                handleCloseEditModalThreadToggle
              }}
            />
            {!isLoadingThread && (
              <div className="px-4 py-2">
                <ChatEditor handleMessage={handleReplyThread} />
              </div>
            )}
          </section>
        )}
      </div>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Chat
