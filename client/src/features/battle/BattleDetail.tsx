import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'

import { DefaultLayout } from '~/components'
import CustomDivider from '~/components/CustomDivider'
import PageHeader from '~/components/PageHeader'
import Tag from '~/components/Tag'
import CountDown from './components/CountDown'
import RootNotification from '~/components/RootNotification'
import EventLeaderboards from './components/EventLeaderboards'
import Panel from '~/components/Panel'
import Button from '~/components/Button'
import OnlineCard from './components/OnlineCard'

const BattleDetail = () => {
  const { id: battleId } = useParams()

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
          label: <p>{`Mid-Autumn Festival ${battleId}`}</p>,
          to: `/battle/${battleId}`
        }
      ]}
    >
      <PageHeader
        title="Mid-Autumn Festival"
        subtitle="This is a word package related to the Mid-Autumn Festival. Let's practice kanji together"
        className="mb-12"
      >
        <div className="flex-center gap-2">
          <Tag type="ongoing" />
          <Tag title="🥮中秋節" />
          <Tag title="523 PLAYERS" />
        </div>

        <div className="flex-center gap-2">
          <CustomDivider className="my-1" />
          <div className="whitespace-nowrap rounded-full bg-clr-border-1-light px-3 py-0.5 text-sm uppercase text-footer-light-text dark:bg-clr-border-1-dark">
            ends in
          </div>
          <CustomDivider className="my-1" />
        </div>

        <CountDown size="large" />
      </PageHeader>

      <RootNotification />

      <div className="mt-12 flex w-full items-start justify-start gap-12">
        <div className="w-full grow">
          <Panel>
            <div className="grid grid-cols-8 gap-3">
              {Array.from(Array(12).keys()).map((_, index) => (
                <Button key={`kanji-item-${index}`}>家族</Button>
              ))}
            </div>
          </Panel>

          <div className="card-list group pointer-events-none mt-6 grid w-full auto-rows-fr grid-cols-auto-fill gap-6">
            <OnlineCard
              key={`round-card-64`}
              imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/234.png?alt=media&token=4df8d4e0-c249-466c-9be9-b4db8be3806c"
              topUsername="Kanji kantan"
              topScore={253}
              stack="家族"
            />

            <OnlineCard
              key={`round-card-3457`}
              imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/234.png?alt=media&token=4df8d4e0-c249-466c-9be9-b4db8be3806c"
              topUsername="Kanji kantan"
              topScore={253}
              stack="家族"
            />

            <OnlineCard
              key={`round-card-347}`}
              imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/234.png?alt=media&token=4df8d4e0-c249-466c-9be9-b4db8be3806c"
              topUsername="Kanji kantan"
              topScore={253}
              stack="家族"
            />

            {Array.from(Array(5).keys()).map((_, index) => (
              <OnlineCard key={`round-card-${index}`} />
            ))}
          </div>
        </div>

        <div className="basis-1/4">
          <Button className="mb-4 w-full" type="primary">
            Join lobby
          </Button>

          <p className="mb-4 text-xl font-semibold">Battle leaders</p>

          <EventLeaderboards />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default BattleDetail
