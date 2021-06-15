const item = document.querySelector(".item");
const placeholders = document.querySelectorAll(".placeholder");

item.addEventListener("dragstart", dragstart);
item.addEventListener("dragend", dragend);

for (const placeholder of placeholders) {
  placeholder.addEventListener("dragover", dragover);
  placeholder.addEventListener("dragenter", dragenter);
  placeholder.addEventListener("dragleave", dragleave);
  placeholder.addEventListener("drop", dragdrop);
}

function dragstart(ev) {
  ev.target.classList.add("hold");
  setTimeout(() => ev.target.classList.add("hide"), 0);
}

function dragend(ev) {
  ev.target.classList.remove("hold", "hide");
}

function dragover(ev) {
  ev.preventDefault();
}

function dragenter(ev) {
  ev.target.classList.add("hovered");
}

function dragleave(ev) {
  ev.target.classList.remove("hovered");
}

function dragdrop(ev) {
  ev.target.append(item);
  ev.target.classList.remove("hovered");
}
