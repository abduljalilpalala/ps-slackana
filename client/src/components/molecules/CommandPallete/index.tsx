import { Search } from 'react-feather'
import { useRouter } from 'next/router'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import React, { FC, useState, useEffect, Fragment } from 'react'

import { IProject } from '~/shared/interfaces'
import { useAppSelector } from '~/hooks/reduxSelector'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const CommandPallete: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const router = useRouter()
  const [query, setQuery] = useState<string>('')

  const { sidebarProject } = useAppSelector((state) => state.project)

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent): void => {
      if (e.key === 'm' && (e.metaKey || e.ctrlKey)) closeModal()
    }

    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [isOpen])

  const filteredProjects = query
    ? sidebarProject.filter((project) => project.title.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog onClose={closeModal} className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-800/75 backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox
            as="div"
            onChange={(project: IProject) => {
              closeModal()
              router.push(`/team/${project.id}/overview`)
            }}
            className="relative mx-auto max-w-xl divide-y divide-slate-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex items-center px-4">
              <Search className="h-6 w-6 text-slate-500" />
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:ring-0"
                placeholder="Search Project"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className="default-scrollbar max-h-96 overflow-y-auto py-4 text-sm"
              >
                {filteredProjects.map((project) => (
                  <Combobox.Option key={project.id} value={project}>
                    {({ active }) => (
                      <div
                        className={`flex items-center space-x-1 px-4 py-2 ${
                          active ? 'bg-blue-600 text-white' : ''
                        }`}
                      >
                        <span
                          className={`font-medium line-clamp-1 ${
                            active ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {project.title}
                        </span>
                        <span
                          className={`max-w-sm line-clamp-1 ${
                            active ? 'text-slate-200' : 'text-slate-400'
                          }`}
                        >
                          {project.description}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredProjects.length === 0 && (
              <p className="p-4 text-sm text-slate-500">No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default CommandPallete
