import React, { ReactElement, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiDiceFire, GiHearts } from 'react-icons/gi'
import { type IconType } from 'react-icons'
import { motion } from 'framer-motion'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Panel from '~/components/Panel'
import { panelVariants } from '~/config/variants'

type LobbyInfoItemPropsType = {
  label: string
  children: ReactNode
}

const LobbyInfoItem = ({ label, children }: LobbyInfoItemPropsType) => {
  return (
    <div className="grid grid-cols-2 items-end gap-2 text-xl font-medium">
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
  life: number
  time: string
}

const GameLobby = ({ icon, title, stackName, life, time }: PropsType) => {
  const navigate = useNavigate()

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="enter">
      <Panel className="mx-auto w-max">
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
            <div className="flex-center gap-1">
              {Array.from(Array(life).keys()).map((_, index) => (
                <IconWrapper
                  key={`left-live-${index}`}
                  icon={<GiHearts />}
                  className="text-3xl text-red-light"
                />
              ))}
            </div>
          </LobbyInfoItem>

          <LobbyInfoItem label="Time">
            <p>{time}</p>
          </LobbyInfoItem>
        </div>

        <Button
          className="w-full"
          type="primary"
          onClick={() =>
            navigate(
              `?${new URLSearchParams({
                gameId: 'asdfasdfasfdasdf'
              })}`
            )
          }
        >
          <div className="flex-center gap-2 text-lg">
            <GiDiceFire />
            Link start
          </div>
        </Button>
      </Panel>
    </motion.div>
  )
}

export default GameLobby