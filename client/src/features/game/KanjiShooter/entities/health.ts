import Sprite from './sprite'

class Health extends Sprite {
  maxHealth: number

  lives: number

  constructor(maxHealth = 10) {
    super({
      position: { x: 20, y: 50 },
      scale: 2.3,
      sprites: {
        idle: [
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/health/decoration.png',
            framesMax: 1,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 0, y: 0 }
          },
          {
            imageSrc: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/health/bar.png',
            framesMax: 1,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: -14 * 2.3, y: 0 }
          }
        ]
      }
    })

    this.maxHealth = maxHealth
    this.lives = maxHealth
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)

    ctx.drawImage(
      this.layers[0].image,
      this.position.x - this.layers[0].offset.x,
      this.position.y - this.layers[0].offset.y,
      this.layers[0].image.width * this.scale,
      this.layers[0].image.height * this.scale
    )

    ctx.drawImage(
      this.layers[1].image,
      this.position.x - this.layers[1].offset.x,
      this.position.y - this.layers[1].offset.y,
      this.layers[1].image.width * (this.lives / this.maxHealth) * this.scale,
      this.layers[1].image.height * this.scale
    )
  }
}

export default Health
