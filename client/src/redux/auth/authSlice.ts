import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction
} from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { SignInUpFormValues, User, AxiosResponseError } from '~/shared/types'
import { catchError } from '~/utils/handleAxiosError'
import authService from './authService'

type InitialState = {
  user: any
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

export const signIn = createAsyncThunk(
  'auth/sign-in',
  async (user: SignInUpFormValues, thunkAPI) => {
    try {
      return await authService.signIn(user)
    } catch (error: any) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const signOut = createAsyncThunk('auth/sign-out', async (_, thunkAPI) => {
  try {
    return await authService.signOut()
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})

export const hydrateUserState = createAsyncThunk('auth/hydrateUserState', async (_, thunkAPI) => {
  try {
    return await authService.hydrateUserState()
  } catch (error: any) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})

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
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true
        state.isLoading = false
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
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true
        state.isLoading = false
        state.user = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      .addCase(signOut.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isSuccess = true
        state.isLoading = false
        state.user = null
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(signOut.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
      .addCase(hydrateUserState.pending, (state) => {
        state.isLoading = true
      })
      .addCase(hydrateUserState.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true
        state.isLoading = false
        state.user = action.payload
        state.error = {
          status: 0,
          content: null
        }
      })
      .addCase(hydrateUserState.rejected, (state, action: PayloadAction<any>) => {
        state.isError = true
        state.isSuccess = false
        state.isLoading = false
        state.error = action.payload
        state.user = null
      })
  }
})

export const { reset, setAuth } = authSlice.actions
export default authSlice.reducer
