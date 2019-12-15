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

    this.lives = 3;

    this.frameSize = 43.6;
    this.frames = 5;
    this.frameIndex = 0;
  }

  draw() {  
    //this.ctx.drawImage(this.image,this.posX,this.posY);
    //console.log(this.ctx) 
    this.ctx.save();
    if (!this.mirror) {
      
      this.animate()
      this.ctx.globalAlpha = .8;
      this.ctx.drawImage(this.image, this.sx, this.frameIndex * this.frameSize, this.sWidth, this.sHeight, this.posX, this.posY, this.width, this.height);
    } else {
  
      this.animate()
      this.ctx.globalAlpha = .8;
      this.ctx.drawImage(this.imageMirror, this.sx, this.frameIndex * this.frameSize, this.sWidth, this.sHeight, this.posX, this.posY, this.width, this.height);
      
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
    console.log("animation")
    let delta = this.targetX - this.posX
    if (delta > 0) {
      this.mirror = true
      if (delta > 10 && this.frameIndex < this.frames) {
        this.frameIndex ++;
        console.log("Delta >", this.frameIndex)
      } else if (this.frameIndex > 0) {
        this.frameIndex --;
      }
    } else if (delta < 0 ) {
      this.mirror = false
      if (delta < -10 && this.frameIndex < this.frames) {
        console.log("Delta <")
        this.frameIndex ++;
      } else if (this.frameIndex > 0){
        this.frameIndex --;
      }
    }
    
  }

}