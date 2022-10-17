import React, { useState } from "react";
import toast from "react-hot-toast";

import { ThreeDot } from "~/shared/icons/ThreeDotIcon";
import { ActiveStatus } from "~/shared/icons/ActiveStatus";
import PeopleOption from "~/components/organisms/PeopleOption";
import AddPeopleButton from "~/components/atoms/AddPeopleButton";
import LineSkeleton from "~/components/atoms/Skeletons/LineSkeleton";
import { addNewMember, getAllUsers } from "~/redux/member/memberSlice";
import ImageSkeleton from "~/components/atoms/Skeletons/ImageSkeleton";
import { useAppDispatch, useAppSelector } from "~/hooks/reduxSelector";
import { getProject, memberRefresher } from "~/redux/project/projectSlice";

const PeopleList = ({ data, className, isLoading }: any) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, name, avatar, id } = data || {};
  const [optionState, setOptionState] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<number[]>([]);
  const [resetTeam, setResetTeam] = useState<boolean>(false);

  const { project } = useAppSelector((state) => state);
  const { overviewProject } = project || {};
  const { id: projectID, teams: projectTeams } = overviewProject || {};

  const addPeople = () => {
    setResetTeam(true);
    const newTeamData = { teams: selectedTeam, user_id: id, project_id: projectID };

    dispatch(memberRefresher());
    toast.promise(
      dispatch(addNewMember(newTeamData)).then((_) => {
        setSelectedTeam([]);
        setResetTeam(false);
        dispatch(getProject(projectID));
        dispatch(getAllUsers(projectID));
      }),
      {
        loading: 'Adding member...',
        success: "New member was successfully added!",
        error: "Error on adding new member!",
      }
    );
  }

  const dropDownOption = (value: any) => {
    setSelectedTeam(value);
  }

  const moreOption = (
    <>
      <AddPeopleButton onClick={addPeople} isSolid={false} isHeader={false} disabled={selectedTeam.length === 0 || resetTeam} />
      <PeopleOption data={projectTeams} callback={dropDownOption} reset={resetTeam}>
        <div className='hover:bg-slate-100 rotate-90 z-0 cursor-pointer w-[28px] h-[28px] flex items-center justify-center rounded-[3px] border border-slate-500 mb-[2px]'>
          <ThreeDot />
        </div>
      </PeopleOption>
    </>
  )

  return (
    <>
      {
        isLoading || !data
          ? [...Array(3)].map((_) => {
            return (
              <div key={Math.random()} className={`flex items-center justify-between hover:bg-slate-200 px-6 py-2`}>
                <div className="flex flex-row gap-3 items-center justify-start min-w-[150px] mobile:w-[75%] truncate text-ellipsis">
                  <div className="mobile:min-w-[36px] flex items-center justify-center">
                    <ImageSkeleton className="max-w-[36px] rounded-md max-h-[36px]" />
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <LineSkeleton className="w-[100px] flex h-[10px] !rounded-sm mt-[10px]" />
                      <ActiveStatus isActive={false} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          :
          <div
            onMouseOverCapture={() => setOptionState(true)}
            onMouseOut={() => setOptionState(false)}
            className={`flex items-center justify-between hover:bg-slate-200 px-6 py-2 ${className}`}
          >
            <div className="flex flex-row gap-3 items-center justify-start min-w-[150px] mobile:w-[75%] truncate text-ellipsis">
              <div className="mobile:min-w-[36px] flex items-center justify-center">
                <img
                  src={avatar?.url || '/images/avatar.png'}
                  alt="user-icon"
                  className="rounded-md max-w-[36px] min-w-[36px] max-h-[36px] min-h-[36px]"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <div className="flex flex-row gap-3 items-center">
                  <p className="text-slate-900 tracking-tighter font-medium text-[16px] mobile:!max-w-[130px] max-w-[200px] truncate">{name}</p>
                  <ActiveStatus isActive={isLoggedIn} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mr-1 items-center ml-[3px]">
              {optionState && moreOption}
            </div>
          </div>
      }
    </>
  );
};

export default PeopleList;
function stateRefresh() {
  throw new Error("Function not implemented.");
}

