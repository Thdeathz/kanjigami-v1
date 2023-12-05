import { Form, message } from 'antd'
import React, { useState } from 'react'

import Button from '~/components/Button'

import SectionDivider from '../SectionDivider'

import FormBattleDetail from './FormBattleDetail'
import FormBattleRound from './FormBattleRound'
import { useAddNewOnlineEventMutation } from '../../store/adminService'
import Loading from '~/components/Loading'

function FormCreateOnlineEvent() {
  const [form] = Form.useForm<CreateOnlineEvent>()
  const [rounds, setRounds] = useState<NewRound[]>([])
  const [thumbnail, setThumbnail] = useState<FilePreview>()

  const [addNewOnlineEvent, { isLoading }] = useAddNewOnlineEventMutation()

  const onFinish = async (values: CreateOnlineEvent) => {
    if (rounds.length < 1) {
      message.error('Please add at least one round.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description)
      formData.append('tags', values.tags)
      formData.append('maxPlayers', values.maxPlayers.toString())
      formData.append('startTime', new Date(values.startTime).toUTCString())

      if (thumbnail) {
        formData.append('thumbnail', thumbnail)
      }

      let index = 0
      rounds.forEach(round => {
        if (!round.game.id || !round.stack.id) return

        formData.append(`rounds[${index}][order]`, index.toString())
        formData.append(`rounds[${index}][gameId]`, round.game.id)
        formData.append(`rounds[${index}][stackId]`, round.stack.id)
        index++
      })

      await addNewOnlineEvent(formData)
      message.success('New online event has been added.')
      form.resetFields()
      setRounds([])
      setThumbnail(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form form={form} name="create-battle" autoComplete="off" onFinish={onFinish} className="mx-auto max-w-[80rem]">
      <div className="mb-8">
        <SectionDivider className="mb-4" title="Battle Details" />

        <FormBattleDetail thumbnail={thumbnail} setThumbnail={setThumbnail} />
      </div>

      <div className="mb-8">
        <SectionDivider title="Rounds" />

        <p className="mb-4 font-semibold text-[#2d3748] dark:text-[#a0b3c6]">
          <strong>Note:</strong> The kanjis stack you add for each round remain inaccessible to everyone until round
          start.
        </p>

        <FormBattleRound rounds={rounds} setRounds={setRounds} />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="danger">Cancel</Button>
        <Button disabled={isLoading} htmlType="submit" type="primary">
          {isLoading ? <Loading /> : 'Add new'}
        </Button>
      </div>
    </Form>
  )
}

export default FormCreateOnlineEvent
