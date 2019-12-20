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

    this.posX = this.gameWidth / 2;
    this.posY = this.gameHeight - this.height;

    this.image = new Image();
    this.image.src = "./img/mario.png";

    this.imageMirror = new Image();
    this.imageMirror.src = "./img/marioMirror.png";

    this.mirror = false;

    this.border = 0;
    this.targetX = this.gameWidth / 2;

    this.vx = 10;
    this.vy = 0;

    this.lives = 3;

    this.frameSize = 43.6;
    this.frames = 5;
    this.frameIndex = 0;

    this.message = 0;

    this.crashSound = [new Audio(), new Audio(), new Audio()];
    this.crashSound[0].src = "./sounds/mamma-mia.wav";
    this.crashSound[1].src = "./sounds/ow.wav";
    this.crashSound[2].src = "./sounds/loser.wav";

    //this.crashIndex = 0

    this.celebrationSound = [new Audio(), new Audio(), new Audio()];

    this.celebrationSound[0].src = "./sounds/whoo-hoo.wav";
    this.celebrationSound[1].src = "./sounds/whee-hee.wav";
    this.celebrationSound[2].src = "./sounds/okee.wav";
  }

  draw() {
    this.ctx.save();
    if (!this.mirror) {
      this.animate();
      this.ctx.globalAlpha = 0.8;
      this.ctx.translate(this.posX - this.width / 2, this.posY);
      this.ctx.drawImage(
        this.image,
        this.sx,
        this.frameIndex * this.frameSize,
        this.sWidth,
        this.sHeight,
        0,
        0,
        this.width,
        this.height
      );
    } else {
      this.animate();
      this.ctx.globalAlpha = 0.8;
      this.ctx.translate(this.posX - this.width / 2, this.posY);
      this.ctx.drawImage(
        this.imageMirror,
        this.sx,
        this.frameIndex * this.frameSize,
        this.sWidth,
        this.sHeight,
        0,
        0,
        this.width,
        this.height
      );
    }
    this.ctx.restore();
  }

  move(handX, delta) {
    if (handX) {
      this.targetX = handX;
    } else {
      this.targetX = this.posX;
    }
    this.posX += (this.targetX - this.posX) * ((3 / 1000) * delta);
  }

  animate() {
    //console.log("animation")
    let delta = this.targetX - this.posX;
    if (delta > 0) {
      this.mirror = true;
      if (delta > 10 && this.frameIndex < this.frames) {
        this.frameIndex++;
        //console.log("Delta >", this.frameIndex)
      } else if (delta <= 5 && this.frameIndex > 0) {
        this.frameIndex--;
      }
    } else if (delta < 0) {
      this.mirror = false;
      if (delta < -10 && this.frameIndex < this.frames) {
        //console.log("Delta <", this.frameIndex)
        this.frameIndex++;
      } else if (delta >= -5 && this.frameIndex > 0) {
        this.frameIndex--;
        //console.log("Delta <", this.frameIndex)
      }
    }
  }

  crash(crash) {
    if (crash) {
      if (crash % 2 === 0 && crash) {
        this.frameIndex = 30;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  celebration(celebrationAlpha) {
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = "2";
    this.ctx.font = "40px mario_kart";
    this.ctx.globalAlpha = celebrationAlpha;
    this.ctx.fillText(this.message, this.posX - 20, this.posY - 50);
    this.ctx.strokeText(this.message, this.posX - 20, this.posY - 50);
    this.ctx.restore();
    /*
    if (celebration) {
      if (celebration % 5 === 0 && celebration) {
        this.posY = this.posY - 20;
      } else {
        this.posY = this.gameHeight - this.height
      }
    }*/
  }

  celebrationIndex() {
    return Math.floor(Math.random() * this.celebrationSound.length);
  }
}
