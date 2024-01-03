let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turn0 = true; //PlayerX and PlayerO
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      //PlayerO
      box.style.color = "darkblue";
      box.innerText = "O";
      turn0 = false;
    } else {
      //PlayerX
      box.style.color = "red";
      box.innerText = "X";
      turn0 = true;
    }
    count++;
    console.log(count);
    box.disabled = true;
    checkWinner();
    let isWinner = checkWinner();
    if (count == 9 && checkWinner != true) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = "Game Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
};
const newGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  count = 0;
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if ((pos1Val != "", pos2Val != "", pos3Val != "")) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        disableBoxes();
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", newGame);
