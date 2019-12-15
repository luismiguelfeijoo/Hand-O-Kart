const BlackBackground = {
  ctx: undefined,
  
  gameWidth: undefined,
  gameHeight: undefined,

  alpha: undefined,

  init: function(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    //this.alpha = alpha
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  },

  draw: function(alpha) {
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
    this.ctx.restore();
  }
}