import { useEffect, useRef, useState } from 'react'
import { useEffectOnce, useEventListener } from 'usehooks-ts'

import { socket } from '~/config/socket'

import Game from '../KanjiShooter/entities/game'

import useOnCalculateScore from './useOnCalculateScore'
import useOnContentNotFound from './useOnContentNotFound'

type PropsType = {
  canvasEl: React.RefObject<HTMLCanvasElement>
  inputEl: React.RefObject<HTMLInputElement>
  stackId: string
  gameId: string
  sessionId: string
  userId: string
}

function useKanjiShooterEvent({ canvasEl, inputEl, stackId, gameId, sessionId, userId }: PropsType) {
  const animationIdRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const [game, setGame] = useState<Game | null>(null)
  const onContentNotFound = useOnContentNotFound(stackId, gameId)
  const onCalculateScoreSuccess = useOnCalculateScore()

  const initGame = async (canvas: HTMLCanvasElement, kanjis: IKanjiShooterContent[]) => {
    const ctx = canvas.getContext('2d')
    if (!ctx || !inputEl.current) return

    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.font = '20px Arial'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    setGame(new Game(canvas, kanjis, inputEl.current))
  }

  const handleCalculateScore = ({ sessionId, userId, score }: IKanjiShooterCalculateScore) => {
    if (!game) return
    socket.emit('game:kanji-shooter-calculate-score', { sessionId, userId, score })
  }

  const animate = (timeStamp: number) => {
    const canvas = canvasEl.current
    const ctx = canvasEl.current?.getContext('2d')
    if (!ctx || !canvas || !game) return

    const deltaTime = timeStamp - lastTimeRef.current
    lastTimeRef.current = timeStamp

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    animationIdRef.current = requestAnimationFrame(animate)
    game.render(ctx, deltaTime, animationIdRef.current, sessionId, userId, handleCalculateScore)
  }

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationIdRef.current)
  })

  useEffectOnce(() => {
    const onGameContent = ({ kanjis }: { kanjis: IKanjiShooterContent[] }) => {
      if (canvasEl.current) initGame(canvasEl.current, kanjis)
    }

    socket.emit('game:kanji-shooter-get', { sessionId, userId })

    socket.on('game:kanji-shooter-game-content', onGameContent)

    socket.on('game:content-not-found', onContentNotFound)

    socket.on('game:calculate-score-success', onCalculateScoreSuccess)

    return () => {
      socket.off('game:kanji-shooter-game-content', onGameContent)
      socket.off('game:content-not-found', onContentNotFound)
      socket.off('game:calculate-score-success', onCalculateScoreSuccess)
    }
  })

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (!inputEl.current || e.key === ' ') return

    switch (e.key) {
      case 'Enter':
        const hasEnemy = game?.enemyPool.filter(
          enemy => !enemy.free && enemy.keyword && inputEl.current?.value === enemy.keyword.kakikata
        )

        if (!hasEnemy || hasEnemy.length === 0) {
          game?.player.hit(1)
          inputEl.current.value = ''
          return
        }

        let nearestEnemy = null
        if (hasEnemy.length > 1) {
          nearestEnemy = hasEnemy.reduce((prev, curr) => {
            const prevDistance = Math.hypot(
              game?.planet.position.x ?? 0 - prev.position.x,
              game?.planet.position.y ?? 0 - prev.position.y
            )
            const currDistance = Math.hypot(
              game?.planet.position.x ?? 0 - curr.position.x,
              game?.planet.position.y ?? 0 - curr.position.y
            )

            return prevDistance < currDistance ? prev : curr
          })
        } else {
          nearestEnemy = hasEnemy[0]
        }

        nearestEnemy.color = 'red'
        game?.player.shoot(nearestEnemy)

        inputEl.current.value = ''
        break
      case 'Backspace':
        inputEl.current.value = ''
        break
      default:
        if (inputEl.current.value.length > 20) {
          inputEl.current.value = e.key
        } else {
          inputEl.current.value += e.key
        }
        break
    }
  })
}

export default useKanjiShooterEvent
