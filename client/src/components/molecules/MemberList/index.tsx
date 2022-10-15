import { Bell } from "react-feather";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import { MemberListProps } from './MemberListType';
import { FistIcon } from "~/shared/icons/FistIcon";
import { StarIcon } from '~/shared/icons/StarIcon';
import { CrownIcon } from "~/shared/icons/CrownIcon";
import { ThreeDot } from "~/shared/icons/ThreeDotIcon";
import { ActiveStatus } from "~/shared/icons/ActiveStatus";
import MemberOption from "~/components/organisms/MemberOption";
import LineSkeleton from "~/components/atoms/Skeletons/LineSkeleton";
import ImageSkeleton from "~/components/atoms/Skeletons/ImageSkeleton";
import { useAppDispatch, useAppSelector } from "~/hooks/reduxSelector";
import { getProject, memberRefresher } from '~/redux/project/projectSlice';
import { getAllUsers, removeMember, filterMembers, leaveProject, setAsTeamLead, setAsMVP } from "~/redux/member/memberSlice";

const MemberList = ({
  data,
  isLast,
  isLoading,
  className,
  filterData,
}: MemberListProps) => {
  const dispatch = useAppDispatch();
  const [optionState, setOptionState] = useState<boolean>(false);
  const { project, auth } = useAppSelector((state) => state);
  const { overviewProject: { role: userRole, id: projectID } } = project || {};
  const { user: userAuth } = auth || {};
  const { id: authID } = userAuth || {};

  const { role, user, teams, is_mvp } = data || {};
  const { name: roleTitle, id: roleID } = role || {};
  const { name, avatar, isLoggedIn, id: currentUserID } = user || {};
  const teamList = teams?.map((team: any) => { return team?.name }).join(" | ");

  const nudge = () => {
    console.log('Integrate Ping');
  }

  const stateRefresh = () => {
    dispatch(filterMembers({
      projectID,
      teamID: filterData < 0 ? 0 : filterData
    }));
    dispatch(getProject(projectID));
    dispatch(getAllUsers(projectID));
  }

  const dropDownOption = (index: number, value: string) => {
    switch (index) {
      case 0: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(setAsTeamLead({ projectID, userID: currentUserID })).then((_) => {
            stateRefresh();
          }),
          {
            loading: 'Updating user role...',
            success: `Successfully ${value}!`,
            error: "Error on assigning as Team Lead!",
          }
        );
      }
      case 1: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(setAsMVP({ projectID, userID: currentUserID })).then((_) => {
            stateRefresh();
          }),
          {
            loading: 'Updating user role...',
            success: `Successfully ${value}!`,
            error: "Error on assigning as Team Lead!",
          }
        );
      }
      case 3: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(leaveProject(projectID)).then((_) => {
            stateRefresh();
          }),
          {
            loading: 'Leaving project...',
            success: "You leave this project successfully!",
            error: "Error on leaving project!",
          }
        );
      }
      case 4: {
        dispatch(memberRefresher())
        return toast.promise(
          dispatch(removeMember({ projectID, userID: currentUserID })).then((_) => {
            stateRefresh();
          }),
          {
            loading: 'Removing member...',
            success: "Member removed successfully!",
            error: "Error on removing member!",
          }
        );
      }

      default:
        toast.error("Something went wrong.");
    }
  }

  const moreOption = (
    <>
      <Bell fill={false ? '#2563EB' : 'transparent'} color="#2563EB" className="cursor-pointer" onClick={nudge} />
      {
        (userRole !== 3 || (userRole === 3 && authID === currentUserID)) && (
          <MemberOption
            data={data}
            filterData={filterData}
            callback={dropDownOption}
            closeOption={setOptionState}
            isLast={isLast}>
            <div className='hover:bg-slate-100 rotate-90 z-0 mb-[3px] cursor-pointer w-[26px] h-[26px] flex items-center justify-center rounded-[3px] border border-slate-500'>
              <ThreeDot />
            </div>
          </MemberOption>
        )
      }
    </>
  )

  return (
    <>
      {
        isLoading
          ? <>
            {
              [...Array(4)].map((_) => {
                return (
                  <div key={Math.random()} className={`flex items-center justify-between hover:bg-slate-200 px-6 py-2`}>
                    <div className="flex flex-row gap-3 items-center justify-start min-w-[150px] mobile:w-[75%] truncate text-ellipsis">
                      <div className="mobile:min-w-[36px] flex items-center justify-center">
                        <ImageSkeleton className="max-w-[36px] rounded-md max-h-[36px]" />
                      </div>
                      <div className="flex flex-col justify-start items-start">
                        <div className="flex flex-row gap-3 items-center justify-start">
                          <div className="flex flex-col mt-[10px]">
                            <div className="flex gap-3">
                              <LineSkeleton className="w-[100px] flex h-[10px] !rounded-sm" />
                              <ActiveStatus isActive={false} />
                              <LineSkeleton className="w-[50px] flex h-[10px] !rounded-sm" />
                            </div>
                            <LineSkeleton className="w-[100px] flex h-[10px] !rounded-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </>
          : <div
            onMouseOut={() => setOptionState(false)}
            onMouseOverCapture={() => setOptionState(true)}
            className={`relative flex items-center justify-between hover:bg-slate-200 px-6 py-2 ${className} ${isLast && "!mb-[210px]"}`}
          >
            <div className="flex flex-row gap-3 items-center justify-start min-w-[150px] mobile:w-[75%] truncate text-ellipsis">
              <div className="relative mobile:min-w-[36px] max-w-[36px] min-w-[36px] max-h-[36px] min-h-[36px] flex items-center justify-center">
                <img
                  src={avatar?.url || '/images/animated-avatar.jpg'}
                  alt="user-icon"
                  className={`rounded-md max-w-[36px] min-w-[36px] max-h-[36px] min-h-[36px] ${(is_mvp || roleID < 3) && "border-2 border-yellow-400"} `}
                />
                <div className="absolute flex justify-end gap-1 max-w-[33px] max-h-[15px] -bottom-[5px] -right-[5px]">
                  {
                    is_mvp ? (
                      <div className="bg-slate-100 rounded-full max-w-[15px] max-h-[15px] ">
                        <StarIcon />
                      </div>
                    ) : null
                  }
                  {
                    [1, 2].map((id: number) => {
                      return roleID === id ? (
                        <div key={id} className="bg-slate-100 rounded-full max-w-[15px] max-h-[15px] ">
                          {roleID === 1 && <CrownIcon />}
                          {roleID === 2 && <FistIcon />}
                        </div>
                      ) : null
                    })
                  }
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="flex flex-row gap-3 mobile:!gap-0 items-center flex-wrap">
                  <div className="flex items-center gap-3 justify-center">
                    <p className="text-slate-900 tracking-tighter font-medium text-[16px] text-left max-w-[150px] truncate">{name}</p>
                    <ActiveStatus isActive={isLoggedIn} className="mobile:!mr-3" />
                  </div>
                  <p
                    className="text-slate-400 max-w-[130px] truncate cursor-default"
                    data-tip={roleTitle?.length >= 10 ? roleTitle : null}>
                    {roleTitle}
                  </p>
                  <ReactTooltip />
                </div>
                <p
                  className="text-slate-400 max-w-[200px] truncate cursor-default"
                  data-tip={teamList}
                >
                  {teamList}
                </p>
                <ReactTooltip />
              </div>
            </div>
            <div className="flex gap-4 mr-2 items-center h-full mobile:absolute mobile:right-4">
              {optionState && moreOption}
            </div>
          </div>
      }
    </>
  );
};

export default MemberList;
