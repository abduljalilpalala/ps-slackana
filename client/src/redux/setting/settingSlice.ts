import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import { AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'
import settingService from './settingService'

type InitialState = {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: {
    status: 0,
    content: null
  }
}

export const updateProfileDetails: any = createAsyncThunk(
  'auth/settingServiceStatus',
  async (profileDetails: any, thunkAPI) => {
    try {
      return await settingService.updateProfileDetails(profileDetails)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)
export const updatePassword: any = createAsyncThunk(
  'auth/updatePasswordStatus',
  async (passwordDetails: any, thunkAPI) => {
    try {
      return await settingService.updatePassword(passwordDetails)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)
export const updateNotification: any = createAsyncThunk(
  'auth/updateNotificationStatus',
  async (notificationDetails: any, thunkAPI) => {
    try {
      return await settingService.updateNotification(notificationDetails)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)
export const uploadPhoto: any = createAsyncThunk(
  'auth/uploadPhotoStatus',
  async (photoData: any, thunkAPI) => {
    try {
      return await settingService.uploadPhoto(photoData)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)
export const removePhoto: any = createAsyncThunk(
  'auth/removePhotoStatus',
  async (id: number, thunkAPI) => {
    try {
      return await settingService.removePhoto(id)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const settingSlice = createSlice({
  name: 'setting',
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
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
      .addCase(updateProfileDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfileDetails.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(updateProfileDetails.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(updatePassword.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(updateNotification.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateNotification.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(updateNotification.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(uploadPhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadPhoto.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(uploadPhoto.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })

      .addCase(removePhoto.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removePhoto.fulfilled, (state) => {
        state.isLoading = false
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(removePhoto.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { reset } = settingSlice.actions
export default settingSlice.reducer
