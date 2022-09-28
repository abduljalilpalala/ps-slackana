import React from 'react'
import { Bell } from 'react-feather'
import { Popover } from '@headlessui/react'

import { globals } from '~/shared/twin/globals.styles'
import { styles } from '~/shared/twin/notification-popover.styles'
import PopoverTransition from '~/components/templates/PopoverTransition'

const NotificationPopover = (): JSX.Element => {
  return (
    <Popover css={styles.popover}>
      {({ open }) => (
        <>
          <Popover.Button css={styles.popover_button({ open })}>
            <Bell fill={open ? 'currentColor' : 'transparent'} />
          </Popover.Button>
          <PopoverTransition>
            <Popover.Panel css={styles.popover_panel}>
              <header css={styles.header}>
                <h1>Notifications</h1>
              </header>
              <main css={styles.main} className="scroll-show-on-hover default-scrollbar">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <a key={i} href="#">
                    <div css={globals.avatar}>
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                        className="w-full object-cover"
                        alt="avatar"
                      />
                    </div>
                    <p className="mx-2 text-xs text-gray-600">
                      <span className="font-bold">Sara Salah</span> replied on the{' '}
                      <span className="font-bold text-blue-600">Upload Image</span> artical . 2m
                    </p>
                  </a>
                ))}
              </main>
              <footer css={styles.footer}>
                <a href="#">See all notifications</a>
              </footer>
            </Popover.Panel>
          </PopoverTransition>
        </>
      )}
    </Popover>
  )
}

export default NotificationPopover
