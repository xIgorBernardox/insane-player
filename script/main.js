// Cover
const cover = document.querySelector(".cover");

// Music title
const songName = document.querySelector(".song-name");

// Band name
const bandName = document.querySelector(".band-name");

// Like Btn
const likeBtn = document.querySelector("#like-btn");

// Audio
const song = document.querySelector(".audio");

// Progress Bar
const progressContainer = document.querySelector(".progress-container");
const currentProgress = document.querySelector(".current-progress");

// Time song below progress bar
const songTime = document.querySelector(".song-time");
const totalTime = document.querySelector(".total-time");

// Play Button
const play = document.querySelector(".play");

// Next and Previous
const previous = document.querySelector("#arrow-left");
const next = document.querySelector("#arrow-right");

// Shuffle Btn
const shuffleButton = document.querySelector("#shuffle");

// Repeat Btn
const repeatButton = document.querySelector("#arrow-repeat");

// Functions
// Array content
const royalty = {
  songName: "Royalty",
  bandName: "Egzod & Maestro Chives - ft.Neoni",
  file: "Egzod & Maestro Chives - Royalty (ft. Neoni)",
  fileImage: "stretched-1920-1080-842770",
};

const mockingBird = {
  songName: "Mockingbird",
  bandName: "Eminem",
  file: "Eminem - Mockingbird",
  fileImage: "1107968",
};

const risingSun = {
  songName: "The House of The Rising Sun",
  bandName: "The White Buffalo",
  file: "The House of The Rising Sun - The White Buffalo",
  fileImage: "1068781",
};

const bornAgain = {
  songName: "BORN AGAIN",
  bandName: "Mystical Faya",
  file: "Mystical Faya - BORN AGAIN",
  fileImage: "stretched-1920-1080-842583",
};

// Playlist
let isShuffled = false;
let repeatOn = false;
let btnLikeOn = false;
const originalPlayList = [royalty, mockingBird, risingSun, bornAgain];
let sortedPlaylist = [...originalPlayList];
let index = 0;

// Title and Artist Informations
function initializeSong() {
  cover.src = `images/${sortedPlaylist[index].fileImage}.jpg`;
  song.src = `music/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].bandName;
}

// Progress Bar
function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}
progressContainer.addEventListener("click", jumpTo);

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}
song.addEventListener("timeupdate", updateProgress);

// Time song below progress bar
function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let sec = Math.floor(originalNumber - hours * 3600 - min * 60);
  return `${hours.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}
song.addEventListener("loadedmetadata", updateTotalTime);

// Buttons
// Shuffle button
function shuffleArray(preShuffleArray) {
  const size = sortedPlaylist.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleBtnClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
  } else {
    isShuffled = false;
    sortedPlaylist = [...originalPlayList];
    shuffleButton.classList.remove("button-active");
  }
}
shuffleButton.addEventListener("click", shuffleBtnClicked);

// Play button
function playSong() {
  song.play();
}

// Pause button
function pauseSong() {
  song.pause();
}

// Play and Pause Function
play.addEventListener("click", function () {
  if (song.paused) {
    playSong();
    const icon = play.querySelector(".bi");
    icon.classList.remove("bi-play");
    icon.classList.add("bi-pause");
  } else {
    pauseSong();
    const icon = play.querySelector(".bi");
    icon.classList.remove("bi-pause");
    icon.classList.add("bi-play");
  }
});

// Next and Previous Function
function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playSong();
}
previous.addEventListener("click", previousSong);

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playSong();
}
next.addEventListener("click", nextSong);

// Repeat Btn
function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add("button-active");
  } else {
    repeatOn = false;
    repeatButton.classList.remove("button-active");
  }
}
repeatButton.addEventListener("click", repeatButtonClicked);

// Next or Repeat when audio end
function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playSong();
  }
}
song.addEventListener("ended", nextOrRepeat);

// Like Button
function likeBtnClicked() {
  if (btnLikeOn === false) {
    btnLikeOn = true;
    likeBtn.classList.add("btn-active");
  } else {
    btnLikeOn = false;
    likeBtn.classList.remove("btn-active");
  }
}
likeBtn.addEventListener("click", likeBtnClicked);
initializeSong();
