export default class Camera {
    constructor(game, x, y, minX = 0, minY = 0, lerpFactor = 0.1) {
      this.game = game
      this.x = x
      this.y = y
      this.width = this.game.width
      this.height = this.game.height
      this.minX = minX
      this.minY = minY
      this.lerpFactor = lerpFactor
    }
  
    update(player) {
      const halfWidth = this.width / 2
      const halfHeight = this.height / 2
      const maxX = this.game.level.width
  
      let targetX = Math.min(Math.max(player.x - halfWidth, this.minX), maxX)
  
      let targetY = player.y - halfHeight
  
      this.x += (targetX - this.x) * this.lerpFactor
      this.y += (targetY - this.y) * this.lerpFactor
    }
  
    apply(context) {
      context.save()
      context.translate(-this.x, -this.y)
    }
  
    reset(context) {
      context.restore()
    }
  }