import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { AlertTriangle } from 'react-feather'
import useChatPusher from '~/hooks/chatPusher'
import { getMessages } from '~/redux/chat/chatSlice'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import ChatList from '~/components/molecules/ChatList'
import ChatEditor from '~/components/molecules/ChatEditor'
import ThreadList from '~/components/molecules/ThreadList'
import ThreadSlider from '~/components/organisms/ThreadDrawer'
import ProjectLayout from '~/components/templates/ProjectLayout'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

const Chat: NextPage = (): JSX.Element => {
  const router = useRouter()

  const { id, chat_id } = router.query
  useChatPusher()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMessages(id))
  }, [])

  return (
    <ProjectLayout metaTitle="Chat">
      <div className="flex space-x-0.5 divide-x divide-slate-300 overflow-hidden">
        <section className="flex h-screen flex-1 flex-col">
          <main
            className={`default-scrollbar flex h-full flex-col justify-between
             overflow-y-auto scroll-smooth scrollbar-thumb-slate-400`}
          >
            <MainChatContent />
          </main>
          <div className="px-6">
            <ChatEditor />
          </div>
        </section>
        <div className="hidden lg:block">
          {chat_id ? (
            <section
              className={`
                default-scrollbar flex h-full w-[350px] flex-shrink-0 flex-col 
                overflow-y-auto scrollbar-thumb-slate-400
              `}
            >
              <ThreadList />
            </section>
          ) : null}
        </div>
      </div>

      {/* This will show the thread list on mobile view */}
      <ThreadSlider />
    </ProjectLayout>
  )
}

const MainChatContent = () => {
  const { chats, isLoading, isError } = useAppSelector((state) => state.chat)
  const {
    projectDescription: { title: projectTitle }
  } = useAppSelector((state) => state.project)

  if (isLoading) {
    return (
      <div className="flex min-h-full items-end justify-center py-6">
        <Spinner className="h-6 w-6 text-blue-500" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="my-2 flex items-center justify-center border border-rose-100 bg-rose-50 py-2 text-sm font-medium text-rose-700">
        <AlertTriangle className="mr-2 h-4 w-4" /> Something went wrong!
      </div>
    )
  }

  if (!chats.length) {
    return <p className="text-center text-sm font-normal text-slate-400">No Conversation</p>
  }

  return (
    <>
      {projectTitle ? (
        <h1 className="py-3 text-center text-sm font-medium text-slate-400">{projectTitle}</h1>
      ) : null}
      <ChatList />
    </>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Chat
