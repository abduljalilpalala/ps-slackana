import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { classNames } from '~/helpers/classNames'
import ProjectLayout from '~/components/templates/ProjectLayout'

const Board: FC = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  const headerLinks = [
    {
      id: 1,
      name: 'Overview',
      href: `/team/${id}/overview`
    },
    {
      id: 1,
      name: 'List',
      href: `/team/${id}/list`
    }
  ]

  return (
    <ProjectLayout metaTitle="Board">
      <div
        className={classNames(
          'h-full min-h-[94.5vh] overflow-y-auto p-8 scrollbar-thumb-[#868686]',
          'scrollbar-thin scrollbar-track-rounded-full'
        )}
      >
        This is the board {id}
      </div>
    </ProjectLayout>
  )
}

export default Board
