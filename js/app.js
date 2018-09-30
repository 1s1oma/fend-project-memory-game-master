/*
 * Create a list that holds all of your cards
 */

//Variable definitions 
let cardsArray = [], shuffledCards = [], openCards = [], openedCardArray = [], openCardClassNameArray = [];
let restart, stars, deckClick, moves, modal, modalSpan, modalMessage, gameTime = 0, gameRating = 3, started = 0;
let count = 0, noOfMatchedCards = 0;
let prevTarget = null;

//Get DOM Elements
let cards = document.querySelectorAll(".card i"); 
let cardClass = document.querySelectorAll(".card");
let deckClass = document.querySelectorAll(".deck");
cards.forEach(function (card) { 
    cardsArray.push(card.className);
});

restart = document.querySelector(".restart");
deckClick = document.querySelector(".deck");
moves = document.querySelector(".moves");
stars = document.querySelector(".stars");

modal = document.querySelector(".modal");
modalRestart = document.querySelector(".modal-restart");
modalSpan = document.getElementsByClassName("close")[0];
modalMessage = document.getElementsByTagName("p");

//Add event listeners
restart.addEventListener("click", reset);
deckClick.addEventListener("click", startGame);

modalSpan.addEventListener("click", close);
modalRestart.addEventListener("click", reset);

//start game time
setInterval(incrementGameTime,1000);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*
 * Shuffle card deck
 */
function reset() {
    i=0;
    cardsArray = shuffle(cardsArray); 
    cards.forEach(function (card) { 
        card.className = cardsArray[i]; 
        cardClass[i].classList.remove("show", "open", "match");
        i++;
    })

    //reset global variables
    noOfMatchedCards = 0, openCardClassNameArray = [], openedCardArray = [], count = 0, moves.innerText = 0, gameTime = 0, gameRating = 3, started = 0;

    //reser stars
    stars.children[2].style.color = "black";
    stars.children[1].style.color = "black";
    stars.children[0].style.color = "black";

    //if modal reset clicked, close it
    modal.style.display = "none";
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /*
* close modal
 */
function close(){
    modal.style.display = "none";
}

/*
 * Displays card image by adding css class "show" & "open" to it's html class property
 */
function displayOpenedcard(openedCard) {
    openedCard.classList.add("show","open");
}

/*
 * Closes card image by removing css class "show" & "open" to it's html class property
 */
function closeOpenedcard(openedCardArray) {
    openedCardArray[0].classList.remove("show", "open");
    openedCardArray[1].classList.remove("show", "open");
}

/*
 * empty global arrays being used to hold information about opened cards
 */
function emptyArrays(openCardClassNameArray, openedCardArray){
    openCardClassNameArray.splice(0, openClickedCardsSize);
    openedCardArray.splice(0, openClickedCardsSize);
}

/*
 * scheduling closing of cards, so cards are shown first
 */
function waitBeforeClosingCard(openedCardArray){
    setTimeout(closeOpenedcard, 300, openedCardArray);
}

/*
 * scheduling closing of empty of arrays, so cards are shown and closed first
 */
function waitBeforeEmptyingArrays(openCardClassNameArray, openedCardArray){
    setTimeout(emptyArrays, 310, openCardClassNameArray, openedCardArray);
}

/*
 * Increments the "Moves" counter
 */
function incrementCounter(){
    count++;
    moves.innerText = count;
}

/*
 * Checks if 2 cards were already matched before apply comparison logic
 */
function checkIfCardsAreMatched (openedCardArray){
    CardsMatched = [];
    for (i=0; i < 2; i++){
        if(openedCardArray[i].classList.contains("match")){
            CardsMatched[i] = true;
        }
    }

    if(CardsMatched[0]== true && CardsMatched[1] == true){
        return true;
    }
    else{
        return false;
    }
}

/*
 * get game time as string
 * logic source - http://www.psychocodes.in/c-program-to-convert-seconds-into-hours-minutes-and-seconds.html
 */
function getTime(){
    let hours = 0, mins = 0, secs = 0;

    if(gameTime > 3600){
		mins = gameTime /60;
		secs = gameTime %60;
		hours = mins/60;
		mins = mins%60;
	}
	else{
		mins = gameTime /60;
		secs = gameTime %60;
    }
    hours = parseInt(hours);
    mins = parseInt(mins);
    secs = parseInt(secs);

    let stringGameTime = hours +"h "+ mins+"m "+secs +"s";
    return stringGameTime;
}

/*
 * display win message
 */
function cardsMatched(){
    let displayedGameTime = getTime();

    modalMessage[0].innerHTML = 
    `<p> YOU WIN!! </p>
     <p>Time: ${displayedGameTime} </p>
     <p>Rating: ${gameRating} Stars </p>`; 
    modal.style.display = "block";
}


/*
*disable pointer event when 2 cards have been clicked
*/
function disableClickOnOtherCards(){
    for (i=0; i < cardClass.length; i++){
        cardClass[i].setAttribute("style","pointer-events: none;");
    }
}

/*
*enable pointer event after 2 cards have been clicked
*/
function enableClickOnOtherCards(){
    for (i=0; i < cardClass.length; i++){
        cardClass[i].setAttribute("style","pointer-events: auto;");
    }
}

/*
*prevent duplicate click on same card
*/
function preventDuplicateClickonSameCard(clickedCard){
    clickedCard.setAttribute("style","pointer-events: none;");
}


/*
 * scheduling enable of pointer event, AFTER cards are shown and closed first
 */
function waitBeforeEnablingPointer(){
    setTimeout(enableClickOnOtherCards, 320);
}

/*
* set gane rating
*/
function setGameRating(){
    if(count == 16){
        gameRating = 3;
        stars.children[2].style.color = "white";
    }
    else if(count > 16 && count <= 32){
        gameRating = 2;
        stars.children[1].style.color = "white";
    }
    }

function incrementGameTime(){
    if (started == 1){
    gameTime++;
    }
}   

/*
 *
 */
function compareCards(openedCard) {
    openedCardArray.push(openedCard);
    let openCardClass = openedCard.querySelectorAll("i"); 
    let currentOpenCardClassName;

    //increment moves counter, but only when an un-matched card is clicked
    if(!openedCard.classList.contains("match")){
    incrementCounter();
    }

    //Save the className e.g fa fa-bolt as a string variable
    openCardClass.forEach(function (cardClass) {
    currentOpenCardClassName = cardClass.className;
    });

    //add card to open cards
    openCardClassNameArray.push(currentOpenCardClassName);
    openClickedCardsSize = openCardClassNameArray.length;

    //Matching Logic when 2 cards clicked
    if( openClickedCardsSize == 2){
        //Check if cards are already matched
        let cardsAlreadyMatched = checkIfCardsAreMatched(openedCardArray);
        disableClickOnOtherCards();

        if(cardsAlreadyMatched){
            return (null);
        }
        //check if cards are a match
        else if(openCardClassNameArray[0] == openCardClassNameArray[1]){
            openedCardArray[0].classList.add("match");
            openedCardArray[1].classList.add("match");
            noOfMatchedCards++;
        }
        //check if cards are not a matched 
        else{
            waitBeforeClosingCard(openedCardArray);
        }
        //empty array
        waitBeforeEmptyingArrays(openCardClassNameArray, openedCardArray);
        waitBeforeEnablingPointer();
    }

    //check if all cards matched
    if( noOfMatchedCards == 8){
        cardsMatched();
    }

    //Set stars
    setGameRating();
}

/*
* Wrapper function to start game - is triggered by first card clicked
*/
function startGame(event) {
    started =1;
    let openedCard = event.target; 

    //The deck is only selected when pointer events have disabled on a card due to duplicate clicks. 
    //This is to prevent any opeartions on the whole deck
    if(openedCard.classList.contains("deck") ||openedCard.classList.contains("fa")){
        return (null);
    }

    displayOpenedcard(openedCard);

    //Checking if same card was clicked twice
    if (event.target == prevTarget){ 
        preventDuplicateClickonSameCard(openedCard);
        return (null); 
    }
    prevTarget = event.target;
    
    compareCards(openedCard);
}