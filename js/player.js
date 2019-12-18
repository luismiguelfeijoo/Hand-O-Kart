class Player {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 250;
    this.height = 250;

    this.sx = 0;
    this.sy = 0;
    this.sWidth = 43.6;
    this.sHeight = 43.6;

    this.posX =  this.gameWidth / 2 ;
    this.posY = this.gameHeight - this.height;

    this.image = new Image();
    this.image.src = "./img/mario.png";

    this.imageMirror = new Image();
    this.imageMirror.src = "./img/marioMirror.png"

    this.mirror = false

    this.border = 0;
    this.targetX =  this.gameWidth / 2 

    this.vx = 10
    this.vy = 0

    this.lives = 3;

    this.frameSize = 43.6;
    this.frames = 5;
    this.frameIndex = 0;
  }

  draw() {  

    this.ctx.save();
    if (!this.mirror) {
      
      this.animate()
      this.ctx.globalAlpha = .8;
      this.ctx.translate(this.posX - this.width/2,this.posY)
      this.ctx.drawImage(this.image, this.sx, this.frameIndex * this.frameSize, this.sWidth, this.sHeight, 0, 0, this.width, this.height);
    } else {
      this.animate()
      this.ctx.globalAlpha = .8;
      this.ctx.translate(this.posX -this.width/2,this.posY)
      this.ctx.drawImage(this.imageMirror, this.sx, this.frameIndex * this.frameSize, this.sWidth, this.sHeight, 0, 0, this.width, this.height);
    }
    this.ctx.restore();
  }

  move(handX) {
    if (handX) {
      this.targetX = handX
    } else {
      this.targetX = this.posX
    }
    //this.posX = targetX
    this.posX += ((this.targetX - this.posX) * 0.05)
    
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

  animate() {
    //console.log("animation")
    let delta = this.targetX - this.posX
    if (delta > 0) {
      this.mirror = true
      if (delta > 10 && this.frameIndex < this.frames) {
        this.frameIndex ++;
        //console.log("Delta >", this.frameIndex)
      } else if (delta <= 5 && this.frameIndex > 0) {
        this.frameIndex --;
      }
    } else if (delta < 0 ) {
      this.mirror = false
      if (delta < -10 && this.frameIndex < this.frames) {
        //console.log("Delta <", this.frameIndex)
        this.frameIndex ++;
      } else if (delta >= -5 && this.frameIndex > 0){
        this.frameIndex --;
        //console.log("Delta <", this.frameIndex)
      }
    }
    
  }

  crash(crash) {
    if (crash) {
      if (crash % 2 === 0 && crash) {
        this.frameIndex = 30;
      } else {
        this.frameIndex = 0
      }
    }
  }

  celebration(celebration) {
    if (celebration) {
      if (celebration % 5 === 0 && celebration) {
        this.posY = this.posY - 10;
      } else {
        this.posY = this.gameHeight - this.height
      }
    }
  }
}