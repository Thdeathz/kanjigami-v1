import { Slider } from 'antd'
import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { useStep } from 'usehooks-ts'

import Button from '~/components/Button'
import Panel from '~/components/Panel'

import QuestionPanel from './QuestionPanel'

type PropsType = {
  gameContent: IMultipleChoiceGameContent[]
  onCalculateScore: () => void
}

function MultipleChoiceGameContent({ gameContent, onCalculateScore }: PropsType) {
  const [currentStep, helpers] = useStep(gameContent.length)

  const { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep, setStep } = helpers

  const onChangeStep = (step: number) => {
    setStep(step)
  }

  return (
    <div className="flex-center min-h-content w-full flex-col gap-6 py-12">
      <QuestionPanel questionIndex={currentStep - 1} data={gameContent[currentStep - 1]} />

      <Panel className="flex-center gap-4 px-4 py-4">
        <Button disabled={!canGoToPrevStep} className="flex-center gap-2 rounded-md" onClick={goToPrevStep}>
          <FaArrowLeftLong />
        </Button>

        <Slider className="w-full grow" min={1} max={gameContent.length} value={currentStep} onChange={onChangeStep} />

        {currentStep === gameContent.length ? (
          <Button type="primary" className="flex-center gap-2 rounded-md" onClick={onCalculateScore}>
            Submit
          </Button>
        ) : (
          <Button
            disabled={!canGoToNextStep}
            type="primary"
            className="flex-center gap-2 rounded-md"
            onClick={goToNextStep}
          >
            Next Question <FaArrowRightLong />
          </Button>
        )}
      </Panel>
    </div>
  )
}

export default MultipleChoiceGameContent
