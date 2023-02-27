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

//Startfunktion
function start() {
  startAnimations();

  startPositions();

  startListeners();
}

//Giv målene animationer
function startAnimations() {
  EnemyWeak.classList.add("flyleft");
  EnemyStrong.classList.add("falling");
  EnemyMedium.classList.add("flyright");
  planetHigh.classList.add("driftright");
  planetLow.classList.add("driftleft");
}

//Giv målene startpositioner
function startPositions() {
  EnemyWeak.classList.add("position1");
  EnemyMedium.classList.add("position2");
  planetHigh.classList.add("position3");
  planetLow.classList.add("position4");
}

//eventListeners
function startListeners() {
  //Når man clicker og hover over mål
  EnemyWeak.addEventListener("mousedown", fewPoints);
  EnemyMedium.addEventListener("mousedown", morePoints);
  EnemyStrong.addEventListener("mousedown", manyPoints);
  planetHigh.addEventListener("mouseover", planetBig);
  planetLow.addEventListener("mouseover", planetSmall);

  //når animationer skal genstartes
  EnemyWeak.addEventListener("animationiteration", enemyWeakReset);
  EnemyMedium.addEventListener("animationiteration", enemyMediumReset);
  planetHigh.addEventListener("animationiteration", planetBigReset);
  planetLow.addEventListener("animationiteration", planetSmallReset);

  //Game Over hvis man ikke nårat trykke på det sjældne rumskib
  EnemyStrong.addEventListener("animationiteration", gameOver);
}

// Når man trykker på det langsomme rumskib
function fewPoints() {
  EnemyWeak.removeEventListener("mousedown", fewPoints);
  EnemyWeak.classList.add("paused");
  EnemyWeakSprite.classList.add("dead");
  EnemyWeak.addEventListener("animationend", enemyWeakReset);

  incrementPointsFew();
}

// Når man trykker på det hurtige rumskib
function morePoints() {
  EnemyMedium.removeEventListener("mousedown", morePoints);
  EnemyMedium.classList.add("paused");
  EnemyMediumSprite.classList.add("dead");
  EnemyMedium.addEventListener("animationend", enemyMediumReset);

  incrementPointsMore();
}

//Når man trykker på det sjældne rumskib
function manyPoints() {
  EnemyStrong.removeEventListener("mousedown", manyPoints);
  EnemyStrong.classList.add("paused");
  EnemyStrongSprite.classList.add("dead");
  EnemyStrong.addEventListener("animationend", enemyStrongReset);

  incrementPointsMany();
}

//Point for det langsomme rumskib
function incrementPointsFew() {
  points = points + 25;
  if (points < 500) {
    console.log(points);
    displayPoints();
  } else {
    levelComplete();
  }
}

//Point for det hurtige rumskib
function incrementPointsMore() {
  points = points + 50;
  if (points < 500) {
    console.log(points);
    displayPoints();
  } else {
    levelComplete();
  }
}

//Point for det sjældne rumskib
function incrementPointsMany() {
  points = points + 100;
  if (points < 500) {
    console.log(points);
    displayPoints();
  } else {
    levelComplete();
  }
}

//Vis point grafisk
function displayPoints() {
  console.log("displayPoints");
  document.querySelector("#point-counter").textContent = points;
}

//Når man trykker på den store planet
function planetBig() {
  planetHigh.removeEventListener("mouseover", planetBig);
  planetHigh.classList.add("paused");
  planetHighSprite.classList.add("zoom_out");
  planetHigh.addEventListener("animationend", planetBigReset);
  decrementLives();
}

//Når man trykker på den lille planet
function planetSmall() {
  planetLow.removeEventListener("mouseover", planetSmall);
  planetLow.classList.add("paused");
  planetLowSprite.classList.add("zoom_out");
  planetLow.addEventListener("animationend", planetSmallReset);
  decrementLives();
}

//Mist Liv og point
function decrementLives() {
  lives--;
  if (lives > 0) {
    points = points - 100;
    displayDecrementLives();
  } else {
    gameOver();
  }
}

//Vis liv grafisk
function displayDecrementLives() {
  document.querySelector(`#battery${lives + 1}`).classList.remove("active-battery");
  document.querySelector(`#battery${lives + 1}`).classList.add("broken-battery");
  document.querySelector(`#point-counter`).textContent = points;
}

//Genstart langsomme rumskib
function enemyWeakReset() {
  //fjern event listener for alle 3 enemies
  EnemyWeak.removeEventListener("animationend", enemyWeakReset);

  // fjern dødsanimationerne
  EnemyWeak.classList.remove("paused");
  EnemyWeakSprite.classList.remove("dead");

  //reset initial animations
  EnemyWeak.classList.remove("flyleft");
  setTimeout(() => EnemyWeak.classList.add("flyleft"), 0);

  //Randomize top positioner
  let pos = Math.floor(Math.random() * 6 + 1);
  EnemyWeak.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  EnemyWeak.classList.add(`position${pos}`);

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  EnemyWeak.addEventListener("mousedown", fewPoints);
}

//Genstart hurtige rumskib
function enemyMediumReset() {
  //fjern event listener for alle 3 enemies
  EnemyMedium.removeEventListener("animationend", enemyMediumReset);

  // fjern dødsanimationerne
  EnemyMedium.classList.remove("paused");
  EnemyMediumSprite.classList.remove("dead");

  //reset initial animations
  EnemyMedium.classList.remove("flyright");
  setTimeout(() => EnemyMedium.classList.add("flyright"), 0);

  //Randomize top positioner
  let pos = Math.floor(Math.random() * 6 + 1);
  EnemyMedium.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  EnemyMedium.classList.add(`position${pos}`);

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  EnemyMedium.addEventListener("mousedown", morePoints);
}

//Genstart sjældne rumskib
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

  //Randomize top positioner
  let pos = Math.floor(Math.random() * 6 + 1);
  planetHigh.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  planetHigh.classList.add(`position${pos}`);

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

  //Randomize top positioner
  let pos = Math.floor(Math.random() * 6 + 1);
  planetLow.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  planetLow.classList.add(`position${pos}`);

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
