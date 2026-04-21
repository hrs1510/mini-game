/*
    const response = await fetch('https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/',{
        method: 'POST',
        body: JSON.stringify({ name: 'xyz', score: '100' }),
    }
        
    );
    console.log('Response from Zapier:', response);
*/
// HTML DOM
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

//variables
let score = 0;
let timeLeft = 6;
let gameStarted = false;
let interval = null;

//UI functions 
//increase Scores
function scoreIncrement() {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
}


//decrease time
function remainingTime() { 
   if (timeLeft <= 0) {
    timeDisplay.innerText = 'Time: 0';
    endGame();
    return;
}
    else {
        timeLeft--;
        timeDisplay.innerText = `Time: ${timeLeft}`;
    }   
    console.log(timeLeft);
}

// function to handle task after game started 
function startGame(){
    if (gameStarted) {
        return;
    }
gameStarted = true;
startButton.removeEventListener('click', handleGameStart); //becuase we want to change the button text and functionality after game starts
startButton.innerText = 'Gain Score';
startButton.addEventListener('click', scoreIncrement);
interval = setInterval(remainingTime, 1000);
}

//handle game start
function handleGameStart() {
startGame();
}

//handle game end
function endGame() {
    clearInterval(interval);
    gameStarted = false;
    startButton.innerText = 'game over';
    startButton.disabled = true;
    alert(`Game Over! Your final score is: ${score}`);
    scoreDisplay.innerText = `Score: 0`
}


//handle start-button click
startButton.addEventListener('click',() => handleGameStart() )