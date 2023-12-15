import { motion, animate, useMotionValue } from 'framer-motion'
import React, { useState, useEffect, useCallback } from 'react'

import { useFlubber } from '~/hooks/useFlubber'

type PropsType = {
  paths: string[]
  state: boolean
  direction: 1 | -1
}

function SVGMorph({ paths, state, direction }: PropsType) {
  const [pathIndex, setPathIndex] = useState(state ? paths.length - 1 : 0)
  const progress = useMotionValue(pathIndex)
  const path = useFlubber(progress, paths)

  const animatePath = useCallback(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.15,

      onComplete: () => {
        if ((direction === 1 && pathIndex === paths.length - 1) || (direction === -1 && pathIndex === 0)) {
          animation.stop()
          return
        }

        setPathIndex(pathIndex + direction)
      }
    })

    return () => {
      animation.stop()
    }
  }, [pathIndex, direction])

  useEffect(animatePath, [animatePath])

  return (
    <>
      {console.log('==> change state', state)}
      <motion.path fill="white" d={path} />
    </>
  )
}

export default SVGMorph
