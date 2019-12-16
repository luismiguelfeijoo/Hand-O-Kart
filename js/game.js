const Game = {
  canvas: undefined,
  ctx: undefined,
  video: document.getElementById("myvideo"),
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  score: 0,
  lives: undefined,
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
  obstacleCollision: 0,

  lastAnimation: false,
  alpha: 0,

  crash: 0,

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
    this.alpha = 0;
    this.start();
  },

  start: function() {
    this.reset();
    let past = 0;
    let last = 8000 //delay seconds
    let delta = 0;
    let count = 0; //to set a delay on runDetection()
    let proof = -20;
    let dif = 5;
    function refresh(timestamp) {
      delta = timestamp - past;
      past = timestamp;

      Game.clear();
      Game.player.crash(Game.crash)
      Game.drawAll(timestamp);
      Game.moveAll();
      if (Game.crash > 0) Game.crash --;

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
      //console.log(timestamp, last)
      if(timestamp - last >= dif*1000) {
        if (dif > 1) dif -= .5;
        last = timestamp;
        Game.generateObstacles(timestamp);
      }

      Game.clearObstacles();
      
      if(Game.isCollision()) {
        console.log("hola")
        Game.gameOver()
      };
      if(Game.lastAnimation) {Game.finalAnimation()}
      if(Game.alpha >= 1) {Game.over = true}
      if(!Game.over) window.requestAnimationFrame(refresh);
      //if (!Game.over) {window.requestAnimationFrame(refresh)}
    }
    window.requestAnimationFrame(refresh);
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, this.width, this.height);
    this.obstacles = [];
    ScoreBoard.init(this.ctx, this.score, this.player.lives, this.width, this.height);
    BlackBackground.init(this.ctx,this.width,this.height)
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function(timestamp) {
    this.background.draw();
    this.obstacles.forEach(obstacle => obstacle.draw(timestamp));
    this.player.draw();
    ScoreBoard.draw(this.score, this.player.lives)
    BlackBackground.draw(this.alpha)
  },

  moveAll: function() {
    this.player.move(this.midval);
    this.obstacles.forEach(obstacle => obstacle.move());
  },

  generateObstacles: function(timestamp) {
    //console.log("generating obs");
    this.obstacles.push(new Obstacle(this.ctx, this.width, this.height, timestamp));
  },

  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(
      obstacle => obstacle.posY + obstacle.height/2 <= this.height
    );
  },

  isCollision: function() {
    // return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX ))
    return this.obstacles.some(obs => {
      if (Game.obstacleCollision != obs.creationTime) {
        if ((this.player.posX + this.player.width > obs.posX - obs.width/2 && obs.posX + obs.width/2 > this.player.posX && (obs.width >= 80 && obs.width <= 90))) {
          Game.obstacleCollision = obs.creationTime
          console.log("collision")
          this.player.lives --;
          console.log(this.player.lives)
          this.crash = 20;
          return true
        } else {
          return false
        }
      } 
    })
  },

  gameOver: function() {
    if (this.player.lives === 0) {
      this.lastAnimation = true;
      toggleVideo();
      updateNote.innerText = "Game Over";
    } 
    //window.cancelAnimationFrame(Game.request);
  },

  finalAnimation: function() {
    if (Game.alpha < 1) {
      Game.alpha += .01;
    } else {
      this.over = true
    }
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
