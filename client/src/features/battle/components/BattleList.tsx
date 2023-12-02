import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import Button from '~/components/Button'
import Loading from '~/components/Loading'
import Section from '~/components/Section'
import { gridList } from '~/config/variants'
import { useAppSelector } from '~/hooks/useRedux'

import { useGetBattlesQuery } from '../store/battleService'
import { selectCurrentPage, setCurrentPage } from '../store/battleSlice'

import BattleInfo from './BattleInfo'

type PropsType = {
  title: string
  status: OnlineBattleStatus
}

function BattleList({ title, status }: PropsType) {
  const dispatch = useDispatch()
  const topDivEl = useRef<HTMLDivElement>(null)

  const page = useAppSelector(state => selectCurrentPage(state, status))
  const {
    data: battles,
    isLoading,
    isFetching
  } = useGetBattlesQuery({
    status,
    page
  })

  const handleSwitchPage = (page: number) => {
    dispatch(setCurrentPage({ status, page }))
  }

  if (isLoading)
    return (
      <div className="py-12">
        <Loading className="text-3xl" />
      </div>
    )

  if (!battles || battles.data.length == 0) return <></>

  return (
    <>
      <div ref={topDivEl} />

      <Section title={title} className="mb-12">
        <motion.div
          className="flex flex-col items-start justify-start gap-8"
          variants={gridList.container(0)}
          initial="hidden"
          animate="enter"
        >
          {battles.data.map(battle => (
            <motion.div key={`${status}-event-${battle.id}`} className="w-full" variants={gridList.item()}>
              <BattleInfo status={status} battle={battle} />
            </motion.div>
          ))}

          {isFetching && (
            <div className="flex-center w-full py-12">
              <Loading className="text-3xl" />
            </div>
          )}
        </motion.div>

        <div className="flex-center mt-4 gap-4">
          {page > 1 && (
            <Button
              disabled={isFetching}
              className={`${isFetching && 'opacity-50'}`}
              type="link"
              onClick={() => {
                if (topDivEl.current) topDivEl.current.scrollIntoView({ behavior: 'smooth' })
                setTimeout(() => handleSwitchPage(1), 500)
              }}
            >
              Hidden all
            </Button>
          )}
          {page < battles.totalPages && (
            <Button
              disabled={isFetching}
              className={`${isFetching && 'opacity-50'}`}
              type="link"
              onClick={() => handleSwitchPage(page + 1)}
            >
              Show more
            </Button>
          )}
        </div>
      </Section>
    </>
  )
}

export default BattleList
