import { createSlice } from '@reduxjs/toolkit'

import { onlineBattleStatus } from '~/config/status'

import { RootState } from '~/@types/app'

type StateType = {
  upComingCurrentPage: number
  onGoingCurrentPage: number
  finishedCurrentPage: number
}

const initialState: StateType = {
  upComingCurrentPage: 1,
  onGoingCurrentPage: 1,
  finishedCurrentPage: 1
}

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      const { page, status } = action.payload as { page: number; status: OnlineBattleStatus }

      switch (status) {
        case onlineBattleStatus.UPCOMING:
          state.upComingCurrentPage = page
          break
        case onlineBattleStatus.ONGOING:
          state.onGoingCurrentPage = page
          break
        case onlineBattleStatus.FINISHED:
          state.finishedCurrentPage = page
          break
        default:
          break
      }
    }
  }
})

export const { setCurrentPage } = battleSlice.actions

export default battleSlice.reducer

export const selectCurrentPage = (state: RootState, type: OnlineBattleStatus) => {
  switch (type) {
    case onlineBattleStatus.UPCOMING:
      return state.battle.upComingCurrentPage
    case onlineBattleStatus.ONGOING:
      return state.battle.onGoingCurrentPage
    case onlineBattleStatus.FINISHED:
      return state.battle.finishedCurrentPage
    default:
      return 1
  }
}
