import { Form, message } from 'antd'
import React, { useState } from 'react'
import SectionDivider from '../SectionDivider'
import FromStackDetail from './FromStackDetail'
import FormKanji from './FormKanji'
import Button from '~/components/Button'
import { useAddNewKanjiStackMutation } from '../../store/adminService'
import Loading from '~/components/Loading'

const FormCreateKanjiStack = () => {
  const [form] = Form.useForm<CreateStackRequest>()
  const [kanjis, setKanjis] = useState<CreateKanji[]>([])
  const [thumbnail, setThumbnail] = useState<FilePreview>()

  const [addNewKanjiStack, { isLoading }] = useAddNewKanjiStackMutation()

  const onFinish = async (values: CreateStackRequest) => {
    if (!thumbnail) return message.error('Please add thumbnail.')
    if (kanjis.length < 1) {
      message.error('Please add at least one kanji.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', values.title)
      formData.append('description', values.description)
      formData.append('topic', values.topic)

      let imageIndex = 0
      formData.append(`images`, thumbnail)

      kanjis.map((kanji, index) => {
        if (!kanji) return
        imageIndex++
        formData.append(`images`, kanji.image)

        formData.append(`kanjis[${index}][kanji]`, kanji.kanji)
        formData.append(`kanjis[${index}][onyomi]`, kanji.onyomi)
        formData.append(`kanjis[${index}][kunyomi]`, kanji.kunyomi)
        formData.append(`kanjis[${index}][kakikata]`, kanji.onyomi)
        formData.append(`kanjis[${index}][vocabularies][yomikata]`, kanji.vocabulary.yomikata)
        formData.append(`kanjis[${index}][vocabularies][meaning]`, kanji.vocabulary.meaning)
        formData.append(`kanjis[${index}][vocabularies][example][example]`, kanji.vocabulary.example.example)
        formData.append(`kanjis[${index}][vocabularies][example][meaning]`, kanji.vocabulary.example.meaning)
      })

      await addNewKanjiStack(formData)
      message.success('New kanji stack has been added.')
      form.resetFields()
      setKanjis([])
      setThumbnail(undefined)
    } catch (error) {
      console.error(error)
    }

    console.log('==> detail', values)
    console.log('==> kanjis', kanjis)
    console.log('==> thumbnail', thumbnail)
    // const
  }

  return (
    <div className="mx-auto max-w-[80rem]">
      <div className="mb-8">
        <SectionDivider title="Stack Details" />
        <Form form={form} onFinish={onFinish} name="create-stack" autoComplete="off">
          <FromStackDetail thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </Form>
      </div>

      <div className="mb-8">
        <SectionDivider title="Kanjis" />

        <FormKanji kanjis={kanjis} setKanjis={setKanjis} />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="danger">Cancel</Button>
        <Button type="primary" onClick={() => form.submit()}>
          {isLoading ? <Loading /> : ' Add new'}
        </Button>
      </div>
    </div>
  )
}

export default FormCreateKanjiStack
