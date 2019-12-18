const LoadFiles = {
  images: [
    "./img/items.png",
    "./img/Mario Kart.png",
    "./img/mario-background.png",
    "./img/mario.png",
    "./img/marioMirror.png"
  ],

  sounds: [
    "./sounds/loser.wav",
    "./sounds/mamma-mia.wav",
    "./sounds/ow.wav",
    "./sounds/whoo-hoo.wav"
  ],

  index:0,

  indexS: 0,

  finishI: false,
  finishS: false,

  downloadImages: function() {
    let image = new Image()
    image.src = this.images[this.index]
    image.onload = () => {
      if (this.index < this.images.length - 1) {
        this.index ++
        this.downloadImages()
      } else {
        this.finishI = true
      }
    }
  },

  downloadSounds: function() {
    let sound = new Audio()
    sound.src = this.sounds[this.indexS]
    sound.onload = () => {
      if (this.indexS < this.sounds.length - 1) {
        this.indexS ++
        this.downloadSounds()
      } else {
        this.finishS = true
      }
    }
  },

  loading: function() {
    this.downloadSounds();
    this.downloadImages();
  },

  load: new Promise ( function(resolve,reject) {
    resolve( function() {
      this.downloadImages()
      this.downloadSounds()
    })
  }),
 
}
