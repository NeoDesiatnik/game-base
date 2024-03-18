export default class Projectile {
  constructor(game, x, y) {
    this.game = game
    this.width = 14
    this.height = 6
    this.x = x
    this.y = y

    this.speed = 15
    this.damage = 1
    this.markedForDeletion = false
  }

  update() {
    this.x += this.speed
    if (this.x > this.game.width) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    context.fillStyle = '#ff0'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}