import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
  current
} from '@reduxjs/toolkit'

import { Chat } from './chatType'
import chatService from './chatService'
import { catchError } from '~/utils/handleAxiosError'

type InitialState = {
  chats: Chat[]
  threads: Chat[]
  message: Chat | null
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
  threads: [],
  message: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  error: {
    status: 0,
    content: null
  }
}

// MESSAGES
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

export const showMessage = createAsyncThunk(
  'chat/showMessage',
  async ({ projectId, messageId }: any, thunkAPI) => {
    try {
      return await chatService.showMessage(projectId, messageId)
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

// THREADS
export const getThreads = createAsyncThunk('chat/getThreads', async (messageId: any, thunkAPI) => {
  try {
    return await chatService.getThreads(messageId)
  } catch (error) {
    return thunkAPI.rejectWithValue(catchError(error))
  }
})

export const addThread = createAsyncThunk(
  'chat/addThread',
  async ({ messageId, payload }: any, thunkAPI) => {
    try {
      return await chatService.addThread(messageId, payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const updateThread = createAsyncThunk(
  'chat/updateThread',
  async ({ message_id, thread_id, payload }: any, thunkAPI) => {
    try {
      return await chatService.updateThread(message_id, thread_id, payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const deleteThread = createAsyncThunk(
  'chat/deleteThread',
  async ({ messageId, threadId }: any, thunkAPI) => {
    try {
      return await chatService.deleteThread(messageId, threadId)
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
    },
    setChats: (state, { payload }) => {
      state.chats = payload
    },
    setThreads: (state, { payload }) => {
      const { message, newThreadMessages } = payload || {}
      const newMessages = current(state.chats).map((chat) => {
        if (chat.id === message.id) return message
        return chat
      })

      state.chats = newMessages
      state.threads = newThreadMessages
      state.message!.thread = newThreadMessages
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

      // Get Single Message
      .addCase(showMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.message = action.payload
      })
      .addCase(showMessage.rejected, (state, action: PayloadAction<any>) => {
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

      // Get All Threads
      .addCase(getThreads.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getThreads.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.threads = action.payload
      })
      .addCase(getThreads.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })

      // // Add Thread
      .addCase(addThread.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = false
        state.error = {
          status: 0,
          content: null
        }
        const { message, newThreadMessages } = payload || {}
        const newMessages = current(state.chats).map((chat) => {
          if (chat.id === message.id) return message
          return chat
        })

        state.chats = newMessages
        if (state.message) state.message.thread = newThreadMessages
      })
      .addCase(addThread.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })

      .addCase(deleteThread.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteThread.fulfilled, (state, { payload }: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true
        const { message, newThreadMessages } = payload || {}
        const newMessages = current(state.chats).map((chat) => {
          if (chat.id === message.id) return message
          return chat
        })

        state.chats = newMessages
        if (state.message) state.message.thread = newThreadMessages
      })
      .addCase(deleteThread.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })

      .addCase(updateThread.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateThread.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isSuccess = true

        if (state.message) {
          state.message.thread = action.payload.newThreadMessages
        }
      })
      .addCase(updateThread.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload
      })
  }
})

export const { reset, setChats, setThreads } = chatSlice.actions
export default chatSlice.reducer
