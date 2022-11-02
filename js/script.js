const guessedLettersBox = document.querySelector(".guessed-letters");//unordered list where the player’s guessed letters will appear
const button = document.querySelector(".guess");//Guess button
const input = document.querySelector(".letter");//text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where the word in progress will appear via dots and letters
const remainingGuessesParagraph = document.querySelector(".remaining");//paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");//span inside the paragraph where the remaining guesses will display
const feedbackMessage = document.querySelector(".message");//empty paragraph where feedback messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again");//hidden PLay Again button

const word = "magnolia";//test word
const guessedLetters = []; //empty array for adding to

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
    //clearInput(); //empty the value of inputGuess. This matches Potluck Guest List code - and works as described (it shows guessed letter in console - but it differs from solution code. If there's a problem, investigate this area.)
    //validateGuess(inputGuess);
    const goodGuess = validateGuess(inputGuess);
    //console.log(goodGuess);

    if (goodGuess) {
        //we've got a letter - let's guess
        makeGuess(inputGuess)
    }   
//const clearInput = function () {
    input.value = "";
});

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

const makeGuess = function (inputGuess) {
    inputGuess = inputGuess.toUpperCase();
    if (guessedLetters.includes(inputGuess)) {
        feedbackMessage.innerText = "Oops, you've already guessed that letter! Try again.";
    } else {
        guessedLetters.push(inputGuess); //add to guessedLetters array
        showGuessLetters();
        console.log(guessedLetters); //shows array of guessed letters
        updateWordInProgress (guessedLetters);
    }
};

const showGuessLetters = function () {
    guessedLettersBox.innerText = ""; //empty the text of message element
    for (const letter of guessedLetters) { 
        const li = document.createElement ("li"); //Create a new list item for each letter inside guessedLetters array (i.e., the global variable) and add it to the unordered list.
        li.innerText = letter;
        guessedLettersBox.append(letter); //appends each guessed letter to the array of guessed letters. Adding text to a DOM element (see 1st global variable)
    }
};

const updateWordInProgress = function (guessedLetters) { //This function will replace the circle symbols with the correct letters guessed
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split(""); //split the word string into an array so that the letter can appear in the guessedLetters array
    //console.log(wordArray);
    const revealWord = []; 
    for (const letter of wordArray) //I'm not sure about this - looping through array though
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase()); //pushing either letter or dot    how do you come up with this? I can sort of see in retrospect...but couldn't create
        } else {
            revealWord.push ("●"); //just standard for adding to array. Important is either letter or dot...  once again, how do you come up with this? Ask Arnav
        } 
    wordInProgress.innerText = revealWord.join(""); //passing empty string
    successfulGuess();
        }

const successfulGuess = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        feedbackMessage.innerText = "You guessed correct the word! Congrats!";
    feedbackMessage.classList.add("win");
    } //it's html so it's going to be innerText, nothing to do w/ vars or methods
}

