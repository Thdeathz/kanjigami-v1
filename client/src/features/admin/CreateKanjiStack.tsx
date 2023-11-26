import { Form } from 'antd'
import React from 'react'
import { BsStack } from 'react-icons/bs'

import Button from '~/components/Button'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'

import FormKanji from './components/FormKanji'
import FromStackDetail from './components/FromStackDetail'
import SectionDivider from './components/SectionDivider'

function CreateKanjiStack() {
  const [form] = Form.useForm<CreateStackRequest>()

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

      <Form form={form} name="create-stack" autoComplete="off" className="mx-auto max-w-[80rem]">
        <div className="mb-8">
          <SectionDivider title="Stack Details" />

          <FromStackDetail />
        </div>

        <div className="mb-8">
          <SectionDivider title="Kanjis" />

          <FormKanji />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="danger">Cancel</Button>
          <Button type="primary">Add new</Button>
        </div>
      </Form>
    </DefaultLayout>
  )
}

export default CreateKanjiStack
