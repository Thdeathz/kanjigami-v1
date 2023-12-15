import React from 'react'
import { BsStack } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import Button from '~/components/Button'
import Loading from '~/components/Loading'
import Section from '~/components/Section'
import StackItem from '~/components/StackItem'
import { useGetFollowedStacksQuery } from '~/features/kanji/store/kanjiService'

function FollowedStacksSection() {
  const navigate = useNavigate()
  const { data: stacks, isLoading } = useGetFollowedStacksQuery(undefined)

  if (isLoading || !stacks) return <Loading className="text-3xl" />

  if (stacks.length === 0) return <></>

  return (
    <Section
      title="Followed kanji stack"
      description="Play game and learn more kanji"
      icon={<BsStack />}
      viewButton={<Button onClick={() => navigate('/kanji')}>View all kanji stack</Button>}
    >
      <div className="card-list group pointer-events-none grid grid-cols-5 gap-6 transition-opacity">
        {stacks.map(stack => (
          <StackItem
            key={`followed-stack-${stack.id}`}
            stack={{
              ...stack,
              isFollowed: true
            }}
          />
        ))}
      </div>
    </Section>
  )
}

export default FollowedStacksSection
