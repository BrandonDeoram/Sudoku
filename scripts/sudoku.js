var numSelected = null;
var tileSelected = null;
var lastNumberDict = {
    "number": -1,
    "r": -1,
    "c": -1
}
var errors = 0;
var board = [
    [-1, 1, -1, -1, -1, -1, -1, 9, -1],//1
    [-1, -1, 4, -1, -1, -1, 2, -1, -1],//2
    [-1, -1, 8, -1, -1, 5, -1, -1, -1],//3
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
    updateGame();
    // Board 9x9


}
function updateGame() {
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
                tile.addEventListener("click", selectTile);
                tile.classList.add("tile2");
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

        // console.log(board, r, c, parseInt(numSelected.id));
        let value = parseInt(numSelected.id)
        console.log(value);

        if (validRow(board, r, c, parseInt(numSelected.id)) && validColumn(board, r, c, parseInt(numSelected.id)) && validBox(board, r, c, value)) {
            this.innerText = numSelected.id;
            board[r][c] = parseInt(numSelected.id);
            lastNumberDict['number'] = parseInt(numSelected.id);
            lastNumberDict['r'] = r;
            lastNumberDict['c'] = c;

            for (let i = 0; i < 9; i++) {
                document.getElementById(r + ":" + i).style.cssText = "background-color: white !important; "
            }
            for (let i = 0; i < 9; i++) {
                document.getElementById(i + ":" + c).style.cssText = "background-color: white !important; "
            }
            const blockRow = Math.floor(r / 3) * 3;
            const blockCol = Math.floor(c / 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    console.log((i + r), (j + 0));
                    document.getElementById((i + blockRow) + ":" + (j + blockCol)).style.cssText = "background-color: white !important; ";
                }
            }


        }
        else {
            //Figure out what cells are in the way 

            board[r][c] = parseInt(numSelected.id);
            lastNumberDict['number'] = parseInt(numSelected.id);
            lastNumberDict['r'] = r;
            lastNumberDict['c'] = c;
            if (validRow(board, r, c, parseInt(numSelected.id)) == false) {
                for (let i = 0; i < 9; i++) {
                    document.getElementById(r + ":" + i).style.cssText = "background-color: red !important; "
                }
                console.log(r, c);

            }
            if (validColumn(board, r, c, parseInt(numSelected.id)) == false) {
                for (let i = 0; i < 9; i++) {
                    document.getElementById(i + ":" + c).style.cssText = "background-color: red !important; "
                }
            }
            if (validBox(board, r, c, value) == false) {
                let row = r;
                let col = c;
                const blockRow = Math.floor(row / 3) * 3;
                const blockCol = Math.floor(col / 3) * 3;
                console.log(blockRow, blockCol);
                // Check the current block for duplicates
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {

                        document.getElementById((i + blockRow) + ":" + (j + blockCol)).style.cssText = "background-color: red !important; ";
                    }
                }
            }

            console.log("not valid")

        }
    }
}
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
function validColumn(board, row, col, value) {
    // j represents on row
    for (let i = 0; i < 9; i++) {
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
    // Get the starting row and column indices of the block
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;
    console.log(value);
    // Check the current block for duplicates
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[blockRow + i][blockCol + j] === value) {
                return false;
            }
        }
    }

    return true;
}
function undo() {
    let r = lastNumberDict['r'];
    let c = lastNumberDict['c'];
    for (let i = 0; i < 9; i++) {
        document.getElementById(r + ":" + i).style.cssText = "background-color: white !important; "
    }
    for (let i = 0; i < 9; i++) {
        document.getElementById(i + ":" + c).style.cssText = "background-color: white !important; "
    }
    const blockRow = Math.floor(r / 3) * 3;
    const blockCol = Math.floor(c / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            console.log((i + r), (j + 0));
            document.getElementById((i + blockRow) + ":" + (j + blockCol)).style.cssText = "background-color: white !important; ";
        }
    }
    console.log("undo clicked");
    board[lastNumberDict['r']][lastNumberDict['c']] = -1;
    document.getElementById(r + ":" + c).innerHTML = "";

}