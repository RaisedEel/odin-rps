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
    }else if(playerSelection === 'scissors' && computerSelection === 'paper'){
        result = 'You Win! Scissors beats Paper';
    }else if(playerSelection === 'paper' && computerSelection === 'rock'){
        result = 'You Win! Paper beats Rock';
    }else if(playerSelection === 'rock' && computerSelection === 'paper'){
        result = 'You Lose! Paper beats Rock';
    }else if(playerSelection === 'scissors' && computerSelection === 'rock'){
        result = 'You Lose! Rock beats Scissors';
    }else if(playerSelection === 'paper' && computerSelection === 'scissors'){
        result = 'You Lose! Scissors beats Paper';
    }else if(playerSelection === 'rock' && computerSelection === 'rock'){
        result = 'It\'s a Tie between Rocks!';
    }else if(playerSelection === 'paper' && computerSelection === 'paper'){
        result = 'It\'s a Tie between Papers!';
    }else if(playerSelection === 'scissors' && computerSelection === 'scissors'){
        result = 'It\'s a Tie between Scissors!';
    }else{
        result = 'An Error has ocurred!';
    }

    return result;
}