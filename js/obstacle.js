class Obstacle {
  constructor(ctx, gameWidth, gameHeight, timestamp) {
    this.ctx = ctx;

    this.creationTime = timestamp;
    this.currentTime = timestamp

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

    this.vy = 0;
    this.vz = 0;
    this.accY = 0.1;
    this.accZ = 0.2;

    this.image = new Image();
    this.image.src = "./img/Mario Kart.png"
  }

  draw(timestamp) {
    this.currentTime = timestamp;
    //console.log(this.creationTime, this.currentTime)
    if(this.currentTime <= this.creationTime + 3000 && this.currentTime >= this.creationTime + 1000) {
      this.ctx.save()
      this.ctx.strokeStyle = "#FF0"
      this.ctx.lineWidth = 5
      this.ctx.beginPath();
      this.ctx.moveTo(this.posX - 25, this.gameHeight - 300);
      this.ctx.lineTo(this.posX + 25, this.gameHeight - 300);
      this.ctx.lineTo(this.posX, this.gameHeight - 280);
      this.ctx.lineTo(this.posX - 25, this.gameHeight - 300);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
      this.ctx.fill();
      //this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.posX, this.gameHeight - 300, 50, 50)
    } else {
      this.ctx.save()
      this.ctx.beginPath();
      this.ctx.translate(this.posX - this.width , this.posY)
      this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.width/2, this.height/2, this.width, this.height);
      this.ctx.closePath();
      this.ctx.restore();
    }
  }

  move() {
    if(this.currentTime <= this.creationTime + 3000 ) {
    } else {
      if (this.posY <= this.gameHeight ) {
        this.posY += this.vy;
        this.width += this.vz;
        this.height += this.vz;
        if (this.vz <= 3) {
          //console.log(this.vy)
          this.vy += this.accY;
          this.vz += this.accZ;
        }
      }
    }
    
  }
}