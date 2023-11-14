import React from 'react'
import { BsStack } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import Button from '~/components/Button'
import DefaultLayout from '~/components/Layouts/DefaultLayout'
import OnlineRound from '~/components/OnlineRound'
import RootNotification from '~/components/RootNotification'
import Section from '~/components/Section'
import useAuth from '~/hooks/useAuth'

import BattleInfo from '../battle/components/BattleInfo'

import HomeThumbnail from './components/HomeThumbnail'
import StacksList from './components/StacksList'

function Home() {
  useDocumentTitle('漢字ガミ')

  const navigate = useNavigate()
  const { email } = useAuth()

  return (
    <DefaultLayout className="flex flex-col items-start justify-start gap-12">
      <HomeThumbnail />

      <RootNotification />

      <Section
        title="Latest battle"
        description="Compete with players around the world"
        icon={<RiSwordFill />}
        viewButton={<Button onClick={() => navigate('/battles')}>View all battles</Button>}
      >
        <BattleInfo
          status="ongoing"
          tagName="🥮中秋節"
          title="Mid-Autumn Festival"
          desciption="This is a word package related to the Mid-Autumn Festival. Let's practice kanji together"
          endTime={new Date()}
        >
          <OnlineRound
            key={1}
            imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/234.png?alt=media&token=4df8d4e0-c249-466c-9be9-b4db8be3806c"
            stack="中秋節"
          />

          <OnlineRound
            key={2}
            imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/213.png?alt=media&token=3eef68c5-c33c-4eb7-99ff-fb4474f405f8"
            stack="中秋節"
          />

          <OnlineRound key={3} />

          <OnlineRound key={4} />

          <OnlineRound key={5} />

          <OnlineRound key={6} />

          <OnlineRound key={7} />
        </BattleInfo>
      </Section>

      {email && (
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
