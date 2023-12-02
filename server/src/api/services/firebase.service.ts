import { getStorage } from 'firebase-admin/storage'
import { v4 } from 'uuid'

import HttpError from '../helpers/httpError'

type storeFileType = (file: Buffer | string, prefix: string, extention: string) => Promise<string>

const urlPrefix = `https://storage.googleapis.com/${process.env.FIREBASE_PROJECT_ID}.appspot.com`

const storeFile: storeFileType = async (file, prefix, extention) => {
  try {
    const bucket = getStorage().bucket()

    const fileName = `${prefix}/${v4()}.${extention}`

    const fileRef = bucket.file(fileName)
    await fileRef.save(file, {
      public: true
    })

    return `${urlPrefix}/${fileName}`
  } catch (error) {
    console.log(error)
    throw new HttpError(500, 'Internal server error')
  }
}

export default {
  storeFile
}
