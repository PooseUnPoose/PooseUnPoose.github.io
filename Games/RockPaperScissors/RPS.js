
let PlayerScore = 0;
let ComputerScore = 0;

function PlayerChoice(Entry){
    var PlayerChoice = Entry;
    document.getElementById("Result").style.display = "block";
    document.getElementById("RoundResult").style.display = "block";
    var ComputerChoice = Math.random();
    if (ComputerChoice < 0.34) {
        ComputerChoice = "Rock";
    } else if(ComputerChoice <= 0.67) {
        ComputerChoice = "Paper";
    } else {
        ComputerChoice = "Scissors";
    }
    console.log("Computer: " + ComputerChoice);
    console.log("Player: " + PlayerChoice);
    switch(PlayerChoice){
        case "Rock":
            switch(ComputerChoice){
                case "Rock":
                    document.getElementById("RoundResult").innerHTML = "Tie!";
                    break;
                case "Paper":
                    document.getElementById("RoundResult").innerHTML = "You Lose!";
                    ComputerScore++;
                    break;
                case "Scissors":
                    document.getElementById("RoundResult").innerHTML = "You Win!";
                    PlayerScore++;
                    break;
            }
            break;
        case "Paper":
            switch(ComputerChoice){
                case "Rock":
                    document.getElementById("RoundResult").innerHTML = "You Win!";
                    PlayerScore++;
                    break;
                case "Paper":
                    document.getElementById("RoundResult").innerHTML = "Tie!";
                    break;
                case "Scissors":
                    document.getElementById("RoundResult").innerHTML = "You Lose!";
                    ComputerScore++;
                    break;
            }
            break;
        case "Scissors":
            switch(ComputerChoice){
                case "Rock":
                    document.getElementById("RoundResult").innerHTML = "You Lose!";
                    ComputerScore++;
                    break;
                case "Paper":
                    document.getElementById("RoundResult").innerHTML = "You Win!";
                    PlayerScore++;
                    break;
                case "Scissors":
                    document.getElementById("RoundResult").innerHTML = "Tie!";
                    break;
            }
            break;

    }


    GameIcons(PlayerChoice, ComputerChoice);
    ScoreUpdate();
}

function GameIcons(PlayerChoice, ComputerChoice){
    switch(PlayerChoice){
        case "Rock":
            document.getElementById("PlayerChoice").src = "Images/Rock.png";
            break;
        case "Paper":
            document.getElementById("PlayerChoice").src = "Images/Paper.png";
            break;
        case "Scissors":
            document.getElementById("PlayerChoice").src = "Images/Scissors.png";
            break;
    }
    switch(ComputerChoice){
        case "Rock":
            document.getElementById("ComputerChoice").src = "Images/Rock.png";
            break;
        case "Paper":
            document.getElementById("ComputerChoice").src = "Images/Paper.png";
            break;
        case "Scissors":
            document.getElementById("ComputerChoice").src = "Images/Scissors.png";
            break;
    }
}

function ScoreUpdate(){
    document.getElementById("Scoreboard").style.display = "block";
    console.log("Player: " + PlayerScore + " Computer: " + ComputerScore);
    document.getElementById("Scoreboard").innerHTML = "Player: " + PlayerScore + " Computer: " + ComputerScore;
}