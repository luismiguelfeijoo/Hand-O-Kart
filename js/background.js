class Background {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = "./img/mario-background.png";

    this.posX = 0;
    this.posY = 0;

    this.sx = 50; //772;
    this.sy = 10; //4960;
    this.sWidth = 400; //256;
    this.sHeight = 200; //128;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      this.sWidth,
      this.sHeight,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}
