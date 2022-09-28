import Link from 'next/link'
import React, { FC } from 'react'
import { Airplay } from 'react-feather'
import { useRouter } from 'next/router'

import { styles } from '~/shared/twin/project-header.styles'
import ProjectActionDropdown from '~/components/molecules/ProjectActionDropdown'
import ProjectStatusDropdown from '~/components/molecules/ProjectStatusDropdown'

const ProjectHead: FC = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  const tabs = [
    {
      name: 'Overview',
      href: `/team/${id}/overview`,
      slug: 'overview'
    },
    {
      name: 'Board',
      href: `/team/${id}/board`,
      slug: 'board'
    },
    {
      name: 'Chat',
      href: `/team/${id}/chat`,
      slug: 'chat'
    }
  ]

  return (
    <header css={styles.header}>
      <section css={styles.section}>
        <button type="button">
          <Airplay />
        </button>
        <nav css={styles.nav}>
          <div css={styles.project_details}>
            <h1>Team 6 Digits</h1>
            <ProjectActionDropdown />
            <ProjectStatusDropdown />
          </div>
          <ul>
            {tabs.map(({ name, href, slug }, i) => (
              <li key={i}>
                <Link href={href}>
                  <a css={styles.a({ router, id, slug })}>{name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <button type="button" css={styles.members}>
        <div>
          <img src="/images/animated-avatar.jpg" alt="" />
          <img src="/images/animated-avatar.jpg" alt="" />
          <img src="/images/404.png" alt="" />
        </div>
        <h3>12</h3>
      </button>
    </header>
  )
}

export default ProjectHead
