import classNames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import IconWrapper from '~/components/IconWrapper'
import { gridList } from '~/config/variants'
import { useFollowStackMutation } from '~/features/kanji/store/kanjiService'
import useAuth from '~/hooks/useAuth'

import Image from './Image'

type PropsType = {
  stack: IStack
  hightScore?: number
  className?: string
}

function getStackItemClassName(className?: string) {
  return classNames(
    'relative card-item pointer-events-auto z-10 cursor-pointer rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2 shadow-card hover:translate-y-[-4px] hover:scale-105 hover:opacity-100 dark:from-card-dark-start dark:to-card-dark-end dark:shadow-dark-panel',
    className
  )
}

function StackItem({ stack, hightScore, className }: PropsType) {
  const navigate = useNavigate()
  const { isUser } = useAuth()
  const [followStack, { isLoading }] = useFollowStackMutation(undefined)

  const stackItemClassName = getStackItemClassName(className)

  return (
    <motion.div className={stackItemClassName} variants={gridList.item(0.1)}>
      <div onClick={() => navigate(`/kanji/${stack.id}`)}>
        <div className="w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
          <Image
            src={stack.thumbnail}
            alt="stack-thumbnail"
            className="aspect-ratio w-full rounded-lg bg-center object-cover"
          />
        </div>

        <p className="mt-2 px-2 text-lg font-semibold">{stack.name}</p>

        <div className="flex items-center justify-between p-2">
          <div>
            <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Your hi-score</p>
            <p
              className={`text-base font-medium ${
                hightScore ? 'text-profile-avatar-outline-light dark:text-profile-avatar-outline-dark' : ''
              }`}
            >
              {hightScore ?? 'Not played'}
            </p>
          </div>
        </div>
      </div>

      {isUser && (
        <button
          className="absolute bottom-4 right-4 z-10 aspect-square rounded-full bg-clr-border-1-light p-3 transition-transform duration-200 active:scale-90 dark:bg-clr-border-1-dark"
          onClick={() => followStack(stack.id)}
          disabled={isLoading}
        >
          <IconWrapper
            className="text  -primary-light"
            icon={stack.isFollowed ? <BsBookmarksFill /> : <BsBookmarks />}
          />
        </button>
      )}
    </motion.div>
  )
}

export default StackItem
