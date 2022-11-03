let board;
let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;
let gameFinished = false;

setGame();

document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("board").innerText = "";
    gameFinished = false;
    setGame();
})

function setGame() {
    board = ["1", "2", "3",
            "4", "5", "6",
            "7", "8", "9"];

    for (let i = 0; i < board.length; i++) {
        let tile = document.createElement("div");
        tile.id = "tile" + i;
        tile.classList.add("tile");

        if(i === 0 || i === 1 || i === 3 || i === 4 || i === 6 || i === 7) tile.classList.add("rightline");
        if(i === 0 || i === 1 || i === 2 || i === 3 || i === 4 || i === 5) tile.classList.add("bottomline")

        tile.addEventListener("click", () => {
            setTile(tile, i);
        });
        document.getElementById("board").append(tile);
    }
}

function setTile(tile, cord) {
    if (gameFinished) return;

    if (board[cord] === "X" || board[cord] === "O") return;

    board[cord] = currentPlayer;

    tile.innerText = currentPlayer;

    if (currentPlayer === playerO) {
        currentPlayer = playerX;
    } else {
        currentPlayer = playerO;
    }

    checkWon();
}

let wonArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

function checkWon() {
    for (let i = 0; i < wonArray.length; i++) {
        if (board[wonArray[i][0]] === board[wonArray[i][1]] && board[wonArray[i][1]] === board[wonArray[i][2]]) {
            for (let j = 0; j < 3; j++) {
                document.getElementById("tile" + wonArray[i][j]).classList.add("winner");
            }
            gameFinished = true;
            return;
        }
    }

    let count = 0;
    for (let i = 0; i < board.length; i++) {
        if(board[i] === "X" || board[i] === "O") count++;
    }

    if(count === 9) {
        for (let i = 0; i < board.length; i++) {
            document.getElementById("tile" + i).classList.add("draw");
        }
        gameFinished = true;
    }
}