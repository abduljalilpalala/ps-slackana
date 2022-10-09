import { Menu } from '@headlessui/react'
import { ChevronDown } from 'react-feather'
import React, { FC, useEffect, useState } from 'react'

import { classNames } from '~/helpers/classNames'
import MenuTransition from '~/components/templates/MenuTransition'
import { styles } from '~/shared/twin/project-status-dropdown.styles'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { updateProjectStatus } from '~/redux/project/projectSlice'

const ProjectStatusDropdown: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { overviewProject } = useAppSelector((state) => state.project);
  const { id: projectID, status } = overviewProject || {};
  const { id: statusID } = status || {};

  const statusData = [
    {
      name: "On track",
      style: "bg-green-500 h-2 w-2 rounded-full "
    },
    {
      name: "At risk",
      style: "bg-amber-400 h-2 w-2 rounded-full "
    },
    {
      name: "Off track",
      style: "bg-orange-600 h-2 w-2 rounded-full "
    },
    {
      name: "On Hold",
      style: "bg-blue-500 h-2 w-2 rounded-full "
    },
    {
      name: "Complete",
      style: "bg-green-500 text-green-500 h-2 w-2 rounded-full "
    },
  ]
  const untrackedStatus = {
    name: "Set Status",
    style: "h-2 w-2 rounded-full border border-black-900"
  }

  const [activeStatus, setActiveStatus] = useState<number>(0);
  const onSelect = (setStatusID: number) => {
    setActiveStatus(setStatusID);
    dispatch(updateProjectStatus({ projectID, status: (setStatusID + 1) }));
  }

  useEffect(() => {
    setActiveStatus(statusID - 1);
  }, [statusID])

  const activeName = statusData[activeStatus] || untrackedStatus;
  const { name, style } = activeName;

  return (
    <Menu as="div" className="relative inline-block text-left z-30">
      {({ open }) => (
        <>
          <Menu.Button css={styles.menu_button({ open })} className="group">
            <span className={`${style} mr-[3px]`}></span>
            <span>{name}</span>
            <ChevronDown
              className={classNames('ml-0.5 h-4 w-4 group-hover:block', !open ? 'hidden' : '')}
            />
          </Menu.Button>
          <MenuTransition>
            <Menu.Items css={styles.menu_items}>
              <div>
                {statusData.map(({ name, style }: { name: string, style: string }, index: number) => {
                  return (
                    index === (statusData.length - 1)
                      ? <div className="border-t" key={name}>
                        <Menu.Item>
                          <button className="group" css={styles.menu_item_button} onClick={() => onSelect(index)}>
                            <span className={statusData[4].style}></span>
                            <h4>{statusData[4].name}</h4>
                          </button>
                        </Menu.Item>
                      </div>
                      :
                      <Menu.Item key={name}>
                        <button className="group" css={styles.menu_item_button} onClick={() => onSelect(index)}>
                          <span className={style}></span>
                          <h4>{name}</h4>
                        </button>
                      </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </MenuTransition>
        </>
      )}
    </Menu>
  )
}

export default ProjectStatusDropdown
