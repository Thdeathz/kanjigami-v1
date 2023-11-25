import { Modal, ModalProps } from 'antd'
import React from 'react'

import Button from './Button'

interface PropsType extends ModalProps {
  children: React.ReactNode
  header: string
}

const CustomModal = ({ header, children, ...props }: PropsType) => {
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
        <div className="mt-8 flex items-center justify-end gap-2">
          <Button onClick={props.onCancel as React.MouseEventHandler<HTMLButtonElement>}>Cancel</Button>

          <Button type="primary" onClick={props.onOk as React.MouseEventHandler<HTMLButtonElement>}>
            Save & Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CustomModal
