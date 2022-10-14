import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { CheckIcon } from '~/shared/icons/CheckIcon';
import { MemberFilterProps } from './MemberFilterType';
import { useAppSelector } from '~/hooks/reduxSelector';
import { styles as homeStyle } from '~/shared/twin/home-content.style';

export default function MemberFilter({
  data,
  children,
  callback,
  className,
}: MemberFilterProps) {
  const { overviewProject } = useAppSelector((state) => state.project);
  const { numberOfActiveMembers } = overviewProject || {};
  const [selected, setSelected] = useState<number>(0);
  const totalMembers = data?.map((member: any) => { return member.members }).reduce((total: number, current: number) => { return total + current }, 0);
  const teamData = [{ id: -1, name: "Everyone", members: totalMembers }, ...data];

  const onSelect = (index: number): void => {
    setSelected(index);
    callback(teamData[index]);
  }

  const dropDownMenu = teamData.map(({ id, name, members }: { id: number, name: string, members: number }, index: number) => {
    const isSelected = selected === index;

    return (
      <div className="px-1 py-1 " key={index}>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => onSelect(index)}
              className={`${active || isSelected ? 'bg-blue-600 text-white' : 'text-gray-900'}  group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <div className='flex w-full justify-between'>
                <div className={`flex flex-row gap-2 items-center justify-center ${active || isSelected ? "text-slate-50" : "text-slate-400"}`}>
                  {isSelected ? <CheckIcon /> : <div className='w-[10px]'></div>}
                  {name}
                </div>
                <div className={`text-center align-middle ${active || isSelected ? "text-slate-50" : "text-slate-400"}`}>
                  {name === "Everyone" ? numberOfActiveMembers : members}
                </div>
              </div>
            </button>
          )}
        </Menu.Item>
      </div>
    );
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
