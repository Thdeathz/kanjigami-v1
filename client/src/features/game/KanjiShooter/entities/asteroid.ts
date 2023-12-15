import Enemy from './enemy'
import Game from './game'

class Asteroid extends Enemy {
  constructor(game: Game, id: number) {
    super({
      game,
      id,
      radius: 18,
      damage: 1,
      scale: 1.2,
      speed: 0.3,
      framesHold: 6,
      sprites: {
        idle: [
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/enemy/asteroid.png',
            framesMax: 8,
            framesCurrent: 0,
            image: new Image(),
            offset: { x: 57, y: 57 }
          }
        ]
      },
      maxLives: 1
    })
  }
}

export default Asteroid
