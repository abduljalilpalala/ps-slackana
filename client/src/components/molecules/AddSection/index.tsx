import React, { FC } from 'react'
import { Plus } from 'react-feather'

type Props = {
  showAddSection: boolean
  actions: {
    handleShowAddSection: () => void
    onClickEnterSection: (e: any) => void
    onChangeSection: (e: any) => void
    onClickOutSection: (e: any) => void
  }
  permissions: {
    canCreatePermission: boolean
  }
  privilege: {
    sectionUpdate: boolean
    sectionsStateUpdate: boolean
  }
  loadingSkeleton: JSX.Element
}

const AddSection: FC<Props> = (props): JSX.Element => {
  const {
    showAddSection,
    permissions: { canCreatePermission },
    privilege: { sectionUpdate, sectionsStateUpdate },
    actions: { handleShowAddSection, onClickEnterSection, onChangeSection, onClickOutSection },
    loadingSkeleton
  } = props

  return (
    <section className="ml-4 w-full max-w-[18rem] flex-shrink-0">
      <header className="-mt-2 flex items-center justify-between py-2">
        {showAddSection && canCreatePermission && !sectionsStateUpdate && (
          <button
            onClick={handleShowAddSection}
            className="flex items-center space-x-2 rounded-md bg-blue-600 px-10 py-2 text-sm font-normal text-white hover:bg-blue-700 active:bg-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add section
          </button>
        )}
        {!showAddSection &&
          (!sectionUpdate ? (
            <input
              type="text"
              autoFocus
              onKeyDown={onClickEnterSection}
              onChange={onChangeSection}
              onBlur={onClickOutSection}
              placeholder="New Section"
              className="w-full rounded-lg border-2 py-1 px-1 font-semibold text-slate-900 focus:outline focus:outline-4 focus:outline-offset-2"
            />
          ) : (
            loadingSkeleton
          ))}
      </header>
    </section>
  )
}

export default AddSection
