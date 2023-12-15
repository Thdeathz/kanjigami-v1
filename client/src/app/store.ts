import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import adminReducer from '~/features/admin/store/adminSlice'
import authReducer from '~/features/auth/store/authSlice'
import battleReducer from '~/features/battle/store/battleSlice'
import gameReducer from '~/features/game/store/gameSlice'
import kanjiReducer from '~/features/kanji/store/kanjiSlice'

import apiSlice from './api/apiSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    battle: battleReducer,
    admin: adminReducer,
    kanji: kanjiReducer,
    game: gameReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)

export default store
