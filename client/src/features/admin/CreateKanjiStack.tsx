import { Form } from 'antd'
import React from 'react'
import { BsStack } from 'react-icons/bs'

import Button from '~/components/Button'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'

import FormCreateKanjiStack from './components/FormCreateKanjiStack'
import { useDocumentTitle } from 'usehooks-ts'

function CreateKanjiStack() {
  useDocumentTitle('Create Kanji Stack')

  return (
    <DefaultLayout
      breadcrumbs={[
        {
          label: (
            <div className="flex-center gap-2">
              <BsStack /> Config Kanji Stack
            </div>
          ),
          to: '/admin/kanjis'
        },
        {
          label: <p>Create new</p>,
          to: `/admin/kanjis/create`
        }
      ]}
    >
      <PageHeader
        icon={<BsStack />}
        title="Create Kanji Stack"
        subtitle="Play game and learn more kanji"
        className="mb-12"
      />

      <FormCreateKanjiStack />
    </DefaultLayout>
  )
}

export default CreateKanjiStack
