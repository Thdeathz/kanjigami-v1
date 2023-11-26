import React from 'react'
import { Outlet } from 'react-router-dom'
import { useRegisterSW } from 'virtual:pwa-register/react'

import DefaultLayout from './DefaultLayout'

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onOfflineReady() {
      setOfflineReady(true)
    },
    onNeedRefresh() {
      setNeedRefresh(true)
    }
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (offlineReady || needRefresh)
    return (
      <DefaultLayout className="flex-center flex-col text-2xl font-medium">
        <div className="mb-2">
          {offlineReady ? (
            <span>App ready to work offline</span>
          ) : (
            <span>New content available, click on reload button to update.</span>
          )}
        </div>

        {needRefresh && <button onClick={() => updateServiceWorker(true)}>Reload</button>}

        <button onClick={() => close()}>Close</button>
      </DefaultLayout>
    )

  return <Outlet />
}

export default ReloadPrompt
