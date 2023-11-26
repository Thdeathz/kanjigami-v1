import { message } from 'antd'
import React, { ChangeEvent, useState } from 'react'

import Avatar from '~/components/Avatar'
import Button from '~/components/Button'
import Loading from '~/components/Loading'
import UploadButton from '~/components/UploadButton'

import { useUpdateAvatarMutation } from '../store/userService'

import InputWrapper from './InputWrapper'

type PropsType = {
  userId: string
  username: string
  currentAvatar?: string
}

function EditAvatar({ userId, username, currentAvatar }: PropsType) {
  const [uploadAvatar, { isLoading }] = useUpdateAvatarMutation()

  const [avatar, setAvatar] = useState<FilePreview | null>(null)

  const onChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length < 0) return

    const file = event.target.files[0]

    const filePreview = Object.assign(file, { preview: URL.createObjectURL(file) }) as FilePreview

    setAvatar(filePreview)
  }

  const onSubmit = async () => {
    if (!avatar) return

    try {
      const formData = new FormData()
      formData.append('avatar', avatar)
      await uploadAvatar({ userId, avatar: formData }).unwrap()
      message.success('Avatar updated successfully.')
      setAvatar(null)
    } catch (error) {
      message.error('Something went wrong. Please try again later.')
    }
  }

  return (
    <InputWrapper
      id="avatar"
      label="Picture profile"
      helper="Image file (png or jpeg) should be less than 1mb. Preferably a square image of at least 150px dimension."
    >
      <div className="flex-center gap-4">
        <Avatar size="large" src={avatar?.preview ?? currentAvatar} username={username} />

        {isLoading ? (
          <Loading className="ml-4 text-3xl" />
        ) : (
          <div className="flex-center gap-2">
            {avatar && (
              <>
                <Button htmlType="button" type="primary" onClick={onSubmit}>
                  Upload & save
                </Button>

                <span>or</span>
              </>
            )}

            <UploadButton isFileExist={!!avatar} onChange={onChangeAvatar} />
          </div>
        )}
      </div>
    </InputWrapper>
  )
}

export default EditAvatar
