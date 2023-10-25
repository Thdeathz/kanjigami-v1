import React from 'react'
import { BsStack } from 'react-icons/bs'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'
import PageHeader from '~/components/PageHeader'
import RootNotification from '~/components/RootNotification'
import StackItem from '~/components/StackItem'
import FilterBox from '../../components/Filter/FilterBox'
import FilterItem from '../../components/Filter/FilterItem'
import SearchKanji from './components/SearchKanji'

const KanjiStack = () => {
  useDocumentTitle('Kanji Stack | 漢字ガミ')

  return (
    <DefaultLayout>
      <PageHeader
        icon={<BsStack />}
        title="Kanji stack"
        subtitle="Play game and learn more kanji"
        className="mb-12"
      />

      <RootNotification />

      <div className="mt-12 flex items-center justify-between">
        <SearchKanji />

        <FilterBox>
          <FilterItem actived>All stacks</FilterItem>

          <FilterItem>Not played</FilterItem>

          <FilterItem>Played</FilterItem>

          <FilterItem>Followed</FilterItem>
        </FilterBox>
      </div>

      <div className="card-list group pointer-events-none mt-12 grid auto-rows-fr grid-cols-5 gap-8 transition-opacity">
        {Array.from(Array(18).keys()).map(index => (
          <StackItem
            imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/213.png?alt=media&token=3eef68c5-c33c-4eb7-99ff-fb4474f405f8"
            stack="クリスマス"
            key={index}
            stackId={index}
          />
        ))}
      </div>
    </DefaultLayout>
  )
}

export default KanjiStack
