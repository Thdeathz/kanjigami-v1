import Game from './game'
import Sprite from './sprite'

class Background extends Sprite {
  constructor(game: Game) {
    super({
      position: { x: 0, y: 0 },
      radius: game.width,
      framesHold: 20,
      scale: 2.5,
      sprites: {
        idle: [
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/background/layer_01.png',
            framesMax: 9,
            framesCurrent: 0,
            offset: { x: 0, y: 0 },
            image: new Image()
          },
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/background/layer_02.png',
            framesMax: 9,
            framesCurrent: 0,
            offset: { x: 0, y: 0 },
            image: new Image()
          },
          {
            imageSrc:
              'https://storage.googleapis.com/kanjigami-61289.appspot.com/games/kanji-shooter/background/layer_03.png',
            framesMax: 9,
            framesCurrent: 0,
            offset: { x: 0, y: 0 },
            image: new Image()
          }
        ]
      }
    })
  }
}

export default Background
