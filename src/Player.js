import Projectile from './Projectile.js'
import spriteImage from './assets/sprites/IdleRun.png'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 35
    this.height = 45
    this.x = 50
    this.y = 350

    this.frameX = 0

    this.projectiles = []

    this.direction = 1
    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6
    this.jumpSpeed = 14
    this.jumpTimer = 0
    this.jumpInterval = 600
    this.grounded = false

    const image = new Image()
    image.src = spriteImage
    this.image = image

    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 8
    this.fps = 0
    this.timer = 0
    this.interval = 1000 / this.fps

    this.flip = false
  }

  update(deltaTime) {
    if (this.grounded) {
      this.speedY = 0
    } else {
      this.speedY += this.game.gravity
    }

    if (this.game.keys.includes('a')) {
      this.direction = -1
      this.speedX = -this.maxSpeed
    } else if (this.game.keys.includes('d')) {
      this.direction = 1
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }
    
    if (this.game.keys.includes('s')) {
      this.y += 40
    }

    if (this.jumpTimer <= this.jumpInterval) {
      this.jumpTimer += deltaTime
    }

    if (this.game.keys.includes('w')) {
      this.jump()
    }

    this.y += this.speedY
    this.x += this.speedX

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update()
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )

    if (this.speedX < 0) {
      this.flip = true
    } else if (this.speedX > 0) {
      this.flip = false
    }

    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
  }

  draw(context) {
    this.projectiles.forEach((projectile) => {

      // if flip rita fråmn en postion, annars bla
      projectile.draw(context)
    })

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '12px Arial'
      context.fillText(this.frameX, this.x, this.y - 5)
      context.fillText(this.grounded, this.x + 20, this.y - 5)

      const x = this.direction === 1 ? this.x + this.width + 10 : this.x - 10
      context.beginPath()
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, this.y + this.height / 2)
      context.stroke()
    }

    // draw sprite image
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height -50,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )
if (this.flip) {
  context.restore()

}
  }

  jump() {
    if (this.jumpTimer > this.jumpInterval && this.grounded) {
      this.speedY = -this.jumpSpeed
      this.jumpTimer = 0
      this.grounded = false
    }
  }

  shoot() {
    const offset = 10
    const x =
      this.direction === 1 ? this.x + this.width + offset : this.x - offset
    this.projectiles.push(
      new Projectile(this.game, x, this.y + this.height / 2, this.direction)
    )
  }
}