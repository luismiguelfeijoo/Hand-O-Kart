class Game {
  constructor(button, note) {
    this.button = button;
    this.note = note;

    this.canvas = undefined;
    this.ctx = undefined;

    this.video = document.getElementById("myvideo");
    this.videoCanvas = document.getElementById("videoCanvas");
    this.videoCanvasCtx = videoCanvas.getContext("2d");

    this.width = undefined;
    this.height = undefined;
    this.fps = 60;
    this.framesCounter = 0;
    this.score = 0;
    this.lives = undefined;
    this.midval = 0;

    this.model = null;
    this.isVideo = null;
    this.imgindex = null;

    this.modelParams = {
      flipHorizontal: true, // flip e.g for video
      maxNumBoxes: 1, // maximum number of boxes to detect
      iouThreshold: 0.5, // ioU threshold for non-max suppression
      scoreThreshold: 0.7 // confidence threshold for predictions.
    };
    this.over = false;
    this.obstacleCollision = 0;

    this.lastAnimation = false;
    this.alpha = 0;

    this.crash = 0;
    this.crashIndex = 0;
    this.celebrationAlpha = 0;
    this.restart = false;

    this.music = new Audio();
    this.music.src = "./sounds/music.mp3";
    this.music.loop = true;
  }

  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.video.width = this.width;
    this.video.height = this.height;
    this.alpha = 0;
    this.start();
  }

  start() {
    this.reset();
    let past = 0;
    let last = 15000; //delay miliseconds
    let delta = 0;
    let count = 0; //to set a delay on runDetection()
    let proof = -20;
    let dif = 5;
    let refresh = function(timestamp) {
      delta = timestamp - past;
      past = timestamp;
      this.clear();
      this.player.crash(this.crash);
      if (this.crash > 0) this.crash--;

      this.drawAll(timestamp);
      this.moveAll(delta);

      this.player.celebration(this.celebrationAlpha);
      if (this.celebrationAlpha > 0) {
        this.celebrationAlpha = parseFloat(
          (this.celebrationAlpha - 0.05).toFixed(2)
        );
      }

      if (timestamp / 100 > count) {
        //this is rendering the hand at 15fps aprox
        this.runDetection();
        count++;
      }

      //generates obstacles every 5s then with -.5 seconds than the previous until it reaches 1 second
      if (timestamp - last >= dif * 1000) {
        if (dif > 1) dif -= 0.5;
        last = timestamp;
        this.generateObstacles(timestamp, delta);
      }

      this.clearObstacles();

      if (this.isCollision()) {
        this.gameOver();
      }

      if (this.lastAnimation) {
        this.finalAnimation();
      }
      if (this.alpha >= 1) {
        this.over = true;
      }
      if (!this.over) {
        this.id = window.requestAnimationFrame(refresh);
      }
    }.bind(this);
    this.id = window.requestAnimationFrame(refresh);
  }

  reset() {
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
    if (!this.restart) {
      this.initialAnimation = new InitialAnimation(
        this.ctx,
        this.width,
        this.height
      );
    } else {
      this.music.play();
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawAll(timestamp) {
    this.background.draw();
    this.obstacles.forEach(obstacle => obstacle.draw(timestamp));
    this.player.draw();
    ScoreBoard.draw(this.score, this.player.lives);
    BlackBackground.draw(this.alpha);
    if (!this.restart) this.initialAnimation.draw(timestamp);
  }

  moveAll(delta) {
    this.player.move(this.midval, delta);
    this.obstacles.forEach(obstacle => obstacle.move(delta));
    if (!this.restart) this.initialAnimation.move();
  }

  generateObstacles(timestamp, delta) {
    //console.log("generating obs");
    this.obstacles.push(
      new Obstacle(this.ctx, this.width, this.height, timestamp)
    );
  }

  clearObstacles() {
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
  }

  isCollision() {
    // return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX ))
    return this.obstacles.some(obs => {
      if (this.obstacleCollision != obs.creationTime) {
        if (
          this.player.posX + this.player.width / 2 > obs.posX - obs.width / 2 &&
          obs.posX + obs.width / 2 > this.player.posX - this.player.width / 2 &&
          obs.width >= 90 &&
          obs.width <= 100
        ) {
          if (!this.lastAnimation) {
            this.obstacleCollision = obs.creationTime;
            this.player.lives--;
            obs.crash = true;
            this.crash = 20;
            this.player.message = "-1";
            this.celebrationAlpha = 1;
            this.player.crashSound[this.crashIndex].play();
            if (this.crashIndex < 2) this.crashIndex++;
            return true;
          }
        } else {
          return false;
        }
      }
    });
  }

  gameOver() {
    if (this.player.lives === 0) {
      this.lastAnimation = true;
      this.toggleVideo();
      updateNote.innerText = "Game Over";
      this.button.innerText = "restart";
    }
  }

  finalAnimation() {
    if (!this.restart) {
      this.initialAnimation.music.pause();
    } else {
      this.music.pause();
    }
    if (this.alpha < 1) {
      this.alpha += 0.01;
    } else {
      this.over = true;
    }
  }

  runDetection() {
    model.detect(this.video).then(predictions => {
      //to render on top of video
      this.renderPredictions(
        predictions,
        this.videoCanvas,
        this.videoCanvasCtx,
        this.video
      );
      // set the value x of the hand
      if (predictions[0]) {
        this.midval = predictions[0].bbox[0] + predictions[0].bbox[2] / 2;
      }
    });
  }

  //modified model.renderPredictions method from the handtrack.js library
  //renderPredictions(predictions, canvas, context, video)
  renderPredictions(e, t, a, n) {
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

  toggleVideo() {
    if (!this.isVideo) {
      this.note.innerText = "Starting video";
      this.startVideo();
    } else {
      this.note.innerText = "Stopping video";
      handTrack.stopVideo(game.video);
      this.isVideo = false;
      this.innerText = "Video stopped";
    }
  }

  startVideo() {
    handTrack.startVideo(this.video).then(function(status) {
      //console.log("video started", status);
      if (status) {
        game.note.innerText = "Now playing";
        game.isVideo = true;
      } else {
        game.note.innerText = "Please enable video";
      }
    });
  }

  toggleButton() {
    if (
      this.button.innerText == "start" ||
      this.button.innerText == "restart"
    ) {
      this.button.innerText = "pause";
    } else {
      this.button.innerText = "start";
    }
  }
}
