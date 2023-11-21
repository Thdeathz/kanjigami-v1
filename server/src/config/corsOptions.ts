import { CorsOptions } from 'cors'

import { allowedOrigins } from './allowedOrigins'

const corsOptions: CorsOptions = {
  origin: (origin: any, callback: Function) => {
    callback(null, true)
  },
  credentials: true,
  optionsSuccessStatus: 200
}

export default corsOptions
