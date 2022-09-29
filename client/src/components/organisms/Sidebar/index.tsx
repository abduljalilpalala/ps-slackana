import Link from 'next/link'
import { Hash } from 'react-feather'
import { useRouter } from 'next/router'
import { CgHomeAlt } from 'react-icons/cg'
import React, { FC, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'

import { teams } from '~/shared/jsons/teams'
import Logo2Icon from '~/shared/icons/Logo2Icon'
import { classNames } from '~/helpers/classNames'
import { styles } from '~/shared/twin/sidebar.styles'
import { globals } from '~/shared/twin/globals.styles'
import UserMenuPopover from '~/components/molecules/UserMenuPopover'

type Props = {
  isOpenSidebar: ConstrainBoolean
}

const Sidebar: FC<Props> = ({ isOpenSidebar }): JSX.Element => {
  const router = useRouter()
  const [isOpenProject, setIsOpenProject] = useState<boolean>(true)

  const handleOpenProject = (): void => setIsOpenProject(!isOpenProject)

  return (
    <aside
      css={styles.aside}
      className={classNames(
        isOpenSidebar ? 'max-w-0 translate-x-0 md:max-w-[280px]' : 'max-w-0 -translate-x-full'
      )}
    >
      <div css={styles.wrapper}>
        <header css={styles.business_logo}>
          <div>
            <Logo2Icon />
            <p>Slackana</p>
          </div>
        </header>
        <nav css={styles.nav} className="default-scrollbar scroll-show-on-hover">
          <ul>
            <li>
              <Link href="/">
                <a
                  className={classNames(
                    router.pathname === '/' ? 'bg-blue-600 text-white' : 'hover:bg-slate-700'
                  )}
                >
                  <CgHomeAlt />
                  <span>Home</span>
                </a>
              </Link>
            </li>
          </ul>
          <div css={styles.project_wrapper}>
            <>
              <div css={styles.project_caret} onClick={handleOpenProject}>
                <AiOutlineCaretDown className={`${!isOpenProject ? '-rotate-90' : ''}`} />
                <p>Projects</p>
              </div>
              {isOpenProject && (
                <ul>
                  {teams.map(({ id, name, notif }, i) => (
                    <li key={i} css={styles.li}>
                      <Link href={`/team/${id}/overview`}>
                        <a
                          className={classNames(
                            router.asPath.includes(`/team/${id}`)
                              ? 'bg-blue-600 text-white'
                              : ' hover:bg-slate-700'
                          )}
                        >
                          <div css={styles.link}>
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
        <footer css={styles.footer}>
          <div css={styles.user_wrapper}>
            <div css={globals.avatar}>
              <img src="/images/animated-avatar.jpg" />
            </div>
            <div css={styles.user_details}>
              <h1>Joshua Galit</h1>
              <span>Developer</span>
            </div>
          </div>
          <UserMenuPopover />
        </footer>
      </div>
    </aside>
  )
}

export default Sidebar
