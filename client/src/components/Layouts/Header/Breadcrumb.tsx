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
      <div className="flex-center gap-2" key={`breadcumb-item-${0}`}>
        <Link
          className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark"
          to={items.at(0)?.to ?? ''}
        >
          {items.at(0)?.label}
        </Link>
      </div>

      <>
        {items.slice(1, -1).map((item, index) => (
          <motion.div
            className="flex-center gap-2"
            key={`breadcumb-item-${index}`}
            variants={breadCrumb.item()}
          >
            <IconWrapper
              icon={<BiSolidChevronRight />}
              className="text-2xl text-text-secondary-light opacity-50 dark:text-text-secondary-dark"
            />

            <Link
              className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark"
              to={item.to}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </>

      <motion.div className="flex-center gap-2" variants={breadCrumb.item()}>
        <IconWrapper
          icon={<BiSolidChevronRight />}
          className="text-2xl text-text-secondary-light opacity-50 dark:text-text-secondary-dark"
        />

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
