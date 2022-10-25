import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaRegUser } from 'react-icons/fa'
import React, { FC, useEffect, useState } from 'react'

import {
  getProject,
  resetRefresher,
  startRefresher,
  setEditProjectID,
  setUserPermission,
  setEditProjectTitle,
  setEditProjectDescription
} from '~/redux/project/projectSlice'
import { styles } from '~/shared/twin/project-header.styles'
import AddMemberModal from '~/components/organisms/AddMemberModal'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import ProjectActionDropdown from '~/components/molecules/ProjectActionDropdown'
import ProjectStatusDropdown from '~/components/molecules/ProjectStatusDropdown'
import handleImageError from '~/helpers/handleImageError'
import { usePusherNudge } from '~/hooks/pusherNudge'

const ProjectHead: FC = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const [addModal, setAddModal] = useState<boolean>(false)

  const { isLoading, refresher, overviewProject } = useAppSelector((state) => state.project)

  const {
    icon,
    members,
    description,
    id: projectID,
    can: userPermission,
    title: projectTitle,
    numberOfActiveMembers
  } = overviewProject || {}
  const { memberStateUpdate } = refresher || {}
  const hotReload = id == projectID

  useEffect(() => {
    dispatch(startRefresher())
    dispatch(setEditProjectID(id))
    dispatch(getProject(id)).then((_) => {
      dispatch(resetRefresher())
    })
  }, [id])

  usePusherNudge()

  useEffect(() => {
    dispatch(setEditProjectTitle(projectTitle))
    dispatch(setEditProjectDescription(description))
  }, [projectTitle, description])

  useEffect(() => {
    if (memberStateUpdate) {
      dispatch(getProject(id)).then((_) => {
        dispatch(resetRefresher())
      })
    }
  }, [memberStateUpdate])

  useEffect(() => {
    dispatch(setUserPermission(userPermission))
  }, [isLoading, memberStateUpdate])

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
          {isLoading ? (
            !hotReload ? (
              <ImageSkeleton className="!max-h-[44px] !min-h-[44px] !min-w-[44px] !max-w-[44px] !rounded-md" />
            ) : (
              <img
                src={icon?.url}
                onError={(e) => handleImageError(e, '/images/image-dummy.png')}
                alt="team-icon"
                width={44}
                height={44}
              />
            )
          ) : (
            <img
              src={icon?.url}
              onError={(e) => handleImageError(e, '/images/image-dummy.png')}
              alt="team-icon"
              width={44}
              height={44}
            />
          )}
          <nav css={styles.nav}>
            <div css={styles.project_details} className="mt-1 flex h-[20px] !justify-between">
              {isLoading ? (
                !hotReload ? (
                  <LineSkeleton className="!mt-[8px] !h-[12px] w-[150px] !rounded-md" />
                ) : (
                  <h1>{projectTitle}</h1>
                )
              ) : (
                <h1>{projectTitle}</h1>
              )}
              <div className="flex items-center justify-center gap-3">
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
        <button
          onClick={() => setAddModal(!addModal)}
          type="button"
          className="group"
          css={styles.btn_members}
        >
          <div className="hidden lg:block">
            <section>
              {members
                ? members
                    ?.slice(0, 3)
                    .map(
                      (
                        icon: { user: { avatar: { url: string } }; is_removed: boolean },
                        index: number
                      ) => {
                        if (!icon?.is_removed)
                          return (
                            <img
                              key={index}
                              src={icon?.user?.avatar?.url}
                              onError={(e) => handleImageError(e, '/images/team/qa.png')}
                              alt="team-icon"
                            />
                          )
                      }
                    )
                : [...Array(3)].map((_) => {
                    return <img key={Math.random()} src={'/images/team/qa.png'} alt="team-icon" />
                  })}
            </section>
          </div>
          <FaRegUser className="group-hover:text-slate-800" />
          <h3 className="group-hover:text-slate-800">{members && numberOfActiveMembers}</h3>
        </button>
      </header>
    </>
  )
}

export default ProjectHead
