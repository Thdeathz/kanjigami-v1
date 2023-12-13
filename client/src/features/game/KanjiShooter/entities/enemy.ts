import Game from './game'
import Sprite from './sprite'

class Enemy extends Sprite {
  game: Game

  radius: number

  damage: number

  velocity: Position

  color: string

  speed: number

  keyword: IKanjiShooterContent | null

  lives: number

  free: boolean

  id: number

  maxLives: number

  constructor({ game, sprites, radius, speed = 0.5, damage, framesHold, id, scale = 1 }: IEnemy & { game: Game }) {
    super({
      position: { x: 0, y: 0 },
      radius,
      sprites,
      framesHold,
      scale,
      isRotatable: true
    })

    this.id = id
    this.game = game
    this.radius = radius
    this.damage = damage
    this.velocity = {
      x: 1,
      y: 1
    }
    this.color = 'white'
    this.speed = speed
    this.keyword = null
    this.lives = 1
    this.free = true
    this.angle = 0
    this.maxLives = 1
    // this.audios = {
    //   hit: new Audio('../assets/audio/hit.ogg'),
    //   death: new Audio('../assets/audio/explosion_small.ogg')
    // }
  }

  start() {
    this.free = false

    this.getKeyWord()

    this.randomSpawn()
  }

  reset() {
    this.free = true
    this.keyword = null
    this.swapState('idle')
    this.framesElapsed = 0

    this.color = 'white'
    this.lives = 1
  }

  visibile(ctx: CanvasRenderingContext2D) {
    if (!this.free && this.keyword) {
      this.draw(ctx)
      ctx.save()
      ctx.fillStyle = this.color
      ctx.fillText(this.keyword.kakikata, this.position.x, this.position.y)
      ctx.restore()
    }
  }

  hit(damage: number) {
    this.lives -= damage
    if (this.lives < 1) {
      this.velocity = { x: 0, y: 0 }
      // this.audios.death.play()
    } else {
      // this.audios.hit.play()
    }
  }

  update() {
    if (!this.free && this.keyword) this.collisionLogic()

    // check if enemy is dead show animation
    if (this.lives < 1) {
      this.animateLayer(this.layers[0], () => {
        if (this.lives < 0) this.game.player.hit(this.damage)

        this.reset()
      })
    }
  }

  collisionLogic() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    // check collision enemy / planet
    if (this.game.checkCollision(this, this.game.planet)) {
      this.hit(100)
    }

    // check collision enemy / projectile
    this.game.projectilePool.forEach(projectile => {
      if (!projectile.free && this.game.checkCollision(this, projectile) && this.id === projectile.targetId) {
        projectile.reset()
        this.hit(1)
        this.game.userScore += 16
      }
    })
  }

  randomSpawn() {
    let x = 0
    let y = 0

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - this.radius : this.game.width + this.radius
      y = Math.random() * this.game.height
    } else {
      x = Math.random() * this.game.width
      y = Math.random() < 0.5 ? 0 - this.radius : this.game.height + this.radius
    }

    const angle = Math.atan2(this.game.planet.position.y - y, this.game.planet.position.x - x)
    this.angle = angle + Math.PI / 2

    this.position = { x, y }
    this.velocity = {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed
    }
  }

  getKeyWord() {
    const randomIndex = Math.floor(Math.random() * this.game.kanjiPool.length)
    const keyword = this.game.kanjiPool.splice(randomIndex, 1)[0]

    this.keyword = keyword
  }
}

export default Enemy
