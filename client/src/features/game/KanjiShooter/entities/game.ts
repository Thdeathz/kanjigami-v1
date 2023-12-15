import Asteroid from './asteroid'
import Background from './background'
import Enemy from './enemy'
import Health from './health'
import Nairan from './nairan'
import Planet from './planet'
import Player from './player'
import Projectile from './projectile'
import Sprite from './sprite'

class Game {
  private canvas: HTMLCanvasElement

  width: number

  height: number

  private background: Background

  planet: Planet

  player: Player

  health: Health

  userScore: number

  enemyPool: Enemy[]

  numberOfEnemies: number

  enemyTimer: number

  enemyInterval: number

  projectilePool: Projectile[]

  numberOfProjectiles: number

  kanjiPool: IKanjiShooterContent[]

  constructor(canvas: HTMLCanvasElement, kanjis: IKanjiShooterContent[], input: HTMLInputElement) {
    this.canvas = canvas
    this.width = canvas.width
    this.height = canvas.height
    this.background = new Background(this)
    this.planet = new Planet(this)
    this.player = new Player(this)
    this.health = new Health(10)
    this.userScore = 0
    this.kanjiPool = kanjis

    // init projectile pool
    this.projectilePool = []
    this.numberOfProjectiles = 20
    this.createProjectilePool()

    // init enemy pool
    this.enemyPool = []
    this.numberOfEnemies = 20
    this.createEnemyPool()
    this.enemyPool[0].start()
    this.enemyTimer = 0
    this.enemyInterval = 2000
  }

  render(
    ctx: CanvasRenderingContext2D,
    deltaTime: number,
    animationId: number,
    sessionId: string,
    userId: string,
    handleCalculateScore: ({ sessionId, userId, score }: IKanjiShooterCalculateScore) => void
  ) {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    if (this.health.lives <= 0 || (this.kanjiPool.length === 0 && !this.checkExistEnemy())) {
      cancelAnimationFrame(animationId)

      setTimeout(() => {
        handleCalculateScore({ sessionId, userId, score: this.userScore })
      }, 200)
    }

    this.background.draw(ctx)
    this.background.update()

    this.drawStatus(ctx)
    this.health.draw(ctx)

    this.planet.draw(ctx)
    this.planet.update()

    this.player.draw(ctx)
    this.player.update()

    this.projectilePool.forEach(projectile => {
      projectile.visibile(ctx)
      projectile.update()
    })

    this.enemyPool.forEach(enemy => {
      enemy.visibile(ctx)
      enemy.update()
    })

    // periodically spawn enemies
    if (this.enemyTimer < this.enemyInterval || this.kanjiPool.length === 0) {
      this.enemyTimer += deltaTime
    } else {
      this.enemyTimer = 0
      const enemy = this.getEnemy()
      if (enemy) enemy.start()

      this.enemyInterval *= 0.99
    }
  }

  calcAim(position1: Position, position2: Position) {
    const dx = position1.x - position2.x
    const dy = position1.y - position2.y

    const distance = Math.hypot(dx, dy)

    const aimX = dx / distance
    const aimY = dy / distance

    return {
      aimX,
      aimY,
      dx,
      dy
    }
  }

  createEnemyPool() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      if (Math.random() < 0.5) {
        this.enemyPool.push(new Asteroid(this, i))
      } else {
        this.enemyPool.push(new Nairan(this, i))
      }
    }
  }

  getEnemy() {
    for (let i = 0; i < this.numberOfEnemies; i++) {
      if (this.enemyPool[i].free) return this.enemyPool[i]
    }
  }

  createProjectilePool() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilePool.push(new Projectile(this))
    }
  }

  getProjectile() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      if (this.projectilePool[i].free) return this.projectilePool[i]
    }
  }

  checkCollision(object1: Sprite, object2: Sprite) {
    const dx = object1.position.x - object2.position.x
    const dy = object1.position.y - object2.position.y

    const distance = Math.hypot(dx, dy)

    return distance < object1.radius + object2.radius
  }

  checkExistEnemy() {
    return this.enemyPool.filter(enemy => !enemy.free).length > 0
  }

  drawStatus(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.font = 'bold 30px Roboto'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${this.userScore}`, 20, 30)
    ctx.restore()
  }
}

export default Game
