import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import authReducer from '~/features/auth/store/authSlice'
import battleReducer from '~/features/battle/store/battleSlice'
import adminReducer from '~/features/admin/store/adminSlice'

import apiSlice from './api/apiSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    battle: battleReducer,
    admin: adminReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)

export default store
