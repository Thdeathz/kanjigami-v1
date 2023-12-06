import { motion } from 'framer-motion'
import React, { MouseEventHandler, ReactNode } from 'react'

type PropsType = {
  actived?: boolean
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function FilterItem({ actived = false, children, onClick }: PropsType) {
  return (
    <motion.button
      type="button"
      className={`rounded px-4 py-2 font-medium text-clr-link-light dark:text-clr-link-dark ${
        actived &&
        'bg-gradient-to-tr from-filter-start-light to-filter-end-light dark:from-filter-start-dark dark:to-filter-end-dark'
      }`}
      layout
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export default FilterItem
