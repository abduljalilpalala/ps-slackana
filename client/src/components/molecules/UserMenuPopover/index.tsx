import { FC } from 'react'
import { Popover } from '@headlessui/react'
import { MoreHorizontal, ChevronDown } from 'react-feather'

import { globals } from '~/shared/twin/globals.styles'
import { styles } from '~/shared/twin/user-menu-popover.styles'
import PopoverTransition from '~/components/templates/PopoverTransition'

const UserMenuPopover: FC = (): JSX.Element => {
  return (
    <Popover css={styles.popover}>
      {({ open }) => (
        <>
          <Popover.Button css={styles.popover_button({ open })}>
            <MoreHorizontal className="h-6 w-6" />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel css={styles.popover_panel}>
              <section css={styles.section}>
                <div css={styles.user_wrapper}>
                  <div css={styles.user_details}>
                    <div css={globals.avatar}>
                      <img src="/images/animated-avatar.jpg" />
                    </div>
                    <div>
                      <h1>Joshua Galit</h1>
                      <span>Developer</span>
                    </div>
                  </div>
                  <ChevronDown />
                </div>
                <button type="button">Profile</button>
                <button type="button">Log out @angryboy_19</button>
              </section>
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

export default UserMenuPopover
