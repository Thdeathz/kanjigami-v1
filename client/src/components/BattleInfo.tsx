import React from 'react'
import { Avatar, Divider } from 'antd'

import Tag from './Tag'
import Button from './Button'

type PropsType = {
  status: 'ongoing' | 'upcoming' | 'finished'
  tagName: string
  title: string
  desciption: string
  endTime: Date
  className?: string
}

const BattleInfo = ({ status, tagName, title, desciption, endTime, className }: PropsType) => {
  return (
    <div className={`flex w-full flex-col items-start justify-start gap-2 ${className}`}>
      <div className="flex items-center justify-start gap-2">
        <Tag title={status.toUpperCase()} className="bg-polar-green-3 dark:text-text-light" />

        <Tag
          title={tagName}
          className="bg-clr-border-1-light shadow dark:bg-button-dark dark:text-button-dark-text"
        />
      </div>

      <p className="my-2 text-2xl font-semibold">{title}</p>

      <p className="text-base font-medium">{desciption}</p>

      <Divider className="my-2" />

      <p className="my-2 text-base font-semibold opacity-70">
        Ends in <span className="">{endTime.getDate()}d</span> : <span>{endTime.getHours()}h</span>{' '}
        : <span>{endTime.getMinutes()}m</span> : <span>{endTime.getSeconds()}s</span>
      </p>

      <div className="flex items-center justify-start gap-2">
        <Button className="flex items-center justify-start gap-2">
          <p>Leaders</p>
          <Avatar.Group>
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/default-avatar.jpg?alt=media&token=aeabe6fd-0a4f-4eaa-805b-f27d7b6b6ef3" />
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/default-avatar.jpg?alt=media&token=aeabe6fd-0a4f-4eaa-805b-f27d7b6b6ef3" />
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/default-avatar.jpg?alt=media&token=aeabe6fd-0a4f-4eaa-805b-f27d7b6b6ef3" />
          </Avatar.Group>
        </Button>

        <Button className="px-8" type="primary">
          Play
        </Button>
      </div>
    </div>
  )
}

export default BattleInfo
