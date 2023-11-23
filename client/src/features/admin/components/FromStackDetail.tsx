import { Form } from 'antd'
import React from 'react'

import Image from '~/components/Image'
import Input from '~/components/Input'
import UploadButton from '~/components/UploadButton'
import InputWrapper from '~/features/user/components/InputWrapper'

const FromStackDetail = () => {
  return (
    <div className="flex items-start justify-start gap-12">
      <div className="basis-1/2">
        <Image className="h-full w-full rounded-md object-contain" />
      </div>

      <div className="basis-1/2">
        <Form.Item>
          <InputWrapper id="title" label="Title">
            <Input id="title" className="w-full" placeholder="An awesome stack" />
          </InputWrapper>
        </Form.Item>

        <Form.Item>
          <InputWrapper id="description" label="Description">
            <Input id="description" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <Form.Item>
          <InputWrapper id="topic" label="Topic">
            <Input id="topic" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <Form.Item>
          <InputWrapper id="thumbnail" label="Thumbnail">
            <UploadButton id="thumbnail" isFileExist={false} />
          </InputWrapper>
        </Form.Item>
      </div>
    </div>
  )
}

export default FromStackDetail
