import React, { FC } from 'react'
import { IoIosMenu } from 'react-icons/io'

import Logo2Icon from '~/shared/icons/Logo2Icon'
import { styles } from '~/shared/twin/header.styles'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import NotificationPopover from '~/components/molecules/NotificationPopover'

type Props = {
  actions: {
    handleToggleSidebar: () => void
    handleToggleDrawer: () => void
  }
}

const Header: FC<Props> = (props): JSX.Element => {
  const { handleToggleSidebar, handleToggleDrawer } = props.actions

  return (
    <header css={styles.header}>
      <div css={styles.container}>
        <div css={styles.menu_wrapper}>
          <div className="hidden md:block">
            <button type="button" onClick={handleToggleSidebar}>
              <IoIosMenu />
            </button>
          </div>
          <div className="block md:hidden">
            <button type="button" onClick={handleToggleDrawer}>
              <IoIosMenu />
            </button>
          </div>
          <div className="block md:hidden">
            <div css={styles.bussiness_logo}>
              <Logo2Icon />
              <h1>Slackana</h1>
            </div>
          </div>
        </div>
        <div css={styles.options}>
          <NotificationPopover />
          <UserMenuDropDown />
        </div>
      </div>
    </header>
  )
}

export default Header
