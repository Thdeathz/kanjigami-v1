import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Header from './Header'
import SideBar from './SideBar'
import Footer from './Footer'

type PropsType = {
  children: React.ReactNode
}

const variants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3, type: 'easeOut', when: 'beforeChildren' }
  },
  exit: { opacity: 0 }
}

const DefaultLayout = ({ children }: PropsType) => {
  return (
    <AnimatePresence
      initial={true}
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <div className="flex h-screen w-screen flex-col items-start justify-start overflow-y-auto overflow-x-hidden bg-app-light text-text-light dark:bg-app-dark dark:text-text-dark">
        <Header />

        <div className="flex h-max w-full grow items-start justify-start">
          <SideBar />

          <div className="flex min-h-full w-full grow flex-col items-start justify-start">
            <motion.div
              className="h-full w-full grow p-12"
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              {children}
            </motion.div>

            <Footer />
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default DefaultLayout
