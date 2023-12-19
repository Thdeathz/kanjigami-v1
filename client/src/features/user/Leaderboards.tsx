import React from 'react'
import { BsTrophyFill } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useDocumentTitle } from 'usehooks-ts'

import FilterBoxWrapper from '~/components/Filter/FilterBox'
import FilterItem from '~/components/Filter/FilterItem'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'

import LeaderboardsList from './components/Leaderboards/LeaderboardsList'

function Leaderboards() {
  useDocumentTitle('Leaderboard | 漢字ガミ')

  return (
    <DefaultLayout>
      <PageHeader icon={<BsTrophyFill />} title="Leaderboards" className="mb-12">
        <FilterBoxWrapper>
          <FilterItem actived>All-time</FilterItem>

          <FilterItem>
            <div className="flex items-center justify-center gap-1">
              Kanji stack <IoMdArrowDropdown />
            </div>
          </FilterItem>

          <FilterItem>
            <div className="flex items-center justify-center gap-1">
              Online battle <IoMdArrowDropdown />
            </div>
          </FilterItem>
        </FilterBoxWrapper>
      </PageHeader>

      <LeaderboardsList />
    </DefaultLayout>
  )
}

export default Leaderboards
