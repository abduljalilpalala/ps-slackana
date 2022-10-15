import React from "react";

import ImageSkeleton from "~/components/atoms/Skeletons/ImageSkeleton";
import LineSkeleton from "~/components/atoms/Skeletons/LineSkeleton";
import ReactTooltip from "react-tooltip";

const MembersTemplate = ({ data, loadingState }: any) => {
  const { teams, user } = data || {};
  const { name, isLoggedIn, avatar } = user || {};

  const teamToolTip = teams?.map((team: any) => { return team?.name }).join(" | ");

  return (
    <>
      {
        loadingState
          ?
          <>
            {[...Array(8)].map(_ => {
              return (
                <div key={Math.random()} className='flex items-center gap-2 '>
                  <div className={`min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] flex justify-center items-center rounded-full border-4 ${isLoggedIn ? "border-green-600" : "border-slate-400"}`}>
                    <ImageSkeleton className='rounded-full !h-[36px] !w-[36px]' />
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <LineSkeleton className="!w-[90px] !mt-[10px]" />
                    <LineSkeleton className="!w-[60px]" />
                  </div>
                </div>
              )
            })}
          </>
          :
          <div className='flex items-center gap-2 w-full'>
            <div className={`
              min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] flex justify-center items-center rounded-full border-4 
              ${isLoggedIn ? "border-green-600" : "border-slate-400"}
            `}>
              <img
                src={avatar?.url || "/images/404.png"}
                alt="members-icon"
                width={100}
                height={100}
                className="rounded-full bg-slate-500 max-h-[36px] min-h-[36px] max-w-[36px] min-w-[36px]"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <span
                data-tip={name.length >= 15 ? name : null}
                className='text-base font-semibold max-w-[150px] mobile:!max-w-[210px] truncate cursor-default'
              >
                {name}
              </span>
              <span
                data-tip={teamToolTip.length >= 20 ? teamToolTip : null}
                className='text-slate-500 max-w-[150px] mobile:!max-w-[210px] truncate cursor-default'
              >
                {teamToolTip}
              </span>
              <ReactTooltip />
            </div>
          </div>
      }
    </>
  );
};

export default MembersTemplate;
