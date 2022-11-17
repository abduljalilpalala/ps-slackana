import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
  current
} from '@reduxjs/toolkit'

import {
  AddMessageThreadType,
  AddMessageType,
  Chat,
  DeleteMessageThreadType,
  DeleteMessageType,
  MessageThreadResponse,
  UpdateMessageThreadType,
  UpdateMessageType
} from './chatType'
import chatService from './chatService'
import { catchError } from '~/utils/handleAxiosError'

type InitialState = {
  chats: Chat[]
  threads: Chat[]
  message: Chat | null
  isError: boolean
  isLoading: boolean
  isDoneSendingChatMessage: boolean
  isDoneSendingThreadMessage: boolean
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
  isDoneSendingChatMessage: false,
  isDoneSendingThreadMessage: false,
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
  async (payload: AddMessageType, thunkAPI) => {
    try {
      return await chatService.addMessage(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const updateMessage = createAsyncThunk(
  'chat/updateMessage',
  async (payload: UpdateMessageType, thunkAPI) => {
    try {
      return await chatService.updateMessage(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (payload: DeleteMessageType, thunkAPI) => {
    try {
      return await chatService.deleteMessage(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

// THREADS

export const addThread = createAsyncThunk(
  'chat/addThread',
  async (payload: AddMessageThreadType, thunkAPI) => {
    try {
      return await chatService.addThread(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const updateThread = createAsyncThunk(
  'chat/updateThread',
  async (payload: UpdateMessageThreadType, thunkAPI) => {
    try {
      return await chatService.updateThread(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const deleteThread = createAsyncThunk(
  'chat/deleteThread',
  async (payload: DeleteMessageThreadType, thunkAPI) => {
    try {
      return await chatService.deleteThread(payload)
    } catch (error) {
      return thunkAPI.rejectWithValue(catchError(error))
    }
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessageLoading: (state, action) => {
      state.isDoneSendingChatMessage = action.payload
    },
    setAddedMessage: (state, { payload }: { payload: Chat | number }) => {
      if (typeof payload !== 'number') {
        if (!current(state.chats).some((chat) => chat.id === payload.id)) {
          state.chats.push(payload)
        }
      }
    },
    setUpdatedMessage: (state, { payload }: { payload: Chat | number }) => {
      if (typeof payload !== 'number') {
        const newMessages = current(state.chats).map((chat) => {
          if (chat.id === payload.id) return payload
          return chat
        })
        state.chats = newMessages
      }
    },
    removeMessage: (state, { payload }: { payload: Chat | number }) => {
      if (current(state.chats).some((chat) => chat.id === payload)) {
        const newMessages = current(state.chats).filter((chat) => chat.id !== payload)
        state.chats = newMessages
      }
    },
    setAddedThreadMessage: (
      state,
      { payload }: { payload: { message: Chat; threadMessage: Chat } }
    ) => {
      const { message, threadMessage } = payload || {}
      const newMessages = current(state.chats).map((chat) => {
        if (chat.id === message.id) return message
        return chat
      })
      state.chats = newMessages
      if (
        state.message &&
        !current(state.message?.thread).some((chat) => chat.id === threadMessage.id)
      ) {
        state.message.thread.push(threadMessage)
      }
    },
    setUpdatedThreadMessage: (state, { payload }: { payload: Chat }) => {
      if (state.message) {
        const threadMessages = current(state.message.thread).map((chat) => {
          if (chat.id === payload.id) return payload
          return chat
        })
        state.message.thread = threadMessages
      }
    },
    removeThreadMessage: (
      state,
      { payload }: { payload: { message: Chat; threadMessage: number } }
    ) => {
      const { message, threadMessage } = payload || {}
      const newMessages = current(state.chats).map((chat) => {
        if (chat.id === message.id) return message
        return chat
      })
      state.chats = newMessages
      if (
        state.message &&
        current(state.message?.thread).some((chat) => chat.id === threadMessage)
      ) {
        const newThreadMessages = current(state.message.thread).filter(
          (chat) => chat.id !== threadMessage
        )
        state.message.thread = newThreadMessages
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

      // Get Single Message
      .addCase(showMessage.fulfilled, (state, action: PayloadAction<any>) => {
        state.message = action.payload
      })

      // Add Message
      .addCase(addMessage.pending, (state) => {
        state.isDoneSendingChatMessage = false
      })

      .addCase(addMessage.fulfilled, (state, { payload }: PayloadAction<Chat>) => {
        state.isDoneSendingChatMessage = true
        if (!current(state.chats).some((chat) => chat.id === payload.id)) {
          state.chats.push(payload)
        }
      })

      // Delete Message
      .addCase(deleteMessage.fulfilled, (state, { payload }: PayloadAction<number>) => {
        if (current(state.chats).some((chat) => chat.id === payload)) {
          const newMessages = current(state.chats).filter((chat) => chat.id !== payload)
          state.chats = newMessages
        }
      })

      // Update Message
      .addCase(updateMessage.fulfilled, (state, { payload }: PayloadAction<Chat>) => {
        const newMessages = current(state.chats).map((chat) => {
          if (chat.id === payload.id) return payload
          return chat
        })
        state.chats = newMessages
      })

      // Add Thread
      .addCase(addThread.pending, (state) => {
        state.isDoneSendingThreadMessage = false
      })

      .addCase(addThread.fulfilled, (state, { payload }: PayloadAction<MessageThreadResponse>) => {
        state.isDoneSendingThreadMessage = true
        const { message, threadMessage } = payload || {}
        if (typeof threadMessage === 'number') return
        const newMessages = current(state.chats).map((chat) => {
          if (chat.id === message.id) return message
          return chat
        })
        state.chats = newMessages
        if (
          state.message &&
          !current(state.message?.thread).some((chat) => chat.id === threadMessage.id)
        ) {
          state.message.thread.push(threadMessage)
        }
      })

      // Delete Thread
      .addCase(
        deleteThread.fulfilled,
        (state, { payload }: PayloadAction<MessageThreadResponse>) => {
          const { message, threadMessage } = payload || {}
          const newMessages = current(state.chats).map((chat) => {
            if (chat.id === message.id) return message
            return chat
          })
          state.chats = newMessages
          if (
            state.message &&
            current(state.message?.thread).some((chat) => chat.id === threadMessage)
          ) {
            const newThreadMessages = current(state.message.thread).filter(
              (chat) => chat.id !== threadMessage
            )
            state.message.thread = newThreadMessages
          }
        }
      )

      // Update Thread
      .addCase(
        updateThread.fulfilled,
        (state, { payload }: PayloadAction<MessageThreadResponse>) => {
          const { threadMessage } = payload || {}
          if (typeof threadMessage === 'number') return
          if (state.message) {
            const threadMessages = current(state.message.thread).map((chat) => {
              if (chat.id === threadMessage.id) return threadMessage
              return chat
            })
            state.message.thread = threadMessages
          }
        }
      )
  }
})

export const {
  setAddedMessage,
  setUpdatedMessage,
  removeMessage,
  setAddedThreadMessage,
  setUpdatedThreadMessage,
  removeThreadMessage,
  setMessageLoading
} = chatSlice.actions
export default chatSlice.reducer
