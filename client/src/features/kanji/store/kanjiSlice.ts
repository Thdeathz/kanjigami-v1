import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '~/@types/app'

type StateType = {
  currentPage: number
}

const initialState: StateType = {
  currentPage: 1
}

const kanjiSlice = createSlice({
  name: 'kanji',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      console.log('setCurrentPage', action)
      const { page } = action.payload as { page: number }

      state.currentPage = page
    }
  }
})

export const { setCurrentPage } = kanjiSlice.actions

export default kanjiSlice.reducer

export const selectCurrentPage = (state: RootState) => state.kanji.currentPage
