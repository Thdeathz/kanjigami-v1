import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import { DefaultLayout } from '~/components'

const Leaderboards = () => {
  useDocumentTitle('Leaderboard | 漢字ガミ')

  return (
    <DefaultLayout>
      <div>Leaderboards Page</div>
    </DefaultLayout>
  )
}

export default Leaderboards
