// Game settings
const TOTAL_ROUNDS = 5; // The total number of rounds in the game
const POINTS_TO_WIN = 10; // Points needed to win a round

const scoreSpans = document.querySelectorAll(".max-score");
const totalRoundsDisplay = document.getElementById("totalRounds");
totalRoundsDisplay.textContent = TOTAL_ROUNDS;
scoreSpans.forEach((span) => {
  span.textContent = POINTS_TO_WIN;
});

// Window elements for modal dialog
const resultModal = document.getElementById("resultModal");
const closeModalButton = document.getElementsByClassName("close")[0];
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");

// Close the modal when the user clicks on <span> (x)
closeModalButton.onclick = function () {
  resultModal.style.display = "none";
};

// Close the modal when the user clicks anywhere outside of it
window.onclick = function (event) {
  if (event.target === resultModal) {
    resultModal.style.display = "none";
  }
};

const game = () => {
  let pScore = 0;
  let cScore = 0;
  let playerRoundWins = 0;
  let computerRoundWins = 0;
  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    const scoreBoard = document.querySelector(".score-board");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
      scoreBoard.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./images/${this.textContent}.png`;
          computerHand.src = `./images/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  // Update the scores after each round
  const updateScore = () => {
    const playerScoreDisplay = document.getElementById("player-score");
    const computerScoreDisplay = document.getElementById("computer-score");
    const playerWinsDisplay = document.getElementById("playerWins");
    const computerWinsDisplay = document.getElementById("computerWins");

    playerScoreDisplay.textContent = pScore;
    computerScoreDisplay.textContent = cScore;

    if (pScore === POINTS_TO_WIN || cScore === POINTS_TO_WIN) {
      if (pScore > cScore) {
        playerRoundWins++;
        playerWinsDisplay.textContent = playerRoundWins;
        if (playerRoundWins > TOTAL_ROUNDS / 2) {
          showResultModal(
            "Congratulations! 🎉🎉🎉",
            `You won the match by ${playerRoundWins} out of ${TOTAL_ROUNDS} rounds. Close this window to start a new match.`
          );
          resetGame();
          return;
        }
        showResultModal(
          "Well Done! ✌️",
          "You won this round. Close this window to proceed to the next round."
        );
      } else {
        computerRoundWins++;
        computerWinsDisplay.textContent = computerRoundWins;
        if (computerRoundWins > TOTAL_ROUNDS / 2) {
          showResultModal(
            "Game Over 🥲🥲",
            "The computer won the match. Close this window to start a new game."
          );
          resetGame();
          return;
        }
        showResultModal(
          "Try Again 😕",
          "The computer won this round. Close this window to proceed to the next round."
        );
      }
      pScore = 0;
      cScore = 0;
      playerScoreDisplay.textContent = 0;
      computerScoreDisplay.textContent = 0;
    }
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player Wins";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  // Show the result modal with a given title and message
  const showResultModal = (title, message) => {
    resultModal.style.display = "block";
    modalTitle.textContent = title;
    modalBody.textContent = message;
  };

  // Reset the game to its initial state
  const resetGame = () => {
    pScore = 0;
    cScore = 0;
    playerRoundWins = 0;
    computerRoundWins = 0;
    document.getElementById("player-score").textContent = 0;
    document.getElementById("computer-score").textContent = 0;
    document.getElementById("playerWins").textContent = 0;
    document.getElementById("computerWins").textContent = 0;
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
