import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { type IconType } from 'react-icons'

import AnimateButton from '~/components/AnimateButton'
import Avatar from '~/components/Avatar'
import IconWrapper from '~/components/IconWrapper'
import Loading from '~/components/Loading'
import Panel from '~/components/Panel'
import { panelVariants } from '~/config/variants'
import useAuth from '~/hooks/useAuth'

import { useGetGameLogQuery } from '../store/gameService'

type PropsType = {
  icon: ReactElement<IconType>
  title: string
  logId: string
  onRestart: () => void
}

function GameEnd({ icon, logId, title, onRestart }: PropsType) {
  const { username, avatarUrl } = useAuth()

  const { data: gameLog, isLoading } = useGetGameLogQuery(logId)

  if (isLoading || !gameLog) return <Loading className="text-3xl" />

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="enter">
      <Panel className="mx-auto w-max min-w-[25rem]">
        <div className="flex-center mb-6 w-full flex-col gap-2">
          <IconWrapper
            icon={icon}
            className="text-6xl text-profile-avatar-outline-light dark:text-profile-avatar-outline-dark"
          />
          <p className="text-2xl font-semibold text-red-light dark:text-red-dark">{title}</p>
        </div>

        <div className="flex-center mb-6 w-full flex-col gap-4">
          <p className="text-5xl font-bold text-text-light dark:text-text-dark">{gameLog.archievedPoints}</p>

          <div className="flex w-full items-center justify-between gap-4 rounded-full bg-gradient-to-r from-ranking-start-light to-ranking-4-10-end-light py-1 pl-2 pr-4 shadow-hard-shadow dark:from-ranking-start-dark dark:to-ranking-4-10-end-dark">
            <div className="flex-center gap-2">
              <Avatar src={avatarUrl} />

              <p className="text-lg font-semibold text-clr-link-light dark:text-clr-link-dark">{username}</p>
            </div>

            <div className="flex-center gap-12 font-medium">
              <p>{gameLog.archievedPoints}</p>

              <p className="text-xl text-text-secondary-dark dark:text-text-secondary-light">#{gameLog.rank}</p>
            </div>
          </div>
        </div>

        <AnimateButton animate="drive" className="w-full" type="primary" onClick={onRestart}>
          Restart
        </AnimateButton>
      </Panel>
    </motion.div>
  )
}

export default GameEnd
