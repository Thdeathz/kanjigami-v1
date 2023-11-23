import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { IconType } from 'react-icons'
import { useLocation, useNavigate } from 'react-router-dom'

import IconWrapper from '~/components/IconWrapper'

type PropsType = {
  icon: ReactElement<IconType>
  title: string
  link: string
  className?: string
  matchRegex?: RegExp
}

function getButtonClassName(isActive: boolean, className?: string) {
  return classNames(
    'group flex w-full cursor-pointer items-center justify-start gap-2.5 rounded-s-full py-2 pl-4 pr-8 text-side-item-light-link dark:text-side-item-dark-link',
    {
      'bg-gradient-to-r from-side-item-light-start from-0% to-side-item-light-end to-95% dark:from-side-item-dark-start dark:to-side-item-dark-end dark:shadow-dark-side-item':
        isActive
    },
    className
  )
}

function getIconClassName(isActive: boolean) {
  return classNames(
    'flex-center group-hover:text-side-item-icon-hover text-base text-side-item-light-icon transition-all group-hover:translate-x-[-3px] group-active:translate-x-[-3px] dark:text-side-item-dark-icon',
    {
      'text-side-item-light-icon-hover dark:text-side-item-dark-icon-hover': isActive
    }
  )
}

function getParagraphClassName(isActive: boolean) {
  return classNames(
    'font-semibold transition-colors group-hover:text-side-item-light-link-hover dark:group-hover:text-side-item-dark-link-hover',
    {
      'text-side-item-light-link-hover dark:text-side-item-dark-link-hover': isActive
    }
  )
}

function SideItem({ icon, title, link, matchRegex, className }: PropsType) {
  const navigate = useNavigate()
  const currentPath = useLocation().pathname
  const isActive =
    currentPath === link || (currentPath === '/' && link === '/') || Boolean(matchRegex?.test(currentPath))

  const buttonClassName = getButtonClassName(isActive, className)
  const iconClassName = getIconClassName(isActive)
  const paragraphClassName = getParagraphClassName(isActive)

  return (
    <button type="button" className={buttonClassName} onClick={() => navigate(link)}>
      <IconWrapper icon={icon} className={iconClassName} />
      <>{console.log('==> path', currentPath)}</>

      <p className={paragraphClassName}>{title}</p>
    </button>
  )
}

export default SideItem
