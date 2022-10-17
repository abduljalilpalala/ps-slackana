import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { AxiosResponseError, Section, Task } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'
import taskService from './taskService'

type InitialState = {
  tasks: Array<Task>
  section_id: number
  project_id: number
  taskData: Task
  addNewTaskData: {
    name: string
    project_member_id?: number | null
    due_date?: string | null
  }
  removeTaskData: {
    id: number
  }
  refresher: {
    tasksStateUpdate: boolean
    taskUpdate: boolean
  }
  updateTaskDueDateData: {
    id: number
    due_date?: string | null
  }
  updateTaskAssigneeData: {
    id: number
    project_member_id?: number | null
  }
  updateTaskNameData: {
    id: number
    name: string
  }
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  tasks: [],
  section_id: 0,
  project_id: 0,
  taskData: {
    id: 0,
    assignee: null,
    name: '',
    description: '',
    is_completed: false,
    position: 0,
    due_date: '',
    estimated_time: 0,
    actual_time_finished: 0,
    created_at: '',
    updated_at: ''
  },
  addNewTaskData: {
    name: '',
    project_member_id: null,
    due_date: null
  },
  removeTaskData: {
    id: 0
  },
  updateTaskDueDateData: {
    id: 0,
    due_date: null
  },
  updateTaskAssigneeData: {
    id: 0,
    project_member_id: null
  },
  updateTaskNameData: {
    id: 0,
    name: ''
  },
  refresher: {
    tasksStateUpdate: false,
    taskUpdate: false
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: {
    status: 0,
    content: null
  }
}

export const getTasks = createAsyncThunk('task/getTasksStatus', async (_, thunkAPI) => {
  const {
    task: { project_id, section_id }
  }: any = thunkAPI.getState()
  try {
    return await taskService.getTasks(project_id, section_id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})
export const createTask = createAsyncThunk('task/createTasksStatus', async (_, thunkAPI) => {
  const {
    task: { project_id, section_id, addNewTaskData }
  }: any = thunkAPI.getState()
  try {
    return await taskService.createTask(project_id, section_id, { ...addNewTaskData })
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})
export const removeTask = createAsyncThunk('task/removeTasksStatus', async (_, thunkAPI) => {
  const {
    task: {
      project_id,
      section_id,
      removeTaskData: { id }
    }
  }: any = thunkAPI.getState()
  try {
    return await taskService.removeTask(project_id, section_id, id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})
export const reorderTasks = createAsyncThunk('task/reorderTasksStatus', async (_, thunkAPI) => {
  const {
    task: { project_id, section_id }
  }: any = thunkAPI.getState()
  try {
    return await taskService.reorderTasks(project_id, section_id)
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})
export const updateTaskDueDate = createAsyncThunk(
  'task/updateTaskDueDateStatus',
  async (_, thunkAPI) => {
    const {
      task: { project_id, updateTaskDueDateData }
    }: any = thunkAPI.getState()
    try {
      return await taskService.updateDueDate(
        project_id,
        updateTaskDueDateData.id,
        updateTaskDueDateData.due_date
      )
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)
export const updateTaskAssignee = createAsyncThunk(
  'task/updateTaskAssigneeStatus',
  async (_, thunkAPI) => {
    const {
      task: { project_id, updateTaskAssigneeData }
    }: any = thunkAPI.getState()
    try {
      return await taskService.updateAssignee(
        project_id,
        updateTaskAssigneeData.id,
        updateTaskAssigneeData.project_member_id
      )
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)
export const updateTaskName = createAsyncThunk('task/updateTaskNameStatus', async (_, thunkAPI) => {
  const {
    task: { project_id, section_id, updateTaskNameData }
  }: any = thunkAPI.getState()
  try {
    return await taskService.renameTask(
      project_id,
      section_id,
      updateTaskNameData.id,
      updateTaskNameData.name
    )
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.error = {
        status: 0,
        content: null
      }
    },
    resetRefresher: (state) => {
      state.refresher.taskUpdate = false
      state.refresher.tasksStateUpdate = false
    },
    taskRefresher: (state) => {
      state.refresher.taskUpdate = true
    },
    tasksRefresher: (state) => {
      state.refresher.tasksStateUpdate = true
    },
    setProjectID: (state, { payload: { project_id } }) => {
      state.project_id = project_id
    },
    setSectionID: (state, { payload: { section_id } }) => {
      state.section_id = section_id
    },
    setTaskData: (state, { payload: { id, name } }) => {
      state.taskData.id = id
      state.taskData.name = name
    },
    setAddNewTaskData: (state, { payload }) => {
      state.addNewTaskData = payload
    },
    setRemoveTaskData: (state, { payload: { id } }) => {
      state.removeTaskData.id = id
    },
    setUpdateTaskDueDateData: (state, { payload }) => {
      state.updateTaskDueDateData = payload
    },
    setUpdateTaskAssigneeData: (state, { payload }) => {
      state.updateTaskAssigneeData = payload
    },
    setUpdateTaskNameData: (state, { payload }) => {
      state.updateTaskNameData = payload
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    builder
      // Get Sections
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
        state.sectionsStateUpdate = true
      })
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.sections = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(getTasks.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(createTask.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // Remove Task
      .addCase(removeTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(removeTask.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // Reorder Tasks
      .addCase(reorderTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(reorderTasks.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(reorderTasks.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // Update Task Due Date
      .addCase(updateTaskDueDate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTaskDueDate.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(updateTaskDueDate.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // Update Task Assignee
      .addCase(updateTaskAssignee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTaskAssignee.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(updateTaskAssignee.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
      // Update Task Name
      .addCase(updateTaskName.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTaskName.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(updateTaskName.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {
  reset,
  resetRefresher,
  taskRefresher,
  tasksRefresher,
  setProjectID,
  setSectionID,
  setTaskData,
  setAddNewTaskData,
  setRemoveTaskData,
  setUpdateTaskDueDateData,
  setUpdateTaskAssigneeData,
  setUpdateTaskNameData
} = taskSlice.actions
export default taskSlice.reducer
