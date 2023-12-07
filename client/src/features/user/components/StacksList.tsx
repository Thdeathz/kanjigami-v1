import React from 'react'
import Loading from '~/components/Loading'

import StackItem from '~/components/StackItem'
import { useGetFollowedStacksQuery } from '~/features/kanji/store/kanjiService'

function StacksList() {
  const { data: stacks, isLoading } = useGetFollowedStacksQuery(undefined)

  if (isLoading || !stacks) return <Loading className="text-3xl" />

  return (
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
  )
}

export default StacksList
