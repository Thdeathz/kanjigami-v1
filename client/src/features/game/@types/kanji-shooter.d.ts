declare interface IGame {
  id: string
  name: string
}

declare type Position = {
  x: number
  y: number
}

declare interface ILayer {
  image: HTMLImageElement
  framesMax: number
  framesCurrent: number
  offset: Position
  imageSrc: string
}

declare interface ISpriteState {
  [key: string]: ILayer[]
}

declare interface ISprite {
  position: Position
  radius?: number
  scale?: number
  framesElapsed?: number
  framesHold?: number
  isRotatable?: boolean
  angle?: number
  sprites: ISpriteState
}

declare interface IEnemy {
  sprites: ISpriteState
  radius: number
  speed?: number
  damage: number
  framesHold?: number
  keyword: string
  id: number
  scale?: number
  maxLives?: number
}
