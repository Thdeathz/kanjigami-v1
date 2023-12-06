import { Slider } from 'antd'
import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

import Button from '~/components/Button'
import Panel from '~/components/Panel'

function MultipleChoiceGame() {
  return (
    <>
      <Panel className="flex grow flex-col items-start justify-between gap-6">
        <h1 className="w-full text-center text-3xl font-medium">この町は、昔から (商業) が盛んだった。</h1>

        <div className="grid w-full grow grid-cols-2 grid-rows-2 gap-12 p-12">
          <button className="rounded-md border-2 border-divider-light text-2xl dark:border-divider-dark">
            さんぎょう
          </button>
          <button className="rounded-md border-2 border-divider-light text-2xl shadow-glory-light dark:border-divider-dark">
            しょうぎょう
          </button>
          <button className="rounded-md border-2 border-divider-light text-2xl dark:border-divider-dark">
            じょうぎょう
          </button>
          <button className="rounded-md border-2 border-divider-light text-2xl dark:border-divider-dark">
            ざんぎょう
          </button>
        </div>
      </Panel>

      <Panel className="flex-center gap-4 px-4 py-4">
        <Button className="flex-center gap-2 rounded-md">
          <FaArrowLeftLong />
        </Button>
        <Slider className="w-full grow" defaultValue={30} />
        <Button type="primary" className="flex-center gap-2 rounded-md">
          Next Question <FaArrowRightLong />
        </Button>
      </Panel>
    </>
  )
}

export default MultipleChoiceGame
