import React from 'react'
import { Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'

import Tag from '../../../components/Tag'
import Button from '../../../components/Button'
import CustomDivider from '~/components/CustomDivider'

type PropsType = {
  status: 'ongoing' | 'upcoming' | 'finished'
  tagName: string
  title: string
  desciption: string
  endTime: Date
  className?: string
}

const BattleInfo = ({ status, tagName, title, desciption, endTime, className }: PropsType) => {
  const navigate = useNavigate()

  return (
    <div className={`flex w-full flex-col items-start justify-start gap-2 ${className ?? ''}`}>
      <div className="flex items-center justify-start gap-2">
        <Tag type={status} />

        <Tag
          type="custom"
          title={tagName}
          className="bg-clr-border-1-light shadow dark:bg-button-dark dark:text-button-dark-text"
        />
      </div>

      <p className="my-2 text-xl font-semibold">{title}</p>

      <p className="font-medium">{desciption}</p>

      <CustomDivider className="my-2" />

      <p className="my-2 font-semibold opacity-70">
        Ends in <span className="">{endTime.getDate()}d</span> : <span>{endTime.getHours()}h</span>{' '}
        : <span>{endTime.getMinutes()}m</span> : <span>{endTime.getSeconds()}s</span>
      </p>

      <div className="flex items-center justify-start gap-2">
        {status !== 'upcoming' && (
          <Button className="flex items-center justify-start gap-1">
            <p>Leaders</p>
            <Avatar.Group>
              <Avatar
                size="small"
                src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/default-avatar.jpg?alt=media&token=aeabe6fd-0a4f-4eaa-805b-f27d7b6b6ef3"
              />
              <Avatar
                size="small"
                src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/default-avatar.jpg?alt=media&token=aeabe6fd-0a4f-4eaa-805b-f27d7b6b6ef3"
              />
              <Avatar
                size="small"
                src="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/default-avatar.jpg?alt=media&token=aeabe6fd-0a4f-4eaa-805b-f27d7b6b6ef3"
              />
            </Avatar.Group>
          </Button>
        )}

        <Button
          className="px-8"
          type={status === 'finished' ? 'disabled' : 'primary'}
          onClick={() => navigate('/battle/1')}
        >
          Play
        </Button>
      </div>
    </div>
  )
}

export default BattleInfo