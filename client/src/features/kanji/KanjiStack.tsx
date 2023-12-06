import React from 'react'
import { BsStack } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import RootNotification from '~/components/RootNotification'

import FilterBox from '../../components/Filter/FilterBox'
import FilterItem from '../../components/Filter/FilterItem'

import KanjiList from './components/KanjiList'
import SearchKanji from './components/SearchKanji'

function KanjiStack() {
  useDocumentTitle('Kanji Stack | 漢字ガミ')

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get('filter')

  return (
    <DefaultLayout>
      <PageHeader icon={<BsStack />} title="Kanji stack" subtitle="Play game and learn more kanji" className="mb-12" />

      <RootNotification />

      <div className="mt-12 flex items-center justify-between">
        <SearchKanji />

        <FilterBox>
          <FilterItem actived={filterValue === 'all' || !filterValue} onClick={() => navigate(`?filter=all`)}>
            All stacks
          </FilterItem>

          <FilterItem actived={filterValue === 'not-played'} onClick={() => navigate(`?filter=not-played`)}>
            Not played
          </FilterItem>

          <FilterItem actived={filterValue === 'played'} onClick={() => navigate(`?filter=played`)}>
            Played
          </FilterItem>

          <FilterItem actived={filterValue === 'followed'} onClick={() => navigate(`?filter=followed`)}>
            Followed
          </FilterItem>
        </FilterBox>
      </div>

      <KanjiList />
    </DefaultLayout>
  )
}

export default KanjiStack
