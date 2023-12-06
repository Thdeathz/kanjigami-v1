import React, { ChangeEvent } from 'react'

import Image from '~/components/Image'
import Input from '~/components/Input'
import UploadButton from '~/components/UploadButton'

import FormItem from '../FormItem'

type PropsType = {
  thumbnail: FilePreview | undefined
  setThumbnail: React.Dispatch<React.SetStateAction<FilePreview | undefined>>
}

function FormBattleDetail({ thumbnail, setThumbnail }: PropsType) {
  const onChangeThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 0) return

    const file = event.target.files[0]

    const filePreview = Object.assign(file, { preview: URL.createObjectURL(file) }) as FilePreview

    setThumbnail(filePreview)
  }

  return (
    <div className="flex items-start justify-start gap-12">
      <div className=" basis-1/2">
        <Image src={thumbnail?.preview} className="max-h-[25rem] w-full rounded-md object-cover" />
      </div>

      <div className="basis-1/2">
        <FormItem rules={[{ required: true, message: 'Event title is required.' }]} name="title" label="Title">
          <Input id="title" className="w-full" placeholder="An awesome battle" />
        </FormItem>

        <FormItem
          rules={[{ required: true, message: 'Description is required.' }]}
          name="description"
          label="Description"
        >
          <Input id="description" className="w-full" />
        </FormItem>

        <div className="flex-center gap-4">
          <FormItem
            rules={[{ required: true, message: 'Requires at least one tag.' }]}
            name="tags"
            label="Tag"
            className="basis-1/2"
          >
            <Input id="tags" className="w-full" />
          </FormItem>

          <FormItem
            rules={[{ required: true, message: 'Max player is required.' }]}
            name="maxPlayers"
            label="Max player"
            className="basis-1/2"
          >
            <Input type="number" id="maxPlayers" className="w-full" />
          </FormItem>
        </div>
        <div className="flex items-start justify-start gap-4">
          <FormItem name="thumbnail" label="Thumbnail">
            <UploadButton id="thumbnail" isFileExist={false} onChange={onChangeThumbnail} />
          </FormItem>

          <FormItem
            rules={[{ required: true, message: 'Start time is required.' }]}
            name="startTime"
            label="Start time"
            className="grow"
          >
            <Input type="datetime-local" id="startTime" className="w-full" />
          </FormItem>
        </div>
      </div>
    </div>
  )
}

export default FormBattleDetail
