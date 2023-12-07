import apiSlice from '~/app/api/apiSlice'

export const kanjiService = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllGames: builder.query<IGame[], undefined>({
      query: () => '/games',
      transformResponse: (response: ApiResponse<IGame[]>) => response.data,
      providesTags: () => [{ type: 'Game', id: 'LIST' }]
    }),
    getAllStacks: builder.query<ApiResponsePaginated<IStack[]>, number>({
      query: page => `/stacks?page=${page}`,
      serializeQueryArgs: () => 'STACKS LIST',
      merge: (currentCache, newItems) => {
        if (newItems.currentPage === 1) return newItems

        if (currentCache.data) {
          return {
            ...currentCache,
            data: [...currentCache.data, ...newItems.data]
          }
        }

        return newItems
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg
      },
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: 'Stack' as const, id: 'LIST' },
            ...result.data.map(({ id }) => ({ type: 'Stack' as const, id }))
          ]
        }

        return [{ type: 'Stack' as const, id: 'LIST' }]
      }
    }),
    getStackDetail: builder.query<IStackDetail, string>({
      query: id => `/stacks/${id}`,
      transformResponse: (response: ApiResponse<IStackDetail>) => response.data,
      providesTags: (result, error, id) => [{ type: 'Stack', id }]
    }),
    followStack: builder.mutation<void, string>({
      query: id => ({
        url: `/stacks/follow/${id}`,
        method: 'POST'
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Stack', id },
        { type: 'Stack', id: 'FOLLOWED' }
      ]
    }),
    getFollowedStacks: builder.query<IStack[], undefined>({
      query: () => '/stacks/follow',
      transformResponse: (response: ApiResponse<IStack[]>) => response.data,
      providesTags: () => [{ type: 'Stack', id: 'FOLLOWED' }]
    }),
    getKanjiDetail: builder.query<IKanji, string>({
      query: kanjiId => `/kanjis/${kanjiId}`,
      transformResponse: (response: ApiResponse<IKanji>) => response.data,
      providesTags: (result, error, kanjiId) => [{ type: 'Kanji', id: kanjiId }]
    })
  })
})

export const {
  useGetAllGamesQuery,
  useGetAllStacksQuery,
  useGetStackDetailQuery,
  useFollowStackMutation,
  useGetFollowedStacksQuery,
  useGetKanjiDetailQuery
} = kanjiService
