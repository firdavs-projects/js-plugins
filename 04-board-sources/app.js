const board = document.querySelector("#board");
const controls = document.querySelector(".controls");
const colors = ["#c71d1d", "#2e97ad", "#ad12db", "#e15f99", "#7edd98"];
const SQUARES_NUMBER = 500;

const random = document.createElement("button");
random.classList.add("random");
random.innerHTML = "Random";
random.addEventListener("click", () => {
  animation("random");
});
controls.append(random);

const pulse = document.createElement("button");
pulse.classList.add("pulse");
pulse.innerHTML = "Pulse";
pulse.addEventListener("click", () => {
  animation("pulse");
});
controls.append(pulse);

const animate = document.createElement("button");
animate.classList.add("animate");
animate.innerHTML = "Animate";
animate.addEventListener("click", () => {
  const intervalId = setInterval(() => {
    animation("random");
  }, 100);
});
controls.append(animate);

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => {
    setColor(square);
  });

  square.addEventListener("mouseleave", () => {
    removeColor(square);
  });

  board.append(square);
}

function animation(type) {
  const squares = document.querySelectorAll(".square");

  if (type === "pulse") {
    for (let i = 0; i < SQUARES_NUMBER; i++) {
      if (i % Math.floor(Math.random() * 5) === 0) {
        squares[i] && setColor(squares[i]);
        setTimeout(() => {
          removeColor(squares[i]);
        }, 800);
      }
    }
  }

  if (type === "random") {
    const index = Math.floor(Math.random() * SQUARES_NUMBER);
    squares[index] && setColor(squares[index]);
    setTimeout(() => {
      removeColor(squares[index]);
    }, 800);
  }
}

function setColor(el) {
  const color = getRandomColor();
  el.style.backgroundColor = color;
  el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(el) {
  el.style.backgroundColor = "#1d1d1d";
  el.style.boxShadow = "0 0 2px black";
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
