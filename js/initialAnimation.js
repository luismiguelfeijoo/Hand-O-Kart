class InitialAnimation {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.alpha = 0.1;
    this.timestamp = 0
    this.messages = [
      "Move your hand to control Mario",
      "Perfect, you're good to go!",
      "3",
      "2",
      "1",
      "GO!",
    ]
    this.index = -1;
  }

  draw(timestamp) {
    this.timestamp = timestamp
    this.ctx.save();
    this.ctx.fillStyle = 'white'
    this.ctx.strokeStyle = "black"
    this.ctx.lineWidth = "2"
    this.ctx.font = '40px mario_kart'
    this.ctx.globalAlpha = this.alpha;
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.messages[this.index], this.gameWidth/2, 400)
    this.ctx.strokeText(this.messages[this.index], this.gameWidth/2, 400)
    this.ctx.restore()
  }

  move() {
    console.log(this.timestamp)
    if (this.alpha <= 1 && this.alpha != 0 ) {
      this.alpha ++
    }
    if (this.timestamp > 2000 && this.timestamp < 15000 ) {
      this.index = 0
    } else if (this.timestamp < 17000){
      this.index = 1
    } else if (this.timestamp < 18000) {
      this.index = 2
    } else if (this.timestamp < 19000) {
      this.index = 3
    } else if (this.timestamp < 20000) {
      this.index = 4
    } else if (this.timestamp < 21000) {
      this.index = 5
    } else if (this.timestamp < 23000) {
      this.alpha = 0;
    }
  }
}