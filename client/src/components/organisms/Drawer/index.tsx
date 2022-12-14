import Link from 'next/link'
import { X } from 'react-feather'
import { Hash } from 'react-feather'
import { AiOutlineCaretDown } from 'react-icons/ai'
import React, { FC, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { isLoggedIn } from '~/utils/isLoggedIn'
import Logo2Icon from '~/shared/icons/Logo2Icon'
import { classNames } from '~/helpers/classNames'
import { Link as ILink } from '~/shared/interfaces'
import { links } from '~/shared/jsons/sidebarLinks'
import { styles } from '~/shared/twin/drawer.styles'
import { globals } from '~/shared/twin/globals.styles'
import { filterProjects } from '~/redux/project/projectSlice'
import UserMenuPopover from '~/components/molecules/UserMenuPopover'
import { styles as sidebarStyles } from '~/shared/twin/sidebar.styles'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import handleImageError from '~/helpers/handleImageError'

type Props = {
  isOpenDrawer: boolean
  handleToggleDrawer: () => void
}

const Drawer: FC<Props> = ({ isOpenDrawer, handleToggleDrawer }): JSX.Element => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { user } = useAppSelector((state) => state.auth)
  const { name, avatar, isLoggedIn: status, email } = user || {}

  const handleOpen = (): void => setIsOpen(!isOpen)
  const { sidebarProject } = useAppSelector((state) => state.project)

  useEffect(() => {
    dispatch(filterProjects())
  }, [])

  return (
    <aside>
      <div
        className={classNames(isOpenDrawer ? 'z-50 translate-x-0' : '-translate-x-full', 'drawer')}
      >
        <div css={styles.wrapper}>
          <div>
            <div css={styles.business_logo}>
              <div>
                <Logo2Icon />
                <p>Slackana</p>
              </div>
              <button onClick={handleToggleDrawer}>
                <X />
              </button>
            </div>
            <nav css={sidebarStyles.nav}>
              <ul>
                {links.map(({ name, href, Icon }: ILink, i: number) => (
                  <li key={i}>
                    <Link href={href}>
                      <a
                        className={classNames(
                          router.pathname === href ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'
                        )}
                      >
                        <Icon />
                        <span>{name}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
              <div css={sidebarStyles.project_wrapper}>
                <>
                  <div css={sidebarStyles.project_caret} onClick={handleOpen}>
                    <AiOutlineCaretDown className={`${!isOpen ? '-rotate-90' : ''}`} />
                    <p>Projects</p>
                  </div>
                  {isOpen && (
                    <ul>
                      {sidebarProject?.map(
                        (
                          {
                            id,
                            title,
                            isArchived
                          }: { id: number; title: string; isArchived: number },
                          index: number
                        ) =>
                          isArchived ? null : (
                            <li key={index} css={sidebarStyles.li} onClick={handleToggleDrawer}>
                              <Link href={`/team/${id}/overview`}>
                                <a
                                  className={classNames(
                                    router.asPath.includes(`/team/${id}`)
                                      ? 'bg-blue-600 text-white'
                                      : ' hover:bg-slate-700'
                                  )}
                                >
                                  <div css={sidebarStyles.link}>
                                    <Hash />
                                    <span className="max-w-[180px] truncate text-ellipsis">
                                      {title}
                                    </span>
                                  </div>
                                </a>
                              </Link>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </>
              </div>
            </nav>
          </div>
          <div css={sidebarStyles.footer}>
            <div css={sidebarStyles.user_wrapper}>
              <div css={globals.avatar} className={isLoggedIn(status)}>
                <img src={avatar?.url} onError={(e) => handleImageError(e, '/images/avatar.png')} />
              </div>
              <div css={sidebarStyles.user_details}>
                <h1 className="!max-w-[150px] !truncate">{name}</h1>
                <span className="!max-w-[150px] !truncate">{email}</span>
              </div>
            </div>
            <UserMenuPopover />
          </div>
        </div>
      </div>
      <>
        {isOpenDrawer && (
          <div
            onClick={handleToggleDrawer}
            className="fixed inset-0 z-40 cursor-default bg-slate-700/50 backdrop-blur-sm"
          ></div>
        )}
      </>
    </aside>
  )
}

export default Drawer
