const edit1 = document.querySelector(".player a");
const edit2 = document.querySelector(".player:last-of-type a");
const backDrop = document.querySelector(".black-background");
const chooseName = document.querySelector(".choose-name");
const cancelButton = document.querySelector(".choose-name .name-no");
const confirmButton = document.querySelector(".choose-name .name-yes");
const player1Name = document.getElementById("player1-name");
const player2Name = document.getElementById("player2-name");
const playerNameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-Game");
const turnText = document.getElementById("turn-text");
const playerTurnName = document.getElementById("player-turn-name");
const game = document.getElementById("game");
const gameCells = document.querySelectorAll(".cell");
const winnerDisplay = document.getElementById("winner-display");
const winnerName = document.getElementById("winner-name");
const formElement = document.querySelector("form");
const errorFormMsg = document.getElementById("form-error");

let chooseplayer = 0;
const players = [];
let playerChangeTurn = 1;//1 player1 turn , 2 player2 turn
let drawCounter = 0;
let disabledGameover = 0;

function resetGame() {
  for (const cell of gameCells) {
    cell.textContent = "";
    cell.classList.remove("o");
    cell.classList.remove("x");
    cell.classList.remove("disabled");
    disabledGameover = 0;
  }
  playerChangeTurn = 1;
  winnerDisplay.style.display = "none";
  winnerName.textContent = ``;
  drawCounter = 0;
}

function checkTheWinner() {
  if(gameCells[0].classList.contains("x") && gameCells[1].classList.contains("x") && gameCells[2].classList.contains("x") ||
  gameCells[0].classList.contains("x") && gameCells[3].classList.contains("x") && gameCells[6].classList.contains("x") ||
  gameCells[0].classList.contains("x") && gameCells[4].classList.contains("x") && gameCells[8].classList.contains("x") ||
  gameCells[1].classList.contains("x") && gameCells[4].classList.contains("x") && gameCells[7].classList.contains("x") ||
  gameCells[2].classList.contains("x") && gameCells[5].classList.contains("x") && gameCells[8].classList.contains("x") ||
  gameCells[2].classList.contains("x") && gameCells[4].classList.contains("x") && gameCells[6].classList.contains("x") ||
  gameCells[3].classList.contains("x") && gameCells[4].classList.contains("x") && gameCells[5].classList.contains("x") ||
  gameCells[6].classList.contains("x") && gameCells[7].classList.contains("x") && gameCells[8].classList.contains("x")) {
      winnerDisplay.style.display = "block";
      winnerName.textContent = `You won ${players[0]} !`;
      disabledGameover=1;
    }
  else if(gameCells[0].classList.contains("o") && gameCells[1].classList.contains("o") && gameCells[2].classList.contains("o") ||
  gameCells[0].classList.contains("o") && gameCells[3].classList.contains("o") && gameCells[6].classList.contains("o") ||
  gameCells[0].classList.contains("o") && gameCells[4].classList.contains("o") && gameCells[8].classList.contains("o") ||
  gameCells[1].classList.contains("o") && gameCells[4].classList.contains("o") && gameCells[7].classList.contains("o") ||
  gameCells[2].classList.contains("o") && gameCells[5].classList.contains("o") && gameCells[8].classList.contains("o") ||
  gameCells[2].classList.contains("o") && gameCells[4].classList.contains("o") && gameCells[6].classList.contains("o") ||
  gameCells[3].classList.contains("o") && gameCells[4].classList.contains("o") && gameCells[5].classList.contains("o") ||
  gameCells[6].classList.contains("o") && gameCells[7].classList.contains("o") && gameCells[8].classList.contains("o")) {
      winnerDisplay.style.display = "block";
      winnerName.textContent = `You won ${players[1]} !`;
      disabledGameover=1;
    }
  else if(drawCounter == 9) {
    winnerDisplay.style.display = "block";
    winnerName.textContent = "It's a draw!";
    disabledGameover=1;
  }
}

function chooseNamePlayer(e) {
  backDrop.style.display = "block";
  chooseName.style.display ="block";
  playerNameInput.value ="";
  playerNameInput.classList.remove("error");
  errorFormMsg.textContent = "";
  chooseplayer = +e.target.dataset.player;
}

function closeBackdrop(){
  backDrop.style.display = "none";
  chooseName.style.display ="none";
}

function setPlayerName(event) {
  event.preventDefault(); 
  const formData = new FormData(event.target);
  const playerName = formData.get("player-name").trim();
  if(!playerName) {
    errorFormMsg.textContent = "please enter a valid name!";
    playerNameInput.classList.add("error");
    return;
  }
  if(chooseplayer === 1){
    players[0] = playerName;
    player1Name.textContent = players[0] ;
  }
  else if(chooseplayer === 2) {
    players[1] = playerName;
    player2Name.textContent = players[1] ;
  }
  closeBackdrop();
  console.log(players);
}

function startGame() {
  resetGame();
  if(players[0] && players[1]) {
    game.style.display = "grid";
    turnText.style.display = "block";
    playerTurnName.textContent = players[0] ;
  }
  else {
    alert ("Please set custom player names for both players!");
  }
}

function clickGame(e) { 
  if(disabledGameover){
    return;
  }
  if (e.target.classList.contains("cell")){ //if(event.target.tagName === "li")
    if(e.target.classList.contains("x") || e.target.classList.contains("o")) {
      alert("Please select an empty field!");
    }
    else {
      e.target.classList.add("disabled");
      if(playerChangeTurn == 1){
        e.target.textContent = "X";
        e.target.classList.add("x");
        playerChangeTurn = 0;
        playerTurnName.textContent = players[1];
        drawCounter++;
      }
      else {
        e.target.textContent = "O";
        e.target.classList.add("o");
        playerChangeTurn = 1;
        playerTurnName.textContent = players[0];
        drawCounter++;
      }
      checkTheWinner();
    }
  }
}


edit1.addEventListener("click",chooseNamePlayer);
edit2.addEventListener("click",chooseNamePlayer);
backDrop.addEventListener("click",closeBackdrop);
cancelButton.addEventListener("click",closeBackdrop);
formElement.addEventListener("submit",setPlayerName)
startButton.addEventListener("click",startGame);
game.addEventListener("click",clickGame);