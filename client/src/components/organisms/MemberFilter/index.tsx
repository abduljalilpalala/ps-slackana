import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { CheckIcon } from '~/shared/icons/CheckIcon';
import { styles as homeStyle } from '~/shared/twin/home-content.style';

export default function MemberFilter({ children, callback, data, className }: any) {
  const [selected, setSelected] = useState<number>(0);

  const onSelect = (index: number): void => {
    callback(data[index]);
    setSelected(index);
  }

  const dropDownMenu = data.map((data: { team: string, members: number }, index: number) => {
    const isSelected = selected === index;
    return (
      <div className="px-1 py-1 " key={index}>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => onSelect(index)}
              className={`${active || selected === index ? 'bg-blue-600 text-white' : 'text-gray-900'}  group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              <div className='flex w-full justify-between'>
                <div className={`flex flex-row gap-2 items-center justify-center ${active || selected === index ? "text-slate-50" : "text-slate-400"}`}>
                  {selected === index ? <CheckIcon /> : <div className='w-[10px]'></div>}
                  {data.team}
                </div>
                <div className={`text-center align-middle ${active || selected === index ? "text-slate-50" : "text-slate-400"}`}>
                  {data.members}
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
