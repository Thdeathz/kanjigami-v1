import Enemy from './enemy'
import Game from './game'

class Nairan extends Enemy {
  constructor(game: Game, id: number) {
    super({
      game,
      id,
      radius: 35,
      damage: 1,
      scale: 1.2,
      speed: 0.1,
      framesHold: 11,
      sprites: {
        idle: [
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/enemy/nairan_engine.png',
            framesMax: 8,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 75, y: 65 }
          },
          {
            imageSrc: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/enemy/nairan.png',
            framesMax: 34,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 75, y: 65 }
          }
        ],
        dead: [
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/enemy/nairan_dead.png',
            framesMax: 18,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 75, y: 65 }
          }
        ],
        shield: [
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/enemy/nairan_shield.png',
            framesMax: 8,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 75, y: 77 }
          },
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/enemy/nairan_engine.png',
            framesMax: 8,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 75, y: 77 }
          },
          {
            imageSrc: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/enemy/nairan.png',
            framesMax: 34,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 75, y: 77 }
          }
        ]
      },
      maxLives: 1
    })
  }

  start() {
    this.free = false
    this.swapState('shield')

    this.getKeyWord()

    this.randomSpawn()
  }

  hit(damage: number) {
    this.lives -= damage

    if (this.lives < this.maxLives) this.swapState('idle')

    if (this.lives < 1) {
      this.swapState('dead')
      this.velocity = { x: 0, y: 0 }
      // this.audios.death.play()
    } else {
      // this.audios.hit.play()
    }
  }

  update() {
    if (!this.free && this.keyword) this.collisionLogic()

    if (this.currentState === 'shield') {
      this.animateFrames(this.sprites.shield)
    }

    if (this.currentState === 'idle') {
      this.animateFrames(this.sprites.idle)
    }

    // check if enemy is dead show animation
    if (this.lives < 1) {
      this.animateLayer(this.layers[0], () => {
        if (this.lives < 0) this.game.player.hit(this.damage)

        this.reset()
      })
    }
  }

  swapState(newState: string) {
    if (this.currentState !== newState) {
      switch (newState) {
        case 'idle':
          this.layers = this.sprites.idle
          this.currentState = 'idle'
          this.radius = 35
          break
        case 'shield':
          this.layers = this.sprites.shield
          this.currentState = 'shield'
          this.radius = 72
          break
        case 'dead':
          this.layers = this.sprites.dead
          this.currentState = 'dead'
          this.radius = 35
          this.framesHold = 5
          break
        default:
          break
      }
    }
  }
}

export default Nairan
