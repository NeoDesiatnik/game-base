export default class Projectile {
  constructor(game, x, y, playerDirection) {
    this.game = game;
    this.width = 50;
    this.height = 10;
    this.x = x;
    this.y = y;

    this.speed = 15;
    this.damage = 2;
    this.markedForDeletion = false;
    this.creationTime = Date.now();

    this.playerDirection = playerDirection;
  }

  update() {
    if (this.playerDirection === 'left') {
      this.x -= this.speed;
    } else if (this.playerDirection === 'right') {
      this.x += this.speed;
    }

    if (Date.now() - this.creationTime >= 15) {
      this.markedForDeletion = true;
    }

    if (this.x > this.game.width || this.x < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.fillStyle = 'rgb(255,255,0,0.4)';
    console.log(this.game.player.flip)
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
