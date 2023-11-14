import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import type { AppDispatch, RootState } from '~/@types/app'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
