import React from 'react'
import Avatar from '../Avatar'

const NotiItem = () => {
  return (
    <div className="mx-2 inline-block">
      <div className="flex select-none items-center justify-start gap-2 rounded-2xl border-2 border-clr-border-1-light px-3 py-1 text-sm dark:border-clr-border-1-dark">
        <Avatar size="small" />

        <p className="font-semibold">Kantan kanji</p>

        <p>broke own record on #172 with 155 point.</p>

        <p className="opacity-60">20 minutes ago</p>
      </div>
    </div>
  )
}

export default NotiItem
