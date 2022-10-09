import React, { FC, useState } from 'react'
import { Menu } from '@headlessui/react'
import { Settings, LogOut, User } from 'react-feather'

import { globals } from '~/shared/twin/globals.styles'
import { styles } from '~/shared/twin/user-menu-dropdown.styles'
import MenuTransition from '~/components/templates/MenuTransition'
import { useAuthMethods } from '~/hooks/authMethods'
import { useAppSelector } from '~/hooks/reduxSelector'
import { isLoggedIn } from '~/utils/isLoggedIn'
import SettingsModal from '~/components/organisms/SettingsModal'

const UserMenuDropDown: FC = (): JSX.Element => {
  const { handleAuthSignOut } = useAuthMethods()
  const { user } = useAppSelector((state) => state.auth)
  const { name, avatar, isloggedIn: status, email } = user || {}
  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  return (
    <Menu as="div" className="relative z-10 inline-block text-left">
      {settingsModal && <SettingsModal close={setSettingsModal} />}
      <Menu.Button css={globals.avatar}>
        <img src={avatar?.url} />
      </Menu.Button>
      <MenuTransition>
        <Menu.Items css={styles.menu_items}>
          <div css={styles.user_wrapper}>
            <div css={globals.avatar} className={isLoggedIn(status)} >
              <img src={avatar?.url} />
            </div>
            <div>
              <h1>{name}</h1>
              <p>{email}</p>
            </div>
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <button onClick={() => setSettingsModal(!settingsModal)} css={styles.menu_item({ active })} className="group">
                  <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                  Settings
                </button>
              )}
            </Menu.Item>
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <button
                  css={styles.menu_item({ active })}
                  className="group"
                  onClick={handleAuthSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default UserMenuDropDown
