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
import Table from './components/Table'

function KanjiStackList() {
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
        <Table
          columns={[
            {
              title: 'Thumbnail',
              dataIndex: 'thumbnail',
              render: () => (
                <div className="flex-center py-3">
                  <Image className="aspect-ratio w-[8rem] rounded-md" />
                </div>
              )
            },
            {
              title: 'Title',
              dataIndex: 'title'
            },
            {
              title: 'Number kanjis',
              dataIndex: 'numberKanjis'
            },
            {
              title: 'User followed',
              dataIndex: 'userFollowed'
            },
            {
              title: 'Action',
              dataIndex: 'action',
              render: () => (
                <div className="flex-center gap-4">
                  <Button type="primary" className="flex-center aspect-square">
                    <IconWrapper icon={<AiTwotoneEdit />} className="text-xl" />
                  </Button>
                  <Button type="danger" className="flex-center aspect-square">
                    <IconWrapper icon={<AiTwotoneDelete />} className="text-xl" />
                  </Button>
                </div>
              )
            }
          ]}
          dataSources={Array.from(Array(10).keys()).map(() => ({
            thumbnail: '-',
            title: '-',
            numberKanjis: '-',
            userFollowed: '-'
          }))}
        />
      </Panel>
    </DefaultLayout>
  )
}

export default KanjiStackList
