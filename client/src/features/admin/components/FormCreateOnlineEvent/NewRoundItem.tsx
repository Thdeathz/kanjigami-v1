import { Form, Radio, message } from 'antd'
import React, { useState } from 'react'

import newRound from '~/assets/lock.png'

import Button from '~/components/Button'
import CustomModal from '~/components/CustomModal'
import Image from '~/components/Image'

import FormItem from '../FormItem'
import StackSearch from './StackSearch'
import { useGetAllGamesQuery } from '~/features/kanji/store/kanjiService'
import Loading from '~/components/Loading'

type PropsType = {
  index: number
  round: NewRound
  setRounds: React.Dispatch<React.SetStateAction<NewRound[]>>
}

type NewRoundForm = {
  stack: string
  game: IGame
}

function NewRoundItem({ index, round, setRounds }: PropsType) {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data: games, isLoading } = useGetAllGamesQuery(undefined)

  const onFinish = (values: NewRoundForm) => {
    if (!values.game || !values.stack) {
      message.error('Please select a game and a stack')
      return
    }

    const stack = JSON.parse(values.stack)
    setRounds(prev => {
      const newRounds = [...prev]
      newRounds[index] = {
        stack: {
          id: stack.id,
          thumbnail: stack.thumbnail
        },
        game: {
          id: values.game.id,
          name: values.game.name
        }
      }
      return newRounds
    })
    setIsOpen(false)
  }

  const handleRemoveRound = () => {
    setRounds(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <div className="group relative rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-card transition-transform duration-200 hover:scale-105 dark:from-card-dark-start dark:to-card-dark-end dark:shadow-dark-panel">
        <Image
          src={round.stack.thumbnail || newRound}
          alt="round-item"
          className="block aspect-ratio w-full rounded-lg border-[3px] border-solid border-white object-cover dark:border-[#111217]"
        />

        {round.game.id && (
          <p className="absolute right-4   top-4   z-10 bg-neutral-13 px-1.5 py-0.5 text-sm font-medium text-white">
            {round.game.name}
          </p>
        )}

        <div className="flex-center invisible absolute left-0 top-0 z-10 h-full w-full flex-col gap-4 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:bg-underlay group-hover:opacity-100">
          <Button onClick={() => setIsOpen(true)}>Edit</Button>
          <Button onClick={handleRemoveRound}>Delete</Button>
        </div>
      </div>

      <CustomModal width="70rem" header="Add Round" open={isOpen} onCancel={() => setIsOpen(false)}>
        <Form form={form} onFinish={onFinish} name="add-round-form" autoComplete="off">
          <FormItem name="stack" label="Select Kanji Stack">
            <StackSearch
              id="stack"
              placeholder="Enter stack name"
              onChange={newValue => form.setFieldsValue({ stack: newValue })}
            />
          </FormItem>

          <FormItem name="game" label="Select Game">
            <Radio.Group
              className="card-list pointer-events-none mt-4 grid  min-h-[15rem] grid-cols-4 gap-6   transition-opacity"
              id="game"
              buttonStyle="solid"
            >
              {(isLoading || !games) && <Loading className="text-2xl" />}

              {games?.map(game => (
                <Radio.Button id={game.id} key={game.id} value={game} className="relative">
                  <div className="absolute left-0 top-0 h-full w-full">
                    <div className="card-item pointer-events-auto cursor-pointer flex-col rounded-2xl bg-gradient-to-tl from-card-light-start from-0% to-card-light-end to-100% p-2.5 shadow-glory-light hover:scale-105 hover:opacity-100 hover:shadow-glory-hover dark:from-card-dark-start dark:to-card-dark-end dark:shadow-glory-dark">
                      <div className="aspect-ratio w-full rounded-lg border-[3px] border-white dark:border-[#111217]">
                        <Image
                          src={game.thumbnail}
                          alt="round-game"
                          className="h-full w-full rounded-lg object-cover object-top"
                        />
                      </div>
                    </div>

                    <p className="mx-auto mt-4 w-min whitespace-nowrap rounded-md bg-gradient-to-tr from-filter-start-light to-filter-end-light p-1.5 font-medium uppercase dark:from-filter-start-dark dark:to-filter-end-dark">
                      {game.name}
                    </p>
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </FormItem>

          <div className="mt-8 flex items-center justify-end gap-2">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>

            <Button htmlType="submit" type="primary">
              Save & Close
            </Button>
          </div>
        </Form>
      </CustomModal>
    </>
  )
}

export default NewRoundItem
