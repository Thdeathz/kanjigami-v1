import React from 'react'
import { BsTrophyFill } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useDocumentTitle } from 'usehooks-ts'
import { motion } from 'framer-motion'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import FilterBoxWrapper from '~/components/Filter/FilterBox'
import FilterItem from '~/components/Filter/FilterItem'
import PageHeader from '~/components/PageHeader'
import LeaderboardItem from './components/LeaderboardItem'
import LeaderItem from './components/LeaderItem'
import { gridList } from '~/config/variants'

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
        <div className="leader-top mb-6 flex items-end justify-end gap-1">
          <LeaderItem rank={2} />

          <LeaderItem rank={1} />

          <LeaderItem rank={3} />
        </div>

        <motion.div
          className="flex flex-col items-center justify-start gap-4"
          variants={gridList.container(0.4)}
          initial="hidden"
          animate="enter"
        >
          <>
            {Array.from(Array(15).keys())
              .slice(3)
              .map((rank, index) => (
                <motion.div key={index} className="w-full" variants={gridList.item()}>
                  <LeaderboardItem
                    username="Kantan kanji"
                    score={368435}
                    games={23}
                    rank={rank + 1}
                  />
                </motion.div>
              ))}
          </>
        </motion.div>
      </div>
    </DefaultLayout>
  )
}

export default Leaderboards
