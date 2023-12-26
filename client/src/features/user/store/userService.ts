import apiSlice from '~/app/api/apiSlice'
import { setCredentitals } from '~/features/auth/store/authSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
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
    }),
    getAllTimeLeaderboards: builder.query<ITopUser[], { page: number; offset: number }>({
      query: ({ page, offset }) => ({
        url: `/game-log/leaderboards?page=${page}&offset=${offset}`,
        method: 'GET'
      }),
      transformResponse: (response: ApiResponse<ITopUser[]>) => response.data,
      providesTags: ['Leaderboards']
    }),
    getUserStats: builder.query<IUserStats, undefined>({
      query: () => ({
        url: '/user/stats',
        method: 'GET'
      }),
      transformResponse: (response: ApiResponse<IUserStats>) => response.data,
      providesTags: ['UserStats']
    }),
    getOnlineStats: builder.query<IOnlineStats, undefined>({
      query: () => ({
        url: '/events/stats',
        method: 'GET'
      }),
      transformResponse: (response: ApiResponse<IOnlineStats>) => response.data
    })
  })
})

export const { useUpdateAvatarMutation, useGetAllTimeLeaderboardsQuery, useGetUserStatsQuery, useGetOnlineStatsQuery } =
  usersApiSlice
