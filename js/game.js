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
    scoreThreshold: 0.6, // confidence threshold for predictions.
  },

  init: function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
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
    this.reset()
    let past = 0;
    let delta = 0;
    let count = 0; //to set a delay on runDetection()
    function refresh(timestamp) {
      delta = timestamp - past;
      past = timestamp;

      Game.clear();
      Game.drawAll();
      Game.moveAll();

      if ((timestamp/50) > count )  {
        Game.runDetection()
        count ++;
      }
      window.requestAnimationFrame(refresh)
      //if (!Game.over) {window.requestAnimationFrame(refresh)}
    }
    window.requestAnimationFrame(refresh)
  },

  reset: function() {
    //this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, this.width, this.height);
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },

  drawAll: function() {
    this.player.draw(this.midval);
  },

  moveAll: function() {
  },

  runDetection: function() {
    model.detect(this.video).then(predictions => {
      // console.log("Predictions: ", predictions);
      // get the middle x value of the bounding box and map to paddle location
      //model.renderPredictions(predictions, canvas, context, video);
      if (predictions[0]) {
        this.midval = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
        console.log(this.midval)
        //gamex = document.body.clientWidth * (midval / video.width)
        //updatePaddleControl(gamex)
        //console.log('Predictions: ', gamex);
        }
    });
  },

  
  

}