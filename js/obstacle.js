class Obstacle {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 0;
    this.height = 0;

    this.sx = 395.5;
    this.sy = 1.5;
    this.sWidth = 15;
    this.sHeight = 15;

    this.posX = (Math.random() * (this.gameWidth - this.width))
    this.posY = this.gameHeight - 160;

    this.vy = 2;
    this.vz = 5;

    this.image = new Image();
    this.image.src = "./img/Mario Kart.png"
  }

  draw() {
    this.ctx.save()
    this.ctx.beginPath();
    this.ctx.translate(this.posX - this.width , this.posY)
    this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.width/2, this.height/2, this.width, this.height);
    this.ctx.closePath();
    this.ctx.restore();
    console.log(this.width)
  }

  move() {
    if (this.posY <= this.gameHeight ) {
      this.posY += this.vy
      this.width += this.vz;
      this.height += this.vz;
    }
  }
}