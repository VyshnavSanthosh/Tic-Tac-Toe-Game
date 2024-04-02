let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newGame");
let msgContainer = document.querySelector(".winnerContainer");
let msg = document.querySelector("#winner");

let turnO = true; //players  turns alternately between being 'X' and 'O'.
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.style.color = "#EC9A29";
      turnO = false;//to reset  the player to X after O is clicked
    } else {
      //playerX
      box.innerText = "X";
      box.style.color = "#0F8B8D";
      turnO = true;// to reset  the player to O after X is clicked
    }
    box.disabled = true;//to dissable further  clicks on the same box
    count++;

    let isWinner = checkWinner();//function call

    if (count === 9 && !isWinner) {
      gameDraw();//all boxes are filled
    }
  });
});

const gameDraw = () => {
  winner.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }//to disable  all the moves when one player wins
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }//to disable  all the moves when one player wins
};

const showWinner = (winnerReveil) => {
    
  winner.innerText = `Congratulations, Winner is ${winnerReveil}`;
  winner.style.color = "#EC9A29";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
