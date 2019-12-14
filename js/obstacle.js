class Obstacle {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 30;
    this.height = 30;

    this.sx = 390;
    this.sy = 2;
    this.sWidth = 20;
    this.sHeight = 20;

    this.posX = (Math.random() * (this.gameWidth - this.width))
    this.posY = 30;

    this.vy = 5;
    this.vz = 10;

    this.image = new Image();
    this.image.src = ".img/Mario Kart.png"
  }

  draw() {
    this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.posX, this.posY, this.width, this.height);
  }

  move() {
    if (this.width <= 100) {
      this.posY += this.vy
      this.width += this.vz;
      this.height += this.vz;
    }
  }
}