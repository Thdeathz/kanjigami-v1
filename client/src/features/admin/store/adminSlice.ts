import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '~/@types/app'

type StateType = {
  eventCurrentPage: number
  stackCurrentPage: number
  userCurrentPage: number
}

const initialState: StateType = {
  eventCurrentPage: 1,
  stackCurrentPage: 1,
  userCurrentPage: 1
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setEventCurrentPage: (state, action) => {
      state.eventCurrentPage = action.payload
    },
    setStackCurrentPage: (state, action) => {
      state.stackCurrentPage = action.payload
    },
    setUserCurrentPage: (state, action) => {
      state.userCurrentPage = action.payload
    }
  }
})

export const { setEventCurrentPage, setStackCurrentPage, setUserCurrentPage } = adminSlice.actions

export default adminSlice.reducer

export const selectEventCurrentPage = (state: RootState) => state.admin.eventCurrentPage

export const selectStackCurrentPage = (state: RootState) => state.admin.stackCurrentPage

export const selectUserCurrentPage = (state: RootState) => state.admin.userCurrentPage
