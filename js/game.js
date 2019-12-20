const Game = {
  canvas: undefined,
  ctx: undefined,

  video: document.getElementById("myvideo"),
  videoCanvas: document.getElementById("videoCanvas"),
  videoCanvasCtx: videoCanvas.getContext("2d"),

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
    scoreThreshold: 0.7 // confidence threshold for predictions.
  },

  over: false,
  obstacleCollision: 0,

  lastAnimation: false,
  alpha: 0,

  crash: 0,
  crashIndex: 0,
  celebrationAlpha: 0,

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
    let last = 15000; //delay miliseconds
    let delta = 0;
    let count = 0; //to set a delay on runDetection()
    let proof = -20;
    let dif = 5;
    function refresh(timestamp) {
      delta = timestamp - past;
      past = timestamp;

      Game.clear();

      Game.player.crash(Game.crash);
      if (Game.crash > 0) Game.crash--;

      Game.drawAll(timestamp);

      Game.moveAll(delta);

      //console.log(Game.celebrationAlpha)
      Game.player.celebration(Game.celebrationAlpha);
      if (Game.celebrationAlpha > 0) {
        Game.celebrationAlpha = parseFloat(
          (Game.celebrationAlpha - 0.05).toFixed(2)
        );
      }

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
      if (timestamp - last >= dif * 1000) {
        if (dif > 1) dif -= 0.5;
        last = timestamp;
        Game.generateObstacles(timestamp, delta);
      }

      Game.clearObstacles();

      if (Game.isCollision()) {
        //console.log("hola")
        Game.gameOver();
      }

      if (Game.lastAnimation) {
        Game.finalAnimation();
      }
      if (Game.alpha >= 1) {
        Game.over = true;
      }
      if (!Game.over) window.requestAnimationFrame(refresh);
    }
    window.requestAnimationFrame(refresh);
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, this.width, this.height);
    this.obstacles = [];
    ScoreBoard.init(
      this.ctx,
      this.score,
      this.player.lives,
      this.width,
      this.height
    );
    BlackBackground.init(this.ctx, this.width, this.height);
    this.initialAnimation = new InitialAnimation(
      this.ctx,
      this.width,
      this.height
    );
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function(timestamp) {
    this.background.draw();
    this.obstacles.forEach(obstacle => obstacle.draw(timestamp));
    this.player.draw();
    ScoreBoard.draw(this.score, this.player.lives);
    BlackBackground.draw(this.alpha);
    this.initialAnimation.draw(timestamp);
  },

  moveAll: function(delta) {
    this.player.move(this.midval, delta);
    this.obstacles.forEach(obstacle => obstacle.move(delta));
    this.initialAnimation.move();
  },

  generateObstacles: function(timestamp, delta) {
    //console.log("generating obs");
    this.obstacles.push(
      new Obstacle(this.ctx, this.width, this.height, timestamp)
    );
  },

  clearObstacles: function() {
    //console.log(this.obstacles)
    this.obstacles = this.obstacles.filter(obstacle => {
      if (obstacle.posY + obstacle.height / 2 <= this.height) {
        return true;
      } else {
        if (!obstacle.crash && !this.lastAnimation) {
          this.score++;
          this.player.message = "+1";
          this.celebrationAlpha = 1;
          this.player.celebrationSound[this.player.celebrationIndex()].play();
        }
        return false;
      }
    });
  },

  isCollision: function() {
    // return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX ))
    return this.obstacles.some(obs => {
      if (Game.obstacleCollision != obs.creationTime) {
        if (
          this.player.posX + this.player.width > obs.posX - obs.width / 2 &&
          obs.posX + obs.width / 2 > this.player.posX &&
          obs.width >= 90 &&
          obs.width <= 100
        ) {
          Game.obstacleCollision = obs.creationTime;
          //console.log("collision")
          this.player.lives--;
          obs.crash = true;
          //console.log(this.player.lives)
          this.crash = 20;
          this.player.message = "-1";
          this.celebrationAlpha = 1;
          this.player.crashSound[this.crashIndex].play();
          if (this.crashIndex < 2) this.crashIndex++;
          return true;
        } else {
          return false;
        }
      }
    });
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
    this.initialAnimation.music.pause();
    if (Game.alpha < 1) {
      Game.alpha += 0.01;
    } else {
      this.over = true;
    }
  },

  runDetection: function() {
    model.detect(this.video).then(predictions => {
      // console.log("Predictions: ", predictions);
      // get the middle x value of the bounding box and map to paddle location
      //this is the renderer of the library  -->//model.renderPredictions(predictions, canvas, context, video);
      //to render on top of video
      Game.renderPredictions(
        predictions,
        this.videoCanvas,
        this.videoCanvasCtx,
        this.video
      );
      // set the value x of the hand
      if (predictions[0]) {
        this.midval = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
        //console.log(this.midval)
      }
    });
  },

  //modified model.renderPredictions method from the handtrack.js library
  renderPredictions: function(e, t, a, n) {
    a.clearRect(0, 0, t.width, t.height),
      (t.width = n.width),
      (t.height = n.height),
      a.save(),
      this.modelParams.flipHorizontal &&
        (a.scale(-1, 1), a.translate(-n.width, 0)),
      a.drawImage(n, 0, 0, n.width, n.height),
      a.restore(),
      (a.font = "15px Arial"); // console.log('number of detections: ', predictions.length);
    for (
      let r = 0;
      r < e.length;
      r++ // draw a dot at the center of bounding box
    )
      a.beginPath(),
        (a.lineWidth = 3),
        (a.strokeStyle = "#ff4a4a"),
        a.rect(...e[r].bbox),
        a.stroke();
  }
};
