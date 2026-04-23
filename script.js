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
const showGainedScore = document.getElementById('score_show');
const playersName = document.getElementById('name_input');
const otehrPlayersSection = document.getElementById('right_section');
const scoreboardBody = document.getElementById('scoreboard_body');


//variables
let score = 0;
let timeLeft = 60;
let gameStarted = false;
let interval = null;
let playersData = [];

//********************************************************************************* */
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

//handle game end and button functionality change
function endGame() {
    clearInterval(interval);
    gameStarted = false;
    alert(`Game Over! Your final score is: ${score}`);
    startButton.style.display = 'none';
    createSubmissionForm();
    // formCreateButton.style.display = 'block'; 
}

//handle game start-button click
startButton.addEventListener('click',() => handleGameStart() )

//hide submission form button and core submission form
formCreateButton.style.display = 'none'; 
cardOverlay.style.display = 'none';


//handle submission form display
function createSubmissionForm() {
cardOverlay.style.display = 'block';
showGainedScore.innerText = `Your Score: ${score}`;
startButton.style.display = 'none';
timeDisplay.style.display = 'none';
scoreDisplay.style.display = 'none';
formCreateButton.style.display = 'none';
otehrPlayersSection.style.display = 'none'; 
submitScoreButton.addEventListener('click',() => submitScore());
}

//handle form submission and send data to 
async function submitScore() {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/', {
        method: 'POST',
        body: JSON.stringify({ name: playersName.value, score: score }),
    });
     submitScoreButton.disabled = true;
    submitScoreButton.innerText = 'Submitted'
    playersName.value = ''; //reset name field for batter user experience
}

//fetch playersdata from google sheets
async function fetchPlayersData() {
    scoreboardBody.innerHTML = '<h2>Loading...</h2>'; //show loading text while fetching data
    const response = await fetch('https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec');
    const data = await response.json();
    handleData(data);
}

//handle fetched data and filter out players with empty name
function handleData(data) {
    playersData = data.filter(player => player.name.trim() !== '');
    playersData = sortPlayersScore(playersData);
    displayScoreboard();
    console.log(playersData);
}

// sort players score in decending order using QuickSort
function sortPlayersScore(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)].score;
    const left = arr.filter(player => player.score > pivot);
    const right = arr.filter(player => player.score < pivot);
    const middle = arr.filter(player => player.score === pivot);
    return [...sortPlayersScore(left), ...middle, ...sortPlayersScore(right)];
}
// display top 25 players data in score-board
function displayScoreboard() {
    const top20Players = playersData.slice(0, 25);
    scoreboardBody.innerHTML = top20Players.map((player, i) => `
        <tr>
            <td>${i + 1}</td> 
            <td>${player.name}</td>
            <td>${player.score}</td>
        </tr>
    `).join(''); // to remove comma between each row
}

fetchPlayersData();

