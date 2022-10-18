import { Bell } from 'react-feather'
import { toast } from 'react-hot-toast'
import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'

import {
  getAllUsers,
  removeMember,
  filterMembers,
  leaveProject,
  setAsTeamLead,
  setAsMVP
} from '~/redux/member/memberSlice'
import { FistIcon } from '~/shared/icons/FistIcon'
import { StarIcon } from '~/shared/icons/StarIcon'
import { MemberListProps } from './MemberListType'
import { CrownIcon } from '~/shared/icons/CrownIcon'
import { ThreeDot } from '~/shared/icons/ThreeDotIcon'
import { ActiveStatus } from '~/shared/icons/ActiveStatus'
import MemberOption from '~/components/organisms/MemberOption'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getProject, memberRefresher } from '~/redux/project/projectSlice'
import handleImageError from '~/helpers/handleImageError'

const MemberList = ({ data, isLast, isLoading, className, filterData }: MemberListProps) => {
  const dispatch = useAppDispatch()
  const [optionState, setOptionState] = useState<boolean>(false)
  const { project, auth } = useAppSelector((state) => state)
  const {
    overviewProject: { role: userRole, id: projectID }
  } = project || {}
  const { user: userAuth } = auth || {}
  const { id: authID } = userAuth || {}

  const { role, user, teams, is_mvp } = data || {}
  const { name: roleTitle, id: roleID } = role || {}
  const { name, avatar, isLoggedIn, id: currentUserID } = user || {}
  const teamList = teams
    ?.map((team: any) => {
      return team?.name
    })
    .join(' | ')

  const nudge = () => {
    console.log('Integrate Ping')
  }

  const stateRefresh = () => {
    dispatch(
      filterMembers({
        projectID,
        teamID: filterData < 0 ? 0 : filterData
      })
    )
    dispatch(getProject(projectID))
    dispatch(getAllUsers(projectID))
  }

  const dropDownOption = (index: number, value: string) => {
    switch (index) {
      case 0: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(setAsTeamLead({ projectID, userID: currentUserID })).then((_) => {
            stateRefresh()
          }),
          {
            loading: 'Updating user role...',
            success: `Successfully ${value}!`,
            error: 'Error on assigning as Team Lead!'
          }
        )
      }
      case 1: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(setAsMVP({ projectID, userID: currentUserID })).then((_) => {
            stateRefresh()
          }),
          {
            loading: 'Updating user role...',
            success: `Successfully ${value}!`,
            error: 'Error on assigning as Team Lead!'
          }
        )
      }
      case 3: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(leaveProject(projectID)).then((_) => {
            stateRefresh()
          }),
          {
            loading: 'Leaving project...',
            success: 'You leave this project successfully!',
            error: 'Error on leaving project!'
          }
        )
      }
      case 4: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(removeMember({ projectID, userID: currentUserID })).then((_) => {
            stateRefresh()
          }),
          {
            loading: 'Removing member...',
            success: 'Member removed successfully!',
            error: 'Error on removing member!'
          }
        )
      }

      default:
        toast.error('Something went wrong.')
    }
  }

  const moreOption = (
    <>
      <Bell
        fill={false ? '#2563EB' : 'transparent'}
        color="#2563EB"
        className="cursor-pointer"
        onClick={nudge}
      />
      {(userRole !== 3 || (userRole === 3 && authID === currentUserID)) && (
        <MemberOption
          data={data}
          filterData={filterData}
          callback={dropDownOption}
          closeOption={setOptionState}
          isLast={isLast}
        >
          <div className="z-0 mb-[3px] flex h-[26px] w-[26px] rotate-90 cursor-pointer items-center justify-center rounded-[3px] border border-slate-500 hover:bg-slate-100">
            <ThreeDot />
          </div>
        </MemberOption>
      )}
    </>
  )

  return (
    <>
      {isLoading ? (
        <>
          {[...Array(4)].map((_) => {
            return (
              <div
                key={Math.random()}
                className={`flex items-center justify-between px-6 py-2 hover:bg-slate-200`}
              >
                <div className="flex min-w-[150px] flex-row items-center justify-start gap-3 truncate text-ellipsis mobile:w-[75%]">
                  <div className="flex items-center justify-center mobile:min-w-[36px]">
                    <ImageSkeleton className="max-h-[36px] max-w-[36px] rounded-md" />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex flex-row items-center justify-start gap-3">
                      <div className="mt-[10px] flex flex-col">
                        <div className="flex gap-3">
                          <LineSkeleton className="flex h-[10px] w-[100px] !rounded-sm" />
                          <ActiveStatus isActive={false} />
                          <LineSkeleton className="flex h-[10px] w-[50px] !rounded-sm" />
                        </div>
                        <LineSkeleton className="flex h-[10px] w-[100px] !rounded-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <div
          onMouseOut={() => setOptionState(false)}
          onMouseOverCapture={() => setOptionState(true)}
          className={`relative flex items-center justify-between px-6 py-2 hover:bg-slate-200 ${className} ${
            isLast && '!mb-[210px]'
          }`}
        >
          <div className="flex min-w-[150px] flex-row items-center justify-start gap-3 truncate text-ellipsis mobile:w-[75%]">
            <div className="relative flex max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px] items-center justify-center mobile:min-w-[36px]">
              <img
                src={avatar?.url}
                onError={(e) => handleImageError(e, '/images/avatar.png')}
                alt="user-icon"
                className={`max-h-[36px] min-h-[36px] min-w-[36px] max-w-[36px] rounded-md ${
                  (is_mvp || roleID < 3) && 'border-2 border-yellow-400'
                } `}
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
              <div className="flex flex-row flex-wrap items-center gap-3 mobile:!gap-0">
                <div className="flex items-center justify-center gap-3">
                  <p className="max-w-[150px] truncate text-left text-[16px] font-medium tracking-tighter text-slate-900">
                    {name}
                  </p>
                  <ActiveStatus isActive={isLoggedIn} className="mobile:!mr-3" />
                </div>
                <p
                  className="max-w-[130px] cursor-default truncate text-slate-400"
                  data-tip={roleTitle?.length >= 10 ? roleTitle : null}
                >
                  {roleTitle}
                </p>
                <ReactTooltip />
              </div>
              <p
                className="max-w-[200px] cursor-default truncate text-slate-400"
                data-tip={teamList}
              >
                {teamList}
              </p>
              <ReactTooltip />
            </div>
          </div>
          <div className="mr-2 flex h-full items-center gap-4 mobile:absolute mobile:right-4">
            {optionState && moreOption}
          </div>
        </div>
      )}
    </>
  )
}

export default MemberList
