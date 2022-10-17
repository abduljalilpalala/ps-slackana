import moment from 'moment'
import { NextPage } from 'next'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { getProject, setEditProjectTitle } from '~/redux/project/projectSlice'
import AddSection from '~/components/molecules/AddSection'
import BoardSection from '~/components/organisms/BoardSection'
import BoardWrapper from '~/components/templates/BoardWrapper'
import ProjectLayout from '~/components/templates/ProjectLayout'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
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
import AddTask from '~/components/molecules/AddTask'
import TaskList from '~/components/molecules/TaskList'
import TaskSlider from '~/components/organisms/TaskSlider'
import { useTaskMethods } from '~/hooks/taskMethods'

const Board: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const { useHandleCreateTask, useHandleRemoveTask } = useTaskMethods(parseInt(id as string))
  const dispatch = useAppDispatch()
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [currentBoardId, setCurrentBoardId] = useState<any>(null)
  const [showAddSection, setShowAddSection] = useState(true)
  const [assigneeModal, setAssigneeModal] = useState<boolean>(false)
  const [assignee, setAssignee] = useState<any>({})

  const [updateAssigneeModal, setUpdateAssigneeModal] = useState<boolean>(false)

  const {
    sections: boards,
    refresher: { sectionsStateUpdate, sectionUpdate }
  } = useAppSelector((state) => state.section)
  const {
    overviewProject: { title }
  } = useAppSelector((state) => state.project)
  const { overviewProject: project } = useAppSelector((state) => state.project)

  useEffect(() => {
    dispatch(sectionsRefresher())
    dispatch(getProject(id))
    dispatch(setEditProjectTitle(title))
    dispatch(setProjectID({ project_id: parseInt(id as string) }))
    dispatch(getSections()).then((_) => {
      dispatch(resetRefresher())
    })
  }, [id])
  useEffect(() => {
    dispatch(setEditProjectTitle(title))
  }, [title])

  const canCreatePermission = project?.can?.createSection
  const canRenamePermission = project?.can?.renameSection
  const canRemovePermission = project?.can?.removeSection

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

  /**
   * Implement Save Section
   */
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

  /**
   * Implement Remove Section
   */
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

  /**
   * Implement Update Section
   */
  const updateSection = (e: any, id: number) => {
    const name = e.target.value
    dispatch(setRenameSectionData({ id, name }))
    dispatch(renameSection()).then((_) => {
      dispatch(getSections())
      toast.success('Successfully Updated!')
    })
  }

  const handleShowAddTask = (id: number): void => setCurrentBoardId(id)

  const onClickEnterTask = (e: any) => {
    const value = e.target.value
    const keyCode = e.which || e.keyCode

    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      if (value.length === 0) {
        setCurrentBoardId('')
        setNewTaskDueDate('')
        setAssignee({})
      } else {
        handleSaveTask(value)
      }
    }
  }

  const onClickOutTask = (e: any) => {
    const value = e.target.value

    if (value.length === 0) {
      if (!assigneeModal) {
        setCurrentBoardId('')
        setNewTaskDueDate('')
        setAssignee({})
      }
    } else {
      handleSaveTask(value)
    }
  }

  const onChangeTask = (e: any) => e.target.value
  /**
   * Implement Save Task
   */
  const handleSaveTask = async (taskName: any): Promise<void> => {
    if (assigneeModal) return
    const task = {
      name: taskName,
      due_date: newTaskDueDate ? moment(new Date(newTaskDueDate)).format('YYYY-MM-DD') : null,
      project_member_id: assignee?.id
    }
    useHandleCreateTask(parseInt(currentBoardId as string), task, () => {
      setCurrentBoardId('')
      setNewTaskDueDate('')
      setAssignee({})
    })
  }
  const handleRemoveTask = async (section_id: any, task_id: any): Promise<void> => {
    useHandleRemoveTask(section_id, task_id)
  }
  const handleAssigneeToggle = () => setAssigneeModal(!assigneeModal)

  const handleUpdateAssigneeToggle = () => setUpdateAssigneeModal(!updateAssigneeModal)

  const loadingSkeleton = () => (
    <section key={uuidv4()} className="group-board w-full max-w-[18rem] flex-shrink-0 space-x-4">
      <header className="ml-4 flex flex-col items-center justify-between py-2">
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
          ? boards.map((board: any) => {
              return (
                <BoardSection
                  key={board.id}
                  {...board}
                  permissions={{ canCreatePermission, canRenamePermission, canRemovePermission }}
                  actions={{ handleRemoveSection, updateSection, handleShowAddTask }}
                >
                  {currentBoardId === board.id && (
                    <AddTask
                      assignee={assignee}
                      assigneeModal={assigneeModal}
                      newTaskDueDate={newTaskDueDate}
                      setNewTaskDueDate={setNewTaskDueDate}
                      setAssignee={setAssignee}
                      actions={{
                        onClickEnterTask,
                        onClickOutTask,
                        onChangeTask,
                        handleAssigneeToggle
                      }}
                    />
                  )}
                  {board.tasks?.length ? (
                    board.tasks.map((task: any, i: number) => (
                      <TaskList
                        key={task.id}
                        task={task}
                        actions={{
                          handleRemoveTask
                        }}
                      />
                    ))
                  ) : (
                    <p className="text-center text-sm text-slate-600">No current task</p>
                  )}
                </BoardSection>
              )
            })
          : [...Array(4)].map(() => loadingSkeleton())}
        <AddSection
          showAddSection={showAddSection}
          permissions={{ canCreatePermission }}
          privilege={{ sectionUpdate, sectionsStateUpdate }}
          actions={{
            handleShowAddSection,
            onClickEnterSection,
            onChangeSection,
            onClickOutSection
          }}
          loadingSkeleton={loadingSkeleton()}
        />
        <TaskSlider />
      </BoardWrapper>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Board
