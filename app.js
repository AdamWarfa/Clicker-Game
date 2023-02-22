"use strict";
window.addEventListener("load", start);
//
let points = 0;
let lives = 5;
//Variabeldeklaration
let EnemyWeak = document.querySelector("#enemy25Container");
let EnemyMedium = document.querySelector("#enemy100Container");
let EnemyStrong = document.querySelector("#enemy50Container");
let EnemyWeakSprite = document.querySelector("#enemy25");
let EnemyMediumSprite = document.querySelector("#enemy100");
let EnemyStrongSprite = document.querySelector("#enemy50");
let planetHigh = document.querySelector("#planet1Container");
let planetLow = document.querySelector("#planet2Container");
let planetHighSprite = document.querySelector("#planet1");
let planetLowSprite = document.querySelector("#planet2");

//
function start() {
  EnemyWeak.classList.add("flyleft");
  EnemyStrong.classList.add("falling");
  EnemyMedium.classList.add("flyright");
  planetHigh.classList.add("driftright");
  planetLow.classList.add("driftleft");

  EnemyWeak.addEventListener("mousedown", fewPoints);
  EnemyMedium.addEventListener("mousedown", morePoints);
  EnemyStrong.addEventListener("mousedown", manyPoints);
  planetHigh.addEventListener("mouseover", planetBig);
  planetLow.addEventListener("mouseover", planetSmall);
}
//
function fewPoints() {
  EnemyWeak.removeEventListener("mousedown", fewPoints);
  EnemyWeak.classList.add("paused");
  EnemyWeakSprite.classList.add("dead");
  EnemyWeak.addEventListener("animationend", enemyReset);

  incrementPointsFew();
}

function morePoints() {
  EnemyMedium.removeEventListener("mousedown", morePoints);
  EnemyMedium.classList.add("paused");
  EnemyMediumSprite.classList.add("dead");
  EnemyMedium.addEventListener("animationend", enemyReset);

  incrementPointsMore();
}

function manyPoints() {
  EnemyStrong.removeEventListener("mousedown", manyPoints);
  EnemyStrong.classList.add("paused");
  EnemyStrongSprite.classList.add("dead");
  EnemyStrong.addEventListener("animationend", enemyReset);

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
  planetHigh.removeEventListener("mouseover", planetBig);
  planetHigh.classList.add("paused");
  planetHighSprite.classList.add("zoom_in");
  planetHigh.addEventListener("animationend", planetReset);
  decrementLives();
}

function planetSmall() {
  planetLow.removeEventListener("mouseover", planetSmall);
  planetLow.classList.add("paused");
  planetLowSprite.classList.add("zoom_in");
  planetLow.addEventListener("animationend", planetReset);
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
  EnemyWeak.removeEventListener("animationend", enemyReset);
  EnemyStrong.removeEventListener("animationend", enemyReset);
  EnemyMedium.removeEventListener("animationend", enemyReset);

  // fjern dødsanimationerne
  EnemyWeak.classList.remove("paused");
  EnemyWeakSprite.classList.remove("dead");

  EnemyStrong.classList.remove("paused");
  EnemyStrongSprite.classList.remove("dead");

  EnemyMedium.classList.remove("paused");
  EnemyMediumSprite.classList.remove("dead");

  //reset initial animations
  EnemyWeak.classList.remove("flyleft");
  EnemyWeak.classList.offsetWidth;
  EnemyWeak.classList.add("flyleft");

  EnemyStrong.classList.remove("falling");
  EnemyStrong.classList.offsetWidth;
  EnemyStrong.classList.add("falling");
  EnemyStrongSprite.classList.remove("close");
  EnemyStrongSprite.classList.offsetWidth;
  EnemyStrongSprite.classList.add("close");

  EnemyMedium.classList.remove("flyright");
  EnemyMedium.classList.offsetWidth;
  EnemyMedium.classList.add("flyright");

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  EnemyWeak.addEventListener("mousedown", fewPoints);
  EnemyMedium.addEventListener("mousedown", morePoints);
  EnemyStrong.addEventListener("mousedown", manyPoints);
}

function planetReset() {
  //fjern event listener for begge planeter
  planetHigh.removeEventListener("animationend", planetReset);
  planetLow.removeEventListener("animationend", planetReset);

  // fjern dødsanimationerne
  planetHigh.classList.remove("paused");
  planetHighSprite.classList.remove("zoom_in");

  planetLow.classList.remove("paused");
  planetLowSprite.classList.remove("zoom_in");

  //reset initial animations
  planetHigh.classList.remove("driftright");
  planetHigh.classList.offsetWidth;
  planetHigh.classList.add("driftright");

  planetLow.classList.remove("driftleft");
  planetLow.classList.offsetWidth;
  planetLow.classList.add("driftleft");

  // Gør planets clickable igen, som vi gjorde i startfunktionen
  planetHigh.addEventListener("mouseover", planetBig);
  planetLow.addEventListener("mouseover", planetSmall);
}
