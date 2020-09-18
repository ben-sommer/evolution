// Credit to @joelrojo on GitHub
// https://github.com/joelrojo/2048/blob/master/js/game.js
// With adaptations

const moves = ["up", "right", "down", "left"];

export const Game = function (boardString = '0000000000000000') {
    this.board = generateNewBoard(boardString);
    this.moves = 0;
    this.score = 0;

    this.toArray = function () {
        let array = this.board[0].join(",") + "," + this.board[1].join(",") + "," + this.board[2].join(",") + "," + this.board[3].join(",");
        return array.split(",");
    }

    this.toString = function () {
        return this.board[0].join('') + "\n" + this.board[1].join('') + "\n" + this.board[2].join('') + "\n" + this.board[3].join('');
    }

    this.move = function (direction) {
        switch (direction) {
            case "up":
                var resolved = resolveColUp(this.board)
                this.board = resolved['board'];
                this.score += resolved['score'];
                break;

            case "down":
                var resolved = resolveColDown(this.board)
                this.board = resolved['board'];
                this.score += resolved['score'];
                break;

            case "left":
                var resolved = resolveRowLeft(this.board)
                this.board = resolved['board'];
                this.score += resolved['score'];
                break;

            case "right":
                var resolved = resolveRowRight(this.board)
                this.board = resolved['board'];
                this.score += resolved['score'];
                break;
        }
        this.board = spawnBlock(this.board)
        this.moves++;
    };

    this.checkForWin = function() {
        return this.toArray().includes("2048");
    };

    this.checkForLoss = function () {
        let deadEnds = 0;
        moves.forEach(x => {
            let boardCopy = new Game(this.toArray().map(y => parseInt(y)));
            boardCopy.move(x);
            if (this.toString() == boardCopy.toString()) {
                deadEnds++;
            };
        });
        if (deadEnds == 4) {
            return true;
        } else {
            return false;
        };
    };
};

function spawnBlock(board) {
    // var count = 0;
    // while (count < numBlocks) {
    //     let row = Math.floor(Math.random() * 4);
    //     let col = Math.floor(Math.random() * 4);
    //     if (board[row][col] === 0) {
    //         board[row][col] = 2;
    //         count++;
    //     }
    // }
    let zeroSquareIndexes = [];
    for (let row=0;row<board.length;row++) {
        for (let cell = 0; cell < board[row].length; cell++) {
            if (board[row][cell] === 0) {
                zeroSquareIndexes.push([row, cell]);
            }
        };
    };
    if (zeroSquareIndexes.length == 0) return board;
    const randIndexes = zeroSquareIndexes[Math.floor(Math.random() * zeroSquareIndexes.length)];
    board[randIndexes[0]][randIndexes[1]] = 2;
    return board;
}

function generateNewBoard(boardString) {
    var board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    if (boardString != "0000000000000000" && /^[02]+$/.test(boardString) && boardString.length == 16) {
        var count = 0;
        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                board[x][y] = parseInt(boardString[count]);
                count++;
            }
        }
    } else if (boardString instanceof Array) {
        board[0] = boardString.slice(0, 4);
        board[1] = boardString.slice(4, 8);
        board[2] = boardString.slice(8, 12);
        board[3] = boardString.slice(12, 16);
    } else {
        board = spawnBlock(board);
        board = spawnBlock(board);
    };
    return board;
}

function resolveColUp(board) {
    var score = 0;
    for (var col = 0; col < board.length; col++) { // run for each column
        for (var j = 0; j < 3; j++) { // run each column 3 times
            for (var i = 0; i < 3; i++) { // iterate through column
                if (board[i][col] == 0) {
                    board[i][col] = board[i][col] + board[i + 1][col];
                    board[i + 1][col] = 0;
                } else if (board[i][col] == board[i + 1][col] && board[i][col] != 0) {
                    board[i][col] = board[i][col] + board[i + 1][col];
                    board[i + 1][col] = 0;
                    j++;
                    score += parseInt(board[i][col]);
                }
            }
        }
    }
    var resolved = {
        'board': board,
        'score': score
    }
    return resolved;
}

function resolveColDown(board) {
    var score = 0;
    for (var col = 0; col < board.length; col++) {
        for (var j = 0; j < 3; j++) { // 3 times per column
            for (var i = 3; i > 0; i--) { //iterate through column from bottom up
                if (board[i][col] == 0) {
                    board[i][col] = board[i][col] + board[i - 1][col];
                    board[i - 1][col] = 0;
                } else if (board[i][col] == board[i - 1][col] && board[i][col] != 0) {
                    board[i][col] = board[i][col] + board[i - 1][col];
                    board[i - 1][col] = 0;
                    j++;
                    score += parseInt(board[i][col]);
                }
            }
        }
    }
    var resolved = {
        'board': board,
        'score': score
    }
    return resolved;
}

function resolveRowLeft(board) {
    var score = 0;
    for (var row = 0; row < board.length; row++) {
        for (var j = 0; j < 3; j++) {
            for (var i = 0; i < 3; i++) {
                if (board[row][i] == 0) {
                    board[row][i] = board[row][i] + board[row][i + 1];
                    board[row][i + 1] = 0;
                } else if (board[row][i] == board[row][i + 1] && board[row][i] != 0) {
                    board[row][i] = board[row][i] + board[row][i + 1];
                    board[row][i + 1] = 0;
                    j++;
                    score += parseInt(board[row][i]);
                }
            }
        }
    }
    var resolved = {
        'board': board,
        'score': score
    }
    return resolved;
}

function resolveRowRight(board) {
    var score = 0;
    for (var row = 0; row < board.length; row++) {
        for (var j = 0; j < 3; j++) {
            for (var i = 3; i > 0; i--) {
                if (board[row][i] == 0) {
                    board[row][i] = board[row][i] + board[row][i - 1];
                    board[row][i - 1] = 0;
                } else if (board[row][i] == board[row][i - 1] && board[row][i] != 0) {
                    board[row][i] = board[row][i] + board[row][i - 1];
                    board[row][i - 1] = 0;
                    j++;
                    score += parseInt(board[row][i]);
                }
            }
        }
    }
    var resolved = {
        'board': board,
        'score': score
    }
    return resolved;
}