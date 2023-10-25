import React from 'react'
import { RiSwordFill } from 'react-icons/ri'
import { useDocumentTitle } from 'usehooks-ts'
import { motion } from 'framer-motion'

import { DefaultLayout } from '~/components'
import Button from '~/components/Button'
import OnlineRound from '~/components/OnlineRound'
import PageHeader from '~/components/PageHeader'
import RootNotification from '~/components/RootNotification'
import Section from '~/components/Section'
import EventLeaderboards from './components/LeaderList/EventLeaderboards'
import BattleInfo from './components/BattleInfo'
import { gridList } from '~/config/variants'

const OnlineBattles = () => {
  useDocumentTitle('Battles | 漢字ガミ')

  return (
    <DefaultLayout>
      <PageHeader
        icon={<RiSwordFill />}
        title="Online battles"
        subtitle="Compete with players around the world"
        className="mb-12"
      >
        <div className="flex items-center justify-center gap-3">
          <Button>Latest battles</Button>

          <Button>Upcoming battles</Button>

          <Button>Past battles</Button>
        </div>
      </PageHeader>

      <RootNotification />

      <div className="mt-12 flex w-full items-start justify-start gap-12">
        <div className="w-full grow">
          <Section title="Latest battles">
            <motion.div
              className="flex flex-col items-start justify-start gap-8"
              variants={gridList.container(0.2, 0.2)}
              initial="hidden"
              animate="enter"
            >
              {Array.from(Array(3).keys()).map(index => (
                <motion.div key={`ongoing-event-${index}`} variants={gridList.item()}>
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
                </motion.div>
              ))}
            </motion.div>
          </Section>

          <Section title="Upcoming battles" className="mt-12">
            <div className="flex flex-col items-start justify-start gap-8">
              {Array.from(Array(3).keys()).map(index => (
                <BattleInfo
                  key={`upcoming-event-${index}`}
                  status="upcoming"
                  tagName="🥮中秋節"
                  title="Mid-Autumn Festival"
                  desciption="This is a word package related to the Mid-Autumn Festival. Let's practice kanji together"
                  endTime={new Date()}
                >
                  <OnlineRound key={3} />

                  <OnlineRound key={4} />

                  <OnlineRound key={5} />

                  <OnlineRound key={6} />

                  <OnlineRound key={7} />
                </BattleInfo>
              ))}
            </div>
          </Section>

          <Section title="Past battles" className="mt-12">
            <div className="flex flex-col items-start justify-start gap-8">
              {Array.from(Array(5).keys()).map(index => (
                <BattleInfo
                  key={`finished-section-${index}`}
                  status="finished"
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
                </BattleInfo>
              ))}
            </div>
          </Section>
        </div>

        <div className="basis-1/4">
          <p className="mb-4 text-xl font-semibold">All-time leaders</p>

          <EventLeaderboards />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default OnlineBattles
