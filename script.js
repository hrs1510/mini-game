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
const formCreateButton = document.getElementById('form_create_button');
const cardOverlay = document.getElementById('card_overlay');
const submitScoreButton = document.getElementById('submit_button');


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
    alert(`Game Over! Your final score is: ${score}`);
    scoreDisplay.innerText = `Score: 0`;
    startButton.style.display = 'none';
    formCreateButton.style.display = 'block'; 
}


//hide submission form button
formCreateButton.style.display = 'none'; 

//hide score submission form
cardOverlay.style.display = 'none';


//handle score submission button click
//todo: add functionality to submit score to zapier and then hide the form 

//handle form inputs
function submitScore() {
console.log('this is from submit score function');
}


//handle submission form display
function createSubmissionForm() {
cardOverlay.style.display = 'block';
startButton.style.display = 'none';
timeDisplay.style.display = 'none';
scoreDisplay.style.display = 'none';
formCreateButton.style.display = 'none';
submitScore();
}

//handle form create button click
formCreateButton.addEventListener('click', () => createSubmissionForm());


//handle start-button click
startButton.addEventListener('click',() => handleGameStart() )