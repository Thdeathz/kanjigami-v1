import React, { useRef, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import { getDateDifference } from '~/utils/countDown'
import TimeItem from './TimeItem'

type PropsType = {
  size?: 'large' | 'normal'
  type?: 'animate' | 'normal'
  maxLength?: number
  onFinish?: () => void
}

const CountDown = ({ size = 'normal', maxLength = 4, type = 'normal', onFinish }: PropsType) => {
  const [remaining, setRemaining] = useState<RemainingTime | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalRef = useRef<any>()

  const update = () => {
    const now = new Date()
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    if (now > endTime) {
      clearInterval(intervalRef.current)

      if (typeof onFinish === 'function') onFinish()
      return
    }
    let diff = getDateDifference(now, endTime)

    if (maxLength) {
      const parts = ['days', 'hours', 'minutes', 'seconds'].map(part => {
        const key = part as keyof RemainingTime
        return { [key]: diff[key], val: diff[key] }
      })

      const index = parts.findIndex(p => p.val > 0)

      parts.splice(0, index)
      parts.length = maxLength
      diff = Object.assign({}, ...parts)
    }

    setRemaining(diff)
  }

  useEffectOnce(() => {
    update()

    const interval = (intervalRef.current = setInterval(update, 1000))

    return () => {
      clearInterval(interval)
    }
  })

  const isShowHours = remaining?.days || remaining?.hours
  const isShowMinutes = (isShowHours || remaining?.minutes) && remaining.minutes !== undefined
  const isShowSecondes = (isShowMinutes || remaining?.seconds) && remaining.seconds !== undefined

  return (
    <div className="flex-center gap-1">
      {remaining?.days && (
        <TimeItem
          value={remaining.days}
          size={size}
          label={type === 'animate' ? 'days' : 'd'}
          type={type}
        />
      )}

      {isShowHours && (
        <TimeItem
          value={remaining.hours}
          size={size}
          label={type === 'animate' ? 'hours' : 'h'}
          isHiddenSeparator={maxLength === 1}
          type={type}
        />
      )}

      {isShowMinutes && (
        <TimeItem
          value={remaining.minutes}
          size={size}
          label={type === 'animate' ? 'minutes' : 'm'}
          isHiddenSeparator={maxLength === 2}
          type={type}
        />
      )}

      {isShowSecondes && (
        <TimeItem
          value={remaining?.seconds ?? 0}
          size={size}
          label={type === 'animate' ? 'seconds' : 's'}
          isHiddenSeparator
          type={type}
        />
      )}
    </div>
  )
}

export default CountDown
