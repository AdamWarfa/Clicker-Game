"use strict";
window.addEventListener("load", start);
//
let points = 0;
let lives = 5;
//Variabeldeklaration
const EnemyWeak = document.querySelector("#enemy25Container");
const EnemyMedium = document.querySelector("#enemy100Container");
const EnemyStrong = document.querySelector("#enemy50Container");
const EnemyWeakSprite = document.querySelector("#enemy25");
const EnemyMediumSprite = document.querySelector("#enemy100");
const EnemyStrongSprite = document.querySelector("#enemy50");
const planetBig = document.querySelector("#planet1Container");
const planetSmall = document.querySelector("#planet2Container");
const planetBigSprite = document.querySelector("#planet1");
const planetSmallSprite = document.querySelector("#planet2");
const buttonLose = document.querySelector("game_over_button");
const buttonWin = document.querySelector("level_complete_button");

//Startfunktion
function start() {
  document.querySelector("#start_button").addEventListener("click", startScreen);
}

function startScreen() {
  document.querySelector("#start").classList.add("hidden");
}
function rules() {
  document.querySelector("#rules").classList.add("hidden");
  startAnimations();
  startPositions();
  startListeners();
}
//Giv målene animationer
function startAnimations() {
  EnemyWeak.classList.add("flyleft");
  EnemyStrong.classList.add("falling");
  //EnemyStrongSprite.classList.add("close");
  EnemyMedium.classList.add("flyright");
  planetBig.classList.add("driftright");
  planetSmall.classList.add("driftleft");
  document.querySelector("#time_sprite").classList.add("shrink");
  document.querySelector("#time_sprite").addEventListener("animationend", gameOver);
  document.querySelector("#score_board").classList.add("border-color");
  document.querySelector("#life_board").classList.add("border-color");
  document.querySelector("#time_container").classList.add("border-color");
  document.querySelector("#point-counter").classList.add("text-color");
}

//Giv målene startpositioner
function startPositions() {
  let pos = Math.floor(Math.random() * 4) + 1;
  document.querySelector("#beat").play();
  document.querySelector("#beat").loop = true;
  EnemyWeak.classList.add("position1");
  EnemyMedium.classList.add("position2");
  EnemyStrong.classList.add(`position-left${pos}`);
  planetBig.classList.add("position3");
  planetSmall.classList.add("position4");
}

//eventListeners
function startListeners() {
  //Når man clicker og hover over mål
  EnemyWeak.addEventListener("mousedown", fewPoints);
  EnemyMedium.addEventListener("mousedown", morePoints);
  EnemyStrong.addEventListener("mousedown", manyPoints);
  planetBig.addEventListener("mouseover", planetBigClick);
  planetSmall.addEventListener("mouseover", planetSmallClick);

  //når animationer skal genstartes
  EnemyWeak.addEventListener("animationiteration", enemyWeakReset);
  EnemyMedium.addEventListener("animationiteration", enemyMediumReset);
  EnemyStrong.addEventListener("animationiteration", enemyStrongReset);
  planetBig.addEventListener("animationiteration", planetBigReset);
  planetSmall.addEventListener("animationiteration", planetSmallReset);

  //Game Over hvis man ikke nårat trykke på det sjældne rumskib
  // EnemyStrong.addEventListener("animationiteration", gameOver);
}

// Når man trykker på det langsomme rumskib
function fewPoints() {
  EnemyWeak.removeEventListener("mousedown", fewPoints);
  document.querySelector("#enemy_sound").play();
  document.querySelector("#enemy_sound").currentTime = 0;
  EnemyWeak.classList.add("paused");
  EnemyWeakSprite.classList.add("dead");
  EnemyWeak.addEventListener("animationend", enemyWeakReset);

  incrementPointsFew();
}

// Når man trykker på det hurtige rumskib
function morePoints() {
  EnemyMedium.removeEventListener("mousedown", morePoints);
  document.querySelector("#enemy_sound").play();
  document.querySelector("#enemy_sound").currentTime = 0;
  EnemyMedium.classList.add("paused");
  EnemyMediumSprite.classList.add("dead");
  EnemyMedium.addEventListener("animationend", enemyMediumReset);

  incrementPointsMore();
}

//Når man trykker på det sjældne rumskib
function manyPoints() {
  EnemyStrong.removeEventListener("mousedown", manyPoints);
  document.querySelector("#enemy_sound").play();
  document.querySelector("#enemy_sound").currentTime = 0;
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
function planetBigClick() {
  planetBig.removeEventListener("mouseover", planetBigClick);
  document.querySelector("#planet_sound").play();
  document.querySelector("#planet_sound").currentTime = 0;
  planetBig.classList.add("paused");
  planetBigSprite.classList.add("zoom_out");
  planetBig.addEventListener("animationend", planetBigReset);
  decrementLives();
}

//Når man trykker på den lille planet
function planetSmallClick() {
  planetSmall.removeEventListener("mouseover", planetSmallClick);
  document.querySelector("#planet_sound").play();
  document.querySelector("#planet_sound").currentTime = 0;
  planetSmall.classList.add("paused");
  planetSmallSprite.classList.add("zoom_out");
  planetSmall.addEventListener("animationend", planetSmallReset);
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
  // EnemyStrongSprite.classList.remove("close");
  // setTimeout(() => EnemyStrongSprite.classList.add("close"), 0);

  let pos = Math.floor(Math.random() * 4) + 1;
  EnemyStrong.classList.remove("position-left1", "position-left2", "position-left3", "position-left4");
  EnemyStrong.classList.add(`position-left${pos}`);

  // Gør enemies clickable igen, som vi gjorde i startfunktionen
  EnemyStrong.addEventListener("mousedown", manyPoints);
}

function planetBigReset() {
  //fjern event listener for begge planeter
  planetBig.removeEventListener("animationend", planetBigReset);

  // fjern dødsanimationerne
  planetBig.classList.remove("paused");
  planetBigSprite.classList.remove("zoom_out");

  //reset initial animations
  planetBig.classList.remove("driftright");
  setTimeout(() => planetBig.classList.add("driftright"), 0);

  //Randomize top positioner
  let pos = Math.floor(Math.random() * 6 + 1);
  planetBig.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  planetBig.classList.add(`position${pos}`);

  // Gør planets clickable igen, som vi gjorde i startfunktionen
  planetBig.addEventListener("mouseover", planetBig);
}

function planetSmallReset() {
  //fjern event listener for begge planeter
  planetSmall.removeEventListener("animationend", planetSmallReset);

  // fjern dødsanimationerne
  planetSmall.classList.remove("paused");
  planetSmallSprite.classList.remove("zoom_out");

  //reset initial animations
  planetSmall.classList.remove("driftleft");
  setTimeout(() => planetSmall.classList.add("driftleft"), 0);

  //Randomize top positioner
  let pos = Math.floor(Math.random() * 6 + 1);
  planetSmall.classList.remove("position1", "position2", "position3", "position4", "position5", "position6");
  planetSmall.classList.add(`position${pos}`);

  // Gør planets clickable igen, som vi gjorde i startfunktionen
  planetSmall.addEventListener("mouseover", planetSmall);
}

function stopAnimations() {
  EnemyWeak.classList.remove("flyleft");
  EnemyStrong.classList.remove("falling");
  EnemyStrong.classList.remove("close");
  EnemyMedium.classList.remove("flyright");
  planetBig.classList.remove("driftright");
  planetSmall.classList.remove("driftleft");
  document.querySelector("#time_sprite").classList.remove("shrink");
}

function gameOver() {
  document.querySelector("#beat").pause();
  document.querySelector("#loss_sound").play();
  document.querySelector("#game_over").classList.remove("hidden");
  document.querySelector("#game_over_score").textContent = `Score: ${points}`;
  stopAnimations();
}

function levelComplete() {
  document.querySelector("#beat").pause();
  document.querySelector("#win_sound").play();
  document.querySelector("#level_complete").classList.remove("hidden");
  document.querySelector("#level_complete_score").textContent = `Score: ${points}`;
  stopAnimations();
}
