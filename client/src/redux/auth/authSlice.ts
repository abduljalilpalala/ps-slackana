import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction
} from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { SignInUpFormValues, AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'
import authService from './authService'

type InitialState = {
  user: SignInUpFormValues | null
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  error: AxiosResponseError
}

const initialState: InitialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: {
    status: 0,
    content: null
  }
}

export const signUp = createAsyncThunk(
  'auth/sign-up',
  async (user: SignInUpFormValues, thunkAPI) => {
    try {
      return await authService.signUp(user)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
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
    setAuth: (state, action) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialState>) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<SignInUpFormValues>) => {
        state.isSuccess = true
        state.user = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      .addCase(HYDRATE, (state, action: any) => {
        if (action.payload?.auth?.user) {
          state.user = action.payload.auth.user
        }
      })
  }
})

export const { reset, setAuth } = authSlice.actions
export default authSlice.reducer
