import React, { useState } from 'react'
import { Form } from 'antd'

import Button from '~/components/Button'
import InputWrapper from './InputWrapper'
import Input from '~/components/Input'

type PropsType = {
  currentUsername: string
}

const EditUsername = ({ currentUsername }: PropsType) => {
  const [form] = Form.useForm<{ username: string }>()

  const [username, setUsername] = useState<string>(currentUsername)

  return (
    <Form form={form} name="edit-username" autoComplete="off">
      <Form.Item>
        <InputWrapper
          id="username"
          label="Username (Your own sweet profile page)"
          helper="Minimum 3 and maximum 20 characters long. Alphabets, numbers and underscore(_) allowed. Case-insensitive."
          saveButton={
            <Button
              className={`${
                (username.trim().length < 3 || username.trim() === currentUsername) && 'opacity-50'
              }`}
              type="primary"
              disabled={username.trim().length < 3 || username === currentUsername}
            >
              Set username (Edit username above to enable this button)
            </Button>
          }
        >
          <Input
            id="username"
            type="text"
            withPrefix="kanjigami/player/"
            value={username}
            autoComplete="off"
            maxLength={15}
            className="w-full"
            onChange={e => setUsername(e.target.value)}
          />
        </InputWrapper>
      </Form.Item>
    </Form>
  )
}

export default EditUsername
