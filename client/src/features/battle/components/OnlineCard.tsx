import classNames from 'classnames'
import React from 'react'
import { FaCrown } from 'react-icons/fa'

import LockedIcon from '~/assets/lock-icon.svg'
import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'

import CountDown from './CountDown'

type PropsType = {
  imageSrc?: string
  topUsername?: string
  topScore?: number
  stack?: string
  className?: string
}

function getOnlineCardClassName(stack: boolean, className?: string) {
  return classNames(
    'card-item flex-center z-10 h-full cursor-pointer flex-col rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-card hover:translate-y-[-10px] hover:scale-105 hover:opacity-100 dark:from-card-dark-start dark:to-card-dark-end dark:shadow-dark-panel',
    {
      'pointer-events-auto': stack,
      'pointer-events-none': !stack
    },
    className
  )
}

function OnlineCard({ imageSrc, topUsername, topScore, stack, className }: PropsType) {
  const onlineCardClassName = getOnlineCardClassName(!!stack, className)

  return (
    <div className={onlineCardClassName}>
      <div className="w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
        <div
          className={`relative aspect-ratio rounded-lg transition-transform ${!stack && 'flex-center bg-game-locked'}`}
        >
          {stack ? (
            <>
              <Image
                src={imageSrc}
                alt="round-game"
                className="pointer-events-none max-w-full rounded-lg object-cover"
              />

              <p className="absolute right-2 top-2 z-10 rounded bg-neutral-13 px-1.5 py-0.5 text-sm text-white">
                {stack}
              </p>
            </>
          ) : (
            <Image src={LockedIcon} alt="locked-icon" className="w-[2.5rem]" />
          )}
        </div>
      </div>

      <div className="flex-center my-2 w-full shrink grow flex-col gap-2">
        {stack ? (
          <>
            <Avatar />

            <div className="flex-center gap-1 text-base font-semibold leading-3">
              <IconWrapper icon={<FaCrown />} className="text-ranking-1-crown" /> {topUsername}
            </div>

            <p>{topScore} (34s)</p>

            <div className="w-full rounded-md bg-button-light py-1.5 text-center text-sm font-medium text-button-light-text dark:bg-button-dark dark:text-button-dark-text">
              You - Not played
            </div>
          </>
        ) : (
          <div>
            <p className="mb-4 text-center font-medium text-footer-light-text">Unlock in</p>

            <CountDown type="animate" maxLength={2} />
          </div>
        )}
      </div>
    </div>
  )
}

export default OnlineCard
