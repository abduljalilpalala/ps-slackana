import React, { Fragment } from "react";
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'

const TeamTemplate = ({ data, callBack }: any) => {

  const deleteTeam = (team?: string): void => {
    console.log("Integrate delete team for", team);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <div className='flex items-center gap-2 w-[200px] mobile:!w-full truncate'>
            <div className='max-w-[44px] max-h-[44px] flex justify-center items-center rounded-full border'>
              <Image
                src={data.icon}
                alt="team-icon"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <span className='text-base font-semibold truncate'>{data.team}</span>
          </div>
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
        <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => callBack(data.team)}
                  className={`${active ? 'bg-blue-600 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Rename
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => deleteTeam(data.team)}
                  className={`${active ? 'bg-red-600 !text-white' : 'text-gray-900'} text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Remove Team
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TeamTemplate; 
