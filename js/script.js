// Selection of the main components in the page (Buttons and Divs to show results)
let playerOptions = document.querySelectorAll("button.option-btn");
let buttonNext = document.getElementById("next");
let buttonReset = document.getElementById("reset");
let buttonAbout = document.getElementById("about");
let resultDiv = document.getElementById("roundResult");
let matchDiv = document.getElementById("matchResult");

// Initialization of variables to store the number of rounds
let currentRound = 0, player1Wins = 0, player2Wins = 0, counter = 0;
const MAXWINS = 5;

// Addition of Listeners to the diferent buttons
restartButtonsClick(); //Initialization of listeners for when the player selects an option

playerOptions.forEach(button => { //Listeners for hovering an option
    button.addEventListener("mouseenter",() =>{
        button.classList.add("selected");
    });
    button.addEventListener("mouseleave",() =>{
        button.classList.remove("selected");
    });
});

buttonReset.addEventListener("click", resetGame); // Resets the game
buttonAbout.addEventListener("click",() =>{ 
    // Show the instructions of the game in a div
    resultDiv.textContent = "The game is easy to play and to understand: Basically you (the Player) must try to beat his opponent (the Computer) by choosing between 3 differents options: ROCK, PAPER or SCISSORS.";
    matchDiv.textContent = "ROCK beats SCISSORS, SCISSORS beat PAPER and PAPER beats ROCK. The computer will decide randomly between the same options. At the end the first player that reaches 5 wins is the complete WINNER of the game. Remember to look at here (the Console or Results) to see how the game is going. Good Luck and have FUN. ";
});

// Rotate between the posible options of the computer every 200 milliseconds
let process = window.setInterval(rotateMovs,200);

buttonNext.addEventListener("click", () =>{ 
    //Prepare the next round of the game
    buttonNext.classList.add("hidden");
    restartButtonsClick();
    process = window.setInterval(rotateMovs,200); //Restarts the rotation animation
});

// Used to restart the buttons when the next round starts or the game resets
function restartButtonsClick() {
    playerOptions.forEach(button => {
        button.addEventListener("click", showResult);
    });
}

function resetGame(){
    currentRound = 0, player1Wins = 0, player2Wins = 0, counter = 0;
    restartButtonsClick();
    resultDiv.textContent = "Games has been restarted!";
    matchDiv.textContent = "";
    if(!process) process = window.setInterval(rotateMovs,200);
}

// Change the src of the img between the 3 posible options
function rotateMovs() {
    let movs = ["rock", "paper", "scissors"];
    counter = (counter + 1) % movs.length;

    let currMov = document.getElementById("movComp");
    currMov.src = `./img/${movs[counter]}.png`;
    currMov.alt = movs[counter];  
}

function computerPlay(){
    process = clearInterval(process); //Stop the rotation animation so the computer selects its mov
    let currMov = document.getElementById("movComp");
    let compPlay = currMov.alt;
    return compPlay;
}

function playRound(playerSelection, computerSelection){
    let result;
    playerSelection = playerSelection.toLowerCase();

    if(playerSelection === 'rock' && computerSelection === 'scissors'){
        result = 'You Win! Rock beats Scissors.';
        player1Wins++;
    }else if(playerSelection === 'scissors' && computerSelection === 'paper'){
        result = 'You Win! Scissors beats Paper.';
        player1Wins++;
    }else if(playerSelection === 'paper' && computerSelection === 'rock'){
        result = 'You Win! Paper beats Rock.';
        player1Wins++;
    }else if(playerSelection === 'rock' && computerSelection === 'paper'){
        result = 'You Lose! Paper beats Rock.';
        player2Wins++;
    }else if(playerSelection === 'scissors' && computerSelection === 'rock'){
        result = 'You Lose! Rock beats Scissors.';
        player2Wins++;
    }else if(playerSelection === 'paper' && computerSelection === 'scissors'){
        result = 'You Lose! Scissors beats Paper.';
        player2Wins++;
    }else if(playerSelection === computerSelection){
        result = `It\'s a Tie between ${playerSelection}!`;
    }else{
        result = 'Error: Input Invalid.';
    }
    currentRound++;
    return result;
}

function showResult(event){
    let option = event.currentTarget.querySelector(".option-img");
    matchDiv.style.whiteSpace = "pre-wrap";

    resultDiv.textContent = playRound(option.alt,computerPlay());
    
    // If one player wins the game stops
    if(player1Wins == MAXWINS || player2Wins == MAXWINS){
        matchDiv.textContent = player1Wins > player2Wins ? "Player Wins! Hoora!" : "Computer Wins...Better Luck Next Time";
    }else{
        buttonNext.classList.remove("hidden");
        matchDiv.textContent = `Number of Rounds Played: ${currentRound} \nNumber of Rounds Won by Player: ${player1Wins} \nNumber of Rounds Won by Computer: ${player2Wins}`;
    }
    // Remove listeners at the end of the round. Clicking the button next round readds it
    playerOptions.forEach(button => button.removeEventListener("click", showResult));
}