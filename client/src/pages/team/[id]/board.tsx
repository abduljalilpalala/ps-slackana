import moment from 'moment'
import { NextPage } from 'next'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { getProject } from '~/redux/project/projectSlice'
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
  const { id, task_id } = router.query
  const {
    useHandleCreateTask,
    useHandleRemoveTask,
    useHandleSetSections,
    useHandleUpdateTaskSection,
    useHandleUpdateTaskPosition
  } = useTaskMethods(parseInt(id as string))
  const dispatch = useAppDispatch()
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [currentBoardId, setCurrentBoardId] = useState<any>(null)
  const [showAddSection, setShowAddSection] = useState(true)
  const [assigneeModal, setAssigneeModal] = useState<boolean>(false)
  const [assignee, setAssignee] = useState<any>({})
  const [updateAssignee, setUpdateAssignee] = useState<any>(null)
  const [updateTaskDueDate, setUpdateTaskDueDate] = useState<any>('')
  const [isTaskCompleted, setIsTaskCompleted] = useState<any>(false)
  const [isTaskSliderOpen, setIsTaskSliderOpen] = useState<any>(false)
  const [taskID, setTaskID] = useState<any>(0)

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
    dispatch(setProjectID({ project_id: parseInt(id as string) }))
    dispatch(getSections()).then((_) => {
      dispatch(resetRefresher())
    })
  }, [id])

  useEffect(() => {
    if (isTaskSliderOpen) {
      router.push(`/team/${router.query.id}/board?task_id=${taskID}`)
    }
  }, [isTaskSliderOpen, taskID])

  useEffect(() => {
    if (task_id) {
      setIsTaskSliderOpen(true)
    }
  }, [task_id])
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
        setShowAddSection(!showAddSection)
        dispatch(resetRefresher())
        toast.success('Successfully Added!')
      })
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
    dispatch(renameSection())
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
      project_member_id: assignee
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
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result: any = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }
  const getItem = (id: any) => boards.filter((section) => section.id == parseInt(id))
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }
    let temp: any = [...boards]
    if (source.droppableId === destination.droppableId) {
      const it = reorder(getItem(source.droppableId)[0]?.tasks, source.index, destination.index)
      let sectionIndex = boards.indexOf(getItem(source.droppableId)[0])
      temp[sectionIndex] = { id: source.droppableId, tasks: it }
      useHandleSetSections(temp)
      useHandleUpdateTaskSection(destination.droppableId, draggableId)
      useHandleUpdateTaskPosition(it)
    } else {
      const result = move(
        getItem(source.droppableId)[0]?.tasks,
        getItem(destination.droppableId)[0]?.tasks,
        source,
        destination
      )
      let sourceIndex = boards.indexOf(getItem(source.droppableId)[0])
      let destIndex = boards.indexOf(getItem(destination.droppableId)[0])
      temp[sourceIndex] = {
        id: source.droppableId,
        tasks: result[source.droppableId]
      }
      temp[destIndex] = {
        id: destination.droppableId,
        tasks: result[destination.droppableId]
      }
      useHandleSetSections(temp)
      useHandleUpdateTaskSection(destination.droppableId, draggableId)
      useHandleUpdateTaskPosition(result[destination.droppableId])
    }
  }
  return (
    <ProjectLayout metaTitle="Board">
      <BoardWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {!sectionsStateUpdate
            ? boards.map((board: any) => {
                return (
                  <Droppable key={board.id} droppableId={board.id + ''}>
                    {(provided, snapshot) => (
                      <BoardSection
                        {...board}
                        provided={provided}
                        snapshot={snapshot}
                        permissions={{
                          canCreatePermission,
                          canRenamePermission,
                          canRemovePermission
                        }}
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
                          board.tasks.map((task: any, i: number) => {
                            return (
                              <Draggable key={task.id} draggableId={task.id + ''} index={i}>
                                {(provided, snapshot) => (
                                  <TaskList
                                    task={task}
                                    provided={provided}
                                    snapshot={snapshot}
                                    isTaskSliderOpen={isTaskSliderOpen}
                                    updateTaskSliderAssignee={updateAssignee}
                                    updateTaskSliderDueDate={updateTaskDueDate}
                                    isTaskSliderCompleted={isTaskCompleted}
                                    taskID={taskID}
                                    actions={{
                                      setTaskID,
                                      setIsTaskSliderOpen,
                                      setUpdateTaskSliderAssignee: setUpdateAssignee,
                                      setUpdateTaskSliderDueDate: setUpdateTaskDueDate,
                                      setIsTaskSliderCompleted: setIsTaskCompleted,
                                      handleRemoveTask
                                    }}
                                  />
                                )}
                              </Draggable>
                            )
                          })
                        ) : (
                          <p className="text-center text-sm text-slate-600">No current task</p>
                        )}

                        {provided.placeholder}
                      </BoardSection>
                    )}
                  </Droppable>
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
          <TaskSlider
            updateAssignee={updateAssignee}
            updateTaskDueDate={updateTaskDueDate}
            isTaskCompleted={isTaskCompleted}
            actions={{
              setTaskID,
              setUpdateAssignee,
              setUpdateTaskDueDate,
              setIsTaskCompleted
            }}
          />
        </DragDropContext>
      </BoardWrapper>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Board
