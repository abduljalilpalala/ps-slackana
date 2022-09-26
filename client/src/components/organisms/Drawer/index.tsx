import Link from 'next/link'
import { X } from 'react-feather'
import { Hash } from 'react-feather'
import React, { FC, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'

import { useRouter } from 'next/router'
import { teams } from '~/shared/jsons/teams'
import Logo2Icon from '~/shared/icons/Logo2Icon'
import { classNames } from '~/helpers/classNames'
import { Link as ILink } from '~/shared/interfaces'
import { links } from '~/shared/jsons/sidebarLinks'
import { styles } from '~/shared/twin/drawer.styles'
import { globals } from '~/shared/twin/globals.styles'
import UserMenuPopover from '~/components/molecules/UserMenuPopover'
import { styles as sidebarStyles } from '~/shared/twin/sidebar.styles'

type Props = {
  isOpenDrawer: boolean
  handleToggleDrawer: () => void
}

const Drawer: FC<Props> = ({ isOpenDrawer, handleToggleDrawer }): JSX.Element => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleOpen = (): void => setIsOpen(!isOpen)

  return (
    <aside>
      <div className={classNames(isOpenDrawer ? 'translate-x-0' : '-translate-x-full', 'drawer')}>
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
                      {teams.map(({ id, name, notif }, i) => (
                        <li key={i} css={sidebarStyles.li}>
                          <Link href={`/team/${id}/overview`}>
                            <a
                              className={classNames(
                                router.asPath.includes(`/team/${id}`)
                                  ? 'bg-blue-600 text-slate-400'
                                  : ' hover:bg-blue-600'
                              )}
                            >
                              <div css={sidebarStyles.link}>
                                <Hash />
                                <span
                                  className={classNames(
                                    'line-clamp-1',
                                    notif ? 'font-bold text-white' : ''
                                  )}
                                >
                                  {name}
                                </span>
                              </div>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              </div>
            </nav>
          </div>
          <div css={sidebarStyles.footer}>
            <div css={sidebarStyles.user_wrapper}>
              <div css={globals.avatar}>
                <img src="/images/animated-avatar.jpg" />
              </div>
              <div css={sidebarStyles.user_details}>
                <h1>Joshua Galit</h1>
                <span>Developer</span>
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
            className="fixed inset-0 z-0 cursor-default bg-slate-700/50 backdrop-blur-sm"
          ></div>
        )}
      </>
    </aside>
  )
}

export default Drawer
