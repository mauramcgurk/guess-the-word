const guessedLetters = document.querySelector(".guessed-letters");//unordered list where the player’s guessed letters will appear
const button = document.querySelector(".guess");//Guess button
const input = document.querySelector(".letter");//text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where the word in progress will appear via dots and letters
const remainingGuessesParagraph = document.querySelector(".remaining");//paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");//span inside the paragraph where the remaining guesses will display
const feedbackMessage = document.querySelector(".message");//empty paragraph where feedback messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again");//hidden PLay Again button

const word = "magnolia";//test word

//I do not understand any of the following - but it worked the way it's supposed to
const placeholder = function (word) {
    const placeholderLetters = []; //empty array is for adding to
    for (const letter of word) { //for...of is Value Only. Iterates through the values of an object. "letter" stores elements processed by array. FOR + VARIABLE + OF + ARRAY NAME. The variable represents each element as you loop through array.
        console.log(letter);
        placeholderLetters.push("●"); //PUSH adds to end of array - but why? Because the dot has to get in there somehow, I guess…
    }
    wordInProgress.innerText = placeholderLetters.join(""); //see notes
};

placeholder(word);

button.addEventListener ("click", function (e) {
    e.preventDefault();
    feedbackMessage.innerText = ""; //empty the text of message element
    const inputGuess = input.value;//captures value of the input guess
    //console.log(inputGuess);
    clearInput(); //empty the value of inputGuess. This matches Potluck Guest List code - and works as described (it shows guessed letter in console - but it differs from solution code. If there's a problem, investigate this area.)
    //validateGuess(inputGuess);
    const goodGuess = validateGuess(inputGuess);
    console.log(goodGuess);
    });

const clearInput = function () {
    input.value = "";
};

const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/; //regular expression lets you find text that matches a specific pattern, like alphabetic only. Ensures player inputs letters
    if (input.length === 0) { 
        //check if input is empty
        feedbackMessage.innerText = "Hey, ya gotta enter a letter from A to Z! Give it another try.";
    } else if (input.length > 1) {
        //check if player has entered more than one letter
        feedbackMessage.innerText = "Hold on, just one letter at a time. Try it again.";
    } else if (!input.match(acceptedLetter)) {
        //check if they’ve entered a character that doesn’t match the regular expression pattern
        feedbackMessage.innerText = "Please enter a letter from A to Z.";
    } else {
        //We finally got a single letter, omg yay
        return input;
    }
};