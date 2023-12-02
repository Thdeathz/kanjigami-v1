import { Form, FormItemProps } from 'antd'
import React, { ReactNode } from 'react'

interface PropsType extends FormItemProps {
  name: string
  label: string
  className?: string
  children: ReactNode
}

function FormItem({ name, label, className, children, ...props }: PropsType) {
  return (
    <div className={`flex flex-col items-start justify-start gap-1.5 ${className}`}>
      <label htmlFor={name} className="text-base font-medium text-clr-link-light dark:text-clr-link-dark">
        {label}
      </label>

      <Form.Item name={name} className="w-full" initialValue="" {...props}>
        {children}
      </Form.Item>
    </div>
  )
}

export default FormItem
