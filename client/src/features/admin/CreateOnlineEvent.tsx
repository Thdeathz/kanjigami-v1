import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useDocumentTitle } from 'usehooks-ts'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'

import FormCreateOnlineEvent from './components/FormCreateOnlineEvent'

function CreateOnlineEvent() {
  useDocumentTitle('Create Online Battle')

  return (
    <DefaultLayout
      breadcrumbs={[
        {
          label: (
            <div className="flex-center gap-2">
              <RiSwordFill /> Config Online Battle
            </div>
          ),
          to: '/admin/events'
        },
        {
          label: <p>Create new</p>,
          to: `/admin/events/create`
        }
      ]}
    >
      <PageHeader
        icon={<RiSwordFill />}
        title="Create Online Battle"
        subtitle="Compete with players around the world"
        className="mb-12"
      />

      <FormCreateOnlineEvent />
    </DefaultLayout>
  )
}

export default CreateOnlineEvent
