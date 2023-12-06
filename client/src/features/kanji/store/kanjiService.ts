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
      providesTags: () => [{ type: 'Stack', id: 'LIST' }]
    }),
    getStackDetail: builder.query<IStackDetail, string>({
      query: id => `/stacks/${id}`,
      transformResponse: (response: ApiResponse<IStackDetail>) => response.data,
      providesTags: (result, error, id) => [{ type: 'Stack', id }]
    })
  })
})

export const { useGetAllGamesQuery, useGetAllStacksQuery, useGetStackDetailQuery } = kanjiService
