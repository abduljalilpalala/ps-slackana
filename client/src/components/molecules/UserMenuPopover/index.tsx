import { FC, useState } from 'react'
import { Popover } from '@headlessui/react'
import { MoreHorizontal, ChevronDown } from 'react-feather'

import { isLoggedIn } from '~/utils/isLoggedIn'
import { useAuthMethods } from '~/hooks/authMethods'
import { globals } from '~/shared/twin/globals.styles'
import { useAppSelector } from '~/hooks/reduxSelector'
import { styles } from '~/shared/twin/user-menu-popover.styles'
import SettingsModal from "~/components/organisms/SettingsModal";
import PopoverTransition from '~/components/templates/PopoverTransition'

const UserMenuPopover: FC = (): JSX.Element => {
  const { handleAuthSignOut } = useAuthMethods()
  const { user } = useAppSelector((state) => state.auth)
  const { name, avatar, isLoggedIn: status, email } = user || {}
  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  return (
    <Popover css={styles.popover}>
      {({ open }) => (
        <>
          {settingsModal && <SettingsModal close={setSettingsModal} />}
          <Popover.Button css={styles.popover_button({ open })}>
            <MoreHorizontal className="h-6 w-6" />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel css={styles.popover_panel}>
              <section css={styles.section}>
                <div css={styles.user_wrapper}>
                  <div css={styles.user_details}>
                    <div css={globals.avatar} className={isLoggedIn(status)} >
                      <img src={avatar?.url} />
                    </div>
                    <div>
                      <h1 className='!truncate !max-w-[150px]'>{name}</h1>
                      <span className='!truncate !max-w-[150px]'>{email}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSettingsModal(!settingsModal)} type="button">Settings</button>
                <button onClick={handleAuthSignOut} type="button">Log out</button>
              </section>
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

export default UserMenuPopover
