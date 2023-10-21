import React, { ReactElement } from 'react'
import { IconType } from 'react-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import IconWrapper from '~/components/IconWrapper'

type PropsType = {
  icon: ReactElement<IconType>
  title: string
  href: string
  className?: string
}

const SideItem = ({ icon, title, href, className }: PropsType) => {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const isActive =
    currentPath.slice(1).split('/').includes(href.slice(1)) ||
    (currentPath === '/' && href === '/') ||
    (currentPath.includes('/player') && href.includes('/player'))

  return (
    <div
      className={`group flex w-full cursor-pointer items-center justify-start gap-2.5 rounded-s-full px-6 py-2 font-medium text-side-item-light-link  dark:text-side-item-dark-link ${
        isActive &&
        'bg-gradient-to-r from-side-item-light-start from-0% to-side-item-light-end to-95% dark:from-side-item-dark-start dark:to-side-item-dark-end dark:shadow-dark-side-item'
      } ${className}`}
      onClick={() => navigate(href)}
    >
      <IconWrapper
        icon={icon}
        className={`flex-center group-hover:text-side-item-icon-hover text-base text-side-item-light-icon transition-all group-hover:translate-x-[-3px] group-active:translate-x-[-3px] dark:text-side-item-dark-icon ${
          isActive && 'text-side-item-light-icon-hover dark:text-side-item-dark-icon-hover'
        }`}
      />

      <p
        className={`font-semibold transition-colors group-hover:text-side-item-light-link-hover dark:group-hover:text-side-item-dark-link-hover ${
          isActive && 'text-side-item-light-link-hover dark:text-side-item-dark-link-hover'
        }`}
      >
        {title}
      </p>
    </div>
  )
}

export default SideItem
