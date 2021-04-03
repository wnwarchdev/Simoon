`use strict`;

//player score, turn counter
let moves = [];
let movesRequired = moves.length;
let currentMove = 0;
let currentStep = 0;
let choiceColors = 0;
let lives = 5;
let sound;
let modal = document.getElementById("myModal");

// console.log("starting movesRequired: ", movesRequired);
// console.log("starting currentMove: ", currentMove);
// console.log("starting currentStep: ", currentStep);

const createButtons = function () {
  for (let item = 1; item <= choiceColors; item++) {
    const para = document.createElement("button");
    para.className = `btn btn-${item}`;
    para.id = `btn-${item}`;
    para.style.transform = `translateY(-125px) rotate(${
      (360 / choiceColors) * (item - 1)
    }deg)`;
    const node = document.createTextNode(`${item}`);
    para.appendChild(node);
    const destination = document.getElementById("div1");
    destination.appendChild(para);
  }
};

const removeButtons = function () {
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].remove();
  }
};

const rotatePlayArea = function () {
  document.querySelector(".playArea").classList.toggle("rotate180");
};

const turnCounter = function (turn) {
  const counter = document.querySelector(`.turnCounter`);
  turn == "reset"
    ? (counter.textContent = "00")
    : (counter.textContent = ("0" + turn).substr(-2));
};

const lifeCounter = function (life) {
  const counter = document.querySelector(`.lifeCounter`);
};

const lifeCounterLock = function () {
  const counter = document.querySelector(`.lifeCounter`);
};

const disableButtons = function () {
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
};

const enableButtons = function () {
  const buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
};

const updateLifeCounter = function () {
  const counter = document.querySelectorAll(".lifePoint");
  //console.log(counter);

  for (let count = 0; count < counter.length; count++) {
    counter[count].classList.remove("lifePoint-fill");
  }

  for (let count = 0; count < lives; count++) {
    counter[count].classList.add("lifePoint-fill");
  }
};

const blinkBackground = function (choice) {
  const body = document.querySelector("body");
  sound = document.querySelector(`[data-sound='${choice}']`);
  sound.pause();
  sound.currentTime = 0;
  sound.play();
  body.classList.add(`body-${choice}`);
  setTimeout(() => {
    body.classList.remove(`body-${choice}`);
  }, 50);
};

const activateButton = function (color) {
  //console.log("button pressed", `${color}`);
  const selected = document.querySelector(`#btn-${color}`);

  sound = document.querySelector(`[data-sound='${color}']`);
  sound.pause();
  sound.currentTime = 0;

  selected.classList.add(`btn-${color}-active`);
  sound.play();
  setTimeout(() => {
    selected.classList.remove(`btn-${color}-active`);
  }, 300);
};

const toggleGrayCounter = function () {
  const selected = document.querySelector(`.turnCounter`);
  selected.classList.toggle("turnCounterGray");
};

//timer

//choosemove

const newMove = function () {
  return Math.ceil(Math.random() * choiceColors);
};

const callMove = function (arg) {
  console.log(arg);
  activateButton(arg);
};

const resetGame = function () {
  moves = [];
  movesRequired = moves.length;
  currentMove = 0;
  currentStep = 0;
  lives = 5;

  // setTimeout(() => {
  //   callSequence();
  // }, 2000);
};

const callSequence = function () {
  console.log("keys deactivated, comp turn");
  disableButtons();
  for (let count = 0; count < moves.length; count++) {
    setTimeout(() => {
      callMove(moves[count]);
    }, 1000 * count);
  }
  turnCounter(movesRequired + 1);
  setTimeout(() => {
    moves.push(newMove());
    callMove(moves[moves.length - 1]);
    //activate keys
    toggleGrayCounter();
    console.log("keys activated, player turn");
    enableButtons();
  }, 1000 * moves.length);
};

// const playerMove = function () {
//   prompt();
// };

const checkMove = function () {
  // console.log("checkmove!");
  // console.log("number of moves required: ", movesRequired);
  // console.log("current move step is:", currentStep);
  //console.log("current move value is:", currentMove);
  //console.log("...and is to match:", moves[0]);
  if (currentMove == moves[currentStep]) {
    //console.log("yes");
    currentStep++;
  } else {
    blinkBackground(`bad`);
    lives--;
    if (lives == 0) {
      disableButtons();
      resetGame();
      removeButtons();
      turnCounter("reset");
      modal.style.display = "block";
    } else {
      currentStep = 0;
      updateLifeCounter();
      disableButtons();
      toggleGrayCounter();

      setTimeout(() => {
        for (let count = 0; count < moves.length; count++) {
          setTimeout(() => {
            callMove(moves[count]);
          }, 1000 * count);
        }
      }, 1000);

      setTimeout(() => {
        console.log("keys activated, player turn");
        enableButtons();
        toggleGrayCounter();
      }, 1000 * moves.length);
    }
  }

  //console.log("now, the move step is:", currentStep);
  if (currentStep > movesRequired) {
    if (movesRequired == 09) {
      //console.warn("congratulations, you won the game");
      toggleGrayCounter();
      blinkBackground(`win`);
      setTimeout(() => {
        blinkBackground(`win`);
      }, 100);
      disableButtons();
      resetGame();
      // const buttons = document.querySelectorAll(".btn");
      // for (let i = 0; i < buttons.length; i++) {
      //   buttons[i].disabled = true;
      // }
    } else {
      setTimeout(() => {
        blinkBackground(`good`);
        toggleGrayCounter();
      }, 500);

      setTimeout(() => {
        callSequence();
      }, 1000);

      rotatePlayArea();
      movesRequired = moves.length;
      currentStep = 0;
    }
  }
};

const rigButtons = function () {
  const buttonClick = document.querySelectorAll(".btn");
  for (let i = 0; i < buttonClick.length; i++) {
    buttonClick[i].addEventListener("click", function () {
      const buttonContent = buttonClick[i].textContent;
      currentMove = buttonContent;
      activateButton(i + 1);
      checkMove();
    });
  }
};

const playTurn = function () {
  setTimeout(() => {
    callSequence();
  }, 3000);
};

// Get the modal

let level = document.querySelectorAll(`.level`);

// level.onclick = function () {
//   modal.style.display = "none";
//   choiceColors = 4;
// };

for (let i = 0; i < level.length; i++) {
  level[i].addEventListener("click", function () {
    modal.style.display = "none";
    choiceColors = i + 4;
    createButtons();
    rigButtons();
    disableButtons();
    updateLifeCounter();
    setTimeout(() => {
      callSequence();
    }, 1000);
  });
}

//playTurn();

//addmove

//event handlers
//reset game
//press color

//hiscores
