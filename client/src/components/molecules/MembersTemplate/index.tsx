import React from 'react'
import ReactTooltip from 'react-tooltip'

import { FistIcon } from "~/shared/icons/FistIcon";
import { StarIcon } from "~/shared/icons/StarIcon";
import { CrownIcon } from "~/shared/icons/CrownIcon";
import handleImageError from '~/helpers/handleImageError';
import LineSkeleton from "~/components/atoms/Skeletons/LineSkeleton";
import ImageSkeleton from "~/components/atoms/Skeletons/ImageSkeleton";

const MembersTemplate = ({ data, loadingState }: any) => {
  const { teams, user, is_mvp, role } = data || {}
  const { name, isLoggedIn, avatar } = user || {}
  const { id: roleID } = role || {}

  const teamToolTip = teams
    ?.map((team: any) => {
      return team?.name
    })
    .join(' | ')

  return (
    <>
      {loadingState ? (
        <>
          {[...Array(8)].map((_) => {
            return (
              <div key={Math.random()} className="flex items-center gap-2 ">
                <div
                  className={`flex max-h-[44px] min-h-[44px] min-w-[44px] max-w-[44px] items-center justify-center rounded-full border-4 ${isLoggedIn ? 'border-green-600' : 'border-slate-400'
                    }`}
                >
                  <ImageSkeleton className="!h-[36px] !w-[36px] rounded-full" />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <LineSkeleton className="!mt-[10px] !w-[90px]" />
                  <LineSkeleton className="!w-[60px]" />
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <div className="flex w-full items-center gap-2">
          <div
            className={`
              relative flex max-h-[44px] min-h-[44px] min-w-[44px] max-w-[44px] items-center justify-center rounded-full border-4
              ${isLoggedIn ? 'border-green-600' : 'border-slate-400'}
            `}
          >
            <img
              src={avatar?.url}
              onError={(e) => handleImageError(e, '/images/avatar.png')}
              alt="members-icon"
              width={100}
              height={100}
              className={`max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px] rounded-full border-2 bg-slate-500 ${(is_mvp || roleID < 3) && 'border-2 border-yellow-400'
                }`}
            />
            <div className="absolute -bottom-[5px] -right-[5px] flex max-h-[15px] max-w-[33px] justify-end gap-1">
              {is_mvp ? (
                <div className="max-h-[15px] max-w-[15px] rounded-full bg-slate-100 ">
                  <StarIcon />
                </div>
              ) : null}
              {[1, 2].map((id: number) => {
                return roleID === id ? (
                  <div key={id} className="max-h-[15px] max-w-[15px] rounded-full bg-slate-100 ">
                    {roleID === 1 && <CrownIcon />}
                    {roleID === 2 && <FistIcon />}
                  </div>
                ) : null
              })}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start">
            <span
              data-tip={name.length >= 15 ? name : null}
              className="max-w-[150px] cursor-default truncate text-base font-semibold mobile:!max-w-[210px]"
            >
              {name}
            </span>
            <span
              data-tip={teamToolTip.length >= 20 ? teamToolTip : null}
              className="max-w-[150px] cursor-default truncate text-slate-500 mobile:!max-w-[210px]"
            >
              {teamToolTip}
            </span>
            <ReactTooltip />
          </div>
        </div>
      )}
    </>
  )
}

export default MembersTemplate
