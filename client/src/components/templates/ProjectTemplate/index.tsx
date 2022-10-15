import React from "react";
import Link from 'next/link'
import moment from "moment";

import ReactTooltip from 'react-tooltip';
import statusChecker from "~/utils/statusChecker";
import { ProjectStatus } from "~/shared/icons/ProjectStatus";
import { skeletonAnimation } from "~/utils/skeletonAnimation";
import ImageSkeleton from "~/components/atoms/Skeletons/ImageSkeleton";
import LineSkeleton from "~/components/atoms/Skeletons/LineSkeleton";

type ProjectTemplateType = {
  data: {
    status: {
      name?: any;
    };
    icon: {
      url: string;
    };
    title: string;
    created_at: string;
    isArchived: number;
    id: number;
  } | null,
  isLoading?: boolean;
}

const ProjectTemplate = ({ data, isLoading }: ProjectTemplateType): JSX.Element => {
  const { status, icon, title, created_at, isArchived, id } = data || {};

  return (
    <>
      {isLoading
        ?
        <>
          {[...Array(12)].map(_ => {
            return (
              <div key={Math.random()} className="max-h-[48px] min-h-[48px] w-full">
                <div role="status" className={`space-y-8 mobile:!space-y-0 flex mobile:gap-4 ${skeletonAnimation}`}>
                  <div className="!max-w-[44px] !max-h-[44px] !min-max-w-[44px] !min-max-h-[44px]">
                    <ImageSkeleton className='!max-w-[44px] !max-h-[44px] !min-max-w-[44px] !min-max-h-[44px] rounded-md' />
                  </div>
                  <div className="w-full">
                    <LineSkeleton className="!max-w-[100px] !min-w-[100px] !mb-2.5" />
                    <LineSkeleton className="!w-[60px] !mb-3" />
                  </div>
                </div>
              </div>)
          })}
          <LineSkeleton className="!w-[100px] !h-[15px] !rounded-md" />
        </>
        :
        <div className={`flex flex-row gap-3 h-px-48 ${isArchived && 'opacity-60'}`}>
          <div data-tip={isArchived ? status?.name || "Untracked" + " | Archive" : status?.name || "Untracked"} className="min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px]">
            <ReactTooltip />
            <Link href={`/team/${id}/overview`}>
              <a>
                <img
                  src={icon?.url || "/image/404.png"}
                  alt="team-icon"
                  width={100}
                  height={100}
                  className="cursor-pointer"
                />
              </a>
            </Link>
          </div>
          <div>
            <div className='flex flex-row justify-ceter items-center gap-2'>
              <ProjectStatus status={statusChecker(status?.name)} />
              <p className='text-slate-900 truncate text-ellipsis w-full max-w-[170px]'>{title}</p>
            </div>
            <p className='text-slate-600'>{moment(created_at).format('MMM DD, YYYY')}</p>
          </div>
        </div>}
    </>
  );
}

export default ProjectTemplate;
