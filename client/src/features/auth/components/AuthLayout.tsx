import React, { ReactNode } from 'react'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Panel from '~/components/Panel'

type PropsType = {
  title: string
  children: ReactNode
}

function AuthLayout({ title, children }: PropsType) {
  return (
    <DefaultLayout className="flex-center relative">
      <Panel className="z-10 max-w-[35rem] shadow-hard-shadow">
        <p className="mb-6 text-center text-2xl font-semibold text-clr-link-light dark:text-clr-link-dark">{title}</p>

        {children}
      </Panel>

      <div className="absolute bottom-0 left-0 h-[8rem] w-full bg-login-bottom bg-contain bg-bottom bg-repeat-x opacity-50 bg-blend-screen before:absolute before:left-0 before:h-full before:w-[12rem] before:bg-gradient-to-r before:from-app-light after:absolute after:left-auto after:right-0 after:h-full after:w-[12rem] after:bg-gradient-to-l after:from-app-light dark:before:from-app-dark dark:after:from-app-dark" />
    </DefaultLayout>
  )
}

export default AuthLayout
