import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ProjectStatus } from '~/shared/icons/ProjectStatus'

export default function Example({ children, callback }: any) {
  const [selected, setSelected] = useState<string>('All');

  const onSelect = (e: any): void => {
    const value = e.target.innerText;
    callback(value);
    setSelected(value)
  }

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
          <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSelect}
                    className={`${active || selected === "All" ? 'bg-slate-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {<ProjectStatus status='all' className='mx-2 mr-3' />}
                    All
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSelect}
                    className={`${active || selected === "Archive" ? 'bg-slate-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {<ProjectStatus status='archive' className='mx-2 mr-3' />}
                    Archive
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSelect}
                    className={`${active || selected === "On track" ? 'bg-slate-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {<ProjectStatus status='on-track' className='mx-2 mr-3' />}
                    On track
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSelect}
                    className={`${active || selected === "At risk" ? 'bg-slate-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {<ProjectStatus status='at-risk' className='mx-2 mr-3' />}
                    At risk
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSelect}
                    className={`${active || selected === "Off track" ? 'bg-slate-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {<ProjectStatus status='off-track' className='mx-2 mr-3' />}
                    Off track
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSelect}
                    className={`${active || selected === "On hold" ? 'bg-slate-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {<ProjectStatus status='on-hold' className='mx-2 mr-3' />}
                    On hold
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSelect}
                    className={`${active || selected === "Complete" ? 'bg-slate-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {<ProjectStatus status='complete' className='mx-2 mr-3' />}
                    Complete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
