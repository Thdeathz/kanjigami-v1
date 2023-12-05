import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

import Footer from '~/components/Layouts/Footer'
import Header from '~/components/Layouts/Header'
import SideBar from '~/components/Layouts/SideBar'
import Panel from '~/components/Panel'

type PropsType = {
  title: string
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

function AuthLayout({ title, children }: PropsType) {
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
        <Header />

        <div className="flex h-max items-start justify-start">
          <SideBar />

          <div className="w-0 shrink grow">
            <div className="flex-center relative mx-auto min-h-content max-w-[1600px] grow p-12">
              <motion.div className="w-[35rem]" variants={variants} initial="hidden" animate="enter" exit="exit">
                <Panel className="z-10  shadow-hard-shadow">
                  <p className="mb-6 text-center text-2xl font-semibold text-clr-link-light dark:text-clr-link-dark">
                    {title}
                  </p>

                  {children}
                </Panel>
              </motion.div>

              <div className="absolute bottom-0 left-0 h-[8rem] w-full bg-login-bottom bg-contain bg-bottom bg-repeat-x opacity-50 bg-blend-screen before:absolute before:left-0 before:h-full before:w-[12rem] before:bg-gradient-to-r before:from-app-light after:absolute after:left-auto after:right-0 after:h-full after:w-[12rem] after:bg-gradient-to-l after:from-app-light dark:before:from-app-dark dark:after:from-app-dark" />
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default AuthLayout
