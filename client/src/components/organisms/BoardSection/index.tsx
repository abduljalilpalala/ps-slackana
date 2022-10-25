import { Plus } from 'react-feather'
import { Menu } from '@headlessui/react'
import React, { FC, ReactNode, useRef } from 'react'
import { MoreHorizontal, Edit3, Trash } from 'react-feather'

import { classNames } from '~/helpers/classNames'
import MenuTransition from '~/components/templates/MenuTransition'
import { useProjectMethods } from '~/hooks/projectMethods'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
  [board: string]: any
  provided: any
  snapshot: any
  permissions: {
    canCreatePermission: boolean
    canRenamePermission: boolean
    canRemovePermission: boolean
  }
  actions: {
    handleRemoveSection: (id: number) => void
    updateSection: (e: any, id: number) => void
    handleShowAddTask: (id: number) => void
  }
}
const BoardSection: FC<Props> = (props): JSX.Element => {
  const {
    id,
    name,
    children,
    provided,
    snapshot,
    permissions: { canCreatePermission, canRenamePermission, canRemovePermission },
    actions: { handleRemoveSection, updateSection, handleShowAddTask }
  } = props
  const inputElement = useRef<any>()
  const onClickRenameSection = (): void => inputElement.current.focus()
  const router = useRouter()
  const { id: projectID } = router.query
  const { permissions } = useProjectMethods(parseInt(projectID as string))
  let isBlur = true

  const handleUpdateSection = (e: any, id: number) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      isBlur = false
      if (e.target.value === name) return
      updateSection(e, id)
      e.target.blur()
    }
  }

  const onBlurBoardHeader = (e: any) => {
    if (isBlur) {
      if (e.target.value.length === 0) {
        e.target.value = 'Untitled Section'
      }
      if (e.target.value === name) return
      updateSection(e, id)
    }
  }

  return (
    <section className="group-board flex w-full max-w-[18rem] flex-shrink-0 flex-col pl-3 ">
      <header
        className={`
          flex flex-shrink-0 items-center justify-between bg-slate-50 py-1
        `}
      >
        <div className="pr-2">
          <input
            type="text"
            defaultValue={name}
            disabled={!canRenamePermission}
            ref={inputElement}
            onFocus={() => (isBlur = true)}
            onKeyUp={(e) => handleUpdateSection(e, id)}
            onBlur={onBlurBoardHeader}
            className="w-full rounded-lg border-2 border-transparent bg-transparent py-1 px-1 font-semibold text-slate-900 focus:outline focus:outline-4 focus:outline-offset-2"
          />
        </div>
        <div className="flex items-center justify-center space-x-1">
          {canRemovePermission && canRenamePermission && (
            <>
              {permissions?.createTask && (
                <button
                  className="rounded p-0.5 text-blue-600 transition duration-75 ease-in-out hover:bg-slate-200"
                  onClick={() => handleShowAddTask(id)}
                >
                  <Plus className="h-5 w-5" />
                </button>
              )}
              <Menu as="div" className="relative z-20 mt-1 inline-block items-center text-left">
                {({ open }) => (
                  <>
                    <Menu.Button
                      className={`
                        rounded p-0.5 text-slate-900 transition duration-75 ease-in-out hover:bg-slate-200
                        ${open ? 'bg-slate-200' : ''}
                      `}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Menu.Button>
                    <MenuTransition>
                      <Menu.Items
                        className={classNames(
                          'absolute right-0 mt-1 w-44 origin-top-right divide-y divide-gray-200 overflow-hidden',
                          'rounded-md border border-slate-200 bg-white py-1 shadow-xl focus:outline-none'
                        )}
                      >
                        <Menu.Item>
                          <button
                            className={classNames(
                              'flex w-full items-center space-x-3 py-2 px-4 text-sm font-medium text-slate-900',
                              'transition duration-150 ease-in-out hover:bg-slate-100 active:bg-slate-500 active:text-white'
                            )}
                            onClick={onClickRenameSection}
                          >
                            <Edit3 className="mr-2 h-4 w-4" />
                            Rename Section
                          </button>
                        </Menu.Item>
                        <div>
                          <Menu.Item>
                            <button
                              onClick={() => handleRemoveSection(id)}
                              className={classNames(
                                'flex w-full items-center space-x-3 py-2 px-4 text-sm font-medium text-rose-600',
                                'transition duration-150 ease-in-out hover:bg-rose-100 active:bg-rose-600 active:text-white'
                              )}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Remove Section
                            </button>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </MenuTransition>
                  </>
                )}
              </Menu>
            </>
          )}
        </div>
      </header>
      <main
        {...provided?.droppableProps}
        ref={provided?.innerRef}
        className={`flex flex-1 flex-col space-y-2 overflow-y-auto rounded-lg border ${
          snapshot?.isDraggingOver ? 'bg-slate-200' : 'bg-white'
        }  px-4 py-4 group-board-hover:shadow-sm`}
      >
        {children}
      </main>
    </section>
  )
}

export default BoardSection
