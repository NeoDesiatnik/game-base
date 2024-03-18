export default class Camera {
  constructor(game, target, x, y, width, height, lerp = 0.08) {
    this.game = game
    this.target = target
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.lerp = lerp
    this.offset = 20
    this.lookaheadDistance = 40
  }

  update() {
    let targetX = this.target.x - this.width / 2;
    let targetY = this.target.y - this.height / 2;
  
    if (this.target.facing) {
      targetX += this.target.facing.x * this.lookaheadDistance;
      targetY += this.target.facing.y * this.lookaheadDistance;
    }

    const t = this.lerp;
    this.x += (targetX - this.x) * t * (2 - t);
    this.y += (targetY - this.y) * t * (2 - t);
  
    // Clamp the camera position to the game world
    this.x = Math.max(0, Math.min(this.x, (this.game.level.width * this.game.level.tileWidth) - this.width));
    this.y = Math.max(0, Math.min(this.y, (this.game.level.height * this.game.level.tileHeight) - this.height));
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeStyle = '#f00'
      context.strokeRect(this.x + this.offset, this.y + this.offset, this.width - this.offset * 2, this.height - this.offset * 2)
      context.fillStyle = '#fff'
      context.font = '12px Arial'
      context.fillText(`x: ${Math.round(this.x)}, y: ${Math.round(this.y)}`, this.x + this.offset + 10, this.y + this.offset * 2)
      context.fillText(`target: ${this.target.x}, ${this.target.y}`, this.x + this.offset + 10, this.y + this.offset * 3)
    }
  }

  setTarget(target) {
    this.target = target
  }
}