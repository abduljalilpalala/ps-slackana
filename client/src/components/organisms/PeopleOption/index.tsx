import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { CheckIcon } from '~/shared/icons/CheckIcon';
import { styles as homeStyle } from '~/shared/twin/home-content.style'

const PeopleOption = ({ children, callback, data, className }: any) => {
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

  const dropDownMenu = teams.map((team: string, index: number) => {
    const isTeamMember = teamData.includes(index);

    return (
      <button
        key={index}
        onClick={() => selectEditTeam(index)}
        className={`${isTeamMember ? 'bg-blue-600 text-slate-50' : 'text-gray-900'} hover:bg-blue-600  group flex w-full items-center rounded-md text-sm`}
      >
        <div className={`flex w-full h-full flex-row gap-2 items-center justify-start ${isTeamMember ? "text-slate-50" : "text-slate-400 "} hover:!text-slate-50 px-2 py-2`}>
          {isTeamMember ? <CheckIcon /> : <div className='w-[10px]'></div>}
          {team}
        </div>
      </button>
    )
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

export default PeopleOption;
