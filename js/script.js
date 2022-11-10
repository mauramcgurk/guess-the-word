const guessedLettersBox = document.querySelector(".guessed-letters");//unordered list where the player’s guessed letters will appear
const button = document.querySelector(".guess");//Guess button
const input = document.querySelector(".letter");//text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where the word in progress will appear via dots and letters
const remainingGuessesParagraph = document.querySelector(".remaining");//paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");//span inside the paragraph where the remaining guesses will display
const feedbackMessage = document.querySelector(".message");//empty paragraph where feedback messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again");//hidden PLay Again button
let remainingGuesses = 8;
let word = "magnolia";//test word
let guessedLetters = []; //empty array for adding to. Eventually becomes let instead of const so it can change

const getWord = async function () { //best practice to put any function below all variables - so all functions have access to all variables
    const wordsDatabaseUrl = 
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"; //we made this a variable because it's a verrry long string (too long) and also - we can use it again wherever now that it's a variable. This is a little different from the way SC originally suggested. Go back to notes.
        let textFile = await fetch (wordsDatabaseUrl); //fetching file not contents
        let content = await textFile.text ();
        const wordArray = content.split("\n"); //could also go after console.log
        const randomIndex = Math.floor(Math.random() * wordArray.length); //put within the function because we need wordArray.length
        word = wordArray[randomIndex].trim(); //reassigning word randomly, also trims extra space
        console.log (wordArray); //logs out contents of entire text file - alphabetically, hundreds of words. It's working.
        placeholder(word); //this is new word now. This goes here to reset dots after choice of word.
    }
//getWord (); initially added as test of console log. May need to move. No longer needed here - moving to line 35.

const placeholder = function (word) {
    const placeholderLetters = []; //empty array is for adding to
    for (const letter of word) { //for...of is Value Only. Iterates through the values of an object. "letter" stores elements processed by array. FOR + VARIABLE + OF + ARRAY NAME. The variable represents each element as you loop through array.
        console.log(letter);
        placeholderLetters.push("●"); //Add push here because the dot has to get in there somehow, I guess…
    }
    wordInProgress.innerText = placeholderLetters.join(""); //see notes
};

//placeholder(word); no longer necessary bc it's being called as part of getWord now
getWord (); //initially added as test of console log. May need to move. No longer needed here - moving to line 35.

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
        decreaseGuesses (inputGuess); //decreasing number of guesses each time
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

const decreaseGuesses = function (guess) {
    const wordUpper = word.toUpperCase(); 
    if (wordUpper.includes(guess)) {
        feedbackMessage.innerText = "Yes, the word contains that letter!";
    } else {
        feedbackMessage.innerText = "No, that letter isn't in the word. Try again."
        remainingGuesses --; //subtracts 1
    } 
    if (remainingGuesses === 0) {
        feedbackMessage.innerText = `You're out of guesses. The word is ${word}.`;
        startOver (); //call if decreases to 0 guesses - they lost and can start new game
    }
    if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `one guess`;
    }
    if (remainingGuesses >1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
}
        
const successfulGuess = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        feedbackMessage.innerText = "You guessed correct the word! Congrats!";
    feedbackMessage.classList.add("win");
    startOver (); //call if they won so they can start new game
    } //it's html so it's going to be innerText, nothing to do w/ vars or methods
}

const startOver = function () {
    button.classList.add("hide");
    guessedLettersBox.classList.add("hide");
    remainingGuessesParagraph.classList.add("hide");
    playAgainButton.classList.remove("hide"); //we want to see this so we're not adding "hide" class - we're removing it
}

playAgainButton.addEventListener ("click", function (e) {//Event listeners go outside functions so at the very beginning they start to work while JS is loading. set this outside function so it'll called right at beginning
    feedbackMessage.classList.remove("win");
    feedbackMessage.innerText = ""; //empty the text of message element
    guessedLettersBox.innerText = ""; //empty the text of where guessed letters appear element
    remainingGuesses = 8;
    guessedLetters = []; //setting these back to what they were originally defined as bc that's how game started
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    button.classList.remove("hide");
    guessedLettersBox.classList.remove("hide");
    remainingGuessesParagraph.classList.remove("hide");
    playAgainButton.classList.add("hide"); //we just changed "remove" to "add" and vice versa 
    getWord (); //all going to happen when click button so keep this inside
});

