import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ProjectStatus } from '~/shared/icons/ProjectStatus'
import { projectStatusData } from '~/shared/jsons/projectStatusData';
import { styles as homeStyle } from '~/shared/twin/home-content.style'

export default function DropDownFilter({ children, callback }: any) {
  const [selected, setSelected] = useState<string>('All');

  const onSelect = (e: any): void => {
    const value = e.target.innerText;
    callback(value);
    setSelected(value)
  }

  const dropDownMenu = projectStatusData.map((status) => {
    return (
      <div className="px-1 py-1 " key={status}>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={onSelect}
              className={`${active || selected === status ? 'bg-slate-500 text-white' : 'text-gray-900'
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              {<ProjectStatus status={status.toLowerCase().replace(/ /g, "-")} className='mx-2 mr-3' />}
              {status}
            </button>
          )}
        </Menu.Item>
      </div>
    );
  });

  return (
    <div className='z-0'>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button >
            {children}
          </Menu.Button>
        </div>
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
    </div>
  )
}
