const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
// declaring move variable
let moves = 0;
let count = document.querySelector(".moves");

let COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function startGame() {
  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based o an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    if (noClicking) return; //make sure that function does not execute until clicks
    if (event.target.classList.contains("flipped")) return; //return all flipped cards
    //Users should only be able to change at most two cards at a time.
    // Clicking on two matching cards should be a “match” — those cards should stay face up.
    // When clicking two cards that are not a match, they should stay
    // turned over for at least 1 second before they hide the color again. 
    //You should make sure to use a setTimeout so that you can execute code after one second.
    // you can use event.target to see which element was clicked
    let currentCard = event.target;
    //change color on click
    currentCard.style.backgroundColor = currentCard.className;



    event.preventDefault();
    if (!card1) {
      card1 = currentCard;
      currentCard.classList.add("flipped");
    } else if (!card2) {
      card2 = currentCard;
      currentCard.classList.add("flipped");
    }

    if (card1 && card2) {
      moveCounter();
      noClicking = true; //nothing will be clicked if cards are now clicked
      let col1 = card1.className
      let col2 = card2.className


      if (col1 === col2) {
        cardsFlipped += 2;
        card1.removeEventListener('click', handleCardClick); //matched cards stay up 
        card2.removeEventListener('click', handleCardClick);
        card1 = null;
        card2 = null;
        noClicking = false;
      } else {
        setTimeout(function () {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card2.style.backgroundColor = '';
          card1.style.backgroundColor = '';
          card1 = null;
          card2 = null;
          noClicking = false;
        }, 1000);
      }
    }
    if (cardsFlipped === COLORS.length) {
      setTimeout(function () {
        alert("game over!");
      }, 500);
    }
  }
  // when the DOM loads
  createDivsForColors(shuffledColors);
  //making start btn only clickable once 
  document.getElementById('start-btn').onclick = function () {
    this.disabled = true;
  }



}

function moveCounter() {
  moves++;
  count.innerHTML = moves;
}


function restart() {
  function clearBox(gameContainer) {

    while (gameContainer.firstChild) {
      gameContainer.removeChild(gameContainer.firstChild);
    }
  }
  clearBox(gameContainer);
  cardsFlipped = 0;
  count.innerHTML = 0;
  moves = 0;
  startGame();

}