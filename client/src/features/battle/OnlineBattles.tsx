import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import Button from '~/components/Button'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import RootNotification from '~/components/RootNotification'
import { onlineBattleStatus } from '~/config/status'

import AllTimeLeaderboards from './components/AllTimeLeaderboards'
import BattleList from './components/BattleList'

const battleTypes = [
  { status: onlineBattleStatus.ONGOING, title: 'Latest battles' },
  { status: onlineBattleStatus.UPCOMING, title: 'Upcoming battles' },
  { status: onlineBattleStatus.FINISHED, title: 'Past battles' }
]

function OnlineBattles() {
  useDocumentTitle('Battles | 漢字ガミ')

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const filterStatus = searchParams.get('status')

  return (
    <DefaultLayout>
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        subtitle="Compete with players around the world"
        className="mb-12"
      >
        <div className="flex items-center justify-center gap-3">
          {battleTypes.map(({ status, title }) => (
            <Button
              key={status}
              type={filterStatus === status ? 'primary' : 'default'}
              onClick={() => navigate(`?status=${status}`)}
            >
              {title}
            </Button>
          ))}
        </div>
      </PageHeader>

      <RootNotification />

      <div className="mt-12 flex w-full items-start justify-start gap-12">
        <div className="w-full grow">
          {battleTypes.map(({ status, title }) =>
            filterStatus ? (
              filterStatus === status && <BattleList key={status} title={title} status={status} />
            ) : (
              <BattleList key={status} title={title} status={status} />
            )
          )}
        </div>

        <div className="basis-1/4">
          <p className="mb-4 text-xl font-semibold">All-time leaders</p>

          <AllTimeLeaderboards />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default OnlineBattles
