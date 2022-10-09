import Link from 'next/link'
import { Hash } from 'react-feather'
import { useRouter } from 'next/router'
import { CgHomeAlt } from 'react-icons/cg'
import { AiOutlineCaretDown } from 'react-icons/ai'
import React, { FC, useEffect, useState } from 'react'

import { isLoggedIn } from '~/utils/isLoggedIn'
import Logo2Icon from '~/shared/icons/Logo2Icon'
import { classNames } from '~/helpers/classNames'
import { styles } from '~/shared/twin/sidebar.styles'
import { globals } from '~/shared/twin/globals.styles'
import { getSidebarProjects } from '~/redux/project/projectSlice'
import UserMenuPopover from '~/components/molecules/UserMenuPopover'
import { useAppSelector, useAppDispatch } from '~/hooks/reduxSelector'

type Props = {
  isOpenSidebar: boolean
}

const Sidebar: FC<Props> = ({ isOpenSidebar }): JSX.Element => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const [isOpenProject, setIsOpenProject] = useState<boolean>(true)

  const { user } = useAppSelector((state) => state.auth)
  const { name, avatar, isloggedIn: status, email } = user || {}

  const handleOpenProject = (): void => setIsOpenProject(!isOpenProject)
  const { sidebarProject, isLoading } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (isLoading) {
      dispatch(getSidebarProjects());
    }
  }, [isLoading])

  return (
    <aside
      css={styles.aside}
      className={
        isOpenSidebar ? 'max-w-0 translate-x-0 md:max-w-[280px]' : 'max-w-0 -translate-x-full'
      }
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
                  {sidebarProject?.map(({ id, title, isArchived }: { id: number, title: string, isArchived: number }, index: number) => (
                    isArchived ? null : <li key={index} css={styles.li}>
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
                              className='truncate text-ellipsis max-w-[180px]'
                            >
                              {title}
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
            <div css={globals.avatar} className={isLoggedIn(status)} >
              <img src={avatar?.url} />
            </div>
            <div css={styles.user_details}>
              <h1>{name}</h1>
              <span>{email}</span>
            </div>
          </div>
          <UserMenuPopover />
        </footer>
      </div>
    </aside>
  )
}

export default Sidebar
