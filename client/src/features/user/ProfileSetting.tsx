import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'

const ProfileSetting = () => {
  useDocumentTitle('Settings | 漢字ガミ')

  return (
    <DefaultLayout>
      <div>Profile Setting Page</div>
    </DefaultLayout>
  )
}

export default ProfileSetting
