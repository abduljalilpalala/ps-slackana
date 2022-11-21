import { createSlice } from '@reduxjs/toolkit'

import { Notification } from '~/shared/interfaces'

type InitialState = {
  notifications: Array<Notification>
  notificationsTable: Array<Notification>
  currentID: number
}

const initialState: InitialState = {
  notifications: [],
  notificationsTable: [],
  currentID: 0
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, { payload }) => {
      state.notifications = payload
    },
    setNotificationsTable: (state, { payload }) => {
      state.notificationsTable = payload
    },
    setCurrentID: (state, { payload }) => {
      state.currentID = payload
    }
  }
})

export const { setNotifications, setNotificationsTable, setCurrentID } = notificationSlice.actions
export default notificationSlice.reducer
