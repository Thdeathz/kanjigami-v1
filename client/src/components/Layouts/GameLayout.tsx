import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

import Footer from './Footer'
import Header from './Header'
import { BreadcrumbItem } from './Header/Breadcrumb'
import SideBar from './SideBar'

type PropsType = {
  breadcrumbs?: BreadcrumbItem[]
  className?: string
  game: 'blind-card' | 'flip-card'
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

function GameLayout({ breadcrumbs, className, game, children }: PropsType) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <AnimatePresence
      initial
      onExitComplete={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 })
        }
      }}
    >
      <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-app-light text-text-light dark:bg-app-dark dark:text-text-dark">
        <Header
          breadcrumbs={breadcrumbs}
          hiddenSideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />

        <div
          className={`
            relative flex h-max items-start justify-start bg-cover bg-top ${game} dark:${game}-dark
          `}
        >
          <SideBar fixedSideBar={false} isSideBarOpen={isSideBarOpen} />

          <div className="w-0 shrink grow">
            <motion.div
              className={`mx-auto min-h-content max-w-[1600px] overflow-hidden p-12 ${className}`}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
            >
              {children}
            </motion.div>

            <button
              type="button"
              aria-label="Toggle Sidebar"
              className={`
                absolute left-0 top-0 z-[4] min-h-content w-screen bg-underlay transition-opacity duration-200 
                ${isSideBarOpen ? 'visible opacity-100' : 'invisible opacity-0'}
              `}
              onClick={() => setIsSideBarOpen(prev => !prev)}
            />

            <Footer />
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default GameLayout
