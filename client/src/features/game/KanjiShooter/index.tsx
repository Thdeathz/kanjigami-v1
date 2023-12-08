import React, { useCallback, useEffect, useRef, useState } from 'react'
import { GiBulletBill } from 'react-icons/gi'

import useAuth from '~/hooks/useAuth'

import GameEnd from '../components/GameEnd'

import Game from './entities/game'

function KanjiShooterGame() {
  const { username, avatarUrl } = useAuth()

  const canvasEl = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const [game, setGame] = useState<Game | null>(null)
  const [isEnd, setIsEnd] = useState<boolean>(false)

  const initGame = useCallback(
    async (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d')
      if (!ctx || isEnd) return

      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.font = '20px Arial'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      setGame(new Game(canvas))
    },
    [isEnd]
  )

  const animate = (timeStamp: number) => {
    const canvas = canvasEl.current
    const ctx = canvasEl.current?.getContext('2d')
    if (!ctx || !canvas || !game) return

    const deltaTime = timeStamp - lastTimeRef.current
    lastTimeRef.current = timeStamp

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    animationIdRef.current = requestAnimationFrame(animate)
    game.render(ctx, deltaTime, animationIdRef.current, setIsEnd)
  }

  useEffect(() => {
    if (canvasEl.current) initGame(canvasEl.current)
  }, [canvasEl, initGame])

  useEffect(() => {
    animationIdRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationIdRef.current)
  })

  return (
    <>
      <>{console.log('==> re-render')}</>
      <canvas width={1600} height={750} ref={canvasEl} id="kanji-shooter-game" className="rounded-md shadow" />

      {isEnd && (
        <div className="flex-center absolute right-0 top-0 z-[3] min-h-content w-full bg-underlay transition-opacity duration-200">
          <GameEnd icon={<GiBulletBill />} title="Game over" />
        </div>
      )}
    </>
  )
}

export default KanjiShooterGame
