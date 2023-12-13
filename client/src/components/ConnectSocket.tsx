import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffectOnce } from 'usehooks-ts'

import { socket } from '~/config/socket'

function ConnectSocket() {
  useEffectOnce(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  })

  return <Outlet />
}

export default ConnectSocket
