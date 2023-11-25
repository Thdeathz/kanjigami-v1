import React, { HTMLAttributes } from 'react'
import { BsFileEarmarkImageFill } from 'react-icons/bs'

import IconWrapper from './IconWrapper'

interface PropsType extends HTMLAttributes<HTMLInputElement> {
  isFileExist: boolean
}

function UploadButton({ isFileExist, ...props }: PropsType) {
  return (
    <div className="group relative rounded-full border border-input-border-light bg-input-light px-6 py-2 text-sm font-medium transition-all hover:translate-y-[-3px] active:scale-95 dark:border-input-border-dark dark:bg-input-dark">
      <div className="flex-center gap-2">
        <IconWrapper
          icon={<BsFileEarmarkImageFill />}
          className="text-text-light transition-colors dark:text-text-dark"
        />

        <span className="text-text-light dark:text-text-dark">
          {isFileExist ? 'Select other image' : 'Select image'}
        </span>
      </div>

      <input
        type="file"
        className="absolute right-0 top-0 h-full w-full cursor-pointer opacity-0"
        accept=".png,.jpg,.jpeg"
        {...props}
      />
    </div>
  )
}

export default UploadButton
