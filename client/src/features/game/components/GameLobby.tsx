import { motion } from 'framer-motion'
import React, { ReactElement, ReactNode } from 'react'
import { type IconType } from 'react-icons'
import { GiHearts } from 'react-icons/gi'
import { IoInfinite } from 'react-icons/io5'

import AnimateButton from '~/components/AnimateButton'
import IconWrapper from '~/components/IconWrapper'
import Loading from '~/components/Loading'
import Panel from '~/components/Panel'
import { panelVariants } from '~/config/variants'

type LobbyInfoItemPropsType = {
  label: string
  children: ReactNode
}

function LobbyInfoItem({ label, children }: LobbyInfoItemPropsType) {
  return (
    <div className="grid grid-cols-2 items-center gap-2 text-xl font-medium">
      <p className="text rounded bg-table-header-light px-2 py-1 text-text-secondary-light dark:bg-table-header-dark dark:text-text-secondary-dark">
        {label}
      </p>
      <div className="text-2xl">{children}</div>
    </div>
  )
}

type PropsType = {
  icon: ReactElement<IconType>
  title: string
  stackName: string
  life?: number
  time?: string
  onStart?: () => void
  isLoading?: boolean
}

function GameLobby({ icon, title, stackName, life, time, onStart, isLoading }: PropsType) {
  return (
    <motion.div variants={panelVariants} initial="hidden" animate="enter">
      <Panel className="mx-auto w-max min-w-[25rem]">
        <div className="flex-center mb-6 w-full flex-col gap-2">
          <IconWrapper
            icon={icon}
            className="text-6xl text-profile-avatar-outline-light dark:text-profile-avatar-outline-dark"
          />
          <p className="text-2xl font-semibold">{title}</p>
        </div>

        <div className="mb-6 flex flex-col gap-3">
          <LobbyInfoItem label="Kanji stack">
            <p>{stackName}</p>
          </LobbyInfoItem>

          <LobbyInfoItem label="Life">
            <div className="flex items-center justify-start gap-1">
              {life ? (
                Array.from(Array(life).keys()).map(each => (
                  <IconWrapper key={`left-live-${each}`} icon={<GiHearts />} className="text-3xl text-red-light" />
                ))
              ) : (
                <IconWrapper className="text-3xl" icon={<IoInfinite />} />
              )}
            </div>
          </LobbyInfoItem>

          <LobbyInfoItem label="Time">
            {time || <IconWrapper className="text-3xl" icon={<IoInfinite />} />}
          </LobbyInfoItem>
        </div>

        <AnimateButton className="w-full" animate="drive" type="primary" onClick={onStart}>
          {isLoading ? <Loading /> : 'Get Started'}
        </AnimateButton>
      </Panel>
    </motion.div>
  )
}

export default GameLobby
