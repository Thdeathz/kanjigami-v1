/* eslint-disable react/no-array-index-key */
import React from 'react'

import useInfiniteAnimate from '~/hooks/useInfiniteAnimate'

import NotiItem from './NotiItem'

function RootNotification() {
  const { outerRef, innerRef, looperInstances } = useInfiniteAnimate()

  const notiLength = 10

  return (
    <div className="root-noti w-full overflow-hidden" ref={outerRef}>
      <div className="looper__innerList flex w-fit justify-center gap-2" ref={innerRef}>
        {[...Array(looperInstances)].map((_, index) => (
          <div
            key={`looper-instance-${index}`}
            className="looper__listInstance flex w-max select-none gap-4"
            style={{
              animationDuration: `${notiLength * 10}s`
            }}
          >
            {Array.from(Array(notiLength).keys()).map(each => (
              <NotiItem key={`root-noti-${each}`} id={JSON.stringify(each)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RootNotification
