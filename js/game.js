const Game = {
  canvas: undefined,
  ctx: undefined,
  video: document.getElementById("myvideo"),
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  score: 0,
  midval: 0,

  model: null,
  isVideo: null,
  imgindex: null,

  modelParams: {
    flipHorizontal: true, // flip e.g for video
    maxNumBoxes: 1, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.8 // confidence threshold for predictions.
  },

  over: false,

  init: function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    //this.video = document.getElementById("myvideo")
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.video.width = this.width;
    this.video.height = this.height;
    this.start();
  },

  start: function() {
    this.reset();
    let past = 0;
    let last = 5000
    let delta = 0;
    let count = 0; //to set a delay on runDetection()
    let proof = -20;
    function refresh(timestamp) {
      delta = timestamp - past;
      past = timestamp;

      Game.clear();
      Game.drawAll();
      Game.moveAll();

      if (timestamp / 100 > count) {
        //this is rendering the hand at 15fps aprox
        Game.runDetection();
        count++;
      }
      /*
      let secondsCounter = Math.floor(timestamp / 2000);
      if (secondsCounter === proof + 1) {
        Game.generateObstacles();
      }
      proof = secondsCounter;
      */

      if(last && timestamp - last >= 2*1000) {
        last = timestamp;
        Game.generateObstacles();
      }

      Game.clearObstacles();
      
      if(Game.isCollision()) {Game.gameOver()};
      if(!Game.over) window.requestAnimationFrame(refresh);
      //if (!Game.over) {window.requestAnimationFrame(refresh)}
    }
    window.requestAnimationFrame(refresh);
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, this.width, this.height);
    this.obstacles = [];
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function() {
    this.background.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());
    this.player.draw();
  },

  moveAll: function() {
    this.player.move(this.midval);
    this.obstacles.forEach(obstacle => obstacle.move());
  },

  generateObstacles: function() {
    console.log("generating obs");
    this.obstacles.push(new Obstacle(this.ctx, this.width, this.height));
  },

  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(
      obstacle => obstacle.posY <= Game.height
    );
  },

  isCollision: function() {
    // return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX ))
    return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX - obs.width/2 && obs.posX + obs.width/2 > this.player.posX && (obs.width >= 80 && obs.width <= 90)))
  },

  gameOver: function() {
    //console.log("over")
    this.over = true;
    //window.cancelAnimationFrame(Game.request);
  },

  runDetection: function() {
    model.detect(this.video).then(predictions => {
      // console.log("Predictions: ", predictions);
      // get the middle x value of the bounding box and map to paddle location
      //this is the renderer of the library  -->//model.renderPredictions(predictions, canvas, context, video);
      if (predictions[0]) {
        this.midval = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
        //console.log(this.midval)
        //gamex = document.body.clientWidth * (midval / video.width)
        //updatePaddleControl(gamex)
        //console.log('Predictions: ', gamex);
      }
    });
  }
};
