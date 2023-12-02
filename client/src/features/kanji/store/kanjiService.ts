import apiSlice from '~/app/api/apiSlice'

export const kanjiService = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllGames: builder.query<IGame[], undefined>({
      query: () => '/games',
      transformResponse: (response: ApiResponse<IGame[]>) => response.data,
      providesTags: () => [{ type: 'Game', id: 'LIST' }]
    })
  })
})

export const { useGetAllGamesQuery } = kanjiService
