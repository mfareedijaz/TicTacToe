let playerXInputName = document.getElementById("playerXName");
let playerOInputName = document.getElementById("playerOName");
let playerXName = document.querySelector(".playerXName");
let playerOName = document.querySelector(".playerOName");
let indexes = document.getElementsByClassName("index");
let resetButton = document.getElementById("resetButton");
let xScore = document.querySelectorAll(".score")[0];
let matchTie = document.querySelectorAll(".score")[1];
let oScore = document.querySelectorAll(".score")[2];
let modelContent = document.getElementById("modelContent");

let takePlayersInput = () => {
  let playerXInName = playerXInputName.value;
  let playerOInName = playerOInputName.value;
  localStorage.setItem("X", playerXInName);
  localStorage.setItem("O", playerOInName);
};

let fetchPlayerX = localStorage.getItem("X");
let fetchPlayerO = localStorage.getItem("O");

playerXName.textContent = fetchPlayerX;
playerOName.textContent = fetchPlayerO;

indexes = Array.from(indexes);
// console.log(indexes);

let turn = "X";

let playerXScore = 0;
let playerOScore = 0;
let gameTie = 0;

let indexArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function addValToArr(event, val) {
  if (event.target.id >= 0 && event.target.id <= 2) {
    indexArray[0][event.target.id] = val;
  } else if (event.target.id >= 3 && event.target.id <= 5) {
    if (event.target.id == 3) {
      indexArray[1][0] = val;
    } else if (event.target.id == 4) {
      indexArray[1][1] = val;
    } else {
      indexArray[1][2] = val;
    }
  } else {
    if (event.target.id == 6) {
      indexArray[2][0] = val;
    } else if (event.target.id == 7) {
      indexArray[2][1] = val;
    } else {
      indexArray[2][2] = val;
    }
  }
}
playerXName.classList.add("xturnHighlight")
indexes.forEach((i) => {
  i.addEventListener("click", (event) => {
    if (turn === "X" && event.target.innerText === "") {
      event.target.classList.add("crossColor");
      event.target.innerText = "X";
      let val = "X";
      addValToArr(event, val);
      playerXName.classList.toggle("xturnHighlight")
      playerOName.classList.add("oturnHighlight")
      setTimeout(() => {
        checkWinner();
      }, 100);
      console.log(indexArray);
      turn = "O";
    } else if (turn === "O" && event.target.innerText == "") {
      event.target.classList.add("circleColor");
      event.target.innerText = "O";
      let val = "O";
      addValToArr(event, val);
      playerXName.classList.add("xturnHighlight")
      playerOName.classList.toggle("oturnHighlight")
      setTimeout(() => {
        checkWinner();
      }, 100);
      console.log(indexArray);
      turn = "X";
    } else {
      alert("You can't override other player's mark.");
    }
  });
});

function showWinningModal() {
  var winModal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
  winModal.show();
}

resetButton.addEventListener("click", () => {
  indexes.forEach((i) => {
    i.innerText = "";
    turn = "X";
    i.classList.remove("crossColor");
    i.classList.remove("circleColor");
  });
  indexArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  playerXName.classList.add("xturnHighlight")
  playerOName.classList.remove("oturnHighlight")
});

function clearBoard() {
  indexes.forEach((i) => {
    i.innerText = "";
    turn = "X";
    i.classList.remove("crossColor");
    i.classList.remove("circleColor");
  });
  indexArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  playerXName.classList.add("xturnHighlight")
  playerOName.classList.remove("oturnHighlight")
}

function checkWinner() {
  if (
    indexArray[0][0] == indexArray[0][1] &&
    indexArray[0][0] == indexArray[0][2] &&
    indexArray[0][0] != ""
  ) {
    let mark = indexArray[0][0];
    checkMark(mark);
  }
  if (
    indexArray[1][0] == indexArray[1][1] &&
    indexArray[1][0] == indexArray[1][2] &&
    indexArray[1][0] != ""
  ) {
    let mark = indexArray[1][0];
    checkMark(mark);
  }
  if (
    indexArray[2][0] == indexArray[2][1] &&
    indexArray[2][0] == indexArray[2][2] &&
    indexArray[2][0] != ""
  ) {
    let mark = indexArray[2][0];
    checkMark(mark);
  }
  if (
    indexArray[0][0] == indexArray[1][0] &&
    indexArray[0][0] == indexArray[2][0] &&
    indexArray[0][0] != ""
  ) {
    let mark = indexArray[0][0];
    checkMark(mark);
  }
  if (
    indexArray[0][1] == indexArray[1][1] &&
    indexArray[0][1] == indexArray[2][1] &&
    indexArray[0][1] != ""
  ) {
    let mark = indexArray[0][1];
    checkMark(mark);
  }
  if (
    indexArray[0][2] == indexArray[1][2] &&
    indexArray[0][2] == indexArray[2][2] &&
    indexArray[0][2] != ""
  ) {
    let mark = indexArray[0][2];
    checkMark(mark);
  }
  if (
    indexArray[0][0] == indexArray[1][1] &&
    indexArray[0][0] == indexArray[2][2] &&
    indexArray[0][0] != ""
  ) {
    let mark = indexArray[0][0];
    checkMark(mark);
  }
  if (
    indexArray[0][2] == indexArray[1][1] &&
    indexArray[0][2] == indexArray[2][0] &&
    indexArray[0][2] != ""
  ) {
    let mark = indexArray[0][2];
    checkMark(mark);
  }

  let counter = 0;
  if (counter < 10) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (indexArray[r][c] != "") {
          counter++;
        }
      }
    }
  }
  if (counter === 9) {
    gameTie = gameTie + 1;
    matchTie.textContent = gameTie;
    modelContent.innerText = "Match Tied!";
    modelContent.style.textAlign = "center";
    showWinningModal();
    clearBoard();
  }
}

function checkMark(mark) {
  if (mark === "X") {
    playerXScore = playerXScore + 1;
    xScore.textContent = playerXScore;
    modelContent.innerText = "Player X wins";
    modelContent.style.textAlign = "center";
    showWinningModal();
    clearBoard();
  } else {
    playerOScore = playerOScore + 1;
    oScore.textContent = playerOScore;
    modelContent.innerText = "Player O wins";
    modelContent.style.textAlign = "center";
    showWinningModal();
    clearBoard();
  }
}