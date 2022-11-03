import Head from 'next/head'
import React, { useState } from 'react'
import createPersistedState from 'use-persisted-state'

import Header from '~/components/organisms/Header'
import { styles } from '~/shared/twin/home-layout.styles'

type Props = {
  children: React.ReactNode
  metaTitle: string
}

const useSidebarState = createPersistedState<boolean>('sidebarToggle')

const Layout: React.FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useSidebarState(true)
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  const handleToggleSidebar = (): void => setIsOpenSidebar(!isOpenSidebar)
  const handleToggleDrawer = (): void => setIsOpenDrawer(!isOpenDrawer)

  return (
    <>
      <Head>
        <title key="notifications">{`Slackana | ${metaTitle}`}</title>
      </Head>
      <main css={styles.main}>
        <Header actions={{ handleToggleSidebar, handleToggleDrawer }} />
        <section css={styles.section}>
          <div css={styles.content}>{children}</div>
        </section>
      </main>
    </>
  )
}

export default Layout
