import { NextPage } from 'next'
import toast from 'react-hot-toast'
import { Plus } from 'react-feather'
import React, { useEffect, useRef, useState } from 'react'

import BoardSection from '~/components/organisms/BoardSection'
import BoardWrapper from '~/components/templates/BoardWrapper'
import ProjectLayout from '~/components/templates/ProjectLayout'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { useRouter } from 'next/router'
import {
  createSection,
  getSections,
  removeSection,
  renameSection,
  resetRefresher,
  sectionRefresher,
  sectionsRefresher,
  setAddNewSectionData,
  setProjectID,
  setRemoveSectionData,
  setRenameSectionData
} from '~/redux/section/sectionSlice'
import { getProject } from '~/redux/project/projectSlice'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'

const Board: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useAppDispatch()
  const [showAddSection, setShowAddSection] = useState(true)
  const {
    sections: boards,
    refresher: { sectionsStateUpdate, sectionUpdate }
  } = useAppSelector((state) => state.section)
  const { overviewProject: project } = useAppSelector((state) => state.project)

  useEffect(() => {
    dispatch(sectionsRefresher())
    dispatch(getProject(id))
    dispatch(setProjectID({ project_id: parseInt(id as string) }))
    dispatch(getSections()).then((_) => {
      dispatch(resetRefresher())
    })
  }, [id])

  const canCreatePermission = project?.can?.some((permission: any) => permission.createSection)
  const canRenamePermission = project?.can?.some((permission: any) => permission.renameSection)
  const canRemovePermission = project?.can?.some((permission: any) => permission.removeSection)

  const handleShowAddSection = (): void => setShowAddSection(!showAddSection)

  const onChangeSection = (e: any) => {
    dispatch(setAddNewSectionData({ name: e.target.value }))
  }

  const onClickOutSection = (e: any) => {
    const value = e.target.value

    if (value.length === 0) {
      handleShowAddSection()
    } else {
      handleSaveSection()
    }
  }

  const onClickEnterSection = (e: any) => {
    const value = e.target.value
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (value.length === 0) {
        handleShowAddSection()
      } else {
        handleSaveSection()
      }
    }
  }

  const handleSaveSection = async (): Promise<void> => {
    dispatch(sectionRefresher())
    dispatch(createSection()).then((_) => {
      dispatch(getSections()).then((_) => {
        dispatch(resetRefresher())
        toast.success('Successfully Added!')
      })
      setShowAddSection(!showAddSection)
    })
  }

  const handleRemoveSection = async (id: number): Promise<void> => {
    dispatch(setRemoveSectionData({ id }))
    const message = confirm('Do you want to delete section?')
    if (message) {
      dispatch(removeSection()).then((_) => {
        dispatch(getSections()).then((_) => {
          dispatch(resetRefresher())
          toast.success('Successfully Removed!')
        })
      })
    }
  }

  const updateSection = (e: any, id: number) => {
    const name = e.target.value
    dispatch(setRenameSectionData({ id, name }))
    dispatch(renameSection()).then((_) => {
      dispatch(getSections())
      toast.success('Successfully Updated!')
    })
  }
  const loadingSkeleton = (
    <section className="group-board w-full max-w-[18rem] flex-shrink-0 ">
      <header className="flex flex-col items-center justify-between py-2">
        <LineSkeleton className="h-5 w-[95%]" />
      </header>
      <main className="flex h-[75vh] min-h-[75vh] flex-col content-between space-y-2 overflow-y-auto rounded-lg border bg-white px-4 py-5 group-board-hover:shadow-sm">
        <div className="h-[20vh] min-h-[20vh] rounded-lg border px-4 py-5">
          <LineSkeleton className="w-[100%]" />
          <LineSkeleton className="w-[80%]" />
          <LineSkeleton className="w-[60%]" />
        </div>
        <div className="h-[20vh] min-h-[20vh] rounded-lg border px-4 py-5">
          <LineSkeleton className="w-[100%]" />
          <LineSkeleton className="w-[80%]" />
          <LineSkeleton className="w-[60%]" />
        </div>
        <div className="h-[20vh] min-h-[20vh] rounded-lg border px-4 py-5">
          <LineSkeleton className="w-[100%]" />
          <LineSkeleton className="w-[80%]" />
          <LineSkeleton className="w-[60%]" />
        </div>
      </main>
    </section>
  )
  return (
    <ProjectLayout metaTitle="Board">
      <BoardWrapper>
        {!sectionsStateUpdate
          ? boards.map((board) => {
              return (
                <BoardSection
                  key={board.id}
                  {...board}
                  permissions={{ canCreatePermission, canRenamePermission, canRemovePermission }}
                  actions={{ handleRemoveSection, updateSection }}
                >
                  <p className="text-center text-sm text-slate-600">No current task</p>
                </BoardSection>
              )
            })
          : Array.from(Array(4).keys()).map(() => loadingSkeleton)}
        <section className="w-full max-w-[18rem] flex-shrink-0">
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
      </BoardWrapper>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Board
