import { Avatar } from 'antd'
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import CustomDivider from '~/components/CustomDivider'
import Panel from '~/components/Panel'
import Tag from '~/components/Tag'

import CountDown from './CountDown'
import AnimateButton from '~/components/AnimateButton'

type PropsType = {
  status: 'ongoing' | 'upcoming' | 'finished'
  tagName: string
  title: string
  desciption: string
  endTime: Date
  className?: string
  children: ReactNode
}

function BattleInfo({ status, tagName, title, desciption, endTime, className, children }: PropsType) {
  const navigate = useNavigate()

  return (
    <Panel className="group flex items-start justify-start gap-8">
      <div className={`flex h-full w-full basis-2/5 flex-col items-start justify-start gap-2 ${className ?? ''}`}>
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

        <div className="my-2 flex items-end justify-start gap-2 font-medium opacity-70">
          <span className="text-text-secondary-light dark:text-text-secondary-dark">Ends in</span> <CountDown />
        </div>

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

          <AnimateButton
            className="px-8"
            animate="smoke"
            type={status === 'finished' ? 'disabled' : 'primary'}
            onClick={() => navigate('/battle/1')}
          >
            Play
          </AnimateButton>
        </div>
      </div>

      <div className="row-auto grid w-full grow grid-cols-4 items-start gap-4">{children}</div>
    </Panel>
  )
}

export default BattleInfo
