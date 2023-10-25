import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

import DefaultLayout from './DefaultLayout'
import Button from '../Button'
import { Outlet } from 'react-router-dom'

const intervalMS = 60 * 60 * 1000 // 1 hour

const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // eslint-disable-next-line prefer-template
      console.log('==> SW Registered: ', r)
      r &&
        setInterval(async () => {
          if (!(!r.installing && navigator)) return

          if ('connection' in navigator && !navigator.onLine) return

          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache'
            }
          })

          if (resp?.status === 200) await r.update()
        }, intervalMS)
    },
    onRegisterError(error) {
      console.log('==> SW registration error', error)
    }
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <>
      {offlineReady || needRefresh ? (
        <DefaultLayout>
          <div className="ReloadPrompt-toast">
            <div className="ReloadPrompt-message">
              {offlineReady ? (
                <span>App ready to work offline</span>
              ) : (
                <span>New content available, click on reload button to update.</span>
              )}
            </div>
            {needRefresh && <Button onClick={() => updateServiceWorker(true)}>Reload</Button>}
            <Button onClick={() => close()}>Close</Button>
          </div>
        </DefaultLayout>
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default ReloadPrompt
