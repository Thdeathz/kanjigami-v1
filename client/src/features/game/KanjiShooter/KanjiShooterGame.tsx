import React, { useRef } from 'react'

import useKanjiShooterEvent from '../hooks/useKanjiShooterEvent'

type PropsType = {
  sessionId: string
  userId: string
  stackId: string
  gameId: string
}

function KanjiShooterGame({ sessionId, userId, stackId, gameId }: PropsType) {
  const inputEl = useRef<HTMLInputElement>(null)
  const canvasEl = useRef<HTMLCanvasElement>(null)

  useKanjiShooterEvent({ canvasEl, inputEl, sessionId, userId, stackId, gameId })

  return (
    <div className="relative h-max w-max">
      <canvas ref={canvasEl} width={1600} height={750} id="kanji-shooter-game" className="rounded-md shadow" />

      <input
        ref={inputEl}
        type="text"
        className="absolute top-4 z-10 w-[20rem] border-b-2 text-2xl font-medium"
        style={{
          left: 'calc(50% - 10rem)'
        }}
      />
    </div>
  )
}

export default KanjiShooterGame
