class Obstacle {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 30;
    this.height = 30;

    this.sx = 395.5;
    this.sy = 1.5;
    this.sWidth = 15;
    this.sHeight = 15;

    this.posX = (Math.random() * (this.gameWidth - this.width))
    this.posY = this.gameHeight - 200;

    this.vy = 5;
    this.vz = 10;

    this.image = new Image();
    this.image.src = "./img/Mario Kart.png"
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.posX + 7.5, this.posY + 7.5)
    this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.posX - 7.5, this.posY - 7.5, this.width, this.height);
    this.ctx.closePath()
  }

  move() {
    if (this.height <= this.gameHeight) {
      this.posY += this.vy
      this.width += this.vz;
      this.height += this.vz;
    }
  }
}