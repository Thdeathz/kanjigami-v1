import React from 'react'
import { BsStack } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

import Button from '~/components/Button'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import RootNotification from '~/components/RootNotification'

import EventLeaderboards from '../battle/components/LeaderList/EventLeaderboards'

import GamesList from './components/GamesList'
import SearchKanji from './components/SearchKanji'

function StackDetail() {
  const { id: stackId } = useParams()

  return (
    <DefaultLayout
      breadcrumbs={[
        {
          label: (
            <div className="flex-center gap-2">
              <BsStack /> Kanji stack
            </div>
          ),
          to: '/kanji'
        },
        {
          label: <p>👪 家族</p>,
          to: `/kanji/${stackId}`
        }
      ]}
    >
      <PageHeader
        title="👪 家族"
        subtitle="This is a word package include kanji related to family. Let's practice kanji together"
        className="mb-12"
      />

      <RootNotification />

      <GamesList />

      <div className="mt-12 flex w-full items-start justify-start gap-12">
        <div className="w-full grow">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-clr-link-light dark:text-clr-link-dark">Kanji stack</p>

            <SearchKanji />
          </div>

          <Panel className="mt-6">
            <div className="grid grid-cols-8 gap-4">
              {Array.from(Array(120).keys()).map(each => (
                <Button key={`kanji-item-${each}`}>家族</Button>
              ))}
            </div>
          </Panel>
        </div>

        <div className="basis-1/4">
          <p className="mb-4 text-xl font-semibold">Stack leaders</p>

          <EventLeaderboards />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default StackDetail
