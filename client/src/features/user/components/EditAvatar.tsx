import React, { ChangeEvent, useState } from 'react'
import { BsFileEarmarkImageFill } from 'react-icons/bs'

import InputWrapper from './InputWrapper'
import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'
import Button from '~/components/Button'
import { useUpdateAvatarMutation } from '../store/userService'
import { message } from 'antd'
import Loading from '~/components/Loading'

type PropsType = {
  userId: string
  username: string
  currentAvatar?: string
}

const EditAvatar = ({ userId, username, currentAvatar }: PropsType) => {
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

            <div className="group relative rounded-full border border-input-border-light bg-input-light px-6 py-2 text-sm font-medium transition-all hover:translate-y-[-3px] active:scale-95 dark:border-input-border-dark dark:bg-input-dark">
              <div className="flex-center gap-2">
                <IconWrapper
                  icon={<BsFileEarmarkImageFill />}
                  className="transition-colors group-hover:text-clr-link-light dark:group-hover:text-clr-link-dark"
                />

                <span className="">{avatar ? 'Select other image' : 'Select image'}</span>
              </div>

              <input
                type="file"
                className="absolute right-0 top-0 h-full w-full cursor-pointer opacity-0"
                accept=".png,.jpg,.jpeg"
                onChange={onChangeAvatar}
              />
            </div>
          </div>
        )}
      </div>
    </InputWrapper>
  )
}

export default EditAvatar
