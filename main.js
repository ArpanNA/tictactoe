const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const boxes = document.querySelectorAll(".boxes");
const board = document.querySelector("#board");
const winMessage = document.querySelector("#winningmessage");
const reset = document.querySelector("#reset");
let circleTurn;

startGame();

reset.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  winMessage.innerText = "";
  boxes.forEach((box) => {
    box.classList.remove(X_CLASS);
    box.classList.remove(CIRCLE_CLASS);
    box.innerText = "";
    box.disabled = false;
    box.addEventListener("click", handleClick, { once: true });
  });
}
function handleClick(e) {
  const box = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  const playerSymbol = circleTurn ? "O" : "X";

  placeMark(box, currentClass, playerSymbol);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}
function endGame(draw) {
  if (draw) {
    winMessage.innerText = "Draw";
  } else {
    winMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function isDraw() {
  return [...boxes].every((box) => {
    return (
      box.classList.contains(X_CLASS) || box.classList.contains(CIRCLE_CLASS)
    );
  });
}
function placeMark(box, currentClass, playerSymbol) {
  box.classList.add(currentClass);
  box.innerText = playerSymbol;
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return winning_combination.some((combination) => {
    return combination.every((index) => {
      return boxes[index].classList.contains(currentClass);
    });
  });
}
