import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { Navigate, useParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import Button from '~/components/Button'
import CustomDivider from '~/components/CustomDivider'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Loading from '~/components/Loading'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import RootNotification from '~/components/RootNotification'
import Tag from '~/components/Tag'
import { onlineBattleStatus } from '~/config/status'

import CountDown from './components/CountDown'
import EventLeaderboards from './components/LeaderList/EventLeaderboards'
import OnlineCard from './components/OnlineCard'
import { useGetBattleDetailQuery } from './store/battleService'

function getCowntDownTitle(status: OnlineBattleStatus) {
  switch (status) {
    case onlineBattleStatus.UPCOMING:
      return 'Starts in'
    case onlineBattleStatus.ONGOING:
      return 'Ends in'
    case onlineBattleStatus.FINISHED:
      return 'Ended'
    default:
      return 'Starts in'
  }
}

function BattleDetail() {
  useDocumentTitle('Mid-Autumn Festival | 漢字ガミ')
  const { id: battleId } = useParams()
  const { data: battle, isLoading, isSuccess, refetch } = useGetBattleDetailQuery(battleId as string)

  if (isLoading || !battle)
    return (
      <DefaultLayout>
        <Loading className="text-3xl" />
      </DefaultLayout>
    )

  if (isSuccess && !battle) return <Navigate to="/404" />

  const countDownTitle = getCowntDownTitle(battle.status as OnlineBattleStatus)

  return (
    <DefaultLayout
      breadcrumbs={[
        {
          label: (
            <div className="flex-center gap-2">
              <RiSwordFill /> Online battles
            </div>
          ),
          to: '/battles'
        },
        {
          label: <p>{battle.title}</p>,
          to: `/battle/${battle.id}`
        }
      ]}
    >
      <PageHeader title={battle.title} subtitle={battle.description} className="mb-12">
        <div className="flex-center gap-2">
          <Tag type={battle.status} />
          <Tag title={battle.tags} />
          {!!battle.totalJoinedUsers && <Tag title={`${battle.totalJoinedUsers} PLAYERS`} />}
        </div>

        <div className="flex-center gap-2">
          <CustomDivider className="my-1" />
          <div className="whitespace-nowrap rounded-full bg-clr-border-1-light px-3 py-0.5 text-sm uppercase text-footer-light-text dark:bg-clr-border-1-dark">
            {countDownTitle}
          </div>
          <CustomDivider className="my-1" />
        </div>

        {battle.status === onlineBattleStatus.UPCOMING && (
          <CountDown size="large" type="animate" endTime={battle.startTime} onFinish={refetch} />
        )}
      </PageHeader>

      <RootNotification />

      <div className="mt-12 flex w-full items-start justify-start gap-12">
        <div className="w-full grow">
          <Panel>
            <div className="grid grid-cols-8 gap-3">
              {battle.rounds.map((round, index) => (
                <Button
                  key={`kanji-item-${index}`}
                  type={round.status !== onlineBattleStatus.UPCOMING ? 'green' : 'default'}
                >
                  {round.stack.name}
                </Button>
              ))}
            </div>
          </Panel>

          <div className="card-list group pointer-events-none mt-6 grid w-full auto-rows-fr grid-cols-auto-fill gap-6">
            {battle.rounds.map(round => (
              <OnlineCard key={`round-card-${round.id}`} round={round} startTime={new Date(battle.startTime)} />
            ))}
          </div>
        </div>

        <div className="basis-1/4">
          {battle.status === onlineBattleStatus.UPCOMING && (
            <Button className="mb-4 w-full" type="primary">
              Join lobby
            </Button>
          )}

          <p className="mb-4 text-xl font-semibold">Battle leaders</p>

          {battle.status === onlineBattleStatus.UPCOMING ? (
            <p className="font-semibold opacity-50">No leaderboards yet</p>
          ) : (
            <EventLeaderboards leaderboards={battle.leaderboards} />
          )}
        </div>
      </div>
    </DefaultLayout>
  )
}

export default BattleDetail
