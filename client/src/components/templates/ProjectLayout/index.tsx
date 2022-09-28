import React, { FC, ReactNode } from 'react'

import Layout from '~/components/templates/HomeLayout'
import ProjectHeader from '~/components/organisms/ProjectHeader'

type Props = {
  metaTitle: string
  children: ReactNode
}

const ProjectLayout: FC<Props> = (props): JSX.Element => {
  return (
    <Layout metaTitle={props.metaTitle}>
      <ProjectHeader />
      {props.children}
    </Layout>
  )
}

export default ProjectLayout
