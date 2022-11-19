import React, { FC, useState } from 'react'
import { Search } from 'react-feather'
import { useRouter } from 'next/router'
import { IoIosMenu } from 'react-icons/io'

import Logo2Icon from '~/shared/icons/Logo2Icon'
import { styles } from '~/shared/twin/header.styles'
import { useAppSelector } from '~/hooks/reduxSelector'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import NotificationPopover from '~/components/molecules/NotificationPopover'
import CommandPallete from '~/components/molecules/CommandPallete'

type Props = {
  actions: {
    handleToggleSidebar: () => void
    handleToggleDrawer: () => void
    handleToggleSearch?: () => void
  }
}

const Header: FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const { handleToggleSidebar, handleToggleDrawer, handleToggleSearch } = props.actions

  return (
    <header className="border-b border-slate-700 bg-slate-900">
      <div className="flex w-full items-center">
        <div css={styles.menu_wrapper} className="w-[280px]">
          {!router.pathname.includes('/notifications') && (
            <>
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
            </>
          )}
          {router.pathname.includes('/notifications') && (
            <button
              css={styles.bussiness_logo}
              className="px-3 py-2.5 outline-none"
              onClick={() => router.push('/')}
            >
              <Logo2Icon />
              <h1>Slackana</h1>
            </button>
          )}
        </div>
        <div className="flex flex-1 items-center justify-end lg:justify-between">
          <div className="group hidden flex-shrink-0 lg:flex">
            <button
              onClick={handleToggleSearch}
              className={`
                flex w-[30rem] items-center space-x-2 rounded bg-slate-800 py-1 shadow-sm outline-none
                transition duration-100 ease-in-out
              `}
            >
              <Search className="ml-2 h-4 w-4 text-slate-600 group-hover:text-slate-500" />
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-500">
                Search
              </span>
            </button>
          </div>
          <div className="flex flex-shrink-0 items-center justify-end space-x-2 px-4">
            <button
              onClick={handleToggleSearch}
              className="block cursor-pointer rounded-full p-1 text-slate-50 outline-none hover:bg-blue-600 active:scale-95 lg:hidden"
            >
              <Search className="h-5 w-5" />
            </button>
            <NotificationPopover />
            <UserMenuDropDown />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
