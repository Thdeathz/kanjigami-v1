import React from 'react'

import Loading from '~/components/Loading'

import { useGetOnlineEventsLeaderboardsQuery } from '../store/battleService'

import EventLeaderboards from './LeaderList/EventLeaderboards'

function AllTimeLeaderboards() {
  const { data: leaderboards, isLoading } = useGetOnlineEventsLeaderboardsQuery(undefined)

  if (isLoading) return <Loading className="text-3xl" />

  if (!leaderboards) return <p className="font-medium opacity-50">Empty..</p>

  return <EventLeaderboards leaderboards={leaderboards} />
}

export default AllTimeLeaderboards
