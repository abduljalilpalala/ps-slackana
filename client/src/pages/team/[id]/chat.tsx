import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { classNames } from '~/helpers/classNames'
import ProjectLayout from '~/components/templates/ProjectLayout'
import UnderContruction from '~/utils/UnderContruction'

const Chat: FC = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  return (
    <ProjectLayout metaTitle="Chat">
      <div
        className={classNames(
          'h-full min-h-[94.5vh] overflow-y-auto p-8 scrollbar-thumb-[#868686]',
          'scrollbar-thin scrollbar-track-rounded-full'
        )}
      >
        <UnderContruction/>
      </div>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Chat
