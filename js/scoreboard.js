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
    this.ctx.fillStyle = 'black'
    this.ctx.font = '40px mario_kart'
    this.ctx.fillText(score, this.gameWidth/2 - 50, 50)
    this.ctx.fillText(lives, this.gameWidth/2 , 50)
  }
  
}