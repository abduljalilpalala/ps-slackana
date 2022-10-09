import React from "react";
import Image from 'next/image'

import { useAppSelector } from "~/hooks/reduxSelector";
import ImageSkeleton from "~/components/atoms/Skeletons/ImageSkeleton";
import LineSkeleton from "~/components/atoms/Skeletons/LineSkeleton";

const MembersTemplate = ({ data, loadingState }: any) => {
  const { teams, user } = data || {};
  const { name, isloggedIn, avatar } = user || {};

  return (
    <>
      {
        loadingState
          ?
          <>
            {[...Array(8)].map(_ => {
              return (
                <div key={Math.random()} className='flex items-center gap-2 '>
                  <div className={`min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] flex justify-center items-center rounded-full border-4 ${isloggedIn ? "border-green-600" : "border-slate-400"}`}>
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
          <div className='flex items-center gap-2 '>
            <div className={`min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] flex justify-center items-center rounded-full border-4 ${isloggedIn ? "border-green-600" : "border-slate-400"}`}>
              <Image
                src={avatar?.url || "/images/404.png"}
                alt="members-icon"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <span className='text-base font-semibold w-[150px] mobile:!w-full truncate'>{name}</span>
              <span className='text-slate-500 w-[150px] mobile:!w-full truncate'>
                {teams?.map((team: { id: number, name: string }, index: number) => {
                  return team.name
                }).join("/").split("")}
              </span>
            </div>
          </div>
      }
    </>
  );
};

export default MembersTemplate;
