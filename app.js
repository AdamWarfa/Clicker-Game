"use strict";
window.addEventListener("load", start);
//
let points = 0;
let lives = 5;
//
function start() {
  document.querySelector("#enemy25Container").addEventListener("mousedown", fewPoints);
  document.querySelector("#enemy100Container").addEventListener("mousedown", morePoints);
  document.querySelector("#enemy50Container").addEventListener("mousedown", manyPoints);
  document.querySelector("#planet1Container").addEventListener("mousedown", planetBig);
  document.querySelector("#planet2Container").addEventListener("mousedown", planetSmall);
}
//
function fewPoints() {
  document.querySelector("#enemy25Container").removeEventListener("mousedown", fewPoints);
  document.querySelector("#enemy25Container").classList.add("paused");
  document.querySelector("#enemy25").classList.add("dead");
  incrementPointsFew();
}

function morePoints() {
  document.querySelector("#enemy100Container").removeEventListener("mousedown", morePoints);
  document.querySelector("#enemy100Container").classList.add("paused");
  document.querySelector("#enemy100").classList.add("dead");
  incrementPointsMore();
}

function manyPoints() {
  document.querySelector("#enemy50Container").removeEventListener("mousedown", manyPoints);
  document.querySelector("#enemy50Container").classList.add("paused");
  document.querySelector("#enemy50").classList.add("dead");
  incrementPointsMany();
}

function incrementPointsFew() {
  points = points + 25;
  console.log(points);
  displayPoints();
}
function incrementPointsMore() {
  points = points + 50;
  console.log(points);
  displayPoints();
}
function incrementPointsMany() {
  points = points + 100;
  console.log(points);
  displayPoints();
}
function displayPoints() {
  console.log("displayPoints");
  document.querySelector("#point-counter").textContent = points;
}
function planetBig() {
  document.querySelector("#planet1Container").removeEventListener("mousedown", planetBig);
  document.querySelector("#planet1Container").classList.add("paused");
  document.querySelector("#planet1").classList.add("zoom_in");
  decrementLives();
}

function planetSmall() {
  document.querySelector("#planet2Container").removeEventListener("mousedown", planetSmall);
  document.querySelector("#planet2Container").classList.add("paused");
  document.querySelector("#planet2").classList.add("zoom_in");
  decrementLives();
}

function decrementLives() {
  lives--;
  points = points - 100;
  displayDecrementLives();
}

function displayDecrementLives() {
  document.querySelector(`#battery${lives + 1}`).classList.remove("active-battery");
  document.querySelector(`#battery${lives + 1}`).classList.add("broken-battery");
  document.querySelector(`#point-counter`).textContent = points;
}
