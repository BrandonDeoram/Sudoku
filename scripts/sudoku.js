var numSelected = null;
var tileSelected = null;

var errors = 0;
var board = [
    [-1, 1, -1, -1, -1, -1, -1, 9, -1],//1
    [-1, -1, 4, -1, -1, -1, 2, 9, -1],//2
    [-1, -1, 8, -1, -1, 5, -1, 9, -1],//3
    [-1, -1, -1, -1, -1, -1, -1, 3, -1],//4
    [2, -1, -1, -1, 4, -1, 1, -1, -1],//5
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],//6
    [-1, -1, 1, 8, -1, -1, 6, -1, -1],//7
    [-1, 3, -1, -1, -1, -1, -1, 8, -1],//8
    [-1, -1, 6, -1, -1, -1, -1, -1, -1],//9
]

window.onload = function () {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + ":" + c.toString();
            if (board[r][c] != "-1") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            if (r == 8) {
                tile.classList.add("tile2");
                tile.addEventListener("click", selectTile);
                document.getElementById("board").append(tile);
            }
            else {
                tile.addEventListener("click", selectTile);
                tile.classList.add("tile");
                document.getElementById("board").append(tile);
            }

        }
    }
}
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0:0" "0:1" .. "3:1"
        let coords = this.id.split(":"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        console.log(board, r, c, parseInt(numSelected.id));

        if (validRow(board, r, c, parseInt(numSelected.id)) && validColumn(board, r, c, parseInt(numSelected.id)) && validBox((board, r, c, parseInt(numSelected.id)))) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            console.log("not valid")
        }
    }
}



// A function that returns the result for the entire sudoku board.
function validSudoku(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = board[i][j];
            if (value !== '-1') {
                if (!validRow(board, i, j, value) || !validColumn(board, i, j, value) | !validBox(board, i, j, value)) {
                    return false;
                }
            }
        }
    }
    return true;
};

//The row function.
function validRow(board, row, col, value) {
    // j represents on column
    for (let j = 0; j < 8; j++) {
        // check if the current column matches the passed in column
        if (j !== col) {
            if (board[row][j] === value) {
                return false;
            }
        }
    }

    return true;
}

// The column function.
function validColumn(board, row, col, value) {
    // j represents on row
    for (let i = 0; i < 8; i++) {
        // check if the current row matches the passed in row
        if (i !== row) {
            if (board[i][col] === value) {
                return false;
            }
        }
    }

    return true;
}

//The sub-boxes function.
function validBox(board, row, col, value) {
    const startRow = row - (row % 3), startCol = col - (col % 3);

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (i !== row && j !== col) {
                if (board[i][j] === value) {
                    return false;
                }
            }
        }
    }

    return true;
}