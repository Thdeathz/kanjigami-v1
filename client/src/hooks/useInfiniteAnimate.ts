import { useCallback, useEffect, useRef, useState } from 'react'

const useInfiniteAnimate = () => {
  const [looperInstances, setLooperInstances] = useState(1)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const resetAnimation = () => {
    if (innerRef?.current) {
      innerRef.current.setAttribute('data-animate', 'false')

      setTimeout(() => {
        if (innerRef?.current) {
          innerRef.current.setAttribute('data-animate', 'true')
        }
      }, 50)
    }
  }

  const setupInstances = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return

    const { width } = innerRef.current.getBoundingClientRect()

    const { width: parentWidth } = outerRef.current.getBoundingClientRect()

    const instanceWidth = width / innerRef.current.children.length

    if (width < parentWidth + instanceWidth) {
      setLooperInstances(looperInstances + Math.ceil(parentWidth / width))
    }

    resetAnimation()
  }, [looperInstances])

  useEffect(() => {
    setupInstances()
  }, [setupInstances])

  useEffect(() => {
    window.addEventListener('resize', setupInstances)

    return () => {
      window.removeEventListener('resize', setupInstances)
    }
  }, [looperInstances, setupInstances])

  return { outerRef, innerRef, looperInstances }
}

export default useInfiniteAnimate
