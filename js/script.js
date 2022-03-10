let playerOptions = document.querySelectorAll("button");
let currentRound = 0, player1Wins = 0, player2Wins = 0, counter = 0;
const MAXWINS = 5;

playerOptions.forEach(button => {
    button.addEventListener("click", showResult);
});

function showResult(event){
    let resultDiv = document.getElementById("roundResult");
    let matchDiv = document.getElementById("matchResult");
    let option = event.currentTarget.querySelector(".option-img");
    matchDiv.style.whiteSpace = "pre-wrap";

    resultDiv.textContent = playRound(option.alt,computerPlay());
    
    if(player1Wins == MAXWINS || player2Wins == MAXWINS){
        playerOptions.forEach(button => button.removeEventListener("click", showResult));
        matchDiv.textContent = player1Wins > player2Wins ? "Player Wins! Hoora!" : "Computer Wins...Better Luck Next Time";
    }else{
        matchDiv.textContent = `Number of Rounds Played = ${currentRound} \nPlayer: ${player1Wins} \nComputer: ${player2Wins}`;
    }
}

function nextMov() {
    let movs = ["rock", "paper", "scissors"];
    counter = (counter + 1) % movs.length;

    let currMov = document.getElementById("movComp");
    let newMov = document.createElement("img");
    newMov.id = "movComp";
    newMov.src = `./img/${movs[counter]}.png`;
    newMov.alt = movs[counter];
    newMov.classList.add("option-img");

    currMov.parentElement.replaceChild(newMov, currMov);
}

let process = window.setInterval(nextMov,200);

function computerPlay(){
    clearInterval(process);
    let currMov = document.getElementById("movComp");
    let compPlay = currMov.alt;
    process = window.setInterval(nextMov,200);
    return compPlay;
}

function playRound(playerSelection, computerSelection){
    let result;
    playerSelection = playerSelection.toLowerCase();

    if(playerSelection === 'rock' && computerSelection === 'scissors'){
        result = 'You Win! Rock beats Scissors';
        player1Wins++;
    }else if(playerSelection === 'scissors' && computerSelection === 'paper'){
        result = 'You Win! Scissors beats Paper';
        player1Wins++;
    }else if(playerSelection === 'paper' && computerSelection === 'rock'){
        result = 'You Win! Paper beats Rock';
        player1Wins++;
    }else if(playerSelection === 'rock' && computerSelection === 'paper'){
        result = 'You Lose! Paper beats Rock';
        player2Wins++;
    }else if(playerSelection === 'scissors' && computerSelection === 'rock'){
        result = 'You Lose! Rock beats Scissors';
        player2Wins++;
    }else if(playerSelection === 'paper' && computerSelection === 'scissors'){
        result = 'You Lose! Scissors beats Paper';
        player2Wins++;
    }else if(playerSelection === computerSelection){
        result = `It\'s a Tie between ${playerSelection}!`;
    }else{
        result = 'Error: User has written an invalid option!';
    }
    currentRound++;
    return result;
}
