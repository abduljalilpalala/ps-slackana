import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getSections } from '~/redux/section/sectionSlice'
import {
  completeTask,
  createTask,
  removeTask,
  reorderTasks,
  resetRefresher,
  setAddNewTaskData,
  setCompleteTaskData,
  setProjectID,
  setRemoveTaskData,
  setSectionID,
  setUpdateTaskAssigneeData,
  setUpdateTaskDueDateData,
  setUpdateTaskNameData,
  taskRefresher,
  updateTaskAssignee,
  updateTaskDueDate,
  updateTaskName
} from '~/redux/task/taskSlice'

export const useTaskMethods = (projectID: number) => {
  const { task } = useAppSelector((state) => state)
  const {
    refresher: { taskUpdate }
  } = task
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setProjectID({ project_id: projectID }))
  }, [projectID])

  const useHandleCreateTask = async (
    section_id: number,
    data: any,
    callback: () => void
  ): Promise<void> => {
    dispatch(taskRefresher())
    dispatch(setSectionID({ section_id }))
    dispatch(setAddNewTaskData(data))
    toast.promise(
      dispatch(createTask()).then((_) => {
        dispatch(getSections()).then((_) => {
          dispatch(resetRefresher())
          callback()
        })
      }),
      {
        loading: 'Creating task...',
        success: 'Task created successfully!',
        error: 'Error on creating task!'
      }
    )
    useHandleReorderTasks(section_id)
  }

  const useHandleRemoveTask = async (section_id: number, task_id: number) => {
    dispatch(setSectionID({ section_id }))
    dispatch(setRemoveTaskData({ id: task_id }))
    toast.promise(
      dispatch(removeTask()).then((_) => {
        dispatch(getSections())
      }),
      {
        loading: 'Removing task...',
        success: 'Task removed successfully!',
        error: 'Error on removing task!'
      }
    )
    useHandleReorderTasks(section_id)
  }
  const useHandleReorderTasks = async (section_id: number) => {
    dispatch(setSectionID({ section_id }))
    dispatch(reorderTasks())
  }
  const useHandleUpdateTaskDueDate = async (id: number, due_date: any) => {
    dispatch(setUpdateTaskDueDateData({ id, due_date }))
    toast.promise(
      dispatch(updateTaskDueDate()).then((_) => {
        dispatch(getSections())
      }),
      {
        loading: 'Updating task due date...',
        success: 'Task due date updated successfully!',
        error: 'Error on updating task due date!'
      }
    )
  }
  const useHandleUpdateTaskAssignee = async (id: number, project_member_id: any) => {
    dispatch(setUpdateTaskAssigneeData({ id, project_member_id }))
    toast.promise(
      dispatch(updateTaskAssignee()).then((_) => {
        dispatch(getSections())
      }),
      {
        loading: 'Updating task assignee...',
        success: 'Task assignee updated successfully!',
        error: 'Error on updating task assignee!'
      }
    )
  }
  const useHandleUpdateTaskName = async (section_id: number, id: number, name: string) => {
    dispatch(setSectionID({ section_id }))
    dispatch(setUpdateTaskNameData({ id, name }))
    toast.promise(
      dispatch(updateTaskName()).then((_) => {
        dispatch(getSections())
      }),
      {
        loading: 'Updating task name...',
        success: 'Task name updated successfully!',
        error: 'Error on updating task name!'
      }
    )
  }
  const useHandleCompleteTask = async (id: number) => {
    dispatch(setCompleteTaskData({ id }))
    dispatch(completeTask())
  }
  return {
    useHandleCreateTask,
    useHandleRemoveTask,
    useHandleReorderTasks,
    useHandleUpdateTaskDueDate,
    useHandleUpdateTaskAssignee,
    useHandleUpdateTaskName,
    useHandleCompleteTask,
    taskUpdate
  }
}
