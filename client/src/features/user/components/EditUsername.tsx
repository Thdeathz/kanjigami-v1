import React, { useState } from 'react'

import Button from '~/components/Button'
import InputWrapper from './InputWrapper'
import Input from '~/components/Input'

const EditUsername = () => {
  const [username, setUsername] = useState<string>('')

  return (
    <InputWrapper
      id="username"
      label="Username (Your own sweet profile page)"
      helper="Minimum 3 and maximum 20 characters long. Alphabets, numbers and underscore(_) allowed. Case-insensitive."
      saveButton={
        <Button
          className={`${username.trim().length === 0 && 'opacity-50'}`}
          type="primary"
          disabled={username.trim().length === 0}
        >
          Set username (Enter username above to enable this button)
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
  )
}

export default EditUsername
