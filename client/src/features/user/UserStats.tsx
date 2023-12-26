import { motion } from 'framer-motion'
import React from 'react'
import { FaChartArea } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useDocumentTitle } from 'usehooks-ts'

import FilterBox from '~/components/Filter/FilterBox'
import FilterItem from '~/components/Filter/FilterItem'
import Image from '~/components/Image'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import { panelVariants } from '~/config/variants'
import { useGetOnlineStatsQuery } from './store/userService'
import Loading from '~/components/Loading'

function UserStats() {
  useDocumentTitle('My Analytics | 漢字ガミ')

  const { data: onlineStats, isLoading } = useGetOnlineStatsQuery(undefined)

  if (isLoading)
    return (
      <DefaultLayout>
        <PageHeader icon={<FaChartArea />} title="Your stats" className="mb-12" />

        <Loading className="text-3xl" />
      </DefaultLayout>
    )

  if (!onlineStats)
    return (
      <DefaultLayout>
        <PageHeader icon={<FaChartArea />} title="Your stats" className="mb-12" />

        <Panel className="flex-center mx-auto w-max py-24 opacity-30">
          <p className="w-[20rem] text-center text-3xl font-medium">Play at least one event to see your stats</p>
        </Panel>
      </DefaultLayout>
    )

  return (
    <DefaultLayout>
      <PageHeader icon={<FaChartArea />} title="Your stats" className="mb-12">
        <FilterBox>
          <FilterItem>
            <div className="flex items-center justify-center gap-1">
              {onlineStats.title} <IoMdArrowDropdown />
            </div>
          </FilterItem>
        </FilterBox>
      </PageHeader>

      <motion.div variants={panelVariants} initial="hidden" animate="enter">
        <Panel className="mx-auto w-max rounded-xl">
          <table className="table">
            <thead className="table-header-group align-middle">
              <tr className="table-row bg-table-header-light dark:bg-table-header-dark">
                <th className="px-12 py-2.5 font-semibold">Round</th>
                <th className="px-12 py-2.5 font-semibold">My score</th>
                <th className="px-12 py-2.5 font-semibold">My rank</th>
              </tr>
            </thead>

            <tbody className="table-row-group align-middle">
              {onlineStats.rounds.map((round, index) => (
                <tr
                  key={`status-row-${index}`}
                  className={`font-medium text-text-secondary-light dark:text-text-secondary-dark ${
                    index % 2 !== 0 && 'bg-table-header-light dark:bg-table-header-dark'
                  }`}
                >
                  <td className="px-2.5">
                    <div className="flex-center gap-2 py-3">
                      <Image src={round.stack.thumbnail} className="aspect-ratio w-[3rem] rounded-md" />
                      <p className="">#{index + 1}</p>
                    </div>
                  </td>
                  <td className="px-2.5 text-center text-xl">{round.onlineHistory.archievedPoints}</td>
                  <td className="px-2.5 text-center text-xl">{round.onlineHistory.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </motion.div>
    </DefaultLayout>
  )
}

export default UserStats
