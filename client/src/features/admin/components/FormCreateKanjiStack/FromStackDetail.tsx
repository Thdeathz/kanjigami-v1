import { Form } from 'antd'
import React, { ChangeEvent } from 'react'

import Image from '~/components/Image'
import Input from '~/components/Input'
import UploadButton from '~/components/UploadButton'
import InputWrapper from '~/features/user/components/EditProfile/InputWrapper'
import FormItem from '../FormItem'

type PropsType = {
  thumbnail: FilePreview | undefined
  setThumbnail: React.Dispatch<React.SetStateAction<FilePreview | undefined>>
}

function FromStackDetail({ thumbnail, setThumbnail }: PropsType) {
  const onChangeThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 0) return

    const file = event.target.files[0]

    const filePreview = Object.assign(file, { preview: URL.createObjectURL(file) }) as FilePreview

    setThumbnail(filePreview)
  }

  return (
    <div className="flex items-start justify-start gap-12">
      <div className="basis-1/2">
        <Image src={thumbnail?.preview} className="max-h-[25rem] w-full rounded-md object-cover" />
      </div>

      <div className="basis-1/2">
        <FormItem rules={[{ required: true, message: 'Stack title is required.' }]} name="title" label="Title">
          <Input id="title" className="w-full" placeholder="An awesome stack" />
        </FormItem>

        <FormItem
          rules={[{ required: true, message: 'Description is required.' }]}
          name="description"
          label="Description"
        >
          <Input id="description" className="w-full" />
        </FormItem>

        <FormItem rules={[{ required: true, message: 'Topic is required.' }]} name="topic" label="Topic">
          <Input id="topic" className="w-full" />
        </FormItem>

        <FormItem name="thumbnail" label="Thumbnail" className="w-min whitespace-nowrap">
          <UploadButton id="thumbnail" isFileExist={false} onChange={onChangeThumbnail} />
        </FormItem>
      </div>
    </div>
  )
}

export default FromStackDetail
