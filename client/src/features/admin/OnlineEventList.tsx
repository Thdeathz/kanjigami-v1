import React from 'react'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { RiSwordFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Loading from '~/components/Loading'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import Tag from '~/components/Tag'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'
import { convertToUserTimeZone } from '~/utils/timezone'

import Table from './components/Table'
import { useGetAllEventsQuery } from './store/adminService'
import { setEventCurrentPage } from './store/adminSlice'

function OnlineEventList() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const page = useAppSelector(state => state.admin.eventCurrentPage)
  const { data: events, isLoading } = useGetAllEventsQuery(page)

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

      <Panel className="h-full">
        {isLoading || !events ? (
          <Loading className="text-3xl" />
        ) : (
          <>
            <Table
              columns={[
                {
                  title: 'Thumbnail',
                  dataIndex: 'thumbnail',
                  render: value => (
                    <div className="flex-center py-3">
                      <Image src={value} className="aspect-ratio w-[8rem] rounded-md" />
                    </div>
                  )
                },
                {
                  title: 'Title',
                  dataIndex: 'title'
                },
                {
                  title: 'Number Rounds',
                  dataIndex: 'numberRounds',
                  render: value => (
                    <div className="flex-center">
                      <span className="text-xl font-semibold">{value}</span>
                    </div>
                  )
                },
                {
                  title: 'Number Players',
                  dataIndex: 'numberPlayers',
                  render: value => (
                    <div className="flex-center">
                      <span className="text-xl font-semibold">{value}</span>
                    </div>
                  )
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
                      <Tag type={value as OnlineBattleStatus} />
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
              dataSources={events.data.map(event => ({
                thumbnail: event.thumbnail,
                title: event.title,
                numberRounds: event.totalRounds,
                numberPlayers: event.totalJoinedUsers,
                startTime: convertToUserTimeZone(event.startTime).toLocaleString(),
                status: event.status
              }))}
            />

            {events.totalPages > 0 && (
              <div className="my-4 flex items-center justify-end gap-2 text-lg font-medium">
                {Array.from(Array(events.totalPages).keys()).map(index => (
                  <button
                    key={`paginate-${index}`}
                    className={`p-2 ${page === index + 1 ? 'text-primary-light' : ''}`}
                    onClick={() => dispatch(setEventCurrentPage(index + 1))}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </Panel>
    </DefaultLayout>
  )
}

export default OnlineEventList
