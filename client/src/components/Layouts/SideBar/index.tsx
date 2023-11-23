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
  const { email, isAdmin } = useAuth()

  const sideBarClassNames = getSideBarClassNames(fixedSideBar, isSideBarOpen)

  if (isAdmin)
    return (
      <div className={sideBarClassNames}>
        <div className="w-full pl-6">
          <SideItem className="my-4" icon={<IoHome />} title="Home" link="/" />
        </div>

        {isAdmin && (
          <SideSection heading="setting">
            <SideItem icon={<BsStack />} title="Kanji stack" link="/admin/kanjis" matchRegex={/\/admin\/kanjis\/\S+/} />

            <SideItem
              icon={<RiSwordFill />}
              title="Online battles"
              link="/admin/events"
              matchRegex={/\/admin\/events\/\S+/}
            />
          </SideSection>
        )}
      </div>
    )

  return (
    <div className={sideBarClassNames}>
      <div className="w-full pl-6">
        <SideItem className="my-4" icon={<IoHome />} title="Home" link="/" />
      </div>

      <SideSection heading="play">
        <SideItem icon={<RiSwordFill />} title="Online battles" link="/battles" matchRegex={/\/battle\/\S+/} />

        <SideItem icon={<BsStack />} title="Kanji stack" link="/kanji" matchRegex={/\/kanji\/\S+/} />

        <SideItem icon={<BsTrophyFill />} title="Leaderboards" link="/leaderboard" />
      </SideSection>

      {email && (
        <SideSection heading="about you">
          <SideItem icon={<FaUser />} title="Profile" link={`/player/${email.split('@')[0]}`} />

          <SideItem icon={<FaChartArea />} title="Stats" link="/me" />

          <SideItem icon={<RiSettings3Fill />} title="Settings" link="/settings" />
        </SideSection>
      )}
    </div>
  )
}

export default SideBar
