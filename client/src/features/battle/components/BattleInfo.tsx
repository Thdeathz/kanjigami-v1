import { Avatar } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import DefaultAvatar from '~/assets/default-avatar.jpg'

import AnimateButton from '~/components/AnimateButton'
import Button from '~/components/Button'
import CustomDivider from '~/components/CustomDivider'
import OnlineRound from '~/components/OnlineRound'
import Panel from '~/components/Panel'
import Tag from '~/components/Tag'
import { onlineBattleStatus } from '~/config/status'

import CountDown from './CountDown'

type PropsType = {
  status: OnlineBattleStatus
  battle: IOnlineBattle
  className?: string
}

function getCountDownTitle(status: OnlineBattleStatus) {
  switch (status) {
    case onlineBattleStatus.UPCOMING:
      return 'Starts in'
    case onlineBattleStatus.ONGOING:
      return 'Ends in'
    case onlineBattleStatus.FINISHED:
      return 'Ended'
  }
}

function BattleInfo({ status, battle, className }: PropsType) {
  const navigate = useNavigate()

  const countDownTitle = getCountDownTitle(status)

  const handleNavigateToDetail = () => {
    navigate(`/battle/${battle.id}`)
  }

  return (
    <Panel className="group flex items-start justify-start gap-12">
      <div className={`flex h-full w-full basis-2/5 flex-col items-start justify-start gap-2 ${className ?? ''}`}>
        <div className="flex items-center justify-start gap-2">
          <Tag type={status} />

          <Tag
            type="custom"
            title={battle.tags}
            className="bg-clr-border-1-light shadow dark:bg-button-dark dark:text-button-dark-text"
          />
        </div>

        <p className="my-2 text-xl font-semibold text-text-heading-light dark:text-text-heading-dark">{battle.title}</p>

        <p className="font-medium">{battle.description}</p>

        <CustomDivider className="my-2" />

        <div className="my-2 flex items-end justify-start gap-2 font-medium opacity-70">
          <span className="text-text-secondary-light dark:text-text-secondary-dark">{countDownTitle}</span>{' '}
          {status === onlineBattleStatus.UPCOMING && <CountDown endTime={battle.startTime} />}
        </div>

        <div className="flex items-center justify-start gap-2">
          {battle.leaderboards && (
            <Button className="flex items-center justify-start gap-1" onClick={handleNavigateToDetail}>
              <p>Leaders</p>

              <Avatar.Group>
                {battle.leaderboards.map(leader => (
                  <Avatar key={`leader-${leader.id}`} size="small" src={leader.avatarUrl ?? DefaultAvatar} />
                ))}
              </Avatar.Group>
            </Button>
          )}

          {status !== onlineBattleStatus.FINISHED && (
            <AnimateButton className="px-8" animate="smoke" type="primary" onClick={handleNavigateToDetail}>
              Play
            </AnimateButton>
          )}
        </div>
      </div>

      <div className="row-auto grid w-full grow grid-cols-4 items-start gap-4">
        {battle.rounds.map(round => (
          <OnlineRound
            key={`online-round-${round.id}`}
            status={round.status}
            imageSrc={round.stack.thumbnail}
            stack={round.game.name}
          />
        ))}
      </div>
    </Panel>
  )
}

export default BattleInfo
