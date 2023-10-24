import React, { Fragment, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BiSolidChevronRight } from 'react-icons/bi'
import IconWrapper from '~/components/IconWrapper'

export type BreadcrumbItem = {
  label: ReactNode
  to: string
}

type PropsType = {
  items: BreadcrumbItem[]
}

const Breadcrumb = ({ items }: PropsType) => {
  return (
    <div className="flex-center gap-2">
      <>
        {items.slice(0, -1).map((item, index) => (
          <Fragment key={`breadcumb-item-${index}`}>
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
          </Fragment>
        ))}
      </>

      <Link
        className="text-base font-medium text-clr-link-light dark:text-clr-link-dark"
        to={items.at(-1)?.to ?? ''}
      >
        {items.at(-1)?.label}
      </Link>
    </div>
  )
}

export default Breadcrumb
