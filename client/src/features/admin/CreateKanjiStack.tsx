import { Form } from 'antd'
import React from 'react'
import { BsStack } from 'react-icons/bs'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import SectionDivider from './components/SectionDivider'
import FromStackDetail from './components/FromStackDetail'
import Panel from '~/components/Panel'
import Button from '~/components/Button'
import InputWrapper from '../user/components/InputWrapper'
import Input from '~/components/Input'
import IconWrapper from '~/components/IconWrapper'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import FormKanji from './components/FormKanji'

const CreateKanjiStack = () => {
  const [form] = Form.useForm<CreateStackRequest>()

  return (
    <DefaultLayout>
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
          <Button type="danger" className="text-lg">
            Cancel
          </Button>
          <Button type="primary" className="text-lg">
            Add new
          </Button>
        </div>
      </Form>
    </DefaultLayout>
  )
}

export default CreateKanjiStack
