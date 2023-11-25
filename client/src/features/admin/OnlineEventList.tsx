import React from 'react'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { RiSwordFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import Table from './components/Table'
import Tag from '~/components/Tag'

function OnlineEventList() {
  const navigate = useNavigate()

  return (
    <DefaultLayout>
      <PageHeader
        icon={<RiSwordFill />}
        title="Config Online Battle"
        subtitle="Compete with players around the world"
        className="mb-12"
      >
        <Button className="mt-4" onClick={() => navigate('/admin/events/create')}>
          Create new battle
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
              title: 'Number Rounds',
              dataIndex: 'numberRounds'
            },
            {
              title: 'Start time',
              dataIndex: 'startTime'
            },
            {
              title: 'Status',
              dataIndex: 'status',
              render: value => (
                <div className="flex-center">
                  <Tag type={value as OnlineEventStatus} />
                </div>
              )
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
            numberRounds: '-',
            startTime: new Date().toLocaleString(),
            status: 'finished'
          }))}
        />
      </Panel>
    </DefaultLayout>
  )
}

export default OnlineEventList
