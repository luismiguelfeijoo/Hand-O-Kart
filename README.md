# Hand-O-Kart

Try to survive to an obstacle blast by moving your kart from side to side with the arrow keys... or was it with the mouse(?). 
I guess we will have to figure it out.

[![](https://i.imgur.com/oobrhc1.png)](https://luismiguelfeijoo.github.io/Hand-O-Kart/index.html)

## Intro

Te game was built with a simple `<canvas>` element and a rendering loop using the method 
```
window.requestAnimationFrame()
```
### Render Loop 

On the render loop you can see the 3 keys for animation: Erase, Draw, Move.

Below you`ll see the basic structure of the render loop and the conditions that make the render loop stop

```
let refresh = function(timestamp) {
      delta = timestamp - past;
      past = timestamp;
      
      this.clear();
      this.drawAll(timestamp);
      this.moveAll(delta);
      
      this.clearObstacles();

      if (this.lastAnimation) {
        this.finalAnimation();
      }
      if (this.alpha >= 1) {
        this.over = true;
      }
      if (!this.over) {
        window.requestAnimationFrame(refresh);
      }
    };
    window.requestAnimationFrame(refresh);
```

### Handtrack.js

But what really make this game **HAND**some is **handtrack.js**, a library to track realtime hand interactions. It was developed by Victor Dibia (https://github.com/victordibia/handtrack.js/) and trained using TensorFlow. Go over to victor`s repo to better understand how his project works!

## Structure

To better understand the composition of the game we can divide this project in 3 parts: 

1. Hand detection
2. Draw & Move
3. Collision (how to make a 3d collision in a 2d rendering context). 

Let`s see it one by one


### Hand detection 


The firts and most important thing is to use `model.detect` (the library`s method to get the data) to the rendering loop, assuring that every time a frame is drawn you get the data of the hand at that time.


`model.detect` returns an array of "detections", and each element is an object (as explained by victor). To get the x position of the hand we do this: 

```
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
        //console.log(this.midval)
      }
    });
```



That position is stored in a variable `midval` to be later passed into the player's move method (we'll talk about that later)


To give the user a better info on the hand recognition handtrack.js give us a method called `renderPredictions`. To properly draw a bounding box on top of the video (the input method) you'll have to create a `<canvas>` on top of your input. I modified the stock method to make it a little more simple. You can see it below:

```
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
```

### Draw & Move

#### Draw
For the drawing you have to make sure you`re giving the proper parameters (canvas, context) and know how to position each element.

#### Move

We have 2 main moving objects: 
* Obstacles 
* The player

##### Obstacles

The obstacles are generated with a random x position and depending on the initial value a vx value (velocity on the x-axis) is generated. Also each one has a vy and vz to make the object move vertically and simulate the object coming closer, respectively.

##### Player

The player's movement is only on the x-axis and it depends on the position of the hand. To make it move and not "jump" between positions the value of the hand's coordinates are set as a target and in each movement iteration a vx is calculated depending on the current player position and the target:

```
  move(handX, delta) {
    if (handX) {
      this.targetX = handX;
    } else {
      this.targetX = this.posX;
    }
    this.posX += (this.targetX - this.posX) * ((3 / 1000) * delta);
  }
```
This guarantees to make a smooth movement.


### Collision (how to make a 3d collision in a 2d rendering context)

To check on the collision we have to imagine the obstacles movement. They get bigger to simulate being closer to the screen.

Following that logic we have to set a basic x-axis collision but add a size conditional for when the obstacle is in the desired spot:

```
  isCollision() {
    return this.obstacles.some(obs => {
      if (this.obstacleCollision != obs.creationTime) {
        if (
          this.player.posX + this.player.width > obs.posX - obs.width / 2 &&
          obs.posX + obs.width / 2 > this.player.posX &&
          obs.width >= 90 &&
          obs.width <= 100
        ) {
          this.obstacleCollision = obs.creationTime;
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
  }
```

Above you can also see how the isCollision method checks if the object hasn't crashed before, to limit the amount of crashed that the program detects in the frames that the player and obstacle collide.

## Made posible by

The images and sounds used in this project belong to it's authors and were only used by educational purposes

## To be continued...

Now I invite you to explore my game and maybe find inspiration to make any related project using this type of model recognition so we can make a together a **HAND**some universe
