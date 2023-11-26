import { Form } from 'antd'
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Input from '~/components/Input'
import Panel from '~/components/Panel'
import UploadButton from '~/components/UploadButton'
import InputWrapper from '~/features/user/components/InputWrapper'

import SectionDivider from './SectionDivider'

function FormKanji() {
  return (
    <div className="flex items-start justify-start gap-12">
      <Panel className="basis-1/2">
        <div className="grid grid-cols-6 gap-4">
          {Array.from(Array(10).keys()).map(each => (
            <Button key={`kanji-item-${each}`}>家族</Button>
          ))}
        </div>
      </Panel>

      <div className="basis-1/2">
        <Form.Item>
          <InputWrapper id="image" label="Image">
            <UploadButton id="image" isFileExist={false} />
          </InputWrapper>
        </Form.Item>

        <Form.Item>
          <InputWrapper id="kanji" label="Kanji">
            <Input id="kanji" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <div className="flex-center w-full gap-4">
          <Form.Item className="basis-1/2">
            <InputWrapper id="kunyomi" label="Kunyomi">
              <Input id="kunyomi" />
            </InputWrapper>
          </Form.Item>

          <Form.Item className="basis-1/2">
            <InputWrapper id="onyomi" label="Onyomi">
              <Input id="onyomi" />
            </InputWrapper>
          </Form.Item>
        </div>

        <Form.Item>
          <InputWrapper id="yomikata" label="Yomikata">
            <Input id="yomikata" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <Form.Item>
          <InputWrapper id="meaning" label="Meaning">
            <Input id="meaning" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <SectionDivider title="Examples" />

        <Form.Item>
          <InputWrapper id="example" label="Example">
            <Input id="example" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <Form.Item>
          <InputWrapper id="meaning" label="Meaning">
            <Input id="meaning" className="w-full" />
          </InputWrapper>
        </Form.Item>

        <Button className="flex-center float-right aspect-square">
          <IconWrapper icon={<AiOutlinePlusCircle />} className="text-xl" />
        </Button>
      </div>
    </div>
  )
}

export default FormKanji
