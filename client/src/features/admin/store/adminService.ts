import apiSlice from '~/app/api/apiSlice'

export const adminService = apiSlice.injectEndpoints({
  endpoints: builder => ({
    searchStacks: builder.query<ISearchStackResult[], string>({
      query: searchValue => `/stacks/admin/search?name=${searchValue}`,
      transformResponse: (response: ApiResponse<ISearchStackResult[]>) => response.data,
      forceRefetch: ({ currentArg, previousArg }) => {
        if (currentArg === undefined || previousArg === undefined) return false

        return currentArg.trim().length > 0 && currentArg !== previousArg
      }
    }),
    addNewOnlineEvent: builder.mutation<IOnlineBattle, FormData>({
      query: fromData => ({
        url: '/events',
        method: 'POST',
        body: fromData
      })
    }),
    getAllEvents: builder.query<ApiResponsePaginated<IOnlineEventItem[]>, number>({
      query: page => `/events/admin?page=${page}`,
      providesTags: (result, error, page) => [{ type: 'OnlineBattle' as const, id: 'ADMIN' }]
    })
  })
})

export const { useSearchStacksQuery, useAddNewOnlineEventMutation, useGetAllEventsQuery } = adminService
