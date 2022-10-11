import { Plus } from 'react-feather'
import { Menu } from '@headlessui/react'
import { MoreHorizontal } from 'react-feather'
import { classNames } from '~/helpers/classNames'
import React, { FC, ReactNode, useRef, useState } from 'react'
import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  children: ReactNode
  [board: string]: any
  actions: {
    handleRemoveSection: (id: string) => void
    handleUpdateSection: (e: any) => void
  }
}

const BoardSection: FC<Props> = (props): JSX.Element => {
  const {
    id,
    name,
    children,
    actions: { handleRemoveSection, handleUpdateSection }
  } = props

  const inputElement = useRef<any>()

  const onClickRenameSection = (): void => inputElement.current.focus()

  const onBlurBoardHeader = (e: any) => {
    if (e.target.value.length === 0) {
      e.target.value = 'Untitled Section'
    }
  }

  return (
    <section className="group-board w-full max-w-[18rem] flex-shrink-0">
      <header className="flex flex-shrink-0 items-center justify-between py-1">
        <div className="pr-2">
          <input
            type="text"
            defaultValue={name}
            ref={inputElement}
            onKeyDown={handleUpdateSection}
            onBlur={onBlurBoardHeader}
            className="w-full rounded-lg border-2 border-transparent bg-transparent py-1 px-1 font-semibold text-slate-900 focus:outline focus:outline-4 focus:outline-offset-2"
          />
        </div>
        <div className="flex items-center justify-center space-x-1">
          <button className="rounded p-0.5 text-blue-600 transition duration-75 ease-in-out hover:bg-slate-200">
            <Plus className="h-5 w-5" />
          </button>
          <Menu as="div" className="relative mt-1 inline-block items-center text-left">
            <Menu.Button className="rounded p-0.5 text-slate-900 transition duration-75 ease-in-out hover:bg-slate-200">
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
                      Remove Section
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </MenuTransition>
          </Menu>
        </div>
      </header>
      <main className="h-[75vh] min-h-[75vh] overflow-y-auto rounded-lg border bg-white px-4 py-5 group-board-hover:shadow-sm">
        {children}
      </main>
    </section>
  )
}

export default BoardSection
