import apiSlice from '~/app/api/apiSlice'

const gameService = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFlipCardGameContent: builder.query<IFlipCardGameContent[], string>({
      query: stackId => `games/flip-card/${stackId}`,
      transformResponse: (response: ApiResponse<IFlipCardGameContent[]>) => response.data,
      forceRefetch: () => true
    }),
    getGameById: builder.query<IGame, string>({
      query: gameId => `games/${gameId}`,
      transformResponse: (response: ApiResponse<IGame>) => response.data
    }),
    getGameLog: builder.query<GameLog, string>({
      query: logId => `/game-log/${logId}`,
      transformResponse: (response: ApiResponse<GameLog>) => response.data,
      forceRefetch: () => true
    }),
    startGame: builder.mutation<string, { stackId: string; gameId: string; numberKanji: number; time: number }>({
      query: ({ stackId, gameId, numberKanji, time }) => ({
        url: `/games/${gameId}/${stackId}`,
        method: 'POST',
        body: {
          numberKanji,
          time
        }
      }),
      transformResponse: (response: ApiResponse<string>) => response.data
    })
  })
})

export const { useGetFlipCardGameContentQuery, useGetGameByIdQuery, useGetGameLogQuery, useStartGameMutation } =
  gameService
