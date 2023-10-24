import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'
import { BsStack } from 'react-icons/bs'
import { RiSwordFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import useAuth from '~/hooks/useAuth'
import { DefaultLayout } from '~/components'
import Button from '~/components/Button'
import OnlineRound from '~/components/OnlineRound'
import Section from '~/components/Section'
import StacksList from './Components/StacksList'
import HomeThumbnail from './Components/HomeThumbnail'
import RootNotification from '~/components/RootNotification'
import Panel from '~/components/Panel'
import BattleInfo from '../battle/components/BattleInfo'

const Home = () => {
  useDocumentTitle('漢字ガミ')

  const navigate = useNavigate()
  const { email } = useAuth()

  return (
    <DefaultLayout className="flex max-w-full flex-col items-start justify-start gap-12">
      <HomeThumbnail />

      <RootNotification />

      <Section
        title="Latest battle"
        description="Compete with players around the world"
        icon={<RiSwordFill />}
        viewButton={<Button onClick={() => navigate('/battles')}>View all battles</Button>}
      >
        <Panel className="group flex items-start justify-start gap-8">
          <BattleInfo
            status="ongoing"
            tagName="🥮中秋節"
            title="Mid-Autumn Festival"
            desciption="This is a word package related to the Mid-Autumn Festival. Let's practice kanji together"
            endTime={new Date()}
            className="h-full basis-2/5"
          />

          <div className="row-auto grid w-full grid-cols-4 items-start gap-4">
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
          </div>
        </Panel>
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
