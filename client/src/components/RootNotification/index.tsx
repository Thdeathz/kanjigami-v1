import React from 'react'

import NotiItem from './NotiItem'

const RootNotification = () => {
  return (
    <div className="root-noti mb-12 max-w-main-content overflow-hidden whitespace-nowrap ">
      <div className="animate-move-noti">
        <NotiItem />

        <NotiItem />

        <NotiItem />

        <NotiItem />

        <NotiItem />
      </div>
    </div>
  )
}

export default RootNotification
