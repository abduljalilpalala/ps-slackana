import Link from 'next/link'
import React, { FC, useState } from 'react'
import { Airplay } from 'react-feather'
import { useRouter } from 'next/router'
import { FaRegUser } from 'react-icons/fa'

import { classNames } from '~/helpers/classNames'
import { styles } from '~/shared/twin/project-header.styles'
import ProjectActionDropdown from '~/components/molecules/ProjectActionDropdown'
import ProjectStatusDropdown from '~/components/molecules/ProjectStatusDropdown'
import AddMemberModal from '~/components/organisms/AddMemberModal'

const ProjectHead: FC = (): JSX.Element => {
  const router = useRouter()
  const [addModal, setAddModal] = useState<boolean>(false);

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
    <>
      {addModal && <AddMemberModal close={() => setAddModal(false)} />}
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
        <button onClick={() => setAddModal(!addModal)} type="button" className="group" css={styles.btn_members}>
          <div className="hidden lg:block">
            <section>
              <img src="https://ca.slack-edge.com/E028JVBUY4F-U03N2F2SHV2-39c1dcf42b67-32" alt="" />
              <img src="https://ca.slack-edge.com/E028JVBUY4F-U03N1UNTGAY-5ef1b06f109b-32" alt="" />
              <img src="https://ca.slack-edge.com/E028JVBUY4F-U03DUBE2G9W-974bff0bc22c-32" alt="" />
            </section>
          </div>
          <FaRegUser className="group-hover:text-slate-800" />
          <h3 className="group-hover:text-slate-800">12</h3>
        </button>
      </header>
    </>
  )
}

export default ProjectHead
