import { Popover, message } from 'antd'
import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

import DefaultAvatar from '~/assets/default-avatar.jpg'
import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import { useSendLogoutMutation } from '~/features/auth/store/authService'
import useAuth from '~/hooks/useAuth'

function UserButton() {
  const navigate = useNavigate()
  const { email, username, avatarUrl } = useAuth()

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
          <button
            type="button"
            className="cursor-pointer transition-all hover:underline"
            onClick={() => navigate(`/player/${email.split('@')[0]}`)}
          >
            View Profile
          </button>
          <button
            type="button"
            className="cursor-pointer transition-all hover:underline"
            onClick={() => navigate('/me')}
          >
            My Analytics
          </button>
          <button type="button" className="cursor-pointer transition-all hover:underline" onClick={onLogout}>
            Logout
          </button>
        </div>
      }
    >
      <div>
        <Button className="flex-center gap-1.5">
          <Image
            src={avatarUrl ?? DefaultAvatar}
            alt="default-avatar"
            className="aspect-square h-7 rounded-full object-cover"
          />
          <p>{username}</p>
          <IconWrapper icon={<IoMdArrowDropdown />} />
        </Button>
      </div>
    </Popover>
  )
}

export default UserButton
