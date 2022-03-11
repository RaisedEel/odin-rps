let playerOptions = document.querySelectorAll("button.option-btn");
let buttonNext = document.getElementById("next");
let buttonReset = document.getElementById("reset");
let buttonAbout = document.getElementById("about");
let resultDiv = document.getElementById("roundResult");
let matchDiv = document.getElementById("matchResult");

let currentRound = 0, player1Wins = 0, player2Wins = 0, counter = 0;
const MAXWINS = 5;

initButtonsListeners();
let process = window.setInterval(rotateMovs,200);
buttonReset.addEventListener("click", resetGame);
buttonAbout.addEventListener("click",() =>{
    resultDiv.textContent = "The game is easy to play and to understand: Basically you (the Player) must try to beat his opponent (the Computer) by choosing between 3 differents options: ROCK, PAPER or SCISSORS.";
    matchDiv.textContent = "ROCK beats SCISSORS, SCISSORS beat PAPER and PAPER beats ROCK. The computer will decide randomly between the same options. At the end the first player that reaches 5 wins is the complete WINNER of the game. Remember to look at here (the Console or Results) to see how the game is going. Good Luck and have FUN. ";
});
buttonNext.addEventListener("click", () =>{
    buttonNext.classList.add("hidden");
    initButtonsListeners();
    process = window.setInterval(rotateMovs,200);
});

function initButtonsListeners() {
    playerOptions.forEach(button => {
        button.addEventListener("click", showResult);
    });
}

function resetGame(){
    currentRound = 0, player1Wins = 0, player2Wins = 0, counter = 0;
    initButtonsListeners();
    resultDiv.textContent = "Games has been restarted!";
    matchDiv.textContent = "";
    if(!process) process = window.setInterval(rotateMovs,200);
}

function rotateMovs() {
    let movs = ["rock", "paper", "scissors"];
    counter = (counter + 1) % movs.length;

    let currMov = document.getElementById("movComp");
    currMov.src = `./img/${movs[counter]}.png`;
    currMov.alt = movs[counter];  
}

function computerPlay(){
    process = clearInterval(process);
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
    
    if(player1Wins == MAXWINS || player2Wins == MAXWINS){
        matchDiv.textContent = player1Wins > player2Wins ? "Player Wins! Hoora!" : "Computer Wins...Better Luck Next Time";
    }else{
        buttonNext.classList.remove("hidden");
        matchDiv.textContent = `Number of Rounds Played: ${currentRound} \nNumber of Rounds Won by Player: ${player1Wins} \nNumber of Rounds Won by Computer: ${player2Wins}`;
    }
    playerOptions.forEach(button => button.removeEventListener("click", showResult));
}