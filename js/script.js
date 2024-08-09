const guessedLettersBox = document.querySelector(".guessed-letters");//unordered list where the player’s guessed letters will appear
const button = document.querySelector(".guess");//Guess button
const input = document.querySelector(".letter");//text input where the player will guess a letter
const wordInProgress = document.querySelector(".word-in-progress"); //empty paragraph where the word in progress will appear via dots and letters
const remainingGuessesParagraph = document.querySelector(".remaining");//paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");//span inside the paragraph where the remaining guesses will display
const feedbackMessage = document.querySelector(".message");//empty paragraph where feedback messages will appear when the player guesses a letter
const playAgainButton = document.querySelector(".play-again");//hidden PLay Again button

let word = "magnolia";//test word
let guessedLetters = []; 
let remainingGuesses = 8;

const getWord = async function () {  
    const wordsDatabaseUrl = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"); //we made this a variable because it's a verrry long string (too long) and also - we can use it again wherever now that it's a variable. This is a little different from the way SC originally suggested. Go back to notes.
    const words = await wordsDatabaseUrl.text(); 
    const wordArray = words.split("\n"); 
    const randomIndex = Math.floor(Math.random() * wordArray.length); 
    word = wordArray[randomIndex].trim(); 
    placeholder(word); //this is new word now. 
    };

getWord();    

const placeholder = function (word) {
    const placeholderLetters = []; 
    for (const letter of word) { 
        placeholderLetters.push("●"); 
    }
    wordInProgress.innerText = placeholderLetters.join(""); 
};

button.addEventListener("click", function (e) {
    e.preventDefault();
    feedbackMessage.innerText = ""; 
    const inputGuess = input.value;
    const goodGuess = validateGuess(inputGuess);

    if (goodGuess) {
        //we've got a letter - let's guess
        makeGuess(inputGuess);
    }   

    input.value = "";
});

const validateGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/; 
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
        return input;
    }
};

const makeGuess = function (inputGuess) {
    inputGuess = inputGuess.toUpperCase();
    if (guessedLetters.includes(inputGuess)) {
        feedbackMessage.innerText = "Oops, you've already guessed that letter! Try again.";
    } else {
        guessedLetters.push(inputGuess); 
        decreaseGuesses(inputGuess); 
        showGuessLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessLetters = function () {
    guessedLettersBox.innerHTML = ""; 
    for (const letter of guessedLetters) { 
        const li = document.createElement("li"); 
        li.innerText = letter;
        guessedLettersBox.append(li); 
    }
};

const updateWordInProgress = function (guessedLetters) { 
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split(""); 
    const revealWord = []; 
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase()); 
        } else {
            revealWord.push("●"); 
        } 
    }
    wordInProgress.innerText = revealWord.join("");
    successfulGuess();
};      

const decreaseGuesses = function (guess) {
    const wordUpper = word.toUpperCase(); 
    if (!wordUpper.includes(guess)) {
        feedbackMessage.innerText = `No...the word has no ${guess}. Try again!`;
        remainingGuesses -= 1; 
    } else {
        feedbackMessage.innerText = `Boom! The word contains the letter ${guess} and this turn won't count against your guesses. Keep going!`;
    }

    if (remainingGuesses === 0) {
        feedbackMessage.innerHTML = `Bummer! You're out of guesses. The word is "${word}."`;
        startOver(); 
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};
        
const successfulGuess = function () {
    if (word.toUpperCase() === (wordInProgress.innerText)) {
        feedbackMessage.classList.add("win");
        feedbackMessage.innerHTML = `<p class="highlight">Hooray! You guessed the word!</p>`;

    
    startOver(); 
    } 
};

const startOver = function () {
    button.classList.add("hide");
    remainingGuessesParagraph.classList.add("hide");
    guessedLettersBox.classList.add("hide");
    playAgainButton.classList.remove("hide"); 
};

playAgainButton.addEventListener("click", function () {
    feedbackMessage.classList.remove("win");
    guessedLetters = []; 
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersBox.innerText = ""; 
    feedbackMessage.innerText = ""; 

getWord();

    button.classList.remove("hide");
    playAgainButton.classList.add("hide"); 
    remainingGuessesParagraph.classList.remove("hide");
    guessedLettersBox.classList.remove("hide");  


});
