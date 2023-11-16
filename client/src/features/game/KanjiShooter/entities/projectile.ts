import Game from './game'
import Sprite from './sprite'

class Projectile extends Sprite {
  private game: Game

  private velocity: Position

  private speed: number

  targetId: number | null

  free: boolean

  constructor(game: Game) {
    super({
      position: { x: 0, y: 0 },
      radius: 5,
      sprites: {
        idle: [
          {
            imageSrc: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/projectile.png',
            framesMax: 10,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 16, y: 16 }
          }
        ]
      }
    })

    this.game = game
    this.position
    this.radius = 5
    this.velocity = {
      x: 1,
      y: 1
    }
    this.speed = 3.5
    this.targetId = null
    this.free = true
    // this.audio = new Audio('../assets/audio/plasma.ogg')
  }

  start(position: Position, velocity: Position, targetId: number) {
    this.free = false
    // this.audio.play()
    this.position = position
    this.velocity = {
      x: velocity.x * this.speed,
      y: velocity.y * this.speed
    }
    this.targetId = targetId
  }

  reset() {
    this.free = true
    this.targetId = null
  }

  visibile(ctx: CanvasRenderingContext2D) {
    if (!this.free) {
      this.draw(ctx)
    }
  }

  update() {
    if (!this.free) {
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.animateFrames(this.layers)

      // reset projectile if it goes off screen
      if (
        this.position.x < 0 ||
        this.position.x > this.game.width ||
        this.position.y < 0 ||
        this.position.y > this.game.height
      ) {
        this.reset()
      }
    }
  }
}

export default Projectile
