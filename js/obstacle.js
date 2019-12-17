class Obstacle {
  constructor(ctx, gameWidth, gameHeight, timestamp) {
    this.ctx = ctx;

    this.creationTime = timestamp;
    this.currentTime = timestamp

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 5;
    this.height = 5;

    this.sx = 0;
    this.sy = 0;
    this.sWidth = 30;
    this.sHeight = 30;

    this.posX = (Math.random() * (this.gameWidth - this.width - 1080)) + 550, //min 500, max gamewidth - 650 (1440-650 = 790)
    this.posY = this.gameHeight - 400,

    this.vx = this.velocityX();
    this.vy = 0;
    this.vz = 0;

    this.accX = this.accelerationX();
    this.accY = 0.15;
    this.accZ = 0.05 // 0.2;

    this.image = new Image();
    this.image.src = "./img/items.png"

    this.frames = 7;
    this.frameIndex = 0;
    this.frameSize = 30.5;
  }

  draw(timestamp) {
    this.currentTime = timestamp;
    this.animate()
    //console.log(this.creationTime, this.currentTime)
    if(this.currentTime <= this.creationTime + 1000) {
      //do nothing
    } else if(this.currentTime <= this.creationTime + 3000) {
      this.ctx.save()
      this.ctx.strokeStyle = "#FF0"
      this.ctx.lineWidth = 5
      this.ctx.beginPath();
      this.ctx.moveTo(this.posX - 25, this.gameHeight - 500);
      this.ctx.lineTo(this.posX + 25, this.gameHeight - 500);
      this.ctx.lineTo(this.posX, this.gameHeight - 470);
      this.ctx.lineTo(this.posX - 25, this.gameHeight - 500);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
      this.ctx.fill();
      //this.ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.posX, this.gameHeight - 300, 50, 50)
    } else {
      this.ctx.save()
      this.ctx.beginPath();
      this.ctx.translate(this.posX - this.width , this.posY)
      this.ctx.drawImage(this.image, this.frameIndex * this.frameSize, this.sy, this.sWidth, this.sHeight, this.width/2, this.height/2, this.width, this.height);
      this.ctx.closePath();
      this.ctx.restore();
      //console.log(this.vx, this.accX, this.posX)
    }
  }

  move() {
    if(this.currentTime <= this.creationTime + 3000 ) {
    } else {
      if (this.posY <= this.gameHeight ) {
        this.posX += this.vx;
        this.posY += this.vy;
        this.width += this.vz;
        this.height += this.vz;
        if (this.vz <= 3) {
          //console.log(this.vy)
          this.vy += this.accY;
          this.vz += this.accZ;
          this.vx += this.accX;
        }
      }
    }
    
  }

  animate() {
    if (this.frameIndex < this.frames) {
      this.frameIndex ++
    } else {this.frameIndex = 0}
    
  }

  velocityX() {
    
    if (this.posX >= 500 && this.posX < 600) {
      return -3;
    } else  if (this.posX <= 750) {
      return 0;
    } else {
      return 1;
    }
  }

  accelerationX() {
    if (this.vx > 0) {
      return 0.16;
    } else if (this.vx = 0) {
      return 0;
    } else {
      return -0.12;
    }
  }
}