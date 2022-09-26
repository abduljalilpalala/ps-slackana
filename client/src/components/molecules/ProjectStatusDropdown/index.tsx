import React, { FC } from 'react'
import { Menu } from '@headlessui/react'
import { BsCircle } from 'react-icons/bs'
import { ChevronDown } from 'react-feather'

import { classNames } from '~/helpers/classNames'
import MenuTransition from '~/components/templates/MenuTransition'
import { styles } from '~/shared/twin/project-status-dropdown.styles'

const ProjectStatusDropdown: FC = (): JSX.Element => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button css={styles.menu_button({ open })}>
            <BsCircle className="h-2 w-2" />
            <span>Set Status</span>
            <ChevronDown
              className={classNames('ml-0.5 h-4 w-4 group-hover:block', !open ? 'hidden' : '')}
            />
          </Menu.Button>
          <MenuTransition>
            <Menu.Items css={styles.menu_items}>
              <div>
                <Menu.Item>
                  <button className="group" css={styles.menu_item_button}>
                    <span className="bg-green-500"></span>
                    <h4>On track</h4>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className="group" css={styles.menu_item_button}>
                    <span className="bg-amber-400"></span>
                    <h4>At risk</h4>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className="group" css={styles.menu_item_button}>
                    <span className="bg-orange-600"></span>
                    <h4>Off track</h4>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button className="group" css={styles.menu_item_button}>
                    <span className="bg-blue-500"></span>
                    <h4>On Hold</h4>
                  </button>
                </Menu.Item>
              </div>
              <div className="pt-1">
                <Menu.Item>
                  <button className="group" css={styles.menu_item_button}>
                    <span className="bg-green-500"></span>
                    <h4 className="text-green-500">Complete</h4>
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </MenuTransition>
        </>
      )}
    </Menu>
  )
}

export default ProjectStatusDropdown
