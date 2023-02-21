"use strict";
window.addEventListener("load", start);
//
let points = 0;
let lives = 5;
//
function start() {
  document
    .querySelector("#enemy25Container")
    .addEventListener("mousedown", fewPoints);
  document
    .querySelector("#enemy50Container")
    .addEventListener("mousedown", morePoints);
  document
    .querySelector("#enemy100Container")
    .addEventListener("mousedown", manyPoints);
}
//
function fewPoints() {
  document
    .querySelector("#enemy25Container")
    .removeEventListener("mousedown", fewPoints);
  document.querySelector("#enemy25Container").classList.add("paused");
  document.querySelector("#enemy25").classList.add("zoom_out");
}

function morePoints() {
  document
    .querySelector("#enemy50Container")
    .removeEventListener("mousedown", morePoints);
  document.querySelector("#enemy50Container").classList.add("paused");
  document.querySelector("#enemy50").classList.add("zoom_out");
}

function manyPoints() {
  document
    .querySelector("#enemy100Container")
    .removeEventListener("mousedown", manyPoints);
  document.querySelector("#enemy100Container").classList.add("paused");
  document.querySelector("#enemy100").classList.add("zoom_out");
}
