import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import { getSections } from '~/redux/section/sectionSlice'
import {
  completeTask,
  createTask,
  getTask,
  removeTask,
  reorderTasks,
  resetRefresher,
  resetUpdateTaskDetailsData,
  setAddNewTaskData,
  setCompleteTaskData,
  setProjectID,
  setRemoveTaskData,
  setSectionID,
  setUpdateTaskAssigneeData,
  setUpdateTaskDetailsData,
  setUpdateTaskDueDateData,
  setUpdateTaskNameData,
  taskRefresher,
  updateTaskAssignee,
  updateTaskDetails,
  updateTaskDueDate,
  updateTaskName
} from '~/redux/task/taskSlice'

export const useTaskMethods = (projectID: number) => {
  const { task } = useAppSelector((state) => state)
  const {
    taskData,
    refresher: { taskUpdate }
  } = task
  const [isTaskLoading, setIsTaskLoading] = useState(false)
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
        dispatch(reorderTasks()).then((_) => {
          dispatch(getSections()).then((_) => {
            dispatch(resetRefresher())
            callback()
          })
        })
      }),
      {
        loading: 'Creating task...',
        success: 'Task created successfully!',
        error: 'Error on creating task!'
      }
    )
  }

  const useHandleRemoveTask = async (section_id: number, task_id: number) => {
    dispatch(setSectionID({ section_id }))
    dispatch(setRemoveTaskData({ id: task_id }))
    toast.promise(
      dispatch(removeTask()).then((_) => {
        dispatch(reorderTasks()).then((_) => {
          dispatch(getSections())
        })
      }),
      {
        loading: 'Removing task...',
        success: 'Task removed successfully!',
        error: 'Error on removing task!'
      }
    )
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
  const useHandleCompleteTaskSlider = async (id: number) => {
    dispatch(setCompleteTaskData({ id }))
    dispatch(completeTask()).then((_) => dispatch(getSections()))
  }
  const useHandleGetTask = async (task_id: number) => {
    setIsTaskLoading(true)
    dispatch(getTask(task_id)).then((_) => {
      setIsTaskLoading(false)
    })
  }
  const useHandleGetTaskWithoutLoading = async (task_id: number) => {
    dispatch(getTask(task_id))
  }
  const useHandleUpdateTaskDetails = async (task_id: number, data: any) => {
    dispatch(setUpdateTaskDetailsData({ id: task_id, ...data }))
    toast.promise(
      dispatch(updateTaskDetails()).then((_) => dispatch(getTask(task_id))),
      {
        loading: 'Updating task details...',
        success: 'Task details updated successfully!',
        error: 'Error on updating task details!'
      }
    )
  }
  const useHandleRefetchTasks = async () => {
    dispatch(getSections())
  }
  return {
    useHandleCreateTask,
    useHandleRemoveTask,
    useHandleReorderTasks,
    useHandleUpdateTaskDueDate,
    useHandleUpdateTaskAssignee,
    useHandleUpdateTaskName,
    useHandleCompleteTask,
    useHandleGetTask,
    useHandleUpdateTaskDetails,
    useHandleRefetchTasks,
    useHandleGetTaskWithoutLoading,
    useHandleCompleteTaskSlider,
    taskUpdate,
    isTaskLoading,
    taskData
  }
}
