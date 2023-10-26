export default class Projectile {
  constructor(game, x, y, direction) {
    this.game = game
    this.width = 20
    this.height = 8
    this.x = x
    this.y = y
    this.direction = direction

    this.speed = 30
    this.damage = 1
    this.markedForDeletion = false
  }

  update() {
    this.x += this.speed * this.direction
    if (this.x > this.game.width + this.game.camera.x) {
      this.markedForDeletion = true
    } else if (this.x < this.game.camera.x) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    context.fillStyle = 'rgb(255,255,255)'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}