import { interpolate } from 'flubber'
import { MotionValue, useTransform } from 'framer-motion'

export function useFlubber(progress: MotionValue<number>, paths: string[]) {
  return useTransform(
    progress,
    paths.map((_, i) => i),
    paths,
    {
      mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 1 })
    }
  )
}
