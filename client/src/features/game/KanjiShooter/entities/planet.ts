import Game from './game'
import Sprite from './sprite'

class Planet extends Sprite {
  private game: Game

  constructor(game: Game) {
    super({
      position: { x: game.width / 2, y: game.height / 2 },
      radius: 40,
      scale: 1.3,
      sprites: {
        idle: [
          {
            imageSrc: 'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/planet.png',
            framesMax: 77,
            framesCurrent: 0,
            offset: { x: 63, y: 63 },
            image: new Image()
          }
        ]
      }
    })

    this.game = game
  }
}

export default Planet
