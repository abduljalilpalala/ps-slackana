import React from 'react'
import Link from 'next/link'
import moment from 'moment'

import ReactTooltip from 'react-tooltip'
import statusChecker from '~/utils/statusChecker'
import { ProjectStatus } from '~/shared/icons/ProjectStatus'
import { skeletonAnimation } from '~/utils/skeletonAnimation'
import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import handleImageError from '~/helpers/handleImageError'

type ProjectTemplateType = {
  data: {
    status: {
      name?: any
    }
    icon: {
      url: string
    }
    title: string
    created_at: string
    isArchived: number
    id: number
  } | null
  isLoading?: boolean
}

const ProjectTemplate = ({ data, isLoading }: ProjectTemplateType): JSX.Element => {
  const { status, icon, title, created_at, isArchived, id } = data || {}

  return (
    <>
      {isLoading ? (
        <>
          {[...Array(12)].map((_) => {
            return (
              <div key={Math.random()} className="max-h-[48px] min-h-[48px] w-full">
                <div
                  role="status"
                  className={`flex space-y-8 mobile:gap-4 mobile:!space-y-0 ${skeletonAnimation}`}
                >
                  <div className="!min-max-w-[44px] !min-max-h-[44px] !max-h-[44px] !max-w-[44px]">
                    <ImageSkeleton className="!min-max-w-[44px] !min-max-h-[44px] !max-h-[44px] !max-w-[44px] rounded-md" />
                  </div>
                  <div className="w-full">
                    <LineSkeleton className="!mb-2.5 !min-w-[100px] !max-w-[100px]" />
                    <LineSkeleton className="!mb-3 !w-[60px]" />
                  </div>
                </div>
              </div>
            )
          })}
          <LineSkeleton className="!h-[15px] !w-[100px] !rounded-md" />
        </>
      ) : (
        <div className={`flex h-px-48 flex-row gap-3 ${isArchived && 'opacity-60'}`}>
          <div
            data-tip={
              isArchived ? status?.name || 'Untracked' + ' | Archive' : status?.name || 'Untracked'
            }
            className="max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px]"
          >
            <ReactTooltip />
            <Link href={`/team/${id}/overview`}>
              <a>
                <img
                  src={icon?.url}
                  onError={(e) => handleImageError(e, '/images/image-dummy.png')}
                  alt="team-icon"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
              </a>
            </Link>
          </div>
          <div>
            <div className="justify-ceter flex flex-row items-center gap-2">
              <ProjectStatus status={statusChecker(status?.name)} />
              <p className="w-full max-w-[170px] truncate text-ellipsis text-slate-900">{title}</p>
            </div>
            <p className="text-slate-600">{moment(created_at).format('MMM DD, YYYY')}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectTemplate
