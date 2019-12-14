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

    this.posX =  this.gameWidth / 2 ;
    this.posY = this.gameHeight - this.height;

    this.image = new Image();
    this.image.src = "./img/Mario Kart.png";

    this.border = 0;
    this.targetX =  this.gameWidth / 2 

    this.vx = 10
  }

  draw() {  
    //this.ctx.drawImage(this.image,this.posX,this.posY);
    //console.log(this.ctx)
    this.ctx.save();
    this.ctx.globalAlpha = 0.7;
    this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.posX, this.posY, this.width, this.height);
    this.ctx.restore();
  }

  move(handX) {
    if (handX) {
      this.targetX = handX
    } else {
      this.targetX = this.posX
    }
    //this.posX = targetX
    this.posX += ((this.targetX - this.posX) * 0.1)
    /*
    if (this.posX <= 0) {
      this.posX = 0
    } else if ((this.posX + this.width) >= this.gameWidth) {
      (this.posX + this.width) >= this.gameWidth
    }*/
    /*
    if (this.targetX > this.posX) {
      this.posX += ((this.targetX - this.posX) * 0.1)
    } else if (this.targetX < this.posX) {
      this.posX += ((this.targetX - this.posX) * 0.1)
    }*/
    
  }
}