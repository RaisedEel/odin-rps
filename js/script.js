function computerPlay(){
    let compPlay;
    let randomNum = Math.floor(Math.random()*3);

    if(randomNum === 0){
        compPlay = 'Rock';
    }else if(randomNum === 1){
        compPlay = 'Paper';
    }else if(randomNum == 2){
        compPlay = 'Scissors';
    }else{
        compPlay = 'Invalid Movement';
    }

    return compPlay;
}