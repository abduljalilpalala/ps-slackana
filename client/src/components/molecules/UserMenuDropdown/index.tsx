import React, { FC, useState } from 'react'
import { Menu } from '@headlessui/react'
import { Settings, LogOut } from 'react-feather'

import { isLoggedIn } from '~/utils/isLoggedIn'
import { useAuthMethods } from '~/hooks/authMethods'
import { globals } from '~/shared/twin/globals.styles'
import { useAppSelector } from '~/hooks/reduxSelector'
import { styles } from '~/shared/twin/user-menu-dropdown.styles'
import SettingsModal from '~/components/organisms/SettingsModal'
import MenuTransition from '~/components/templates/MenuTransition'
import handleImageError from '~/helpers/handleImageError'

const UserMenuDropDown: FC = (): JSX.Element => {
  const { handleAuthSignOut } = useAuthMethods()
  const { user } = useAppSelector((state) => state.auth)
  const { name, avatar, isLoggedIn: status, email } = user || {}
  const [settingsModal, setSettingsModal] = useState<boolean>(false)

  return (
    <Menu as="div" className="relative z-40 inline-block text-left">
      {settingsModal && <SettingsModal close={setSettingsModal} />}
      <Menu.Button css={globals.avatar}>
        <img
          src={avatar?.url}
          onError={(e) => handleImageError(e, '/images/avatar.png')}
          className="min-h-6 max-h-6 min-w-[25px] max-w-[25px]"
        />
      </Menu.Button>
      <MenuTransition>
        <Menu.Items css={styles.menu_items}>
          <div css={styles.user_wrapper}>
            <div css={globals.avatar} className={isLoggedIn(status)}>
              <img
                src={avatar?.url}
                onError={(e) => handleImageError(e, '/images/avatar.png')}
                className="min-h-6 max-h-6 min-w-[25px] max-w-[25px]"
              />
            </div>
            <div>
              <h1 className="!max-w-[120px] !truncate">{name}</h1>
              <p className="!max-w-[120px] !truncate">{email}</p>
            </div>
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setSettingsModal(!settingsModal)}
                  css={styles.menu_item({ active })}
                  className="group"
                >
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
