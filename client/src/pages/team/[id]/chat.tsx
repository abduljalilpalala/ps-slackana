import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'

import { chatData } from '~/shared/jsons/chatData'
import { ChatMessageValues } from '~/shared/types'
import ChatList from '~/components/molecules/ChatList'
import ChatEditor from '~/components/molecules/ChatEditor'
import AvatarList from '~/components/molecules/AvatarList'
import ThreadList from '~/components/molecules/ThreadList'
import ProjectLayout from '~/components/templates/ProjectLayout'

const Chat: FC = (): JSX.Element => {
  const router = useRouter()
  const [isOpenThread, IsOpenThread] = useState<boolean>(false)

  const handleOpenThread = (): void => IsOpenThread(true)

  const { chat_id } = router.query

  const handleMessage = async (data: ChatMessageValues): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(data.message)
        resolve()
      }, 1000)
    })
  }

  return (
    <ProjectLayout metaTitle="Chat">
      <div className="flex space-x-0.5 divide-x divide-slate-300 overflow-hidden">
        <section className="flex h-screen flex-1 flex-col">
          <main
            className={`default-scrollbar flex h-full flex-col justify-between
             overflow-y-auto py-4 scrollbar-thumb-slate-400`}
          >
            <AvatarList />
            <ChatList chatData={chatData} />
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
            <ThreadList isOpenThread={isOpenThread} actions={{ handleOpenThread }} />
            <div className="px-4 py-2">
              <ChatEditor handleMessage={handleMessage} />
            </div>
          </section>
        )}
      </div>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Chat
