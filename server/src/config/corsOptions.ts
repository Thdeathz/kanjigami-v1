import { CorsOptions } from 'cors'

import { allowedOrigins } from './allowedOrigins'
import HttpError from '~/api/helpers/httpError'

const corsOptions: CorsOptions = {
  origin: (origin: any, callback: Function) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new HttpError('Not allowed by CORS', 403))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

export default corsOptions
