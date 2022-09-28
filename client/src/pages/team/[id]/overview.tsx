import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { classNames } from '~/helpers/classNames'
import ProjectLayout from '~/components/templates/ProjectLayout'

const Overview: FC = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  return (
    <ProjectLayout metaTitle="Overview">
      <div
        className={classNames(
          'h-full min-h-[94.5vh] overflow-y-auto p-8 scrollbar-thumb-[#868686]',
          'scrollbar-thin scrollbar-track-rounded-full'
        )}
      >
        This is the overview {id}
      </div>
    </ProjectLayout>
  )
}

export default Overview
