import React, { useState } from 'react'
import { Form } from 'antd'

import FlipBlindCardThumbnail from '~/assets/thumbnails/flip-blind-card-thumbnail.png'
import FlipCardThumbnail from '~/assets/thumbnails/flip-card-thumbnail.png'
import KanjiShooterThumbnail from '~/assets/thumbnails/kanji-shooter-thumbnail.png'
import MultipleChoiceThumbnail from '~/assets/thumbnails/multiple-choice-thumbnail.png'
import Image from '~/components/Image'
import newRound from '~/assets/new-round.png'
import Button from '~/components/Button'
import CustomModal from '~/components/CustomModal'
import InputWrapper from '~/features/user/components/InputWrapper'
import Input from '~/components/Input'
import GamesList, { GameItem } from '~/features/kanji/components/GamesList'

type PropsType = {
  index: number
  round: NewRound
  setRounds: React.Dispatch<React.SetStateAction<NewRound[]>>
}

const NewRoundItem = ({ index, round, setRounds }: PropsType) => {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSaveChange = () => {
    setIsOpen(false)
  }

  const handleRemoveRound = () => {
    setRounds(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="group relative rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-card transition-transform duration-200 hover:scale-105 dark:from-card-dark-start dark:to-card-dark-end dark:shadow-dark-panel">
        <Image
          src={newRound}
          alt="round-item"
          className="block aspect-ratio w-full rounded-lg border-[3px] border-solid border-white object-cover dark:border-[#111217]"
        />

        <div className="flex-center invisible absolute left-0 top-0 z-10 h-full w-full flex-col gap-4 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:bg-underlay group-hover:opacity-100">
          <Button onClick={() => setIsOpen(true)}>Edit</Button>
          <Button onClick={handleRemoveRound}>Delete</Button>
        </div>
      </div>

      <CustomModal
        width="70rem"
        header="Add Round"
        open={isOpen}
        onOk={handleSaveChange}
        onCancel={() => setIsOpen(false)}
      >
        <Form form={form} name="add-round-form" autoComplete="off">
          <Form.Item>
            <InputWrapper id="stack" label="Select Kanji Stack">
              <Input id="stack" placeholder="Stack title" />
            </InputWrapper>
          </Form.Item>

          <InputWrapper id="game" label="Select Game">
            <div className="card-list flex-center pointer-events-none mt-4 gap-8 transition-opacity">
              <GameItem name="MULTIPLE CHOOSE" thumbnail={MultipleChoiceThumbnail} isShowHiScore={false} />

              <GameItem name="KANJI SHOOTER" thumbnail={KanjiShooterThumbnail} isShowHiScore={false} />

              <GameItem name="FLIP CARD" thumbnail={FlipCardThumbnail} isShowHiScore={false} />

              <GameItem name="FLIP BLIND CARD" thumbnail={FlipBlindCardThumbnail} isShowHiScore={false} />
            </div>
          </InputWrapper>
        </Form>
      </CustomModal>
    </>
  )
}

export default NewRoundItem
