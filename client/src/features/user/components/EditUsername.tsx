import React, { useState } from 'react'

import Button from '~/components/Button'
import InputWrapper from './InputWrapper'

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
      <div className="flex w-full items-center justify-start gap-2 rounded-full border border-input-border-light bg-input-light pl-4 font-medium dark:border-input-border-dark dark:bg-input-dark">
        <div>kanjigami/player/</div>

        <input
          type="text"
          id="username"
          value={username}
          autoComplete="off"
          maxLength={15}
          className="w-full rounded-e-full border-l border-input-border-light px-2 py-3 pr-4 dark:border-input-border-dark"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
    </InputWrapper>
  )
}

export default EditUsername
