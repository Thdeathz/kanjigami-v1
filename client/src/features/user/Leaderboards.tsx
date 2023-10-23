import React from 'react'
import { BsTrophyFill } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'
import FilterBoxWrapper from '~/components/Filter/FilterBox'
import FilterItem from '~/components/Filter/FilterItem'
import PageHeader from '~/components/PageHeader'
import LeaderboardItem from './Components/LeaderboardItem'
import TopItem from './Components/TopItem'

const Leaderboards = () => {
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

      <div className="mx-auto max-w-[45rem]">
        <div className="mb-6 flex items-end justify-end gap-1">
          <TopItem rank={2} />

          <TopItem rank={1} />

          <TopItem rank={3} />
        </div>

        <div className="flex flex-col items-center justify-start gap-4">
          <>
            {Array.from(Array(15).keys()).map((_, index) => (
              <LeaderboardItem
                key={index}
                username="Kantan kanji"
                score={368435}
                games={23}
                rank={index}
              />
            ))}
          </>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default Leaderboards
