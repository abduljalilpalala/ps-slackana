import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { CheckIcon } from '~/shared/icons/CheckIcon';
import { styles as homeStyle } from '~/shared/twin/home-content.style'

const PeopleOption = ({ children, callback, data, className, reset }: any) => {
  const [selectedTeamData, setSelectedTeamData] = useState<number[]>([]);

  const selectEditTeam = (team: { id: number, name: string }) => {
    const { id } = team || {};
    const removeSelected = selectedTeamData.filter((_: any, i: number) => selectedTeamData[i] !== id);
    const addSelected = (prev: number[]) => ([...prev, id]);

    if (selectedTeamData.includes(id)) {
      setSelectedTeamData(removeSelected);
      callback(removeSelected);
    } else {
      setSelectedTeamData(addSelected);
      callback(addSelected);
    }
  }

  useEffect(() => {
    if (reset) {
      setSelectedTeamData([]);
    }
  }, [reset])

  const dropDownMenu = data?.map((team: { id: number, name: string }, index: number) => {
    const isTeamMember = selectedTeamData.includes(team.id);

    return (
      <button
        key={index}
        onClick={() => selectEditTeam(team)}
        className={`${isTeamMember ? 'bg-blue-600 text-slate-50' : 'text-gray-900'} hover:bg-blue-600  group flex w-full items-center rounded-md text-sm`}
      >
        <div className={`flex w-full h-full flex-row gap-2 items-center justify-start ${isTeamMember ? "text-slate-50" : "text-slate-400 "} hover:!text-slate-50 px-2 py-2`}>
          {isTeamMember ? <CheckIcon /> : <div className='w-[10px]'></div>}
          {team?.name}
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
        <Menu.Items css={homeStyle.dropDownMenu} >
          {dropDownMenu}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default PeopleOption;
