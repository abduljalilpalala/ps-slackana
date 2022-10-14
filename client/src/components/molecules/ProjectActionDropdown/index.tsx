import React, { FC } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDown } from 'react-feather'
import { HiOutlineArchive } from 'react-icons/hi'

import { darkToaster } from '~/utils/darkToaster'
import MenuTransition from '~/components/templates/MenuTransition'
import { styles } from '~/shared/twin/project-action-dropdown.styles'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { archiveProject, getProject, unarchiveProject } from '~/redux/project/projectSlice'

const ProjectActionDropdown: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { overviewProject, userPermission: can } = useAppSelector((state) => state.project);
  const { isArchived, id } = overviewProject || {};

  const onClick = () => {
    if (isArchived) {
      dispatch(unarchiveProject())
        .then(({ payload }) => {
          darkToaster('✅', payload);
          dispatch(getProject(id))
        });
    } else {
      dispatch(archiveProject())
        .then(({ payload }) => {
          darkToaster('✅', payload);
          dispatch(getProject(id));
        });
    }
  }

  return (
    <Menu as="div" className="relative -mb-1.5 inline-block text-left z-30">
      {({ open }) => (
        <>
          <Menu.Button disabled={!can?.archiveProject} css={styles.menu_button({ open })} className={!can?.archiveProject ? "hover:!cursor-not-allowed" : ""}>
            <ChevronDown />
          </Menu.Button>
          <MenuTransition>
            <Menu.Items css={styles.menu_items}>
              <Menu.Item>
                <button onClick={onClick} css={styles.menu_item_button} className="group">
                  <HiOutlineArchive aria-hidden="true" />
                  {isArchived ? "Unarchive" : "Archive"}
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
