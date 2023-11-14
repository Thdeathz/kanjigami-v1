import { type Variants } from 'framer-motion'

type AnimationVariants = {
  container: (delay?: number, stagger?: number) => Variants
  item: () => Variants
}

type TopLeaderVariants = {
  container: Variants
  topBar: (height: string) => Variants
  userInfo: Variants
}

export const gridList: AnimationVariants = {
  container: (delay = 0.1, stagger = 0.1) => ({
    hidden: { opacity: 1, scale: 0 },
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  }),
  item: () => ({
    hidden: { y: 20, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1
    }
  })
}

export const breadCrumb: AnimationVariants = {
  container: (delay = 0.1, stagger = 0.1) => ({
    hidden: { opacity: 1 },
    enter: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  }),
  item: () => ({
    hidden: { x: -20, opacity: 0 },
    enter: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: 'easeInOut'
      }
    }
  })
}

export const topLeader: TopLeaderVariants = {
  container: {
    hidden: { opacity: 1 },
    enter: {
      opacity: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.1
      }
    }
  },
  topBar: height => ({
    hidden: { opacity: 0, height: 0 },
    enter: {
      opacity: 1,
      height,
      transition: {
        duration: 0.35,
        ease: 'easeOut'
      }
    }
  }),
  userInfo: {
    hidden: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        delay: 0.2
      }
    }
  }
}

export const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeInOut'
    }
  }
}
