// All Elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//Player O turn
let turnO = true;
let btnCount = 1;

// ALl Winning Patterns Stored in 2D Array
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Functions Show Winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations !! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};



const showDraw = () => {
    msg.innerText = `Well Played Both The Players but Game is Draw`;
    msgContainer.classList.remove("hide");
    
}

// Functions That Disables Boxes(BTNS)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Functions That Enables Boxes(BTNS)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Functions That Reset the Game
const resetGame = () => {
    turnO = true;
    btnCount = 1;
    enableBoxes();
    msgContainer.classList.add("hide");
}


// New Game Button
newGameBtn.addEventListener("click", resetGame);
// Reset Game Button
resetBtn.addEventListener("click", resetGame);


// Game Logic 
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        // Draw Condition
        if (btnCount >= 9)
            showDraw();
        btnCount++;

        // Player O Turn
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        // Player X Turn
        else {
            box.innerText = "X";
            turnO = true;
        }
        // No Further Buttons Work/Game is Paused
        box.disabled = true;
        // Check Winner 
        checkWinner();
    });
});



// Function Checks Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                // Disable the Other Buttons
                disableBoxes();
            }
        }
    }
};


