import Enemy from './Enemy'

export default class Slime extends Enemy {
  constructor(game) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = Math.random() * 820-1//this.game.width + this.width * 1
    this.y = Math.random() * 200//340 - 200
    if (this.x <= 450) {
      this.speedX = Math.random() * 1.5 + 0.5
    }
      if (this.x >= 449){
      this.speedX = Math.random() * -1.5 - 0.5
    }
    //this.speedX = Math.random() * -1.5 - 0.5
    this.lives = 2
  }
}