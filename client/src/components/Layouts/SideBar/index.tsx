import classNames from 'classnames'
import React from 'react'
import { BsTrophyFill, BsStack } from 'react-icons/bs'
import { FaUser, FaChartArea } from 'react-icons/fa'
import { IoHome } from 'react-icons/io5'
import { RiSwordFill, RiSettings3Fill } from 'react-icons/ri'

import useAuth from '~/hooks/useAuth'

import SideItem from './SideItem'
import SideSection from './SideSection'

type PropsType = {
  fixedSideBar?: boolean
  isSideBarOpen?: boolean
}

function getSideBarClassNames(fixedSideBar: boolean, isSideBarOpen: boolean) {
  return classNames(
    'flex h-main-content flex-col items-start justify-start border-r border-clr-border-1-light bg-gradient-to-br from-side-bar-start from-0% to-side-bar-end to-85% backdrop-blur-[5px] dark:border-clr-border-1-dark dark:from-rgb-gray-1 dark:to-rgb-gray-0.7',
    {
      'sticky top-16': fixedSideBar,
      'absolute z-50 transition-transform duration-300': !fixedSideBar,
      'translate-x-0': isSideBarOpen,
      'translate-x-[-100%]': !isSideBarOpen
    }
  )
}

function SideBar({ fixedSideBar = true, isSideBarOpen = true }: PropsType) {
  const { email } = useAuth()

  const sideBarClassNames = getSideBarClassNames(fixedSideBar, isSideBarOpen)

  return (
    <div className={sideBarClassNames}>
      <div className="w-full pl-6">
        <SideItem className="my-4" icon={<IoHome />} title="Home" href="/" />
      </div>

      <SideSection heading="play">
        <SideItem icon={<RiSwordFill />} title="Online battles" href="/battles" />

        <SideItem icon={<BsStack />} title="Kanji stack" href="/kanji" />

        <SideItem icon={<BsTrophyFill />} title="Leaderboards" href="/leaderboard" />
      </SideSection>

      {email && (
        <SideSection heading="about you">
          <SideItem icon={<FaUser />} title="Profile" href={`/player/${email.split('@')[0]}`} />

          <SideItem icon={<FaChartArea />} title="Stats" href="/me" />

          <SideItem icon={<RiSettings3Fill />} title="Settings" href="/settings" />
        </SideSection>
      )}
    </div>
  )
}

export default SideBar
