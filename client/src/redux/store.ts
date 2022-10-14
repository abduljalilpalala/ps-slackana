import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from '~/redux/auth/authSlice'
import projectReducer from './project/projectSlice'
import sectionReducer from './section/sectionSlice'
import settingReducer from './setting/settingSlice'
import memberReducer from './member/memberSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    setting: settingReducer,
    section: sectionReducer,
    member: memberReducer
  }
})

const makeStore = () => store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const wrapper = createWrapper(makeStore)
