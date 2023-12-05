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
    })
  })
})

export const { useUpdateAvatarMutation } = usersApiSlice
