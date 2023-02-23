"use strict";
window.addEventListener("load", start);
//
let points = 0;
let score = points.toString();
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
let buttonLose = document.querySelector("game_over_button");
let buttonWin = document.querySelector("level_complete_button");

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
  EnemyWeak.addEventListener("animationend", enemyWeakReset);

  incrementPointsFew();
}

function morePoints() {
  EnemyMedium.removeEventListener("mousedown", morePoints);
  EnemyMedium.classList.add("paused");
  EnemyMediumSprite.classList.add("dead");
  EnemyMedium.addEventListener("animationend", enemyMediumReset);

  incrementPointsMore();
}

function manyPoints() {
  EnemyStrong.removeEventListener("mousedown", manyPoints);
  EnemyStrong.classList.add("paused");
  EnemyStrongSprite.classList.add("dead");
  EnemyStrong.addEventListener("animationend", enemyStrongReset);

  incrementPointsMany();
}

function incrementPointsFew() {
  points = points + 25;
  if (points < 500) {
    console.log(points);
    displayPoints();
  } else {
    levelComplete();
  }
}
function incrementPointsMore() {
  points = points + 50;
  if (points < 500) {
    console.log(points);
    displayPoints();
  } else {
    levelComplete();
  }
}
function incrementPointsMany() {
  points = points + 100;
  if (points < 500) {
    console.log(points);
    displayPoints();
  } else {
    levelComplete();
  }
}
function displayPoints() {
  console.log("displayPoints");
  document.querySelector("#point-counter").textContent = points;
}
function planetBig() {
  planetHigh.removeEventListener("mouseover", planetBig);
  planetHigh.classList.add("paused");
  planetHighSprite.classList.add("zoom_out");
  planetHigh.addEventListener("animationend", planetBigReset);
  decrementLives();
}

function planetSmall() {
  planetLow.removeEventListener("mouseover", planetSmall);
  planetLow.classList.add("paused");
  planetLowSprite.classList.add("zoom_out");
  planetLow.addEventListener("animationend", planetSmallReset);
  decrementLives();
}

function decrementLives() {
  lives--;
  if (lives > 0) {
    points = points - 100;
    displayDecrementLives();
  } else {
    gameOver();
  }
}

function displayDecrementLives() {
  document.querySelector(`#battery${lives + 1}`).classList.remove("active-battery");
  document.querySelector(`#battery${lives + 1}`).classList.add("broken-battery");
  document.querySelector(`#point-counter`).textContent = points;
}

function enemyWeakReset() {
  //fjern event listener for alle 3 enemies
  EnemyWeak.removeEventListener("animationend", enemyWeakReset);

  // fjern dødsanimationerne
  EnemyWeak.classList.remove("paused");
  EnemyWeakSprite.classList.remove("dead");

  //reset initial animations
  EnemyWeak.classList.remove("flyleft");
  setTimeout(() => EnemyWeak.classList.add("flyleft"), 0);

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  EnemyWeak.addEventListener("mousedown", fewPoints);
}

function enemyMediumReset() {
  //fjern event listener for alle 3 enemies
  EnemyMedium.removeEventListener("animationend", enemyMediumReset);

  // fjern dødsanimationerne
  EnemyMedium.classList.remove("paused");
  EnemyMediumSprite.classList.remove("dead");

  //reset initial animations
  EnemyMedium.classList.remove("flyright");
  setTimeout(() => EnemyMedium.classList.add("flyright"), 0);

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  EnemyMedium.addEventListener("mousedown", morePoints);
}

function enemyStrongReset() {
  //fjern event listener for alle 3 enemies
  EnemyStrong.removeEventListener("animationend", enemyStrongReset);

  // fjern dødsanimationerne
  EnemyStrong.classList.remove("paused");
  EnemyStrongSprite.classList.remove("dead");

  //reset initial animations

  EnemyStrong.classList.remove("falling");
  setTimeout(() => EnemyStrong.classList.add("falling"), 0);
  EnemyStrongSprite.classList.remove("close");
  setTimeout(() => EnemyStrongSprite.classList.add("close"), 0);

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  EnemyStrong.addEventListener("mousedown", manyPoints);
}
function planetBigReset() {
  //fjern event listener for begge planeter
  planetHigh.removeEventListener("animationend", planetBigReset);

  // fjern dødsanimationerne
  planetHigh.classList.remove("paused");
  planetHighSprite.classList.remove("zoom_out");

  //reset initial animations
  planetHigh.classList.remove("driftright");
  setTimeout(() => planetHigh.classList.add("driftright"), 0);

  // Gør planets clickable igen, som vi gjorde i startfunktionen
  planetHigh.addEventListener("mouseover", planetBig);
}

function planetSmallReset() {
  //fjern event listener for begge planeter
  planetLow.removeEventListener("animationend", planetSmallReset);

  // fjern dødsanimationerne
  planetLow.classList.remove("paused");
  planetLowSprite.classList.remove("zoom_out");

  //reset initial animations
  planetLow.classList.remove("driftleft");
  setTimeout(() => planetLow.classList.add("driftleft"), 0);

  // Gør planets clickable igen, som vi gjorde i startfunktionen
  planetLow.addEventListener("mouseover", planetSmall);
}

function startScreen() {
  document.querySelector("#start").classList.add("hidden");
}

function rules() {
  document.querySelector("#rules").classList.add("hidden");
}

function gameOver() {
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#game_over_score").textContent = `Score: ${points}`;
}

function levelComplete() {
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#level_complete_score").textContent = `Score: ${points}`;
}
