export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.shootCooldown = 150;
    this.lastShootTime = 0;

    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd' ) &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key);
      }

      if (event.key === ' ') {
        const currentTime = Date.now();
        if (currentTime - this.lastShootTime > this.shootCooldown) {
          this.game.player.shoot();
          this.lastShootTime = currentTime;
        }
      }

      if (event.key === 'i') {
        this.game.debug = !this.game.debug;
      }

      if (event.key === 'p') {
        this.game.pause = !this.game.pause;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1);
      }
    });
  }
}
