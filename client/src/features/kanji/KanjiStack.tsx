import React from 'react'
import { BsSearchHeartFill, BsStack } from 'react-icons/bs'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'
import PageHeader from '~/components/PageHeader'
import RootNotification from '~/components/RootNotification'
import StackItem from '~/components/StackItem'
import FilterBox from '../../components/FilterBox'
import FilterItem from './components/FilterItem'
import IconWrapper from '~/components/IconWrapper'

const KanjiStack = () => {
  useDocumentTitle('Kanji Stack | 漢字ガミ')

  return (
    <DefaultLayout>
      <PageHeader
        icon={<BsStack />}
        title="Online battles"
        subtitle="Compete with players around the world"
        className="mb-12"
      />

      <RootNotification />

      <div className="mt-12 flex items-center justify-between">
        <FilterBox>
          <div className="group flex min-w-[20vw] items-center justify-start gap-2 rounded bg-gradient-to-tr from-filter-start-light to-filter-end-light px-2 dark:from-filter-start-dark dark:to-filter-end-dark">
            <IconWrapper
              icon={<BsSearchHeartFill />}
              className="text-lg opacity-60 transition-opacity group-focus:opacity-100"
            />

            <input className="bg-transparent w-full py-2" placeholder="Enter stack name..." />
          </div>
        </FilterBox>

        <FilterBox>
          <FilterItem actived>All stacks</FilterItem>

          <FilterItem>Not played</FilterItem>

          <FilterItem>Played</FilterItem>

          <FilterItem>Followed</FilterItem>
        </FilterBox>
      </div>

      <div className="card-list group pointer-events-none row-auto mt-12 grid grid-cols-5 gap-8 transition-opacity">
        {Array.from(Array(18).keys()).map(index => (
          <StackItem
            imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/213.png?alt=media&token=3eef68c5-c33c-4eb7-99ff-fb4474f405f8"
            stack="クリスマス"
            key={index}
          />
        ))}
      </div>
    </DefaultLayout>
  )
}

export default KanjiStack
