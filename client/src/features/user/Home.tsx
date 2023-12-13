import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import RootNotification from '~/components/RootNotification'
import useAuth from '~/hooks/useAuth'

import FollowedStacksSection from './components/FollowedStacksSection'
import HomeThumbnail from './components/HomeThumbnail'
import LastestBattleSection from './components/LastestBattleSection'

function Home() {
  useDocumentTitle('漢字ガミ')

  const { isUser } = useAuth()

  return (
    <DefaultLayout className="flex flex-col items-start justify-start gap-12">
      <HomeThumbnail />

      <RootNotification />

      <LastestBattleSection />

      {isUser && <FollowedStacksSection />}
    </DefaultLayout>
  )
}

export default Home
