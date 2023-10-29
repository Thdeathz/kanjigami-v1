import React from 'react'
import { RiSettings3Fill } from 'react-icons/ri'
import { useDocumentTitle } from 'usehooks-ts'
import { motion } from 'framer-motion'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import EditUsername from './components/EditUsername'
import EditAvatar from './components/EditAvatar'
import CustomDivider from '~/components/CustomDivider'
import { panelVariants } from '~/config/variants'

const ProfileSetting = () => {
  useDocumentTitle('Settings | 漢字ガミ')

  return (
    <DefaultLayout>
      <PageHeader icon={<RiSettings3Fill />} title="Settings" className="mb-12" />

      <motion.div variants={panelVariants} initial="hidden" animate="enter">
        <Panel className="mx-auto max-w-[60rem]">
          <form>
            <EditUsername />

            <CustomDivider />

            <EditAvatar />
          </form>

          <p className="mt-4 text-base font-medium">
            Note: All information entered here is public.
          </p>
        </Panel>
      </motion.div>
    </DefaultLayout>
  )
}

export default ProfileSetting
