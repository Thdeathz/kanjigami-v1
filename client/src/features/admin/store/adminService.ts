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
    }),
    getStacks: builder.query<ApiResponsePaginated<IStackItem[]>, number>({
      query: page => `/stacks/admin?page=${page}`,
      providesTags: (result, error, page) => [{ type: 'Stack' as const, id: 'ADMIN' }]
    }),
    getAllUsers: builder.query<ApiResponsePaginated<IUserItem[]>, number>({
      query: page => `/user?page=${page}`,
      providesTags: (result, error, page) => [{ type: 'User' as const, id: 'ADMIN' }]
    }),
    getAllGames: builder.query<IGameItem[], undefined>({
      query: () => `/games`,
      providesTags: (result, error, page) => [{ type: 'Game' as const, id: 'ADMIN' }],
      transformResponse: (response: ApiResponse<IGameItem[]>) => response.data
    })
  })
})

export const {
  useSearchStacksQuery,
  useAddNewOnlineEventMutation,
  useGetAllEventsQuery,
  useGetStacksQuery,
  useGetAllUsersQuery,
  useGetAllGamesQuery
} = adminService
