`use strict`;

//player score, turn counter
let moves = [];
let movesRequired = moves.length;
let currentMove = 0;
let currentStep = 0;
const choiceColors = 4;

console.log("starting movesRequired: ", movesRequired);
console.log("starting currentMove: ", currentMove);
console.log("starting currentStep: ", currentStep);

for (let item = 1; item <= choiceColors; item++) {
  const para = document.createElement("button");
  para.className = "btn";
  para.style.transform = `translateY(-125px) rotate(${
    (360 / choiceColors) * (item - 1)
  }deg)`;
  const node = document.createTextNode(`${item}`);
  para.appendChild(node);
  const destination = document.getElementById("div1");
  destination.appendChild(para);
}

const rotatePlayArea = function () {
  document.querySelector(".playArea").classList.toggle("rotate180");
};

//timer

//choosemove

const newMove = function () {
  return Math.ceil(Math.random() * choiceColors);
};

const callMove = function (arg) {
  console.log(arg);
};

const resetGame = function () {
  moves = [];
  movesRequired = moves.length;
  currentMove = 0;
  currentStep = 0;
  callSequence();
};

const callSequence = function () {
  console.log("keys deactivated, comp turn");
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  for (let count = 0; count < moves.length; count++) {
    setTimeout(() => {
      callMove(moves[count]);
    }, 1000 * count);
  }
  setTimeout(() => {
    moves.push(newMove());
    callMove(moves[moves.length - 1]);
    //activate keys
    console.log("keys activated, player turn");
    const buttons = document.querySelectorAll(".btn");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false;
    }
  }, 1000 * moves.length);
};

// const playerMove = function () {
//   prompt();
// };

const checkMove = function () {
  console.log("checkmove!");
  console.log("number of moves required: ", movesRequired);
  console.log("current move step is:", currentStep);
  console.log("current move value is:", currentMove);
  console.log("...and is to match:", moves[0]);
  if (currentMove == moves[currentStep]) {
    console.log("yes");
    currentStep++;
  } else {
    console.error("oops, resetting...");
    resetGame();
  }

  console.log("now, the move step is:", currentStep);
  if (currentStep > movesRequired) {
    if (movesRequired == 6) {
      console.warn("congratulations, you won the game");
      resetGame();
      // const buttons = document.querySelectorAll(".btn");
      // for (let i = 0; i < buttons.length; i++) {
      //   buttons[i].disabled = true;
      // }
    } else {
      callSequence();
      rotatePlayArea();
      movesRequired = moves.length;
      currentStep = 0;
    }
  }
};

const buttonClick = document.querySelectorAll(".btn");
for (let i = 0; i < buttonClick.length; i++) {
  buttonClick[i].addEventListener("click", function () {
    const buttonContent = buttonClick[i].textContent;
    currentMove = buttonContent;
    checkMove();
  });
}

const playTurn = function () {
  callSequence();
};

playTurn();

//addmove

//event handlers
//reset game
//press color

//hiscores
