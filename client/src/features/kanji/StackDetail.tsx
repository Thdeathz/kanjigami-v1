import React from 'react'
import { BsStack } from 'react-icons/bs'
import { Navigate, useParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Loading from '~/components/Loading'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import RootNotification from '~/components/RootNotification'

import EventLeaderboards from '../battle/components/LeaderList/EventLeaderboards'

import GamesList from './components/GamesList'
import KanjiModal from './components/KanjiModal'
import SearchKanji from './components/SearchKanji'
import { useGetStackDetailQuery } from './store/kanjiService'

function StackDetail() {
  const { id: stackId } = useParams()
  const { data: stack, isLoading } = useGetStackDetailQuery(stackId as string)

  useDocumentTitle(stack ? `${stack.name} | 漢字ガミ` : '漢字ガミ')

  if (isLoading || !stack)
    return (
      <DefaultLayout>
        <Loading className="my-32 text-3xl" />
      </DefaultLayout>
    )

  if (!stack) return <Navigate to="/404" />

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
          label: <p>{stack.name}</p>,
          to: `/kanji/${stackId}`
        }
      ]}
    >
      <PageHeader title={stack.name} subtitle={stack.description} className="mb-12" />

      <RootNotification />

      <GamesList stackId={stack.id} />

      <div className="mt-12 flex w-full items-start justify-start gap-12">
        <div className="w-full grow">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-clr-link-light dark:text-clr-link-dark">Kanji stack</p>

            <SearchKanji />
          </div>

          <Panel className="mt-6">
            <div className="grid grid-cols-8 gap-4">
              {stack.kanjis.map(each => (
                // <Button key={`kanji-item-${each.id}`}>{each.kanji}</Button>
                <KanjiModal key={`kanji-items${each.id}`} id={each.id} kanji={each.kanji} />
              ))}
            </div>
          </Panel>
        </div>

        <div className="basis-1/4">
          <p className="mb-4 text-xl font-semibold">Stack leaders</p>

          <EventLeaderboards leaderboards={stack.leaderboards} />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default StackDetail
