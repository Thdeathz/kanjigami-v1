/* eslint-disable @typescript-eslint/ban-types */
class Sprite {
  position: Position

  radius: number

  scale: number

  framesElapsed: number

  framesHold: number

  private isRotatable: boolean

  sprites: ISpriteState

  currentState: string

  layers: ILayer[]

  angle: number

  constructor({ position, radius = 0, scale = 1, framesHold = 5, isRotatable = false, sprites, angle = 0 }: ISprite) {
    this.position = position
    this.radius = radius
    this.scale = scale
    this.sprites = sprites
    this.framesElapsed = 0
    this.framesHold = framesHold
    this.currentState = Array.from(Object.keys(this.sprites))[0]
    this.layers = this.sprites[this.currentState]
    this.isRotatable = isRotatable

    this.angle = angle

    for (const sprite in this.sprites) {
      sprites[sprite].forEach(layer => {
        layer.image.src = layer.imageSrc
      })
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)

    this.layers.forEach(layer => {
      let imagePositionX = this.position.x - layer.offset.x
      let imagePositionY = this.position.y - layer.offset.y

      ctx.save()
      if (this.isRotatable) {
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.angle)
        imagePositionX = -layer.offset.x
        imagePositionY = -layer.offset.y
      }

      ctx.drawImage(
        layer.image,
        layer.framesCurrent * (layer.image.width / layer.framesMax),
        0,
        layer.image.width / layer.framesMax,
        layer.image.height,
        imagePositionX,
        imagePositionY,
        (layer.image.width / layer.framesMax) * this.scale,
        layer.image.height * this.scale
      )

      ctx.restore()
    })
    // ctx.stroke()
  }

  animateFrames(layers: ILayer[], callbacks: Function[] = []) {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      layers.forEach((layer, index) => {
        if (layer.framesCurrent < layer.framesMax - 1) {
          layer.framesCurrent++
        } else {
          layer.framesCurrent = 0
          if (callbacks?.length > 0 && callbacks[index]) callbacks[index]()
        }
      })
    }
  }

  animateLayer(layer: ILayer, callback?: Function) {
    this.framesElapsed++

    if (this.framesElapsed % this.framesHold === 0) {
      if (layer.framesCurrent < layer.framesMax - 1) {
        layer.framesCurrent++
      } else {
        layer.framesCurrent = 0
        if (callback) callback()
      }
    }
  }

  update() {
    this.animateFrames(this.layers)
  }

  swapState(newState: string) {
    if (this.currentState !== newState) {
      this.layers = this.sprites[newState]
      this.currentState = newState
    }
  }
}

export default Sprite
