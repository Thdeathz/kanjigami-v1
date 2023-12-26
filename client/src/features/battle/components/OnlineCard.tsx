import classNames from 'classnames'
import React from 'react'

import LockedIcon from '~/assets/lock-icon.svg'
import Image from '~/components/Image'
import { onlineBattleStatus } from '~/config/status'

import CountDown from './CountDown'
import RoundHightScore from './RoundHightScore'

type PropsType = {
  round: IBattleRound
  className?: string
  onClick?: () => void
}

function getOnlineCardClassName(status: OnlineBattleStatus, className?: string) {
  return classNames(
    'card-item flex-center z-10 h-full cursor-pointer flex-col rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-card hover:translate-y-[-10px] hover:scale-105 hover:opacity-100 dark:from-card-dark-start dark:to-card-dark-end dark:shadow-dark-panel',
    {
      'pointer-events-auto': status !== onlineBattleStatus.UPCOMING,
      'pointer-events-none': status === onlineBattleStatus.UPCOMING
    },
    className
  )
}

function OnlineCard({ round, className, onClick }: PropsType) {
  const onlineCardClassName = getOnlineCardClassName(round.status, className)

  const isUpcoming = round.status === onlineBattleStatus.UPCOMING
  const isOnGoing = round.status === onlineBattleStatus.ONGOING
  const isFinished = round.status === onlineBattleStatus.FINISHED

  return (
    <div className={onlineCardClassName} onClick={onClick}>
      <div className="w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
        <div
          className={`relative aspect-ratio rounded-lg transition-transform ${
            isUpcoming && 'flex-center bg-game-locked'
          }`}
        >
          {!isUpcoming ? (
            <>
              <Image
                src={round.stack.thumbnail}
                alt="round-stack"
                className="pointer-events-none max-w-full rounded-lg object-cover"
              />

              <p className="absolute right-2 top-2 z-10 rounded bg-neutral-13 px-1.5 py-0.5 text-sm text-white">
                {round.game.name}
              </p>
            </>
          ) : (
            <Image src={LockedIcon} alt="locked-icon" className="w-[2.5rem]" />
          )}
        </div>
      </div>

      <div className="flex-center my-2 w-full shrink grow flex-col gap-2">
        {isUpcoming && (
          <div>
            <p className="mb-4 text-center font-medium text-footer-light-text">Unlock in</p>

            <CountDown type="animate" maxLength={2} endTime={round.startTime} />
          </div>
        )}

        {isOnGoing && (
          <div>
            <p className="mb-4 text-center font-medium text-footer-light-text">End in</p>

            <CountDown
              type="animate"
              maxLength={2}
              endTime={new Date(new Date(round.startTime).getTime() + 1 * 60 * 1000)}
            />
          </div>
        )}

        {isFinished && round.topUser && (
          <RoundHightScore
            avatar={round.topUser.avatarUrl}
            username={round.topUser.username}
            points={round.topUser.totalPoints}
            currentUserPoint={round.currentUserPoint}
          />
        )}
      </div>
    </div>
  )
}

export default OnlineCard
