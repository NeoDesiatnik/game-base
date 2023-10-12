import Enemy from './Enemy'

export default class Slime extends Enemy {
  constructor(game) {
    super(game)
    this.width = 320
    this.height = 16
    this.x = this.game.width
    this.y = Math.random() * (this.game.height * 0.9 - this.height)
    this.speedX = Math.random() * -1.5 - 0.5
    this.lives = 2
    this.color = '#0f0'
  }
}