import { motion } from 'framer-motion'
import React from 'react'
import { RiSettings3Fill } from 'react-icons/ri'
import { useDocumentTitle } from 'usehooks-ts'

import CustomDivider from '~/components/CustomDivider'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import { panelVariants } from '~/config/variants'
import useAuth from '~/hooks/useAuth'

import EditAvatar from './components/EditAvatar'
import EditUsername from './components/EditUsername'

function ProfileSetting() {
  useDocumentTitle('Settings | 漢字ガミ')

  const { userId, username, avatarUrl } = useAuth()

  return (
    <DefaultLayout>
      <PageHeader icon={<RiSettings3Fill />} title="Settings" className="mb-12" />

      <motion.div variants={panelVariants} initial="hidden" animate="enter">
        <Panel className="mx-auto max-w-[60rem]">
          <EditUsername currentUsername={username} />

          <CustomDivider />

          <EditAvatar userId={userId} username={username} currentAvatar={avatarUrl} />

          <p className="mt-4 text-base font-medium">Note: All information entered here is public.</p>
        </Panel>
      </motion.div>
    </DefaultLayout>
  )
}

export default ProfileSetting
