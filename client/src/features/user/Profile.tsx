import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'
import { type IconType } from 'react-icons'
import { RiSwordFill } from 'react-icons/ri'
import { GiJewelCrown, GiLaurelCrown } from 'react-icons/gi'
import { motion } from 'framer-motion'

import useAuth from '~/hooks/useAuth'
import Button from '~/components/Button'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Avatar from '~/components/Avatar'
import { BsStack } from 'react-icons/bs'
import UserStatsItem from './components/UserStatsItem'
import IconWrapper from '~/components/IconWrapper'

type RankInfoPropsType = {
  icon: ReactElement<IconType>
  label: string
  value: string
}

const animationVariants = {
  container: {
    hidden: { opacity: 1 },
    enter: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.25
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1
    }
  }
}

const RankInfo = ({ icon, label, value }: RankInfoPropsType) => {
  return (
    <motion.div
      className="rank-info relative basis-1/2 p-4 text-center before:absolute before:rounded-2xl before:border-2 before:border-clr-border-1-light  before:dark:border-clr-border-1-dark"
      variants={animationVariants.item}
    >
      <div className="flex-center">
        <IconWrapper
          icon={icon}
          className="mt-[-2rem] text-2xl text-profile-avatar-outline-light dark:text-profile-avatar-outline-dark"
        />
      </div>

      <p className="text-xl font-bold text-clr-link-light dark:text-clr-link-dark">{value}</p>
      <p className="text-base font-medium text-text-secondary-light dark:text-text-secondary-dark">
        {label}
      </p>
    </motion.div>
  )
}

const Profile = () => {
  useDocumentTitle('Me | 漢字ガミ')

  const navigate = useNavigate()
  // const { username } = useParams()
  const { email, username, avatarUrl } = useAuth()

  return (
    <DefaultLayout className="flex-center flex-col gap-6">
      <motion.div
        className="profile dark:profile-dark relative w-full rounded-2xl p-8"
        variants={animationVariants.container}
        initial="hidden"
        animate="enter"
      >
        <div className="mb-12 flex items-start justify-between">
          <div className="w-full"></div>

          <div className="flex-center mt-[-6rem] w-max flex-col gap-4">
            <div className="flex-center aspect-square h-[8rem] rounded-full border-2 border-profile-avatar-outline-light dark:border-profile-avatar-outline-dark">
              <Avatar src={avatarUrl} username={username} height="h-[7rem]" />
            </div>

            <p className="whitespace-nowrap text-center text-2xl font-semibold text-clr-link-light dark:text-clr-link-dark">
              {email.split('@')[0]}{' '}
              <span className="rounded-xl border-2 border-profile-border-light px-2 py-1 text-base font-medium text-text-secondary-light dark:border-profile-border-dark dark:text-text-secondary-dark">
                @{username}
              </span>
            </p>
          </div>

          <div className="w-full">
            <Button type="primary" className="float-right" onClick={() => navigate('/settings')}>
              Edit profile
            </Button>
          </div>
        </div>

        <div className="flex-center w-full gap-6">
          <RankInfo icon={<GiJewelCrown />} label="Current rank" value="Kanji kunoichi" />

          <RankInfo icon={<GiLaurelCrown />} label="Current rank point" value="132345" />
        </div>
      </motion.div>

      <div className="flex-center w-full gap-6">
        <UserStatsItem
          icon={<RiSwordFill />}
          title="Online battle stats"
          stats={[
            { label: 'Global rank', value: 0 },
            { label: 'Event played', value: 0 },
            { label: 'Total score', value: 0 }
          ]}
        />

        <UserStatsItem
          icon={<BsStack />}
          title="Kanji stack stats"
          stats={[
            { label: 'Games played', value: 0 },
            { label: 'Total score', value: 0 },
            { label: 'Avg time', value: 0 }
          ]}
        />
      </div>
    </DefaultLayout>
  )
}

export default Profile
