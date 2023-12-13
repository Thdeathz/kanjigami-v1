import { io } from 'socket.io-client'

const URL = import.meta.env.VITE_API_URL as string

export const socket = io('http://kanjigami.localhost:3000', {
  path: '/api/socket/',
  autoConnect: false
})
