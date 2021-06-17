const startBtn = document.querySelector("#start");
const timeListEl = document.querySelector("#timelist");
const screensEl = document.querySelectorAll(".screen");
const timeEl = document.querySelector("#time");
const boardEl = document.querySelector("#board");

let time = 0;
let currentTimer = 0;
let score = 0;

const colors = [
  "linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)",
  "linear-gradient(90deg, #e6193b 0%, #ff002b 47%, #b95062 100%)",
  "linear-gradient(90deg, #670af1 0%, #8443e6 47%, #380486 100%)",
  "linear-gradient(90deg, #23da12 0%, #4fdb42 47%, #14860a 100%)",
];

startBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  screensEl[0].classList.add("up");
});

timeListEl.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("time-btn")) {
    time = +ev.target.getAttribute("data-time");
    currentTimer = time;
    screensEl[1].classList.add("up");
    startGame();
  }
});

boardEl.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("circle")) {
    score++;
    ev.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function tryAgain() {
  const retryEl = document.createElement("button");
  retryEl.classList.add("time-btn");
  retryEl.innerHTML = "Try again";
  retryEl.addEventListener("click", () => {
    time = currentTimer;
    score = 0;
    boardEl.innerHTML = "";
    timeEl.parentNode.classList.remove("hide");
    createRandomCircle();
    setTime(currentTimer);
  });
  boardEl.append(retryEl);
}

function finishGame() {
  boardEl.innerHTML = `<h1>Score: <span class = "primary">${score}</span></h1><br/>`;
  timeEl.parentNode.classList.add("hide");
  tryAgain();
}

function createRandomCircle() {
  const circleEl = document.createElement("div");
  const size = getRandomNumber(10, 65);
  const { height, width } = boardEl.getBoundingClientRect();

  circleEl.classList.add("circle");
  circleEl.style.width = `${size}px`;
  circleEl.style.height = `${size}px`;
  circleEl.style.top = `${getRandomNumber(0, height - size)}px`;
  circleEl.style.left = `${getRandomNumber(0, width - size)}px`;
  circleEl.style.background = getRandomColor();

  boardEl.append(circleEl);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
