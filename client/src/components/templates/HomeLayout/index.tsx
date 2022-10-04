import Head from 'next/head'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import createPersistedState from 'use-persisted-state'

import Drawer from '~/components/organisms/Drawer'
import Header from '~/components/organisms/Header'
import { styles } from '~/shared/twin/home-layout.styles'

const Sidebar = dynamic(() => import('~/components/organisms/Sidebar'), { ssr: false })

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
        <title key="home">{`Slackana | ${metaTitle}`}</title>
      </Head>
      <main css={styles.main}>
        <Header actions={{ handleToggleSidebar, handleToggleDrawer }} />
        <section css={styles.section}>
          <Sidebar isOpenSidebar={isOpenSidebar} />
          <div className="block md:hidden">
            <Drawer isOpenDrawer={isOpenDrawer} handleToggleDrawer={handleToggleDrawer} />
          </div>
          <div css={styles.content}>{children}</div>
        </section>
      </main>
    </>
  )
}

export default Layout
