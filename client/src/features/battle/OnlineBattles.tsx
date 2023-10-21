import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'

const OnlineBattles = () => {
  useDocumentTitle('Battles | 漢字ガミ')

  return (
    <DefaultLayout>
      <div>Online Battles Page</div>
    </DefaultLayout>
  )
}

export default OnlineBattles
