import React from 'react'
import { FaChartArea } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useDocumentTitle } from 'usehooks-ts'
import { motion } from 'framer-motion'

import FilterBox from '~/components/Filter/FilterBox'
import FilterItem from '~/components/Filter/FilterItem'
import Image from '~/components/Image'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import { panelVariants } from '~/config/variants'

const UserStats = () => {
  useDocumentTitle('My Analytics | 漢字ガミ')

  return (
    <DefaultLayout>
      <PageHeader icon={<FaChartArea />} title="Your stats" className="mb-12">
        <FilterBox>
          <FilterItem>
            <div className="flex items-center justify-center gap-1">
              Mid-Autumn Festival <IoMdArrowDropdown />
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
              {Array.from(Array(10).keys()).map((each, index) => (
                <tr
                  key={`status-row-${index}`}
                  className={`font-medium text-text-secondary-light dark:text-text-secondary-dark ${
                    index % 2 !== 0 && 'bg-table-header-light dark:bg-table-header-dark'
                  }`}
                >
                  <td className="px-2.5">
                    <div className="flex-center gap-2 py-3">
                      <Image className="aspect-ratio w-[3rem] rounded-md" />
                      <p className="">#{each}</p>
                    </div>
                  </td>
                  <td className="px-2.5">-</td>
                  <td className="px-2.5">-</td>
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
