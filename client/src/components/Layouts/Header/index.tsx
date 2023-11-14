import React from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsBellFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import AppIcon from '~/assets/app-icon.svg'
import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Image from '~/components/Image'
import useAuth from '~/hooks/useAuth'

import Breadcrumb, { BreadcrumbItem } from './Breadcrumb'
import ThemeButton from './ThemeButton'
import UserButton from './UserButton'

type PropsType = {
  breadcrumbs?: BreadcrumbItem[]
  hiddenSideBar?: boolean
  isSideBarOpen?: boolean
  setIsSideBarOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

function Header({ breadcrumbs, hiddenSideBar = false, isSideBarOpen, setIsSideBarOpen }: PropsType) {
  const navigate = useNavigate()
  const { email } = useAuth()

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-gradient-to-r from-header-light-start from-50% to-header-end px-6 py-3 backdrop-blur-lg dark:from-rgb-gray-0">
      <div className="flex-center gap-8">
        {hiddenSideBar && setIsSideBarOpen && (
          <Button className="flex-center aspect-square" onClick={() => setIsSideBarOpen(prev => !prev)}>
            <IconWrapper
              icon={isSideBarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              className="text-text-primary text-xl"
            />
          </Button>
        )}

        <div className="app-icon flex-start group cursor-pointer gap-1.5 rounded border-app-icon border-neutral-13 bg-white px-1.5 py-1 text-neutral-13 shadow-light-app-icon transition-all hover:border-white hover:bg-neutral-13 hover:text-white hover:shadow-light-app-icon-hover active:scale-90 dark:invert">
          <Image src={AppIcon} alt="app-icon" className="aspect-square w-[28px] group-hover:invert" />
          <p className="select-none text-xl">KANJIGAMI</p>
        </div>

        {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      </div>

      <div className="flex-center gap-4">
        <ThemeButton />

        {email && (
          <Button className="flex-center aspect-square">
            <IconWrapper icon={<BsBellFill />} className="text-text-primary text-xl" />
          </Button>
        )}

        {email ? <UserButton /> : <Button onClick={() => navigate('/login')}>Sign In / Sign Up</Button>}
      </div>
    </div>
  )
}

export default Header
