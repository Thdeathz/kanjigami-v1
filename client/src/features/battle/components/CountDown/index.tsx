import React, { useRef, useState } from 'react'
import { useEffectOnce } from 'usehooks-ts'

import { getDateDifference } from '~/utils/countDown'
import { convertToUserTimeZone } from '~/utils/timezone'

import TimeItem from './TimeItem'

type PropsType = {
  size?: 'large' | 'normal'
  type?: 'animate' | 'normal'
  maxLength?: number
  onFinish?: () => void
  endTime: Date
}

function CountDown({ size = 'normal', maxLength = 4, type = 'normal', endTime, onFinish }: PropsType) {
  const [remaining, setRemaining] = useState<RemainingTime | null>(null)
  const intervalRef = useRef<number>()

  const update = () => {
    const now = new Date()
    const countTo = convertToUserTimeZone(endTime)
    if (now > countTo) {
      clearInterval(intervalRef.current)

      if (typeof onFinish === 'function') onFinish()
      return
    }
    let diff = getDateDifference(now, countTo)

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

    intervalRef.current = setInterval(update, 1000)
    const interval = intervalRef.current

    return () => {
      clearInterval(interval)
    }
  })

  const isShowDays = remaining?.days && remaining.days !== undefined
  const isShowHours = (isShowDays || remaining?.hours) && remaining.hours !== undefined
  const isShowMinutes = (isShowHours || remaining?.minutes) && remaining.minutes !== undefined
  const isShowSecondes = (isShowMinutes || remaining?.seconds) && remaining.seconds !== undefined

  return (
    <div className="flex-center gap-1">
      {isShowDays && (
        <TimeItem
          value={remaining.days}
          size={size}
          label={type === 'animate' ? 'days' : 'd'}
          type={type}
          isHiddenSeparator={!isShowHours}
        />
      )}

      {isShowHours && (
        <TimeItem
          value={remaining.hours}
          size={size}
          label={type === 'animate' ? 'hours' : 'h'}
          isHiddenSeparator={!isShowMinutes}
          type={type}
        />
      )}

      {isShowMinutes && (
        <TimeItem
          value={remaining.minutes}
          size={size}
          label={type === 'animate' ? 'minutes' : 'm'}
          isHiddenSeparator={!isShowSecondes}
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
