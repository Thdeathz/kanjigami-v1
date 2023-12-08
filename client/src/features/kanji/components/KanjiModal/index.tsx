import React, { useState } from 'react'

import Button from '~/components/Button'
import Modal from './Modal'

type PropsType = {
  id: string
  kanji: string
}

const KanjiModal = ({ id, kanji }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{kanji}</Button>
      {isOpen && <Modal kanjiId={id} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  )
}

export default KanjiModal
