import { Form } from 'antd'
import React from 'react'
import Image from '~/components/Image'
import Input from '~/components/Input'
import UploadButton from '~/components/UploadButton'
import InputWrapper from '~/features/user/components/InputWrapper'

const FormBattleDetail = () => {
  return (
    <div className="flex items-start justify-start gap-12">
      <div className="basis-1/2">
        <Image className="h-full w-full rounded-md object-contain" />
      </div>

      <div className="basis-1/2">
        <Form.Item>
          <InputWrapper id="title" label="Title">
            <Input id="title" className="w-full" placeholder="An awesome battle" />
          </InputWrapper>
        </Form.Item>

        <Form.Item>
          <InputWrapper id="description" label="Description">
            <Input id="description" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <div className="flex-center gap-4">
          <Form.Item className="basis-1/2">
            <InputWrapper id="tag" label="Tag">
              <Input id="tag" className="w-full" />
            </InputWrapper>
          </Form.Item>

          <Form.Item className="basis-1/2">
            <InputWrapper id="maxPlayer" label="Max player">
              <Input type="number" id="maxPlayer" className="w-full" />
            </InputWrapper>
          </Form.Item>
        </div>

        <div className="flex items-start justify-start gap-4">
          <Form.Item>
            <InputWrapper id="thumbnail" label="Thumbnail">
              <UploadButton id="thumbnail" isFileExist={false} />
            </InputWrapper>
          </Form.Item>

          <Form.Item className="grow">
            <InputWrapper id="startTime" label="Start time">
              <Input type="date" id="startTime" className="w-full" />
            </InputWrapper>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default FormBattleDetail
