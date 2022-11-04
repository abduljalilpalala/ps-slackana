import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder
} from '@reduxjs/toolkit'

import { Chat } from './chatType'
import chatService from './chatService'
import { catchError } from '~/utils/handleAxiosError'

type InitialState = {
  chats: Chat[]
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  error: {
    status: number
    content: null
  }
}

const initialState: InitialState = {
  chats: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  error: {
    status: 0,
    content: null
  }
}

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (projectId: any, thunkAPI) => {
    try {
      return await chatService.getMessages(projectId)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const addMessage = createAsyncThunk(
  'chat/addMessage',
  async ({ projectId, payload }: any, thunkAPI) => {
    try {
      return await chatService.addMessage(projectId, payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const updateMessage = createAsyncThunk(
  'chat/updateMessage',
  async ({ projectId, memberId, message }: any, thunkAPI) => {
    try {
      return await chatService.updateMessage(projectId, memberId, message)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async ({ projectId, messageId }: any, thunkAPI) => {
    try {
      return await chatService.deleteMessage(projectId, messageId)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
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
      // Get All Messages
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.chats = action.payload
      })
      .addCase(getMessages.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })

      // Add Message
      .addCase(addMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
        state.chats = action.payload
      })
      .addCase(addMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })

      // Delete Message
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.chats = action.payload
      })
      .addCase(deleteMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })

      // Update Message
      .addCase(updateMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.chats = action.payload
      })
      .addCase(updateMessage.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })
  }
})

export const { reset } = chatSlice.actions
export default chatSlice.reducer
