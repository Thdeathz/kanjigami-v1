import React from 'react'
import { IoHome } from 'react-icons/io5'
import { BsTrophyFill, BsStack } from 'react-icons/bs'
import { RiSwordFill, RiSettings3Fill } from 'react-icons/ri'
import { FaUser, FaChartArea } from 'react-icons/fa'

import SideItem from './SideItem'
import SideSection from './SideSection'
import useAuth from '~/hooks/useAuth'

const SideBar = () => {
  const { email } = useAuth()

  return (
    <div className="flex h-full w-[15rem] flex-col items-start justify-start border-r border-clr-border-1-light bg-gradient-to-br from-side-bar-start from-0% to-side-bar-end to-85% dark:border-clr-border-1-dark dark:from-rgb-gray-1 dark:to-rgb-gray-0.7">
      <div className="w-full pl-4">
        <SideItem className="my-4" icon={<IoHome />} title="Home" href="/" />
      </div>

      <SideSection heading="play">
        <SideItem icon={<RiSwordFill />} title="Online battles" href="/battles" />

        <SideItem icon={<BsStack />} title="Kanji stack" href="/kanji" />

        <SideItem icon={<BsTrophyFill />} title="Leaderboards" href="/leaderboard" />
      </SideSection>

      {email && (
        <SideSection heading="about you">
          <SideItem icon={<FaUser />} title="Profile" href={`/player/${email}`} />

          <SideItem icon={<FaChartArea />} title="Stats" href="/me" />

          <SideItem icon={<RiSettings3Fill />} title="Settings" href="/settings" />
        </SideSection>
      )}
    </div>
  )
}

export default SideBar
