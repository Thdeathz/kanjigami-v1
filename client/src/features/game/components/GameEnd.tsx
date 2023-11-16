import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { type IconType } from 'react-icons'
import { GiDiceFire } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

import Avatar from '~/components/Avatar'
import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Panel from '~/components/Panel'
import { panelVariants } from '~/config/variants'

type PropsType = {
  icon: ReactElement<IconType>
  title: string
  username: string
  avatarUrl?: string
  setIsEnd: React.Dispatch<React.SetStateAction<boolean>>
}

function GameEnd({ icon, title, username, avatarUrl, setIsEnd }: PropsType) {
  const navigate = useNavigate()

  const handleRestart = () => {
    navigate(
      `?${new URLSearchParams({
        gameId: 'asdfasdfasfdasdf'
      })}`
    )
    setIsEnd(false)
  }

  return (
    <motion.div variants={panelVariants} initial="hidden" animate="enter">
      <Panel className="mx-auto w-max">
        <div className="flex-center mb-6 w-full flex-col gap-2">
          <IconWrapper
            icon={icon}
            className="text-6xl text-profile-avatar-outline-light dark:text-profile-avatar-outline-dark"
          />
          <p className="text-2xl font-semibold text-red-light dark:text-red-dark">{title}</p>
        </div>

        <div className="flex-center mb-6 w-full flex-col gap-4">
          <p className="text-5xl font-bold text-text-light dark:text-text-dark">323</p>

          <div className="flex w-full items-center gap-4 rounded-full bg-gradient-to-r from-ranking-start-light to-ranking-4-10-end-light py-1 pl-2 pr-4 shadow-hard-shadow dark:from-ranking-start-dark dark:to-ranking-4-10-end-dark">
            <div className="flex-center gap-2">
              <Avatar src={avatarUrl} />

              <p className="text-lg font-semibold text-clr-link-light dark:text-clr-link-dark">{username}</p>
            </div>

            <div className="flex-center gap-12 font-medium">
              <p>323</p>

              <p className="text-xl text-text-secondary-dark dark:text-text-secondary-light">#203</p>
            </div>
          </div>
        </div>

        <Button className="w-full" type="primary" onClick={handleRestart}>
          <div className="flex-center gap-2 text-lg">
            <GiDiceFire />
            Restart
          </div>
        </Button>
      </Panel>
    </motion.div>
  )
}

export default GameEnd
