import { ChevronDown } from 'react-feather';
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

import { CheckIcon } from '~/shared/icons/CheckIcon';
import { MemberOptionProps } from './MemberOptionType';
import { getProject } from '~/redux/project/projectSlice';
import { styles as homeStyle } from '~/shared/twin/home-content.style'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector';
import { editMemberTeam, filterMembers } from '~/redux/member/memberSlice';

const MemberOption = ({
  isLast,
  children,
  callback,
  data = null,
  className,
  filterData,
  closeOption,
}: MemberOptionProps) => {
  const dispatch = useAppDispatch();
  const [teamModal, setTeamModal] = useState<boolean>(false);
  const [updateTeamData, setUpdateTeamData] = useState<number[]>([]);

  const { project, auth } = useAppSelector((state) => state);
  const { user: userAuth } = auth || {};
  const { id: authID } = userAuth || {};
  const { overviewProject } = project || {};
  const { teams, user, is_mvp, role: { id: roleID } } = data || {};
  const { teams: projectTeams, id: projectID, role: userRole } = overviewProject || {};

  const dropDownOptions: string[] = [
    `${roleID === 2 ? "Remove as Team Lead" : "Set as Team Lead"}`,
    `${is_mvp ? "Remove as MVP" : "Set as MVP"}`,
    "Edit Team",
    "Leave Project",
    "Remove member"
  ]

  const teamList = projectTeams?.map((team: any) => { return team?.id });
  const currentTeam = teams?.map((team: any) => { return team?.id });
  const { id: userID } = user || {};

  const dropDownOption = (index: number, value: string = ""): void => {
    callback(index, value); // for option selection
  }

  const selectEditTeam = (teamID: any, isUseEffect: boolean = false) => {
    const addToList = (prev: number[]) => ([...prev, teamID]);
    const removeFromList = updateTeamData.filter((id: number) => id !== teamID);
    const isCloseOption = teamID === filterData;

    if (updateTeamData.includes(teamID)) {
      setUpdateTeamData(removeFromList);
      if (isUseEffect) return;

      isCloseOption && closeOption(false);
      dispatch(editMemberTeam({ teams: removeFromList, userID, projectID }))
        .then((_) => {
          dispatch(filterMembers({
            projectID,
            teamID: filterData < 0 ? 0 : filterData
          }));
          dispatch(getProject(projectID));
        });
      return;
    }
    setUpdateTeamData(addToList);
    if (isUseEffect) return;

    isCloseOption && closeOption(false);
    dispatch(editMemberTeam({ teams: [...updateTeamData, teamID], userID, projectID }))
      .then((_) => {
        dispatch(filterMembers({
          projectID,
          teamID: filterData < 0 ? 0 : filterData
        }));
        dispatch(getProject(projectID));
      });
  }

  useEffect(() => {
    currentTeam?.map((currentTeamID: string) => {
      if (teamList.includes(currentTeamID)) {
        selectEditTeam(currentTeamID, true);
      };
    })
  }, [])

  const editTeamOptions = (<div className='flex flex-col border-t mt-[2px] border-slate-100'>
    {projectTeams?.map((team: any, index: number) => {
      const { id, name } = team || {};
      const isTeamMember = updateTeamData.includes(id);

      return (
        <button
          key={index}
          disabled={updateTeamData?.length === 1 && updateTeamData[0] === id}
          onClick={() => selectEditTeam(id)}
          className={`${isTeamMember ? 'bg-blue-600 text-slate-50' : 'text-gray-900'} hover:bg-blue-600 mb-[1px] flex w-full items-center rounded-md text-sm ${(updateTeamData?.length === 1 && updateTeamData[0] === id) && "!bg-gray-300"}`} >
          <div className={`flex w-full h-full flex-row gap-2 items-center justify-start ${isTeamMember ? "text-slate-50" : "text-slate-400 "}  hover:!text-slate-50 px-2 py-2`}>
            {isTeamMember ? <CheckIcon /> : <div className='w-[10px]'></div>}
            {name}
          </div>
        </button>
      )
    })}
  </div>
  )

  const dropDownMenu = dropDownOptions?.map((option: string, index: number) => {
    const isTeamLead = roleID === 2 && index === 0;
    const isLoggedInUser = authID === userID;
    const isMVP = is_mvp && index === 1;

    // Member drop down menu
    const member = userRole === 3;
    if (member && index !== 3) return; // Remain 'leave' button on self hover

    // Team Leader drop down menu
    const teamLeader = userRole === 2;
    if (teamLeader && !isLoggedInUser && index === 3) return; // Remain 'leave' button on self hover
    if (teamLeader && isLoggedInUser && index === 4) return; // Remove 'remove member' button on self hover
    if (teamLeader && roleID === 1 && index === 4) return; // Remove 'remove member' button on Project Owner hover 

    // Project Owner drop down menu
    const projectOwner = userRole === 1;
    if (projectOwner && index === 3) return; // Remove 'leave' button on self hover
    if (projectOwner && isLoggedInUser && index === 0) return; // Remove 'set as team lead' button on self hover
    if (projectOwner && isLoggedInUser && index === 4) return; // Remove 'remove member' button on self hover


    return option === "Edit Team"
      ?
      <div className="px-1 py-1 rounded-md" key={index}>
        <button
          onClick={() => setTeamModal(!teamModal)}
          className={`${teamModal ? 'bg-blue-600' : 'text-gray-900'} flex w-full items-center rounded-md text-sm`}
        >
          <div className="flex justify-between w-full text-slate-400 px-2 py-2 hover:text-slate-50 hover:bg-blue-600 rounded-md">
            <div className={`flex flex-row gap-2 pl-[4px] items-center justify-center ${teamModal && "text-slate-50"}`}>
              {option}
            </div>
            <ChevronDown
              color={teamModal ? "#FFFFFF" : "#94A3B8"}
              className={teamModal ? "rotate-180" : ""}
            />
          </div>
        </button>
        {teamModal && editTeamOptions}
      </div>
      :
      <div className="px-1 py-1 " key={index}>
        <Menu.Item>
          <button
            onClick={() => dropDownOption(index, option)}
            className={`${isTeamLead && "bg-blue-600" || isMVP && "bg-blue-600"} text-gray-900 hover:bg-blue-600 group flex w-full items-center rounded-md text-sm`}
          >
            <div className={`
              hover:!text-slate-50 px-2 py-2
              flex w-full h-full flex-row gap-1 pl-[10px] items-center justify-start 
              ${isTeamLead && "!text-slate-50" || isMVP && "!text-slate-50"}
              ${option === "Leave Project" || option === "Remove member" ? "text-red-700" : "text-slate-400"} 
            `}>
              {option}
            </div>
          </button>
        </Menu.Item>
      </div>
  });

  return (
    <Menu as="div" className={`inline-block text-left ${className}`}>
      <Menu.Button className={'w-full'}>
        {children}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items css={homeStyle.dropDownMenu} className={`relative !z-50 !mr-[30px] ${isLast}`}>
          {dropDownMenu}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default MemberOption;
