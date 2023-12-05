import { EntityAdapter, createSelector } from '@reduxjs/toolkit'

import { RootState } from '~/@types/app'

function getSelector<InitialState, T>(selectResult: any, adapter: EntityAdapter<T>, initialState: InitialState) {
  const selectUpcomingBattlesData = createSelector(
    selectResult,
    result => result.data as NonNullable<typeof result.data>
  )

  const { selectAll, selectEntities, selectIds, selectById, selectTotal } = adapter.getSelectors<RootState>(
    state => selectUpcomingBattlesData(state) ?? initialState
  )

  return {
    selectAll,
    selectEntities,
    selectIds,
    selectById,
    selectTotal
  }
}

export default getSelector
