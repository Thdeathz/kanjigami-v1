import React from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { FaBan } from 'react-icons/fa'
import { FaUserNinja } from 'react-icons/fa6'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Loading from '~/components/Loading'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import Tag from '~/components/Tag'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'

import Table from './components/Table'
import { useGetAllUsersQuery } from './store/adminService'
import { selectUserCurrentPage, setUserCurrentPage } from './store/adminSlice'

function UserList() {
  const dispatch = useAppDispatch()
  const page = useAppSelector(selectUserCurrentPage)
  const { data: users, isLoading } = useGetAllUsersQuery(page)

  return (
    <DefaultLayout>
      <PageHeader icon={<FaUserNinja />} title="Config User Account" subtitle="Manage user account" className="mb-12" />

      <Panel className="h-full">
        {isLoading || !users ? (
          <Loading className="text-3xl" />
        ) : (
          <>
            <Table
              columns={[
                {
                  title: 'Avatar',
                  dataIndex: 'avatarUrl',
                  render: value => (
                    <div className="flex-center py-3">
                      <Image src={value} className="aspect-ratio w-[8rem] rounded-md" />
                    </div>
                  )
                },
                {
                  title: 'Username',
                  dataIndex: 'username'
                },
                {
                  title: 'Email',
                  dataIndex: 'email'
                },
                {
                  title: 'Total games',
                  dataIndex: 'totalGames',
                  render: value => (
                    <div className="flex-center">
                      <span className="text-xl font-semibold">{value}</span>
                    </div>
                  )
                },
                {
                  title: 'Status',
                  dataIndex: 'isActive',
                  render: value => (
                    <div className="flex-center">
                      <Tag
                        type="custom"
                        className={`text-white ${value ? 'bg-red-light dark:bg-red-dark' : 'bg-primary-light'}`}
                        title={value ? 'Banned' : 'Active'}
                      />
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
                        <IconWrapper icon={<FaBan />} className="text-xl" />
                      </Button>
                    </div>
                  )
                }
              ]}
              dataSources={users.data.map(user => ({
                username: user.username,
                avatarUrl: user.avatarUrl,
                email: user.account.email,
                totalGames: user.totalGames,
                isActivate: user.account.isActive
              }))}
            />

            {users.totalPages > 0 && (
              <div className="my-4 flex items-center justify-end gap-2 text-lg font-medium">
                {Array.from(Array(users.totalPages).keys()).map(index => (
                  <button
                    key={`paginate-${index}`}
                    className={`p-2 ${page === index + 1 ? 'text-primary-light' : ''}`}
                    onClick={() => dispatch(setUserCurrentPage(index + 1))}
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

export default UserList
