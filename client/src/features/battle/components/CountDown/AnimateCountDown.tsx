/* eslint-disable react/no-array-index-key */
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

type PropsType = {
  number: number
  size?: 'large' | 'normal'
}

type NumberPropsType = {
  value: string
  nextValue: string
  size: 'large' | 'normal'
}

function Number({ value, nextValue, size }: NumberPropsType) {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (nextValue === value) return

    el.current?.classList.remove('changed')

    setTimeout(() => {
      el.current?.classList.add('changing')
    }, 20)

    setTimeout(() => {
      el.current?.classList.add('changed')
      el.current?.classList.remove('changing')
    }, 950)
  }, [nextValue, value])

  const numberClassName = classNames(
    'count relative w-7 rounded-lg text-center text-text-secondary-light dark:text-text-secondary-dark dark:shadow-timer',
    {
      'h-10': size === 'large',
      'h-9': size === 'normal'
    }
  )

  return (
    <div ref={el} className={numberClassName}>
      <span className="current-top absolute left-0 top-0 z-[4] h-[50%] w-full overflow-hidden rounded-t-lg bg-gradient-to-tl from-count-down-start to-count-down-end py-1 shadow-timer-item before:bottom-0 after:rounded-t-lg dark:from-count-down-dark dark:to-count-down-dark">
        {value}
      </span>

      <span className="next-top absolute left-0 top-0 z-[3] h-[50%] w-full overflow-hidden rounded-t-lg bg-gradient-to-tl from-count-down-start  to-count-down-end py-1 shadow-timer-item before:bottom-0 after:rounded-t-lg dark:from-count-down-dark dark:to-count-down-dark">
        {nextValue}
      </span>

      <span className="current-bottom absolute left-0 top-0 z-[1] h-full w-full rounded-lg bg-gradient-to-tl from-count-down-start to-count-down-end py-1 shadow-timer-item before:top-[50%] after:rounded-b-lg dark:from-count-down-dark dark:to-count-down-dark">
        {value}
      </span>

      <span className="next-bottom absolute left-0 top-0 z-[2] h-full w-full rounded-lg bg-gradient-to-tl from-count-down-start to-count-down-end py-1 shadow-timer-item before:top-[50%] after:rounded-b-lg dark:from-count-down-dark dark:to-count-down-dark">
        {nextValue}
      </span>
    </div>
  )
}

function AnimateCountDown({ number, size = 'normal' }: PropsType) {
  const [numbers, setNumbers] = useState<string[]>(number.toString().padStart(2, '0').split(''))
  const [lastNumbers, setLastNumbers] = useState<string[]>(number.toString().padStart(2, '0').split(''))

  useEffect(() => {
    const arr = number.toString().padStart(2, '0').split('')

    setLastNumbers([...numbers])
    setNumbers(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number])

  return (
    <div className={`flex-center gap-1.5 font-medium ${size === 'normal' ? 'text-lg' : 'text-2xl'}`}>
      {numbers.map((n, index) => (
        <Number key={`animate-count-down${index}`} value={lastNumbers[index]} nextValue={n} size={size} />
      ))}
    </div>
  )
}

export default AnimateCountDown
