import React, { FC } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDown } from 'react-feather'
import { HiOutlineArchive } from 'react-icons/hi'

import MenuTransition from '~/components/templates/MenuTransition'
import { styles } from '~/shared/twin/project-action-dropdown.styles'

const ProjectActionDropdown: FC = (): JSX.Element => {
  return (
    <Menu as="div" className="relative -mb-1.5 inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button css={styles.menu_button({ open })}>
            <ChevronDown />
          </Menu.Button>
          <MenuTransition>
            <Menu.Items css={styles.menu_items}>
              <Menu.Item>
                <button css={styles.menu_item_button} className="group">
                  <HiOutlineArchive aria-hidden="true" />
                  Archive
                </button>
              </Menu.Item>
            </Menu.Items>
          </MenuTransition>
        </>
      )}
    </Menu>
  )
}

export default ProjectActionDropdown
