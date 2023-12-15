import React from 'react'

import CustomModal from '~/components/CustomModal'
import Image from '~/components/Image'

import { useGetKanjiDetailQuery } from '../../store/kanjiService'

type PropsType = {
  kanjiId: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type KanjiItemPropsType = {
  title: string
  value: string
}

function KanjiItem({ title, value }: KanjiItemPropsType) {
  return (
    <>
      <div
        className={`rounded px-2 py-1 text-base font-medium ${
          title.trim().length > 0 && 'bg-table-header-light dark:bg-table-header-dark'
        }`}
      >
        {title}
      </div>
      <div className="col-span-3 text-lg">{value}</div>
    </>
  )
}

function Modal({ kanjiId, isOpen, setIsOpen }: PropsType) {
  const { data: kanji, isLoading } = useGetKanjiDetailQuery(kanjiId)

  if (isLoading || !kanji) return <></>

  return (
    <CustomModal width="70rem" header={kanji.kanji} open={isOpen} onCancel={() => setIsOpen(false)}>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-cols-4 items-start gap-4 text-text-light dark:text-text-dark">
          <KanjiItem title="Kanji" value={kanji.kanji} />

          <KanjiItem title="Kunyomi" value={kanji.kunyomi} />

          <KanjiItem title="Onyomi" value={kanji.onyomi} />

          <KanjiItem title="Yomikata" value={kanji.vocabularies[0].yomikata} />

          <KanjiItem title="Meaning" value={kanji.vocabularies[0].meaning} />

          <KanjiItem title="Example" value={kanji.vocabularies[0].examples[0].example} />

          <KanjiItem title="  " value={kanji.vocabularies[0].examples[0].meaning} />
        </div>

        <Image className="rounded-md" src={kanji.images[0].url} alt="example-image" />
      </div>
    </CustomModal>
  )
}

export default Modal
