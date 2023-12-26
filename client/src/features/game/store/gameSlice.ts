import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '~/@types/app'

type StateType = {
  flipCard: {
    time?: string
    gameContent: (ImageContent | KanjiContent)[]
    score: number
  }
  multipleChoice: {
    time?: string
    gameContent: IMultipleChoiceGameContent[]
  }
  kanjiShooter: {
    gameContent: IKanjiShooterContent[]
  }
}

const initialState: StateType = {
  flipCard: {
    gameContent: [],
    score: 0
  },
  multipleChoice: {
    gameContent: []
  },
  kanjiShooter: {
    gameContent: []
  }
}

const gameSlice = createSlice({
  initialState,
  name: 'game',
  reducers: {
    startFlipCardGame: (state, action) => {
      const { score, time, gameContent } = action.payload as {
        score: number
        time: Date
        gameContent: (ImageContent | KanjiContent)[]
      }

      state.flipCard.time = time.toString()
      state.flipCard.gameContent = gameContent
      state.flipCard.score = score
    },
    updateFlipCardScore: (state, action) => {
      const { score } = action.payload as { score: number }

      state.flipCard.score = score
    },
    resetFlipCardState: (state, action) => {
      state.flipCard = initialState.flipCard
    },
    startMultipleChoiceGame: (state, action) => {
      const { time, gameContent } = action.payload as {
        time: Date
        gameContent: IMultipleChoiceGameContent[]
      }

      state.multipleChoice.time = time.toString()
      state.multipleChoice.gameContent = gameContent
    },
    updateMultipleChoiceSelectedAnswers: (state, action) => {
      const { question, answer } = action.payload as { question: number; answer: number }

      state.multipleChoice.gameContent = state.multipleChoice.gameContent.map((content, index) => {
        if (index === question) {
          return {
            ...content,
            selectedAnswer: answer
          }
        }

        return content
      })
    },
    resetMultipleChoiceState: (state, action) => {
      state.multipleChoice = initialState.multipleChoice
    },
    startKanjiShooterGame: (state, action) => {
      state.kanjiShooter.gameContent = action.payload
    }
  }
})

export const {
  startFlipCardGame,
  updateFlipCardScore,
  resetFlipCardState,
  startMultipleChoiceGame,
  updateMultipleChoiceSelectedAnswers,
  resetMultipleChoiceState,
  startKanjiShooterGame
} = gameSlice.actions

export default gameSlice.reducer

export const selectFlipCardGameData = (state: RootState) => state.game.flipCard

export const selectMultipleChoiceGameData = (state: RootState) => state.game.multipleChoice

export const selectKanjiShooterGameData = (state: RootState) => state.game.kanjiShooter.gameContent
