import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FaRegUser } from 'react-icons/fa'
import React, { FC, useState } from 'react'

import { useAppSelector } from '~/hooks/reduxSelector'
import { styles } from '~/shared/twin/project-header.styles'
import AddMemberModal from '~/components/organisms/AddMemberModal'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import ProjectActionDropdown from '~/components/molecules/ProjectActionDropdown'
import ProjectStatusDropdown from '~/components/molecules/ProjectStatusDropdown'

const ProjectHead: FC = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const [addModal, setAddModal] = useState<boolean>(false);

  const {
    isLoading,
    overviewProject,
    projectDescription: { title },
  } = useAppSelector((state) => state.project);

  const { members, icon, id: projectID, numberOfActiveMembers } = overviewProject || {};
  const hotReload = id == projectID;

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
          {
            isLoading
              ? !hotReload
                ? <ImageSkeleton className='!max-w-[44px] !min-w-[44px] !max-h-[44px] !min-h-[44px] !rounded-md' />
                : <img
                  src={icon?.url || "/images/image-dummy.png"}
                  alt="team-icon"
                  width={44}
                  height={44}
                />
              : <img
                src={icon?.url || "/images/image-dummy.png"}
                alt="team-icon"
                width={44}
                height={44}
              />
          }
          <nav css={styles.nav}>
            <div css={styles.project_details} className="flex !justify-between h-[20px] mt-1">
              {
                isLoading
                  ? !hotReload
                    ? <LineSkeleton className='w-[150px] !rounded-md !h-[12px] !mt-[8px]' />
                    : <h1>{title}</h1>
                  : <h1>{title}</h1>
              }
              <div className='flex justify-center items-center gap-3'>
                <ProjectActionDropdown />
                <ProjectStatusDropdown />
              </div>
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
              {
                members
                  ? members?.slice(0, 3).map((icon: { user: { avatar: { url: string } }, is_removed: boolean }, index: number) => {
                    if (!icon?.is_removed) return <img key={index} src={icon?.user?.avatar?.url || "/images/team/qa.png"} alt="team-icon" />;
                  })
                  : [...Array(3)].map((_) => { return <img key={Math.random()} src={"/images/team/qa.png"} alt="team-icon" /> })
              }
            </section>
          </div>
          <FaRegUser className="group-hover:text-slate-800" />
          <h3 className="group-hover:text-slate-800">{members ? numberOfActiveMembers : 3}</h3>
        </button>
      </header>
    </>
  )
}

export default ProjectHead
