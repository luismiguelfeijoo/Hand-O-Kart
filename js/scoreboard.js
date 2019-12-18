const ScoreBoard = {
  ctx: undefined,
  score: undefined,
  lives: undefined,
  gameWidth: undefined,
  gameHeight: undefined,

  init: function(ctx, score, lives, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.score = score;
    this.lives = lives;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  },

  draw: function(score, lives) {
    this.ctx.save();
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = "2";
    this.ctx.font = "50px mario_kart";
    this.ctx.fillText("POINTS:" + score, 50, this.gameHeight - 280);
    this.ctx.strokeText("POINTS:" + score, 50, this.gameHeight - 280);
    this.ctx.fillText(
      "LIVES:" + lives,
      this.gameWidth - 250,
      this.gameHeight - 280
    );
    this.ctx.strokeText(
      "LIVES:" + lives,
      this.gameWidth - 250,
      this.gameHeight - 280
    );
    this.ctx.restore();
  }
};
