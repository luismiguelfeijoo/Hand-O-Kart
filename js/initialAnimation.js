class InitialAnimation {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.alpha = 0.1;
    this.timestamp = 0;
    this.messages = [
      "Move your hand to control Mario",
      "Perfect, you're good to go!",
      "3",
      "2",
      "1",
      "GO!"
    ];
    this.index = -1;

    this.intro = new Audio();
    this.intro.src = "./sounds/start.wav";

    this.countdown = new Audio();
    this.countdown.src = "./sounds/countdown.wav";

    this.letsGo = new Audio();
    this.letsGo.src = "./sounds/lets-go.wav";

    this.played = false;
    this.played2 = false;

    this.music = new Audio();
    this.music.src = "./sounds/music.mp3";
    this.music.loop = true;
  }

  draw(timestamp) {
    this.timestamp = timestamp;
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = "2";
    this.ctx.font = "40px mario_kart";
    this.ctx.globalAlpha = this.alpha;
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.messages[this.index], this.gameWidth / 2, 400);
    this.ctx.strokeText(this.messages[this.index], this.gameWidth / 2, 400);
    this.ctx.restore();
  }

  move() {
    if (this.alpha <= 1 && this.alpha != 0) {
      this.alpha++;
    }
    if (this.timestamp > 2000 && this.timestamp < 15000) {
      if (!this.played) {
        this.intro.play();
        this.played = true;
      }
      this.index = 0;
    } else if (this.timestamp < 17000) {
      if (!this.played2) {
        this.letsGo.play();
        this.played2 = true;
      }
      this.index = 1;
    } else if (this.timestamp < 18000) {
      this.countdown.play();
      this.index = 2;
    } else if (this.timestamp < 19000) {
      this.index = 3;
    } else if (this.timestamp < 20000) {
      this.index = 4;
    } else if (this.timestamp < 21000) {
      this.index = 5;
    } else if (this.timestamp < 23000) {
      this.music.play();
      this.alpha = 0;
    }
  }

  introMusic() {
    if (!this.played) {
      this.intro.play();
      this.played = true;
    }
  }
}
