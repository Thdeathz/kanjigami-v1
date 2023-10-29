import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Popover, message } from 'antd'
import { IoMdArrowDropdown } from 'react-icons/io'

import Button from '~/components/Button'
import DefaultAvatar from '~/assets/default-avatar.jpg'
import IconWrapper from '~/components/IconWrapper'
import useAuth from '~/hooks/useAuth'
import { useSendLogoutMutation } from '~/features/auth/store/authService'
import Image from '~/components/Image'

const UserButton = () => {
  const navigate = useNavigate()
  const { email } = useAuth()

  const [sendLogout] = useSendLogoutMutation()

  const onLogout = async () => {
    try {
      await sendLogout(undefined)
      message.success('Logout successfully!')
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Popover
      placement="bottomRight"
      overlayClassName="bg-drop-down-light dark:bg-drop-down-dark rounded-lg"
      trigger="click"
      color="transparent"
      arrow={false}
      content={
        <div className="flex min-w-[10vw] flex-col items-start justify-start gap-2 p-1 text-base font-medium text-clr-link-light dark:text-clr-link-dark">
          <p
            className="cursor-pointer transition-all hover:underline"
            onClick={() => navigate(`/player/${email.split('@')[0]}`)}
          >
            View Profile
          </p>
          <p
            className="cursor-pointer transition-all hover:underline"
            onClick={() => navigate('/me')}
          >
            My Analytics
          </p>
          <p className="cursor-pointer transition-all hover:underline" onClick={onLogout}>
            Logout
          </p>
        </div>
      }
    >
      <div>
        <Button className="flex-center gap-1.5">
          <Image
            src={DefaultAvatar}
            alt="default-avatar"
            className="aspect-square h-7 rounded-full object-contain"
          />
          <p>Kantan kanji</p>
          <IconWrapper icon={<IoMdArrowDropdown />} />
        </Button>
      </div>
    </Popover>
  )
}

export default UserButton
