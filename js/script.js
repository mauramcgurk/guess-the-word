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