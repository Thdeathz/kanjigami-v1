import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'

const Profile = () => {
  useDocumentTitle('Me | 漢字ガミ')

  return (
    <DefaultLayout>
      <div>Profile Page</div>
    </DefaultLayout>
  )
}

export default Profile