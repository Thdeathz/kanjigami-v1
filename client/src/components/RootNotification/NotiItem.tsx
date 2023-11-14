import React from 'react'

import Avatar from '../Avatar'

type PropsType = {
  id: string
}

function NotiItem({ id }: PropsType) {
  return (
    <div className="flex items-center justify-start gap-2 rounded-2xl border-2 border-clr-border-1-light px-3 py-1 text-sm dark:border-clr-border-1-dark">
      <Avatar size="small" />

      <p className="font-semibold">Kantan kanji</p>

      <p>broke own record on #{id} with 155 point.</p>

      <p className="opacity-60">20 minutes ago</p>
    </div>
  )
}

export default NotiItem
