import { useEffect } from 'react'

import { socket } from '~/config/socket'
import { useAppDispatch } from '~/hooks/useRedux'

import { updateFlipCardScore } from '../store/gameSlice'

type PropsType = {
  activedCard: ActivedCard[]
  setActivedCard: React.Dispatch<React.SetStateAction<ActivedCard[]>>
  userId: string
  sessionId?: string
  score: number
  handleCalculateScore?: () => void
}

function useActiveCardChanges({
  activedCard,
  setActivedCard,
  userId,
  sessionId,
  score,
  handleCalculateScore
}: PropsType) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (activedCard.length === 2) {
      const [firstCard, secondCard] = activedCard

      if (firstCard.kanji.id === secondCard.kanji.id && firstCard.kanji.type !== secondCard.kanji.type) {
        setTimeout(() => {
          firstCard.card.classList.add('invisible')
          secondCard.card.classList.add('invisible')
          setActivedCard(prev => prev.filter(each => each.kanji.id !== firstCard.kanji.id))
          dispatch(updateFlipCardScore({ score: score + 1 }))

          if (sessionId) {
            socket.emit('game:blind-card-update', {
              userId,
              sessionId,
              kanjiId: firstCard.kanji.id
            })
          }

          if (score + 1 === 12 && handleCalculateScore) {
            handleCalculateScore()
          }
        }, 100)
      }

      setTimeout(() => {
        firstCard.card.classList.remove('flip')
        secondCard.card.classList.remove('flip')
        setActivedCard(prev =>
          prev.filter(each => each.kanji.id !== firstCard.kanji.id && each.kanji.id !== secondCard.kanji.id)
        )
      }, 650)
    }
  }, [activedCard])
}

export default useActiveCardChanges
