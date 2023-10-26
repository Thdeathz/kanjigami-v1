import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BiSolidChevronRight } from 'react-icons/bi'
import { motion } from 'framer-motion'

import IconWrapper from '~/components/IconWrapper'
import { breadCrumb } from '~/config/variants'

export type BreadcrumbItem = {
  label: ReactNode
  to: string
}

type PropsType = {
  items: BreadcrumbItem[]
}

const Breadcrumb = ({ items }: PropsType) => {
  return (
    <motion.div
      className="flex-center gap-2"
      variants={breadCrumb.container()}
      initial="hidden"
      animate="enter"
    >
      <>
        {items.slice(0, -1).map((item, index) => (
          <motion.div
            className="flex-center gap-2"
            key={`breadcumb-item-${index}`}
            variants={breadCrumb.item()}
          >
            <Link
              className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark"
              to={item.to}
            >
              {item.label}
            </Link>

            <IconWrapper
              icon={<BiSolidChevronRight />}
              className="text-xl text-text-secondary-light dark:text-text-secondary-dark"
            />
          </motion.div>
        ))}
      </>

      <motion.div variants={breadCrumb.item()}>
        <Link
          className="text-base font-medium text-clr-link-light dark:text-clr-link-dark"
          to={items.at(-1)?.to ?? ''}
        >
          {items.at(-1)?.label}
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default Breadcrumb
