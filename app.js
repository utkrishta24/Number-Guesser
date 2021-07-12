/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessLeft = 3;

//ui elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className==='play-again'){
        window.location.reload();
    }
});

// listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return;
    }

    //checek if won
    if (guess === winningNum) {

        //game over won
        // //disable the input
        // guessInput.disabled = true;
        // //change border
        // guessInput.style.borderColor = 'green';
        // //set message
        // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');

        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    }
    else {
        //wrong number
        guessLeft -= 1;
        if (guessLeft === 0) {
            //game over - lost
            //disable the input
            // guessInput.disabled = true;
            // //change border
            // guessInput.style.borderColor = 'red';
            // //set message
            // setMessage(`Game Your, YOU LOST! Correct number was ${winningNum}.`, 'red');

            gameOver(false, `Game Your, YOU LOST! Correct number was ${winningNum}.`);

        }
        else {
            //game continues -answer wrong
            //change border
            guessInput.style.borderColor = 'red';
            //teeling wrong number
            setMessage(`Guess is not correct, ${guessLeft} guesses left!`, 'red');

            //clear input
            guessInput.value = '';

        }

    }
});

//game over

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';


    //disable the input
    guessInput.disabled = true;
    //change border
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    //set message
    setMessage(msg);

    //play again
    guessBtn.value='Play Again';
    guessBtn.className+='play-again';
}

//getWinningNUm
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}