import React from 'react'
import { FaCrown } from 'react-icons/fa'

import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'

type PropsType = {
  avatar?: string
  username: string
  points: number
  currentUserPoint?: number
}

function RoundHightScore({ avatar, username, points, currentUserPoint }: PropsType) {
  return (
    <>
      <Avatar src={avatar} username={username} />

      <div className="flex-center gap-1 text-base font-semibold leading-3">
        <IconWrapper icon={<FaCrown />} className="text-ranking-1-crown" /> {username}
      </div>

      <p>{points}</p>

      <div className="w-full rounded-md bg-button-light py-1.5 text-center text-sm font-medium text-button-light-text dark:bg-button-dark dark:text-button-dark-text">
        You <span className="px-1">-</span> {currentUserPoint ?? `Not played`}
      </div>
    </>
  )
}

export default RoundHightScore
