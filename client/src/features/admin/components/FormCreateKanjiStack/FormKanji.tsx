import { Form } from 'antd'
import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import Button from '~/components/Button'
import IconWrapper from '~/components/IconWrapper'
import Input from '~/components/Input'
import Panel from '~/components/Panel'
import UploadButton from '~/components/UploadButton'
import InputWrapper from '~/features/user/components/EditProfile/InputWrapper'

import SectionDivider from '../SectionDivider'
import NewKanjiItem from './NewKanjiItem'

type PropsType = {
  kanjis: CreateKanji[]
  setKanjis: React.Dispatch<React.SetStateAction<CreateKanji[]>>
}

function FormKanji({ kanjis, setKanjis }: PropsType) {
  return (
    <div className="flex items-start justify-start gap-12">
      <Panel className="basis-1/2">
        <div className="grid grid-cols-6 gap-4">
          {kanjis.map((each, index) => (
            <Button key={`kanji-item-${index}`}>{each.kanji}</Button>
          ))}

          {kanjis.length === 0 && (
            <p className="w-full whitespace-nowrap text-center text-lg font-medium text-text-light opacity-30 dark:text-text-dark">
              No kanji has been added
            </p>
          )}
        </div>
      </Panel>

      <div className="basis-1/2">
        <NewKanjiItem kanjis={kanjis} setKanjis={setKanjis} />
      </div>
    </div>
  )
}

export default FormKanji
