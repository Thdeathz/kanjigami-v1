import React from 'react'

import Image from '~/components/Image'
import Panel from '~/components/Panel'
import { useAppDispatch } from '~/hooks/useRedux'

import { updateMultipleChoiceSelectedAnswers } from '../store/gameSlice'

type PropsType = {
  data: IMultipleChoiceGameContent
  questionIndex: number
}

function QuestionPanel({ data, questionIndex }: PropsType) {
  const dispatch = useAppDispatch()

  const handleSelect = (answer: number) => {
    dispatch(updateMultipleChoiceSelectedAnswers({ question: questionIndex, answer }))
  }

  return (
    <Panel className="flex grow flex-col items-start justify-between gap-6">
      {data.question.type === 'kanji' && (
        <h1 className="w-full text-center text-3xl font-medium">{data.question.kanji}</h1>
      )}

      {data.question.type === 'image' && (
        <Image className="h-48 w-full rounded-md object-contain" src={data.question.image} alt="question" />
      )}

      <div className="grid w-full grow grid-cols-2 grid-rows-2 gap-12 p-12">
        {data.options.map((each, index) => (
          <button
            key={`multiple-choice-option-${index}`}
            className={`rounded-md border-2 border-divider-light text-2xl transition-colors duration-200 dark:border-divider-dark dark:hover:border-input-glory-light ${
              data.selectedAnswer === index ? 'dark:bg-input-glory-dark bg-input-glory-light' : ''
            }`}
            onClick={() => handleSelect(index)}
          >
            {each.option}
          </button>
        ))}
      </div>
    </Panel>
  )
}

export default QuestionPanel
