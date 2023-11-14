import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'

import apiSlice from '~/app/api/apiSlice'
import { setCredentitals } from '~/features/auth/store/authSlice'

import type { RootState } from '~/@types/app'

const usersAdapter = createEntityAdapter<User>({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: '/user',
        validateStatus: (response: Response, result: ApiResult) => response.status === 200 && !result.isError
      }),
      transformResponse: (response: User[]) => usersAdapter.setAll(initialState, response),
      providesTags: result => {
        if (result?.ids) {
          return [{ type: 'User', id: 'LIST' }, ...result.ids.map(id => ({ type: 'User' as const, id }))]
        }
        return [{ type: 'User', id: 'LIST' }]
      }
    }),

    updateAvatar: builder.mutation({
      query: ({ userId, avatar }) => ({
        url: `/user/${userId}/avatar`,
        method: 'POST',
        body: avatar
      }),
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { accessToken } = data as { accessToken: string }

          dispatch(setCredentitals({ accessToken }))
        } catch (error) {
          console.log(error)
        }
      }
    })
  })
})

export const { useGetUsersQuery, useUpdateAvatarMutation } = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select(undefined)

const selectUserData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data as NonNullable<typeof usersResult.data>
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => selectUserData(state) ?? initialState)
