import { Form } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import FormItem from '../FormItem'
import UploadButton from '~/components/UploadButton'
import Input from '~/components/Input'
import SectionDivider from '../SectionDivider'
import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import { AiOutlinePlusCircle } from 'react-icons/ai'

type PropsType = {
  kanjis: CreateKanji[]
  setKanjis: React.Dispatch<React.SetStateAction<CreateKanji[]>>
}

const NewKanjiItem = ({ kanjis, setKanjis }: PropsType) => {
  const [form] = Form.useForm()

  const [thumbnail, setThumbnail] = useState<FilePreview>()

  const onFinish = (values: any) => {
    setKanjis(prev => [
      ...prev,
      {
        kanji: values.kanji,
        kunyomi: values.kunyomi,
        onyomi: values.onyomi,
        image: thumbnail,
        vocabulary: {
          yomikata: values.yomikata,
          meaning: values.meaning,
          example: {
            example: values.example,
            meaning: values.exampleMean
          }
        }
      } as CreateKanji
    ])

    form.resetFields()
    setThumbnail(undefined)
  }

  const onChangeThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 0) return

    const file = event.target.files[0]

    const filePreview = Object.assign(file, { preview: URL.createObjectURL(file) }) as FilePreview

    setThumbnail(filePreview)
  }

  return (
    <Form form={form} onFinish={onFinish} name="add-round-form" autoComplete="off">
      <FormItem name="thumbnail" label="Thumbnail" className="w-min whitespace-nowrap">
        <div className="flex-center gap-2">
          {thumbnail && (
            <Button type="primary" disabled>
              {thumbnail.name.slice(0, 10)}....{thumbnail.name.slice(-5)}
            </Button>
          )}

          <UploadButton id="thumbnail" isFileExist={false} onChange={onChangeThumbnail} />
        </div>
      </FormItem>

      <FormItem rules={[{ required: true, message: 'kanji is required.' }]} name="kanji" label="Kanji">
        <Input id="kanji" className="w-full" />
      </FormItem>

      <div className="flex-center w-full gap-4">
        <FormItem
          className="basis-1/2"
          rules={[{ required: true, message: 'kunyomi is required.' }]}
          name="kunyomi"
          label="Kunyomi"
        >
          <Input id="kunyomi" className="w-full" />
        </FormItem>

        <FormItem
          className="basis-1/2"
          rules={[{ required: true, message: 'onyomi is required.' }]}
          name="onyomi"
          label="Onyomi"
        >
          <Input id="onyomi" className="w-full" />
        </FormItem>
      </div>

      <FormItem rules={[{ required: true, message: 'yomikata is required.' }]} name="yomikata" label="Yomikata">
        <Input id="yomikata" className="w-full" />
      </FormItem>

      <FormItem rules={[{ required: true, message: 'meaning is required.' }]} name="meaning" label="Meaning">
        <Input id="meaning" className="w-full" />
      </FormItem>

      <SectionDivider title="Examples" />

      <FormItem rules={[{ required: true, message: 'example is required.' }]} name="example" label="Example">
        <Input id="example" className="w-full" />
      </FormItem>

      <FormItem
        rules={[{ required: true, message: 'exampleMean is required.' }]}
        name="exampleMean"
        label="ExampleMean"
      >
        <Input id="exampleMean" className="w-full" />
      </FormItem>

      <Button htmlType="submit" className="flex-center float-right aspect-square">
        <IconWrapper icon={<AiOutlinePlusCircle />} className="text-xl" />
      </Button>
    </Form>
  )
}

export default NewKanjiItem
