import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '~/@types/app'

type StateType = {
  eventCurrentPage: number
}

const initialState: StateType = {
  eventCurrentPage: 1
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setEventCurrentPage: (state, action) => {
      state.eventCurrentPage = action.payload
    }
  }
})

export const { setEventCurrentPage } = adminSlice.actions

export default adminSlice.reducer

export const selectEventCurrentPage = (state: RootState) => state.admin.eventCurrentPage
