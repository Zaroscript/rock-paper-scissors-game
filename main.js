/*
-- show the game rules card when clicking on the rules button
-- When clicking on any card, start the game and save the clicked card as the user's picked card.
-- Make a game process container and save it instead of the cards container.
-- Implement a 3-second countdown before the computer picks a card.
-- Show the computer's card and save it as the computer's picked card.
-- Display the result of the game.

-- The possibilities of the game are:
1- Scissors beats Paper
2- Paper beats Rock
3- Rock beats Lizard
4- Lizard beats Spock
5- Spock beats Scissors
6- Scissors beats Lizard
7- Paper beats Spock
8- Rock beats Scissors
9- Lizard beats Paper
10- Spock beats Rock

-- If the user wins the round, increase the score by 1 point.
-- If the user loses the round, decrease the score by 1 point.
-- If the user ties the round, do nothing.

-- When the round finishes, show the win or lose message and the play again button taht returns user to start.
*/

// get elements from the DOM
let gameProccessContainer = document.querySelector(".game__proccess");
let userCardContainer = document.querySelector(".user__card");
let computerCardContainer = document.querySelector(".computer__card");
let rulesOpenBtn = document.getElementById("open-rules");
let rulesCloseBtn = document.getElementById("close-rules");
let rulesContainer = document.querySelector(".rules__container");
let cardsContainer = document.querySelector(".cards__container");
let cards = document.querySelectorAll(".game__card");
let timerBox = document.querySelector(".timer__box");
let timer = document.getElementById("timer");
let scoreNumber = document.getElementById("scoreNumber");
let userPicked;
let computerPicked;
let result;
let score = 0;

if (localStorage.getItem("score")) {
  score = localStorage.getItem("score");
  scoreNumber.innerHTML = score;
}

// handling open and close rules card
rulesOpenBtn.onclick = () => {
  rulesContainer.classList.add("active");
};

rulesCloseBtn.onclick = () => {
  rulesContainer.classList.remove("active");
};

const generateComputerChoice = () => {
  // get the computer's picked card
  let cardsArray = Array.from(cards);
  let randomIndex = Math.floor(Math.random() * cardsArray.length);

  computerPicked = cardsArray[randomIndex].cloneNode(true);
};

cards.forEach((card) => {
  card.addEventListener("click", () => {
    // get the user's picked card
    userPicked = card.cloneNode(true);

    // generate the computer's picked card
    generateComputerChoice();

    // Start game proccess
    gameProccess(userPicked, computerPicked);

    cardsContainer.style.display = "none";
  });
});

const updateScore = () => {
  if (result === "win") {
    score++;
  } else if (result === "lose") {
    if (score > 0) {
      score--;
    }
  }

  scoreNumber.innerText = score;
  localStorage.setItem("score", score);
};

updateScore();

const resultProccess = () => {
  // let resultMessage = document.querySelector(".result__message");
  // let playAgainBtn = document.querySelector(".play__again-btn");

  // Create result message box

  let resultBox = document.createElement("div");
  resultBox.classList.add("result__box");
  let resultMessage = document.createElement("p");
  resultMessage.classList.add("result__message");
  let playAgainBtn = document.createElement("div");
  playAgainBtn.classList.add("play__again-btn");
  playAgainBtn.innerText = "Play again";

  resultBox.appendChild(resultMessage);
  resultBox.appendChild(playAgainBtn);

  computerCardContainer.before(resultBox);

  // Show result message

  if (result === "win") {
    resultMessage.innerText = "You win";
    userPicked.classList.add("win");
  } else if (result === "lose") {
    resultMessage.innerText = "you lose";
    computerPicked.classList.add("win");
  } else {
    resultMessage.innerText = "It's a draw";
    userPicked.classList.add("win");
    computerPicked.classList.add("win");
  }

  playAgainBtn.addEventListener("click", () => {
    location.reload();
  });
};

const ShowComputerPicked = () => {
  let timerStart = 3;
  let countDown = setInterval(() => {
    if (timerStart !== 0) {
      timer.innerText = timerStart;
      console.log(timerStart);
      timerStart--;
    } else {
      clearInterval(countDown);
      timerBox.remove();
      // Show the computer's picked card
      computerCardContainer.appendChild(computerPicked);

      // change the score depends on the result
      updateScore();

      // Show the result message
      resultProccess();
    }
  }, 1000);
};

// game proccess

const gameProccess = (userPicked, computerPicked) => {
  // Show game proccess container
  gameProccessContainer.style.display = "flex";

  // get the user's picked card
  userCardContainer.appendChild(userPicked);

  // Start the count down before the displaing the computer choice
  ShowComputerPicked();

  const possibilities = [
    ["scissors", "paper"],
    ["paper", "rock"],
    ["rock", "lizard"],
    ["lizard", "spock"],
    ["spock", "scissors"],
    ["scissors", "lizard"],
    ["paper", "spock"],
    ["rock", "scissors"],
    ["lizard", "paper"],
    ["spock", "rock"],
  ];
  let comparison = [userPicked.dataset.card, computerPicked.dataset.card];

  if (userPicked.dataset.card === computerPicked.dataset.card) {
    result = "draw";
  } else {
    possibilities.forEach((poss) => {
      if (poss.toString() === comparison.toString()) {
        result = "win";
        return;
      } else if (poss.reverse().toString() === comparison.toString()) {
        result = "lose";
        return;
      }
    });
  }
};
