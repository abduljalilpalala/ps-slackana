import React, { FC, ReactNode } from 'react'

import Layout from '~/components/templates/HomeLayout'
import ProjectHeader from '~/components/organisms/ProjectHeader'

type Props = {
  metaTitle: string
  children: ReactNode
}

const ProjectLayout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  return (
    <Layout metaTitle={metaTitle}>
      <ProjectHeader />
      <div className="relative flex h-full min-h-screen flex-col justify-between">
        {children}
        <span className="mb-[102px]"></span>
      </div>
    </Layout>
  )
}

export default ProjectLayout
