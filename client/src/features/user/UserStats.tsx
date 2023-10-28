import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import DefaultLayout from '~/components/Layouts/DefaultLayout'

const UserStats = () => {
  useDocumentTitle('My Analytics | 漢字ガミ')

  return (
    <DefaultLayout>
      <div>User Stats Page</div>
    </DefaultLayout>
  )
}

export default UserStats
