import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import fileService from './fileService'
import { FileStateType } from './fileType'
import { catchError } from '~/utils/handleAxiosError'
import formatFiles from '~/utils/formatFiles'

const initialState: FileStateType = {
  files: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  error: {
    status: 0,
    content: null
  }
}

export const getProjectFiles = createAsyncThunk(
  'file/getProjectFiles',
  async (projectId: number, thunkAPI) => {
    try {
      const response = await fileService.getProjectFiles(projectId)
      const files = formatFiles(response)
      return files
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const getProjectFile = createAsyncThunk(
  'file/getProjectFile',
  async (payload: { projectId: number; fileId: string }, thunkAPI) => {
    try {
      const response = await fileService.getProjectFile(payload.projectId, payload.fileId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const addProjectFile = createAsyncThunk(
  'file/addProjectFile',
  async (payload: { projectId: number; file: any }, thunkAPI) => {
    try {
      const response = await fileService.addProjectFile(payload.projectId, payload.file)
      const files = await fileService.getProjectFiles(payload.projectId)
      const formattedFiles = formatFiles(files)
      if (response === 'File uploaded successfully') {
        return {
          message: response,
          files: formattedFiles
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const renameProjectFile = createAsyncThunk(
  'file/renameProjectFile',
  async (payload: { projectId: number; fileId: string; name: string }, thunkAPI) => {
    try {
      const response = await fileService.renameProjectFile(
        payload.projectId,
        payload.fileId,
        payload.name
      )
      if (response === 'File updated successfully') {
        const files = await fileService.getProjectFiles(payload.projectId)
        const formattedFiles = formatFiles(files)
        return formattedFiles
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const deleteProjectFile = createAsyncThunk(
  'file/deleteProjectFile',
  async (payload: { projectId: number; fileId: string }, thunkAPI) => {
    try {
      const response = await fileService.deleteProjectFile(payload.projectId, payload.fileId)
      if (response === 'File deleted successfully') {
        const files = await fileService.getProjectFiles(payload.projectId)
        const formattedFiles = formatFiles(files)
        return formattedFiles
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const fileSlice = createSlice({
  name: 'projectFiles',
  initialState,
  reducers: {
    resetFileState: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.error = {
        status: 0,
        content: null
      }
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<FileStateType>) => {
    builder
      .addCase(getProjectFiles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProjectFiles.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.files = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(getProjectFiles.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })
      .addCase(getProjectFile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProjectFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.files = action.payload
      })
      .addCase(getProjectFile.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })
      .addCase(addProjectFile.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isError = false
      })
      .addCase(addProjectFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.files = action.payload.files
      })
      .addCase(addProjectFile.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.files = action.payload.files
        state.error.status = action.payload.status
        state.error.content = action.payload.content
      })
      .addCase(renameProjectFile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(renameProjectFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.files = action.payload
      })
      .addCase(renameProjectFile.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })
      .addCase(deleteProjectFile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProjectFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.files = action.payload
      })
      .addCase(deleteProjectFile.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })
  }
})

export const { resetFileState } = fileSlice.actions
export default fileSlice.reducer
