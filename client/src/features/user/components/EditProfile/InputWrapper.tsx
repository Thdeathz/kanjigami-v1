import React, { ReactNode } from 'react'

type PropsType = {
  id: string
  label: string
  helper?: string
  children: ReactNode
  saveButton?: ReactNode
}

function InputWrapper({ id, label, saveButton, helper, children }: PropsType) {
  return (
    <div className="flex flex-col items-start justify-start gap-1.5">
      <label htmlFor={id} className="text-base font-medium text-clr-link-light dark:text-clr-link-dark">
        {label}
      </label>

      {children}

      {helper && <p className="text-sm text-text-light dark:text-text-dark">{helper}</p>}

      {saveButton}
    </div>
  )
}

export default InputWrapper
