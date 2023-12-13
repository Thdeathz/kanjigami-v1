import React from 'react'
import { useToggle } from 'usehooks-ts'

import Button from '~/components/Button'

import Modal from './Modal'

type PropsType = {
  id: string
  kanji: string
}

function KanjiModal({ id, kanji }: PropsType) {
  const [value, toggle, setValue] = useToggle()

  return (
    <>
      <Button onClick={toggle}>{kanji}</Button>
      {value && <Modal kanjiId={id} isOpen={value} setIsOpen={setValue} />}
    </>
  )
}

export default KanjiModal
