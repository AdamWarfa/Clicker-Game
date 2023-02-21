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
  document.querySelector("#planet1Container").addEventListener("mouseover", planetBig);
  document.querySelector("#planet2Container").addEventListener("mouseover", planetSmall);
}
//
function fewPoints() {
  document.querySelector("#enemy25Container").removeEventListener("mousedown", fewPoints);
  document.querySelector("#enemy25Container").classList.add("paused");
  document.querySelector("#enemy25").classList.add("dead");
  document.querySelector("#enemy25Container").addEventListener("animationend", enemyReset);

  incrementPointsFew();
}

function morePoints() {
  document.querySelector("#enemy100Container").removeEventListener("mousedown", morePoints);
  document.querySelector("#enemy100Container").classList.add("paused");
  document.querySelector("#enemy100").classList.add("dead");
  document.querySelector("#enemy100Container").addEventListener("animationend", enemyReset);

  incrementPointsMore();
}

function manyPoints() {
  document.querySelector("#enemy50Container").removeEventListener("mousedown", manyPoints);
  document.querySelector("#enemy50Container").classList.add("paused");
  document.querySelector("#enemy50").classList.add("dead");
  document.querySelector("#enemy50Container").addEventListener("animationend", enemyReset);

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
  document.querySelector("#planet1Container").removeEventListener("mouseover", planetBig);
  document.querySelector("#planet1Container").classList.add("paused");
  document.querySelector("#planet1").classList.add("zoom_in");
  document.querySelector("#planet1Container").addEventListener("animationend", planetReset);
  decrementLives();
}

function planetSmall() {
  document.querySelector("#planet2Container").removeEventListener("mouseover", planetSmall);
  document.querySelector("#planet2Container").classList.add("paused");
  document.querySelector("#planet2").classList.add("zoom_in");
  document.querySelector("#planet2Container").addEventListener("animationend", planetReset);
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

function enemyReset() {
  //fjern event listener for alle 3 enemies
  document.querySelector("#enemy25Container").removeEventListener("animationend", enemyReset);
  document.querySelector("#enemy50Container").removeEventListener("animationend", enemyReset);
  document.querySelector("#enemy100Container").removeEventListener("animationend", enemyReset);

  // fjern dødsanimationerne
  document.querySelector("#enemy25Container").classList.remove("paused");
  document.querySelector("#enemy25").classList.remove("dead");

  document.querySelector("#enemy50Container").classList.remove("paused");
  document.querySelector("#enemy50").classList.remove("dead");

  document.querySelector("#enemy100Container").classList.remove("paused");
  document.querySelector("#enemy100").classList.remove("dead");

  //reset initial animations
  document.querySelector("#enemy25Container").classList.remove("flyleft");
  document.querySelector("#enemy25Container").classList.offsetWidth;
  document.querySelector("#enemy25Container").classList.add("flyleft");

  document.querySelector("#enemy50Container").classList.remove("falling");
  document.querySelector("#enemy50Container").classList.offsetWidth;
  document.querySelector("#enemy50Container").classList.add("falling");
  document.querySelector("#enemy50").classList.remove("close");
  document.querySelector("#enemy50").classList.offsetWidth;
  document.querySelector("#enemy50").classList.add("close");

  document.querySelector("#enemy100Container").classList.remove("flyright");
  document.querySelector("#enemy100Container").classList.offsetWidth;
  document.querySelector("#enemy100Container").classList.add("flyright");

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  document.querySelector("#enemy25Container").addEventListener("mousedown", fewPoints);
  document.querySelector("#enemy100Container").addEventListener("mousedown", morePoints);
  document.querySelector("#enemy50Container").addEventListener("mousedown", manyPoints);
}

function planetReset() {
  //fjern event listener for begge planeter
  document.querySelector("#planet1Container").removeEventListener("animationend", planetReset);
  document.querySelector("#planet2Container").removeEventListener("animationend", planetReset);

  // fjern dødsanimationerne
  document.querySelector("#planet1Container").classList.remove("paused");
  document.querySelector("#planet1").classList.remove("zoom_in");

  document.querySelector("#planet2Container").classList.remove("paused");
  document.querySelector("#planet2").classList.remove("zoom_in");

  //reset initial animations
  document.querySelector("#planet1Container").classList.remove("driftright");
  document.querySelector("#planet1Container").classList.offsetWidth;
  document.querySelector("#planet1Container").classList.add("driftright");

  document.querySelector("#planet2Container").classList.remove("driftleft");
  document.querySelector("#planet2Container").classList.offsetWidth;
  document.querySelector("#planet2Container").classList.add("driftleft");

  // Gør planets clickable igen, som vi gjorde i startfunktionen
  document.querySelector("#planet1Container").addEventListener("mouseover", planetBig);
  document.querySelector("#planet2Container").addEventListener("mouseover", planetSmall);
}
