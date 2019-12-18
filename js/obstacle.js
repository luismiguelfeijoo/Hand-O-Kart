class Obstacle {
  constructor(ctx, gameWidth, gameHeight, timestamp, delta) {
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

    this.delta = delta;

    this.section = this.gameWidth/3

    this.posX = (Math.random() * (this.gameWidth - this.width - 1080)) + 550, //min 500, max gamewidth - 650 (1440-650 = 790)
    this.posY = this.gameHeight - 400,

    this.vx = this.velocityX();
    this.vy = 0; //1000 * delta
    this.vz = 0;

    this.accX = this.accelerationX();
    this.accY = 100;
    this.accZ = 40; // 0.2;

    this.image = new Image();
    this.image.src = "./img/items.png"

    this.frames = 7;
    this.frameIndex = 0;
    this.frameSize = 30.5;

    this.crash = false
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

  move(delta) {
    if(this.currentTime <= this.creationTime + 3000 ) {
    } else {
      if (this.posY <= this.gameHeight ) {
        this.posX += (this.vx / 1000) * delta;
        this.posY += (this.vy / 1000) * delta;
        this.width += (this.vz / 1000) * delta;
        this.height += (this.vz / 1000) * delta;
        if (this.vz <= 300) {
          //console.log(this.vy)
          this.vy += (this.accY/1000) * delta;
          this.vz += (this.accZ/1000) * delta;
          this.vx += (this.accX/1000) * delta;
        }
      }
    }
    //console.log(this.vx)
    
  }

  animate() {
    if (this.frameIndex < this.frames) {
      this.frameIndex ++
    } else {this.frameIndex = 0}
    
  }

  velocityX() {
    if (this.posX >= this.section && this.posX < this.section + this.section/3) {
      //console.log("section 1")
      return -50;
    } else  if (this.posX >= this.section + 2*this.section/3 - this.section/9) {
      //console.log("section 2")
      return 50
    } else {
      //console.log("section 3")
      return 0;
    }
  }

  accelerationX() {
    if (this.vx > 0) {
      return 50;
    } else if (this.vx == 0) {
      return 0;
    } else {
      return -50;
    }
  }
}