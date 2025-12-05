const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill("");

function checkWin() {
    const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of combos) {
        if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
            return cells[a];
        }
    }
    return cells.includes("") ? null : "Tie";
}

function render() {
    board.innerHTML = "";
    cells.forEach((value, i) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = value;

        cellDiv.onclick = () => {
            if (cells[i]) return;

            cells[i] = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";

            const result = checkWin();
            if (result) {
                statusText.textContent = result === "Tie" ? "It's a tie!" : `${result} wins!`;
                board.onclick = null;
            }
            render();
        };

        board.appendChild(cellDiv);
    });
}

render();
