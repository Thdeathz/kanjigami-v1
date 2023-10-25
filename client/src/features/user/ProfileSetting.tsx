import React from 'react'
import { Divider } from 'antd'
import { RiSettings3Fill } from 'react-icons/ri'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'
import PageHeader from '~/components/PageHeader'
import Panel from '~/components/Panel'
import EditUsername from './components/EditUsername'
import EditAvatar from './components/EditAvatar'
import CustomDivider from '~/components/CustomDivider'

const ProfileSetting = () => {
  useDocumentTitle('Settings | 漢字ガミ')

  return (
    <DefaultLayout>
      <PageHeader icon={<RiSettings3Fill />} title="Settings" className="mb-12" />

      <Panel className="mx-auto max-w-[60rem]">
        <form>
          <EditUsername />

          <CustomDivider />

          <EditAvatar />
        </form>

        <p className="mt-4 text-base font-medium">Note: All information entered here is public.</p>
      </Panel>
    </DefaultLayout>
  )
}

export default ProfileSetting
