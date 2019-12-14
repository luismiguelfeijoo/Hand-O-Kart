class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 250;
    this.height = 250;

    this.sx = 2;
    this.sy = 2;
    this.sWidth = 46;
    this.sHeight = 46;

    this.posX =  0;
    this.posY = this.gameHeight - this.height;

    this.image = new Image();
    this.image.src = "./img/Mario Kart.png";

    this.border = 0;

    this.vx = 10
  }

  draw() {  
    //this.ctx.drawImage(this.image,this.posX,this.posY);
    //console.log(this.ctx)
    this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.posX, this.posY, this.width, this.height);
  }

  move(posX) {
    this.posX = posX
    /*
    if (this.posX <= 0) {
      this.posX = 0
    } else if ((this.posX + this.width) >= this.gameWidth) {
      (this.posX + this.width) >= this.gameWidth
    }
    if (posX > this.posX) {
      this.posX += this.vx;
    } else if (posX < this.posX) {
      this.posX -= this.vx
    }
    */
  }
}