import { motion } from 'framer-motion'
import React from 'react'

import Avatar from '~/components/Avatar'
import { gridList } from '~/config/variants'

type UserItemPropsType = {
  username: string
  avatar: string
}

function UserItem({ avatar, username }: UserItemPropsType) {
  return (
    <motion.div
      className="flex w-full items-center justify-start gap-2 rounded-full bg-gradient-to-r from-ranking-start-light to-ranking-4-10-end-light p-2 shadow-hard-shadow dark:from-ranking-start-dark dark:to-ranking-4-10-end-dark"
      variants={gridList.item()}
    >
      <Avatar src={avatar} username={username} />

      <div className="flex flex-col items-start justify-start gap-1">
        <div className="flex-center gap-1 font-semibold leading-3 text-text-heading-light dark:text-text-heading-dark">
          {username}
        </div>
      </div>
    </motion.div>
  )
}

type PropsType = {
  users: ITopUser[]
}

function LobbyList({ users }: PropsType) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start gap-4"
      variants={gridList.container()}
      initial="hidden"
      animate="enter"
    >
      {users ? (
        <>
          {users.map((user, index) => (
            <UserItem key={`leader-${user.id}`} avatar={user.avatarUrl} username={user.username} />
          ))}
        </>
      ) : (
        <p className="font-semibold opacity-50">Empty...</p>
      )}
    </motion.div>
  )
}

export default LobbyList
