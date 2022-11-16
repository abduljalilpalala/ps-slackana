import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ProjectStatus } from '~/shared/icons/ProjectStatus'
import { projectStatusData } from '~/shared/jsons/projectStatusData'
import { styles as homeStyle } from '~/shared/twin/home-content.style'
import statusChecker from '~/utils/statusChecker'
import { setFilter, filterProjects } from '~/redux/project/projectSlice'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'

export default function DropDownFilter({ children, callback }: any) {
  const dispatch = useAppDispatch()
  const { filter } = useAppSelector((state) => state.project)

  const [selected, setSelected] = useState<number>(filter)

  const onSelect = (index: number): void => {
    dispatch(setFilter(index))
    dispatch(filterProjects())
    setSelected(index)
  }

  const dropDownMenu = projectStatusData.map((status: string, index: number) => {
    return (
      <div key={index}>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => onSelect(index)}
              className={`${
                active || selected === index ? 'bg-slate-100' : 'text-gray-900'
              } group flex w-full items-center px-2 py-2 text-sm`}
            >
              {<ProjectStatus status={statusChecker(status)} className="mx-2 mr-3" />}
              {status}
            </button>
          )}
        </Menu.Item>
      </div>
    )
  })

  return (
    <div className="z-10">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>{children}</Menu.Button>
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
          <Menu.Items
            css={homeStyle.dropDownMenu}
            className="py-1 transition duration-75 ease-in-out"
          >
            {dropDownMenu}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
