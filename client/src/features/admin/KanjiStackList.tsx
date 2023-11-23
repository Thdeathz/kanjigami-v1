import React from 'react'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { BsStack } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'

const KanjiStackList = () => {
  const navigate = useNavigate()

  return (
    <DefaultLayout>
      <PageHeader
        icon={<BsStack />}
        title="Config Kanji Stack"
        subtitle="Play game and learn more kanji"
        className="mb-12"
      >
        <Button className="mt-4" onClick={() => navigate('/admin/kanjis/create')}>
          Create new stack
        </Button>
      </PageHeader>

      <Panel>
        <table className="table w-full">
          <thead className="table-header-group align-middle">
            <tr className="table-row bg-table-header-light dark:bg-table-header-dark">
              <th className="px-6 py-2.5 font-semibold">Index</th>
              <th className="px-12 py-2.5 font-semibold">Thumbnail</th>
              <th className="px-12 py-2.5 font-semibold">Title</th>
              <th className="px-12 py-2.5 font-semibold">Number kanjis</th>
              <th className="px-12 py-2.5 font-semibold">User followed</th>
              <th className="px-12 py-2.5 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="table-row-group align-middle">
            {Array.from(Array(10).keys()).map(each => (
              <tr
                key={`status-row-${each}`}
                className={`font-medium text-text-secondary-light dark:text-text-secondary-dark ${
                  each % 2 !== 0 && 'bg-table-header-light dark:bg-table-header-dark'
                }`}
              >
                <td className="w-[3rem] px-2.5 text-center">
                  <p className="">#{each + 1}</p>
                </td>
                <td className="flex-center px-2.5 py-3">
                  <Image className="aspect-ratio w-[8rem] rounded-md" />
                </td>
                <td className="px-2.5">-</td>
                <td className="px-2.5">-</td>
                <td className="px-2.5">-</td>
                <td className="w-[6rem] px-2.5">
                  <div className="flex-center gap-4">
                    <Button type="primary" className="flex-center aspect-square">
                      <IconWrapper icon={<AiTwotoneEdit />} className="text-xl" />
                    </Button>
                    <Button type="danger" className="flex-center aspect-square">
                      <IconWrapper icon={<AiTwotoneDelete />} className="text-xl" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </DefaultLayout>
  )
}

export default KanjiStackList
