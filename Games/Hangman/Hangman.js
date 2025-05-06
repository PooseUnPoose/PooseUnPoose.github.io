let Errors = 0;
let word;
let WordGuess = "";
let Correctword=[];
let HiddenWord=[];




function GameRestart(){
    document.getElementById("VerticalSupport").style.display = "none";
    document.getElementById("HorizontalBeam").style.display = "none";
    document.getElementById("Rope").style.display = "none";
    document.getElementById("Head").style.display = "none";
    document.getElementById("Body").style.display = "none";
    document.getElementById("RArm").style.display = "none";
    document.getElementById("LArm").style.display = "none";
    document.getElementById("RLeg").style.display = "none";
    document.getElementById("LLeg").style.display = "none";
    document.getElementById("Game").style.display = "block";
    Errors = 0;
    getRandomWord();
    const soloLettersDiv = document.getElementById("SoloLetters");
    const buttons = soloLettersDiv.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}


function Buildbody(){
    switch(Errors){
        case 1:
            document.getElementById("VerticalSupport").style.display = "block";
            break;
        case 2:
            document.getElementById("HorizontalBeam").style.display = "block";
            break;
        case 3:
            document.getElementById("Rope").style.display = "block";
            break;
        case 4:
            document.getElementById("Head").style.display = "block";
            break;
        case 5:
            document.getElementById("Body").style.display = "block";
            break;
        case 6:
            document.getElementById("RArm").style.display = "block";
            break;
        case 7:
            document.getElementById("LArm").style.display = "block";
            break;
        case 8:
            document.getElementById("RLeg").style.display = "block";
            break;
        case 9:
            document.getElementById("LLeg").style.display = "block";
            document.getElementById("GameStatusText").textContent = "You lose";
            const soloLettersDiv = document.getElementById("SoloLetters");
            const buttons = soloLettersDiv.getElementsByTagName("button");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
            HiddenWord = Correctword;
            document.getElementById("Word").textContent = HiddenWord.join(" ");
            break;
    }
}


function Test(){
    Errors++;
    Buildbody();
    console.log(word);
}
function getRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.text())
        .then(data => {
            HiddenWord = [];
            Correctword = [];
            const words = data.split('\n');
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex].replace('["', '').replace('"]', '');
            word = randomWord.toLowerCase();
            Correctword = word.split('');
            Hidden();
        })
        .catch(error => {
            console.error('Error reading the file:', error);
        });
}


function CheckWord(){
    WordGuess = document.getElementById("WordGuess").value.toLowerCase();
    if (WordGuess === word) {
        console.log("Correct guess!");
        const soloLettersDiv = document.getElementById("SoloLetters");
        const buttons = soloLettersDiv.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        document.getElementById("GameStatusText").textContent = "You win";
    } else {
        console.log("Incorrect guess!");
        Errors++;
        Buildbody();
    }
}
function CheckLetter(){
    const buttonValue = event.target.textContent;
    console.log(buttonValue);
    event.target.disabled = true;
    
    let letterFound = false;
    for (let i = 0; i < Correctword.length; i++) {
        if (Correctword[i].toLowerCase() === buttonValue.toLowerCase()) {
            HiddenWord[i] = buttonValue;
            letterFound = true;
        }
    }
    
    if (Correctword.join("").toLowerCase() === HiddenWord.join("").toLowerCase()) {
        document.getElementById("GameStatusText").textContent = "You win";
        console.log("Correct guess!");
        const soloLettersDiv = document.getElementById("SoloLetters");
        const buttons = soloLettersDiv.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
    if (!letterFound) {
        Errors++;
        Buildbody();
    }
    console.log(HiddenWord);
    document.getElementById("Word").textContent = HiddenWord.join(" ");
}

function Hidden(){
    for (let i = 0; i < Correctword.length; i++) {
        HiddenWord[i] = "_";
    }
    console.log(HiddenWord);
    document.getElementById("Word").textContent = HiddenWord.join(" ");;
}
