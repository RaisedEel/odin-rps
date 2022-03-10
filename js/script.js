let playerOptions = document.querySelectorAll("button");
let currentRound = 0, player1Wins = 0, player2Wins = 0;
const MAXWINS = 5;

playerOptions.forEach(button => {
    button.addEventListener("click", showResult);
});

function showResult(event){
    let resultDiv = document.getElementById("roundResult");
    let matchDiv = document.getElementById("matchResult");
    matchDiv.style.whiteSpace = "pre-wrap";

    resultDiv.textContent = playRound(event.target.textContent,computerPlay());
    
    if(player1Wins == MAXWINS || player2Wins == MAXWINS){
        playerOptions.forEach(button => button.removeEventListener("click", showResult));
        matchDiv.textContent = player1Wins > player2Wins ? "Player Wins! Hoora!" : "Computer Wins...Better Luck Next Time";
    }else{
        matchDiv.textContent = `Number of Rounds Played = ${currentRound} \nPlayer: ${player1Wins} \nComputer: ${player2Wins}`;
    }
}

function computerPlay(){
    let compPlay;
    let randomNum = Math.floor(Math.random()*3);

    if(randomNum === 0){
        compPlay = 'rock';
    }else if(randomNum === 1){
        compPlay = 'paper';
    }else{
        compPlay = 'scissors';
    }

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
