let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
let intro = document.getElementsByClassName("intro").item(0);
let startMessage = document.getElementsByClassName("small").item(0);

trackButton.addEventListener("click", function() {
  intro.classList.add("hide");
  toggleVideo();
  Game.init();
  toggleButton();
});

// Load the model.
window.onload = function() {
  handTrack.load(Game.modelParams).then(lmodel => {
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

function startVideo() {
  handTrack.startVideo(Game.video).then(function(status) {
    //console.log("video started", status);
    if (status) {
      updateNote.innerText = "Now playing";
      Game.isVideo = true;
    } else {
      updateNote.innerText = "Please enable video";
    }
  });
}

function toggleVideo() {
  if (!Game.isVideo) {
    updateNote.innerText = "Starting video";
    startVideo();
  } else {
    updateNote.innerText = "Stopping video";
    handTrack.stopVideo(Game.video);
    Game.isVideo = false;
    updateNote.innerText = "Video stopped";
  }
}

function toggleButton() {
  if (trackButton.innerText == "start") {
    trackButton.innerText = "pause";
  } else {
    trackButton.innerText = "start";
  }
}
