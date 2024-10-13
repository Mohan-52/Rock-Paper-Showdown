// Select DOM elements
const resultElement=document.querySelector(".js-result");
const movesElement=document.querySelector(".js-moves");
const scoreElement=document.querySelector(".js-score");
const resultContainerElement=document.querySelector(".js-result-container");
const autoPlayButtonElement=document.querySelector(".js-auto-play");
const confirmationElement=document.querySelector(".js-user-confirmation");



// Initialize score from local storage or set to default values
let score=JSON.parse(localStorage.getItem("scorecard"))||{
  wins:0,
  Ties:0,
  losses:0

}


// Update the displayed score on initial load
updateScore();


// Function to generate computer's move
function computerMove(){

 const randomNumber=Math.random();

 let computerPick;

  if (randomNumber<0.3){
    computerPick=("rock");
  }else if(randomNumber<0.6){
    computerPick=("paper")
  }else{
    computerPick=("scissors");
  }
  
  return computerPick;
}








// Function to play the game with the player's pick
function playGame(playerPick) {
  const computerPick = computerMove();
  
  
  // Outcome lookup table
   const outcomes = {
    rock: { rock: "Tie", paper: "You Lose", scissors: "You Won" },
    paper: { rock: "You Won", paper: "Tie", scissors: "You Lose" },
    scissors: { rock: "You Lose", paper: "You Won", scissors: "Tie" }
  };

  // Use the player's and computer's picks to determine the result
  const result = outcomes[playerPick][computerPick];


  if(result==="You Won"){
    score.wins++
  }else if(result==="Tie"){
    score.Ties++
  }else{
    score.losses++
  }
  
  updateScore();
  saveToStorage();

  resultContainerElement.classList.remove("isremoved");
  resultElement.innerHTML=result;
  console.log(playerPick);
  console.log(computerPick);
  movesElement.innerHTML=`You Pick <img src="assests/images/${playerPick}-emoji.png" class="img2"/>  <img src="assests/images/${computerPick}-emoji.png" class="img2"/>  Computer`

}





// Event listeners for the buttons
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
 playGame("scissors");
});
document.querySelector(".js-reset-button").addEventListener("click", () => {
 resetScore();

});
document.querySelector(".js-auto-play").addEventListener("click", () => {
 autoPlay();

});




// Function to update the displayed score
function updateScore(){
  scoreElement.innerHTML=`Wins: ${score.wins} Ties: ${score.Ties} Loses: ${score.losses}`;
 }


// Function to save the score to local storage
function saveToStorage(){
 localStorage.setItem("scorecard",JSON.stringify(score));
}


// Function to reset the score
function resetScore(){
  confirmationElement.innerHTML=`<p>Do you want to reset the score <button class="js-yes">Yes</button><button class="js-no">No</button>`

  document.querySelector(".js-yes").addEventListener("click",()=>{
    score.wins=0;
    score.Ties=0;
    score.losses=0;
    resultContainerElement.classList.add("isremoved");
    localStorage.removeItem("scorecard");
    updateScore();
    confirmationElement.innerHTML="";
  });
  
  document.querySelector(".js-no").addEventListener("click",()=>{
    confirmationElement.innerHTML="";
  });
  

}


// Variables for auto play functionality
let isAutoPlay = false;
let intervalId;


// Function to handle auto play functionality
function autoPlay() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      const playerPick = computerMove();
      playGame(playerPick);
      autoPlayButtonElement.textContent = "Stop Auto Play";
    }, 1000);
    
    isAutoPlay = true;
  } else {
    clearInterval(intervalId);
    isAutoPlay = false;
    autoPlayButtonElement.textContent = "Auto Play";
  }
}


// Event listener for keyboard controls
document.body.addEventListener("keydown",(event)=>{

  if (event.key==="a" || event.key==="A"){
    autoPlay();
  }else if(event.key==="Backspace"){
    resetScore();
  }else if (event.key==="r" || event.key==="R"){
    playGame('rock');
  }else if  (event.key==="p" || event.key==="P"){
   playGame('paper');
  }else if (event.key==="s" || event.key==="S"){
    playGame('scissors');
  }

});

