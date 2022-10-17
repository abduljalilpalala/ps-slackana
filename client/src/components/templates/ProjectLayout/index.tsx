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
      <div className="relative">{children}</div>
    </Layout>
  )
}

export default ProjectLayout
