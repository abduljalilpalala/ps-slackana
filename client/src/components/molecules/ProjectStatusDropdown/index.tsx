import { Menu } from '@headlessui/react'
import { ChevronDown } from 'react-feather'
import React, { FC, useEffect, useState } from 'react'

import { darkToaster } from '~/utils/darkToaster'
import { classNames } from '~/helpers/classNames'
import { statusData } from '~/shared/jsons/statusData'
import MenuTransition from '~/components/templates/MenuTransition'
import { updateProjectStatus } from '~/redux/project/projectSlice'
import { styles } from '~/shared/twin/project-status-dropdown.styles'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

const ProjectStatusDropdown: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const { overviewProject, userPermission: can } = useAppSelector((state) => state.project)
  const { id: projectID, status } = overviewProject || {}
  const { id: statusID } = status || {}

  const untrackedStatus = {
    name: 'Set Status',
    style: 'h-2 w-2 rounded-full border border-black-900'
  }

  const [activeStatus, setActiveStatus] = useState<number>(0)
  const onSelect = (setStatusID: number) => {
    setActiveStatus(setStatusID)
    dispatch(updateProjectStatus({ projectID, status: setStatusID + 1 })).then((_) => {
      switch (setStatusID) {
        case 0:
          darkToaster('🏃‍♂️', 'We are now on track!')
          break
        case 1:
          darkToaster('😨', 'Our project is at risk!')
          break
        case 2:
          darkToaster('😞', 'Our project is off track!')
          break
        case 3:
          darkToaster('✊', 'Our project is on hold!')
          break
        case 4:
          darkToaster('🥳', 'Great job! Project completed ✅')
          break

        default:
          darkToaster('🐞', 'Something went wrong')
      }
    })
  }

  useEffect(() => {
    setActiveStatus(statusID - 1)
  }, [statusID])

  const activeName = statusData[activeStatus] || untrackedStatus
  const { name, style } = activeName

  return (
    <Menu as="div" className="relative z-30 inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            disabled={!can?.setProjectStatus}
            className={`
                group-dropdown-action flex items-center rounded-md px-0.5 transition duration-150 
                ease-in-out hover:bg-slate-200 hover:text-slate-900 md:px-1.5
                ${!can?.setProjectStatus && 'hover:!cursor-not-allowed'}
                ${open ? 'bg-slate-200' : ''}
              `}
          >
            <span className={`${style} mr-[3px] ml-1 flex-shrink-0 text-sm line-clamp-1`}></span>
            <div className="hidden sm:block">
              <span className="ml-1 text-sm line-clamp-1">{name}</span>
            </div>
            <ChevronDown
              className={classNames(
                'ml-0.5 h-4 w-4 group-dropdown-action-hover:opacity-100',
                open ? 'group-dropdown-action-hover:opacity-100' : 'opacity-100 sm:opacity-0'
              )}
            />
          </Menu.Button>
          <MenuTransition>
            <Menu.Items css={styles.menu_items}>
              <div>
                {statusData.map(
                  ({ name, style }: { name: string; style: string }, index: number) => {
                    return index === statusData.length - 1 ? (
                      <div className="border-t" key={name}>
                        <Menu.Item>
                          <button
                            className="group"
                            css={styles.menu_item_button}
                            onClick={() => onSelect(index)}
                          >
                            <span className={statusData[4].style}></span>
                            <h4>{statusData[4].name}</h4>
                          </button>
                        </Menu.Item>
                      </div>
                    ) : (
                      <Menu.Item key={name}>
                        <button
                          className="group"
                          css={styles.menu_item_button}
                          onClick={() => onSelect(index)}
                        >
                          <span className={style}></span>
                          <h4>{name}</h4>
                        </button>
                      </Menu.Item>
                    )
                  }
                )}
              </div>
            </Menu.Items>
          </MenuTransition>
        </>
      )}
    </Menu>
  )
}

export default ProjectStatusDropdown
