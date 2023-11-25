import { Form } from 'antd'
import React from 'react'
import { RiSwordFill } from 'react-icons/ri'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import SectionDivider from './components/SectionDivider'
import FormBattleDetail from './components/FormBattleDetail'
import { useDocumentTitle } from 'usehooks-ts'
import Button from '~/components/Button'
import FormBattleRound from './components/FormBattleRound'

const CreateOnlineEvent = () => {
  useDocumentTitle('Create Online Battle')

  const [form] = Form.useForm<CreateOnlineEvent>()

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

      <Form form={form} name="create-battle" autoComplete="off" className="mx-auto max-w-[80rem]">
        <div className="mb-8">
          <SectionDivider className="mb-4" title="Battle Details" />

          <FormBattleDetail />
        </div>

        <div className="mb-8">
          <SectionDivider title="Rounds" />

          <p className="mb-4 font-semibold text-[#2d3748] dark:text-[#a0b3c6]">
            <strong>Note:</strong> The kanjis stack you add for each round remain inaccessible to everyone until you
            start the battle.
          </p>

          <FormBattleRound />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="danger">Cancel</Button>
          <Button type="primary">Add new</Button>
        </div>
      </Form>
    </DefaultLayout>
  )
}

export default CreateOnlineEvent
