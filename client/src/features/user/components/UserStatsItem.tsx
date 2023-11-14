/* eslint-disable react/no-array-index-key */
import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { type IconType } from 'react-icons'

import IconWrapper from '~/components/IconWrapper'
import { gridList } from '~/config/variants'

type PropsType = {
  icon: ReactElement<IconType>
  title: string
  stats: {
    label: string
    value: number
  }[]
}

function UserStatsItem({ icon, title, stats }: PropsType) {
  return (
    <div className="basis-1/2">
      <div className="flex-start mb-2 gap-2">
        <IconWrapper icon={icon} className="text-xl text-text-secondary-light dark:text-text-secondary-dark" />
        <p className="text-2xl font-semibold text-clr-link-light dark:text-clr-link-dark">{title}</p>
      </div>

      <motion.div
        className="grid w-full grid-cols-3 gap-4 text-center"
        variants={gridList.container(0.15, 0.2)}
        initial="hidden"
        animate="enter"
      >
        {stats.map(({ label, value }, index) => (
          <motion.div
            key={`${title}-${index}`}
            className="rounded-2xl border-2 border-clr-border-1-light p-4 dark:border-clr-border-1-dark"
            variants={gridList.item()}
          >
            <p className="text-3xl font-bold text-profile-avatar-outline-light dark:text-profile-avatar-outline-dark">
              {value}
            </p>
            <p className="font-medium text-text-secondary-light dark:text-text-secondary-dark">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default UserStatsItem
