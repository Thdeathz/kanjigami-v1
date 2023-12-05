import { Modal, ModalProps } from 'antd'
import React from 'react'

import Button from './Button'

interface PropsType extends ModalProps {
  children: React.ReactNode
  header: string
  footer?: React.ReactNode
}

function CustomModal({ header, footer, children, ...props }: PropsType) {
  return (
    <Modal
      classNames={{
        body: 'rounded-md bg-[#E2E8F0] dark:bg-[#13181C]',
        mask: 'backdrop-blur-sm bg-[#00000099]'
      }}
      {...props}
      closeIcon={<></>}
      footer={null}
    >
      <div className="rounded-t-md border-t border-profile-border-light bg-divider-light px-5 py-1.5 text-base font-semibold text-text-light dark:border-profile-border-dark dark:bg-divider-dark dark:text-text-dark">
        {header}
      </div>
      <div className="p-8">
        {children}

        {footer}
      </div>
    </Modal>
  )
}

export default CustomModal
