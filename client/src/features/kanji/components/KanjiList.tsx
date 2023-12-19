import { motion } from 'framer-motion'
import React, { useCallback, useRef } from 'react'

import Loading from '~/components/Loading'
import StackItem from '~/components/StackItem'
import { gridList } from '~/config/variants'
import { useAppDispatch, useAppSelector } from '~/hooks/useRedux'

import { useGetAllStacksQuery } from '../store/kanjiService'
import { selectCurrentPage, setCurrentPage } from '../store/kanjiSlice'

function KanjiList() {
  const dispatch = useAppDispatch()
  const page = useAppSelector(selectCurrentPage)
  const { data: stacksData, isLoading, isFetching } = useGetAllStacksQuery(page)

  const intObserver = useRef<IntersectionObserver>()
  const listBottomRef = useCallback(
    (stack: Element | null) => {
      if (isLoading) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver(stacks => {
        if (stacks[0].isIntersecting && stacksData && page < stacksData.totalPages && !isFetching) {
          console.log('We are near the last post!')
          // setPageNum(prev => prev + 1)
          dispatch(setCurrentPage({ page: page + 1 }))
        }
      })

      if (stack) intObserver.current.observe(stack)
    },
    [isLoading, isFetching]
  )

  if (isLoading || !stacksData) return <Loading className="text-3xl" />

  return (
    <>
      <motion.div
        className="card-list group pointer-events-none mt-12 grid auto-rows-fr grid-cols-5 gap-8 transition-opacity"
        variants={gridList.container()}
        initial="hidden"
        animate="enter"
      >
        {stacksData.data.map(stack => (
          <StackItem
            key={stack.id}
            stack={stack}
            hightScore={stack.currentUserPoints > 0 ? stack.currentUserPoints : undefined}
          />
        ))}
      </motion.div>

      {isFetching && <Loading className="my-16 text-3xl" />}

      <div ref={listBottomRef} />
    </>
  )
}

export default KanjiList
