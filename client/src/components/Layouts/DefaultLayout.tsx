import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

import Footer from './Footer'
import Header from './Header'
import { BreadcrumbItem } from './Header/Breadcrumb'
import SideBar from './SideBar'

type PropsType = {
  breadcrumbs?: BreadcrumbItem[]
  className?: string
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

function DefaultLayout({ breadcrumbs, className, children }: PropsType) {
  return (
    <AnimatePresence
      initial
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <div className="h-screen w-screen overflow-y-auto bg-app-light text-text-light dark:bg-app-dark dark:text-text-dark">
        <Header breadcrumbs={breadcrumbs} />

        <div className="flex h-max items-start justify-start">
          <SideBar />

          <div className="w-0 shrink grow">
            <motion.div
              className={`mx-auto min-h-content max-w-[1600px] grow p-12 ${className}`}
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
