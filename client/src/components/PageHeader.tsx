import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons/lib'

import { onlineBattleStatus } from '~/config/status'

import IconWrapper from './IconWrapper'

type PropsType = {
  icon?: ReactElement<IconType>
  title: string
  subtitle?: string
  showLights?: OnlineBattleStatus
  tags?: ReactNode
  className?: string
  children?: ReactNode
}

type BattleTitleWithLightsProps = {
  status: OnlineBattleStatus
  children: ReactNode
}

function getLightsClassName(status: OnlineBattleStatus) {
  return classNames('battle-lights-container', {
    'battle-lights-container--upcoming': status === onlineBattleStatus.UPCOMING,
    'battle-lights-container--ongoing': status === onlineBattleStatus.ONGOING,
    'battle-lights-container--finished': status === onlineBattleStatus.FINISHED
  })
}

function BattleTitleWithLights({ status, children }: BattleTitleWithLightsProps) {
  const lightsClassName = getLightsClassName(status)

  return (
    <div className={lightsClassName}>
      <div className="battle-lights  battle-lights--left  battle-lights--1" />
      <div className="battle-lights  battle-lights--left  battle-lights--2" />

      {children}

      <div className="battle-lights  battle-lights--right  battle-lights--1" />
      <div className="battle-lights  battle-lights--right  battle-lights--2" />
    </div>
  )
}

function PageHeader({ icon, title, subtitle, showLights, tags, className, children }: PropsType) {
  return (
    <div className={`flex-center mx-auto my-4 max-w-[25rem] flex-col gap-4 text-center ${className ?? ''}`}>
      {icon && <IconWrapper icon={icon} className="text-4xl" />}

      {showLights ? (
        <BattleTitleWithLights status={showLights}>
          <p className="text-3xl font-semibold text-text-heading-light dark:text-text-heading-dark">{title}</p>
        </BattleTitleWithLights>
      ) : (
        <p className="text-3xl font-semibold text-text-heading-light dark:text-text-heading-dark">{title}</p>
      )}

      <div className="flex-center gap-2">{tags}</div>

      {subtitle && (
        <p className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">{subtitle}</p>
      )}

      {children}
    </div>
  )
}

export default PageHeader
