import React, { FC } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDown } from 'react-feather'
import { HiOutlineArchive } from 'react-icons/hi'
import { HiCode } from 'react-icons/hi'
import { HiClipboardList } from 'react-icons/hi'

import { darkToaster } from '~/utils/darkToaster'
import MenuTransition from '~/components/templates/MenuTransition'
import { styles } from '~/shared/twin/project-action-dropdown.styles'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { archiveProject, getProject, unarchiveProject } from '~/redux/project/projectSlice'

type Props = {
  actions: {
    setAddRepo: (e: boolean) => void
  }
}
const ProjectActionDropdown: FC<Props> = (props): JSX.Element => {
  const {
    actions: { setAddRepo }
  } = props
  const dispatch = useAppDispatch()

  const { overviewProject, userPermission: can } = useAppSelector((state) => state.project)
  const { isArchived, id } = overviewProject || {}

  const onClick = () => {
    if (isArchived) {
      dispatch(unarchiveProject()).then(({ payload }) => {
        darkToaster('✅', payload)
        dispatch(getProject(id))
      })
    } else {
      dispatch(archiveProject()).then(({ payload }) => {
        darkToaster('✅', payload)
        dispatch(getProject(id))
      })
    }
  }
  const handleCopySigningKey = () => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_GITHUB_SIGNING_KEY as string)
    darkToaster('✅', 'Signing key is successfully copied')
  }
  const handleCopyPayloadURL = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BACKEND_URL as string}api/github-webhooks`
    )
    darkToaster('✅', 'Payload URL is successfully copied')
  }
  return (
    <Menu as="div" className="relative z-30 -mb-1.5 inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button
            disabled={!can?.archiveProject}
            css={styles.menu_button({ open })}
            className={!can?.archiveProject ? 'hover:!cursor-not-allowed' : ''}
          >
            <ChevronDown />
          </Menu.Button>
          <MenuTransition>
            <Menu.Items css={styles.menu_items}>
              <Menu.Item>
                <button onClick={onClick} css={styles.menu_item_button} className="group">
                  <HiOutlineArchive aria-hidden="true" />
                  {isArchived ? 'Unarchive' : 'Archive'}
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => setAddRepo(true)}
                  css={styles.menu_item_button}
                  className="group"
                >
                  <HiCode aria-hidden="true" />
                  Set Repository
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={handleCopySigningKey}
                  css={styles.menu_item_button}
                  className="group"
                >
                  <HiClipboardList aria-hidden="true" />
                  Signing Key
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={handleCopyPayloadURL}
                  css={styles.menu_item_button}
                  className="group"
                >
                  <HiClipboardList aria-hidden="true" />
                  Payload URL
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
