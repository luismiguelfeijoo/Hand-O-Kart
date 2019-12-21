let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let intro = document.getElementsByClassName("intro").item(0);
let startMessage = document.getElementsByClassName("small").item(0);

// Load the model.
window.onload = function() {
  game = new Game(trackButton, updateNote);
  handTrack.load(game.modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel;
    updateNote.innerText = "Ready to play!";
    trackButton.classList.toggle("hide");
    trackButton.disabled = false;
    LoadFiles.load.then(a => {
      trackButton.classList.add("show");
      startMessage.classList.remove("hide");
      startMessage.classList.add("show");
    });
  });
};

trackButton.addEventListener("click", function() {
  intro.classList.add("hide");
  if (trackButton.innerText == "restart") {
    game = new Game(trackButton, updateNote);
    game.restart = true;
  }
  game.toggleVideo();
  game.init();
  game.toggleButton();
});

/*
function startVideo() {
  handTrack.startVideo(game.video).then(function(status) {
    //console.log("video started", status);
    if (status) {
      updateNote.innerText = "Now playing";
      game.isVideo = true;
    } else {
      updateNote.innerText = "Please enable video";
    }
  });
}

function toggleVideo() {
  if (!game.isVideo) {
    updateNote.innerText = "Starting video";
    startVideo();
  } else {
    updateNote.innerText = "Stopping video";
    handTrack.stopVideo(game.video);
    game.isVideo = false;
    updateNote.innerText = "Video stopped";
  }
}

function toggleButton() {
  if (trackButton.innerText == "start" || trackButton.innerText == "restart") {
    trackButton.innerText = "pause";
  } else {
    trackButton.innerText = "start";
  }
}*/
