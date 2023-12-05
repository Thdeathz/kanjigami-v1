import classNames from 'classnames'
import React from 'react'
import { FaCrown } from 'react-icons/fa'

import LockedIcon from '~/assets/lock-icon.svg'
import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import { onlineBattleStatus } from '~/config/status'

import CountDown from './CountDown'

type PropsType = {
  round: IBattleRound
  startTime?: Date
  className?: string
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

function OnlineCard({ round, startTime, className }: PropsType) {
  const onlineCardClassName = getOnlineCardClassName(round.status, className)

  const isLocked = round.status === onlineBattleStatus.UPCOMING

  return (
    <div className={onlineCardClassName}>
      <div className="w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
        <div
          className={`relative aspect-ratio rounded-lg transition-transform ${
            isLocked && 'flex-center bg-game-locked'
          }`}
        >
          {!isLocked ? (
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
        {!isLocked && round.onlineHistory ? (
          <>
            <Avatar src={round.onlineHistory[0].user.avatarUrl} username={round.onlineHistory[0].user.username} />

            <div className="flex-center gap-1 text-base font-semibold leading-3">
              <IconWrapper icon={<FaCrown />} className="text-ranking-1-crown" /> {round.onlineHistory[0].user.username}
            </div>

            <p>{round.onlineHistory[0].archievedPoints}</p>

            <div className="w-full rounded-md bg-button-light py-1.5 text-center text-sm font-medium text-button-light-text dark:bg-button-dark dark:text-button-dark-text">
              You - Not played
            </div>
          </>
        ) : (
          <div>
            <p className="mb-4 text-center font-medium text-footer-light-text">Unlock in</p>

            {round.status === onlineBattleStatus.UPCOMING && startTime && (
              <CountDown type="animate" maxLength={2} endTime={startTime} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OnlineCard
