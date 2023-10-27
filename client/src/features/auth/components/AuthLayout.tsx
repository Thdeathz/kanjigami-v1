import React, { ReactNode } from 'react'

import DefaultLayout from '~/components/Layouts/DefaultLayout'
import Panel from '~/components/Panel'

type PropsType = {
  title: string
  children: ReactNode
}

const AuthLayout = ({ title, children }: PropsType) => {
  return (
    <DefaultLayout className="flex-center relative">
      <Panel className="z-10 max-w-[35rem] shadow-hard-shadow">
        <p className="mb-6 text-center text-2xl font-semibold text-clr-link-light dark:text-clr-link-dark">
          {title}
        </p>

        {children}
      </Panel>

      <div className="login-bottom absolute bottom-0 left-0 h-[8rem] w-full opacity-50"></div>
    </DefaultLayout>
  )
}

export default AuthLayout
