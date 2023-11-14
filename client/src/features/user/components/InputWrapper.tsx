import React, { ReactNode } from 'react'

type PropsType = {
  id: string
  label: string
  helper: string
  children: ReactNode
  saveButton?: ReactNode
}

function InputWrapper({ id, label, saveButton, helper, children }: PropsType) {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <label htmlFor={id} className="font-semibold text-clr-link-light dark:text-clr-link-dark">
        {label}
      </label>

      {children}

      <p className="text-sm">{helper}</p>

      {saveButton}
    </div>
  )
}

export default InputWrapper
