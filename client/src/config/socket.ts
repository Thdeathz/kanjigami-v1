import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_SOCKET_URL as string

export const socket = io(URL, {
  withCredentials: true,
  path: '/api/socket/',
  autoConnect: false
})
