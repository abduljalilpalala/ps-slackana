import Head from 'next/head'
import React, { useState } from 'react'
import createPersistedState from 'use-persisted-state'

import Header from '~/components/organisms/Header'
import { styles } from '~/shared/twin/home-layout.styles'
import CommandPallete from '~/components/molecules/CommandPallete'

type Props = {
  children: React.ReactNode
  metaTitle: string
}

const useSidebarState = createPersistedState<boolean>('sidebarToggle')

const Layout: React.FC<Props> = ({ children, metaTitle }): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useSidebarState(true)
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false)

  const handleToggleDrawer = (): void => setIsOpenDrawer(!isOpenDrawer)
  const handleToggleSidebar = (): void => setIsOpenSidebar(!isOpenSidebar)
  const handleToggleSearch = (): void => setIsOpenSearch(!isOpenSearch)

  return (
    <>
      <Head>
        <title key="notifications">{`Slackana | ${metaTitle}`}</title>
      </Head>
      <CommandPallete isOpen={isOpenSearch} closeModal={handleToggleSearch} />
      <main css={styles.main}>
        <Header actions={{ handleToggleSidebar, handleToggleDrawer, handleToggleSearch }} />
        <section css={styles.section}>
          <div css={styles.content}>{children}</div>
        </section>
      </main>
    </>
  )
}

export default Layout
