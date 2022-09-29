import Head from 'next/head'
import React, { useState } from 'react'

import Drawer from '~/components/organisms/Drawer'
import Header from '~/components/organisms/Header'
import Sidebar from '~/components/organisms/Sidebar'
import { styles } from '~/shared/twin/home-layout.styles'

type Props = {
  children: React.ReactNode
  metaTitle: string
}

const Layout: React.FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true)
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
