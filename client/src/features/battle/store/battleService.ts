import apiSlice from '~/app/api/apiSlice'
import { onlineBattleStatus } from '~/config/status'

type BattleType = 'UpcomingBattles' | 'FinishedBattles' | 'OngoingBattles'

type QueryParams = {
  status?: OnlineBattleStatus
  page?: number
}

function getType(status: OnlineBattleStatus): BattleType {
  switch (status) {
    case onlineBattleStatus.UPCOMING:
      return 'UpcomingBattles'
    case onlineBattleStatus.FINISHED:
      return 'FinishedBattles'
    case onlineBattleStatus.ONGOING:
      return 'OngoingBattles'
    default:
      return 'UpcomingBattles'
  }
}

export const battleService = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBattles: builder.query<ApiResponsePaginated<IOnlineBattle[]>, QueryParams>({
      query: ({ status, page }) => `/events?status=${status}&page=${page}`,
      serializeQueryArgs: ({ queryArgs }) => ({ status: queryArgs.status }),
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
        return currentArg?.page !== previousArg?.page
      },
      providesTags: (result, error, arg) => {
        const id = arg?.status || 'UPCOMING'

        if (result) {
          const data = result.data as IOnlineBattle[]
          return [
            { type: 'OnlineBattle' as const, id },
            ...data.map(({ id }) => ({ type: 'OnlineBattle' as const, id }))
          ]
        }
        return [{ type: 'OnlineBattle' as const, id }]
      }
    }),
    getBattleDetail: builder.query<IOnlineBattle, string>({
      query: id => `/events/${id}`,
      transformResponse: (response: ApiResponse<IOnlineBattle>) => response.data,
      providesTags: (result, error, id) => [{ type: 'OnlineBattle', id }]
    }),
    getOnlineEventsLeaderboards: builder.query<ITopUser[], undefined>({
      query: () => '/events/leaderboards',
      transformResponse: (response: ApiResponse<ITopUser[]>) => response.data,
      providesTags: (result, error) => [{ type: 'OnlineEventLeaderboards', id: 'LIST' }]
    })
  })
})

export const { useGetBattlesQuery, useGetBattleDetailQuery, useGetOnlineEventsLeaderboardsQuery } = battleService
