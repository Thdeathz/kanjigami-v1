import React from 'react'

type PropsType = {
  size?: 'large' | 'normal'
  type?: 'full' | 'short'
}

type TimeItemPropsType = {
  value: number
  label: string
  size?: 'large' | 'normal'
  isSecond?: boolean
}

const TimeItem = ({ value, label, size = 'normal', isSecond = false }: TimeItemPropsType) => {
  return (
    <div className="flex items-start justify-center gap-1">
      <div className="flex-center flex-col gap-1">
        <div
          className={`flex-center gap-1.5 font-medium ${
            size === 'normal' ? 'text-lg' : 'text-2xl'
          }`}
        >
          <p className="rounded-lg bg-gradient-to-tl from-count-down-start to-count-down-end px-1.5 py-0.5 text-text-secondary-light dark:from-count-down-dark dark:to-count-down-dark dark:text-text-secondary-dark dark:shadow-timer">
            0
          </p>

          <p className="rounded-lg bg-gradient-to-tl from-count-down-start to-count-down-end px-1.5 py-0.5 text-text-secondary-light dark:bg-count-down-dark dark:from-count-down-dark dark:to-count-down-dark dark:text-text-secondary-dark dark:shadow-timer">
            {value}
          </p>
        </div>

        <p className="text-xs font-medium uppercase text-footer-light-text">{label}</p>
      </div>

      {!isSecond && <p className="text-2xl font-bold text-footer-light-text">:</p>}
    </div>
  )
}

const CountDown = ({ size = 'normal', type = 'full' }: PropsType) => {
  return (
    <div className="flex-center gap-1">
      {type === 'full' && <TimeItem value={1} size={size} label="days" />}

      {type === 'full' && <TimeItem value={1} size={size} label="hours" />}

      <TimeItem value={1} size={size} label="minutes" />

      <TimeItem value={1} size={size} label="seconds" isSecond />
    </div>
  )
}

export default CountDown
