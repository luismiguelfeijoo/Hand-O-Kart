class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 50;
    this.heigth = 50;

    this.posX =  this.gameWidth/ 2;
    this.posY = this.gameHeight - 50;

    this.image = new Image();
  }

  draw(posX) {  
    //this.ctx.drawImage(this.image,this.posX,this.posY);
    //console.log(this.ctx)
    this.ctx.fillRect(posX,this.posY,this.width,this.heigth);
  }

  move() {
  
  }
}