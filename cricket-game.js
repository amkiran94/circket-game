const urlParams = new URLSearchParams(window.location.search);
var firstPLayerName = urlParams.get("fPlayer");
var secondPlayerName = urlParams.get("sPlayer");
var noOfBalls = urlParams.get("nBalls");
var finalScore, roundScore, activePlayer, OutPlayer;

document.querySelector("#Name-0").textContent = firstPLayerName;
document.querySelector("#Name-1").textContent = secondPlayerName;
document.querySelector("#remaing-balls-0").textContent = noOfBalls;
document.querySelector("#remaing-balls-1").textContent = noOfBalls;

init();

/** Initialize new game */
function init() {
  finalScore = [0, 0];
  roundScore = [0, 0];
  activePlayer = 0;
  gameOn = true;
  isActive = [true, true];
}

/** Button click event triggered when clicked on HIT button */
document.querySelector(".btn-hit").addEventListener("click", function () {
  if (gameOn) {
    var swing = Math.floor(Math.random() * 6);
    var swingDOM = document.querySelector(".swing");
    swingDOM.style.display = "block";
    swingDOM.src = "resources/Cric-" + swing + ".png";
    if (swing !== 0) {
      roundScore[activePlayer] += swing;
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore[activePlayer];
      //Both are inactive

      if (isActive[activePlayer == 0 ? 1 : 0]) {
        turns();
      } else {
        gameStatus(activePlayer == 0 ? 1 : 0);
      }
    } else {
      wicket();
    }
  }
});

/** Changes the active player */
function turns() {
  activePlayer = activePlayer === 0 ? 1 : 0;
}

/** Check if the game is over when one of the player is out.
 */
function wicket() {
  alert(message() + ", " + "YOU ARE OUT!!!!");
  finalScore[activePlayer] = roundScore[activePlayer];
  isActive[activePlayer] = false;
  document.querySelector("#score-" + activePlayer).textContent =
    finalScore[activePlayer];
  document.querySelector("#current-" + activePlayer).textContent = "0";

  let isGameOver = gameStatus(activePlayer);
  if (isGameOver) {
    reset();
  } else {
    turns();
  }
}

/** Returns true if ative player has won the game */
function gameStatus(curOutPlayer) {
  let otherPlayer = curOutPlayer === 0 ? 1 : 0;
  if (roundScore[otherPlayer] > roundScore[curOutPlayer]) {
    finalScore[otherPlayer] = roundScore[otherPlayer];
    document.querySelector("#score-" + otherPlayer).textContent =
      finalScore[otherPlayer];
    document.querySelector("#current-" + otherPlayer).textContent = "0";
    document.querySelector("#Name-" + otherPlayer).textContent = "Winner";
    return true;
  } else {
    return false;
  }
}

/** Returns the active player name */
function message() {
  let playerName;
  if (activePlayer === 0) {
    playerName = firstPLayerName;
  } else {
    playerName = secondPlayerName;
  }

  return "Player : " + playerName;
}

/** Reset the game by calling the init method */
function reset() {
  alert("Game is over resetting");
  init();
}
