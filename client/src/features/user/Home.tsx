import React from 'react'
import { BsStack } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import Button from '~/components/Button'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import RootNotification from '~/components/RootNotification'
import Section from '~/components/Section'
import useAuth from '~/hooks/useAuth'

import HomeThumbnail from './components/HomeThumbnail'
import LastestBattleSection from './components/LastestBattleSection'
import StacksList from './components/StacksList'

function Home() {
  useDocumentTitle('漢字ガミ')

  const navigate = useNavigate()
  const { isUser } = useAuth()

  return (
    <DefaultLayout className="flex flex-col items-start justify-start gap-12">
      <HomeThumbnail />

      <RootNotification />

      <LastestBattleSection />

      {isUser && (
        <Section
          title="Followed kanji stack"
          description="Play game and learn more kanji"
          icon={<BsStack />}
          viewButton={<Button onClick={() => navigate('/kanji')}>View all kanji stack</Button>}
        >
          <StacksList />
        </Section>
      )}
    </DefaultLayout>
  )
}

export default Home
