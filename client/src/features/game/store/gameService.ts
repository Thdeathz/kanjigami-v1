import apiSlice from '~/app/api/apiSlice'

const gameService = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFlipCardGameContent: builder.query<IFlipCardGameContent[], string>({
      query: (stackId: string) => `games/flip-card/${stackId}`,
      transformResponse: (response: ApiResponse<IFlipCardGameContent[]>) => response.data,
      forceRefetch: () => true
    })
  })
})

export const { useGetFlipCardGameContentQuery } = gameService
