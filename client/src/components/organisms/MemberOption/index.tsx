import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'react-feather';

import { CheckIcon } from '~/shared/icons/CheckIcon';
import { styles as homeStyle } from '~/shared/twin/home-content.style'

const MemberOption = ({ children, callback, data, className }: any) => {
  const [editTeam, setEditTeam] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<number[]>([]);
  const teams = [
    "Backend",
    "Frontend",
    "QA",
    "Designer",
  ];

  const onSelect = (index: number): void => {
    callback(data[index]);
  }

  const selectEditTeam = (index: number) => {
    console.log('edit teams', index);

    if (teamData.includes(index)) {
      setTeamData(teamData.filter((x, i) => teamData[i] !== index));
    } else {
      setTeamData((prev: number[]) => ([...prev, index]));
    }
  }

  const dropDownMenu = data.map((team: string, index: number) => {
    return team === "Edit Team"
      ?
      <div className="px-1 py-1 rounded-md" key={index}>
        <button
          onClick={() => setEditTeam(!editTeam)}
          className={`${editTeam ? 'bg-blue-600' : 'text-gray-900'} flex w-full items-center rounded-md text-sm`}
        >
          <div className="flex justify-between w-full text-slate-400 px-2 py-2 hover:text-slate-50 hover:bg-blue-600 rounded-md">
            <div className={`flex flex-row gap-2 pl-[4px] items-center justify-center ${editTeam && "text-slate-50"}`}>
              {team}
            </div>
            <ChevronDown color={editTeam ? "#FFFFFF" : "#94A3B8"} className={editTeam ? "rotate-180" : ""} />
          </div>
        </button>
        {editTeam && <div className='flex flex-col border-t mt-[2px] border-slate-100'>
          {teams.map((team: string, index: number) => {
            const isTeamMember = teamData.includes(index);

            return (
              <button
                key={index}
                onClick={() => selectEditTeam(index)}
                className={`${isTeamMember ? 'bg-blue-600 text-slate-50' : 'text-gray-900'} hover:bg-blue-600 mb-[1px] flex w-full items-center rounded-md text-sm`}
              >
                <div className={`flex w-full h-full flex-row gap-2 items-center justify-start ${isTeamMember ? "text-slate-50" : "text-slate-400 "} hover:!text-slate-50 px-2 py-2`}>
                  {isTeamMember ? <CheckIcon /> : <div className='w-[10px]'></div>}
                  {team}
                </div>
              </button>
            )
          })}
        </div>}
      </div>
      :
      <div className="px-1 py-1 " key={index}>
        <Menu.Item>
          <button
            onClick={() => onSelect(index)}
            className=" text-gray-900  hover:bg-blue-600  group flex w-full items-center rounded-md text-sm"
          >
            <div className={`flex w-full h-full flex-row gap-2 pl-[10px] items-center justify-start ${(data.length - 1) === index ? "text-red-700" : "text-slate-400"} hover:!text-slate-50 px-2 py-2`}>
              {team}
            </div>
          </button>
        </Menu.Item>
      </div>
  });

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
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
        <Menu.Items css={homeStyle.dropDownMenu}>
          {dropDownMenu}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default MemberOption;
