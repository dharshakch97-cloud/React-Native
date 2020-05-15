// StartGame Page DOM Selection
let startGame = document.getElementById('start');
let player1Name = document.getElementById('player1');
let player1Val = document.getElementById('player1-validation');
let player2Name = document.getElementById('player2');
let player2Val = document.getElementById('player2-validation');
let btnStart = document.getElementById('btn-start');




// BoardGame Page DOM Selection
let boardGame = document.getElementById('board-games');
let showPlayer1 = document.getElementById('show-player-1');
let showPlayer2 = document.getElementById('show-player-2');
let playerTurn = document.getElementById('player-turn');
let boxes = document.querySelectorAll('.box');
let winText = document.getElementById('win-text');
let btnAgain = document.getElementById('play-again');
let showWinner = document.getElementById('show-winner');

// backdrop
let backdrop = document.getElementById('backdrop');

backdrop.style.display = 'none';
showWinner.style.display = 'none';

let board = [
    '', '', '',
    '', '', '',
    '', '', ''
]

// available array to fill up the game board
let available = [];

// reset play game
btnAgain.addEventListener('click', function () {
    backdrop.style.display = 'none';
    showWinner.style.display = 'none';
    // reset board
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ]
    for (let i = 0; i < 9; i++) {
        boxes[i].innerHTML = '';
    }
    // change gameTurn to player 1
    players[0].isTurn = true;
    playerTurn.innerText = `${players[0].name}'s Move`;
    available = [];
})



// Button start to play the game
btnStart.addEventListener('click', () => {
    // players input validation
    if (player1Name.value === '') {
        player1Val.innerText = 'Please enter player 1 name';
    } else {
        player1Val.innerText = '';
    }

    if (player2Name.value === '') {
        player2Val.innerText = 'Please enter player 2 name';
    } else {
        player2Val.innerText = '';
    }
    // players input validation
    if (player2Name.value !== '' && player1Name.value !== '') {
        players[0].name = player1Name.value;
        players[1].name = player2Name.value;
        startGame.style.display = 'none';
        boardGame.style.display = 'block';
        loadName();
    }

})

// to display the name for the input
let loadName = () => {
    showPlayer1.innerText = players[0].name;
    showPlayer2.innerText = players[1].name;
    playerTurn.innerText = `${players[0].name}'s Move`;
}


// function next turn 
let nextTurn = () => {
    if (players[0].isTurn === true) {
        playerTurn.innerText = `${players[1].name}'s Move`;
        players[0].isTurn = false;
        players[1].isTurn = true;
    } else {
        playerTurn.innerText = `${players[0].name}'s Move`;
        players[0].isTurn = true;
        players[1].isTurn = false;
    }
}

function horizontalCheck() {
    if (board[0] === board[1] && board[1] === board[2]) {
        return board[0]
    } else if (board[3] === board[4] && board[4] === board[5]) {
        return board[3];
    } else if (board[6] === board[7] && board[7] === board[8]) {
        return board[6];
    }
}

function verticalCheck() {
    if (board[0] === board[3] && board[3] === board[6]) {
        return board[0];
    } else if (board[1] === board[4] && board[4] === board[7]) {
        return board[1];
    } else if (board[2] === board[5] && board[5] === board[8]) {
        return board[2];
    }
}

function diagonalCheck() {
    if (board[0] === board[4] && board[4] === board[8]) {
        return board[0];
    } else if (board[2] === board[4] && board[4] === board[6]) {
        return board[2];
    }
}

function checkWin() {
    let winner = null;
    if (horizontalCheck() !== undefined) {
        winner = horizontalCheck();
    } else if (verticalCheck() !== undefined) {
        winner = verticalCheck();
    } else if (diagonalCheck() !== undefined) {
        winner = diagonalCheck();
    }
    console.log(winner);
    return winner;

}


// box add event listener
for (const box of boxes) {
    let img1 = `<img class="symbols" src="asset/O.svg">`;
    let img2 = `<img class="symbols" src="asset/X.svg">`
    box.addEventListener('click', function (event) {
        let winner = null;
        if (players[0].isTurn === true) {
            if (board[box.id] === '') {
                event.path[0].innerHTML = img1;
                board[box.id] = players[0].symbol;
                available.push(players[0].symbol);
                nextTurn();
            }
        } else {
            if (board[box.id] === '') {
                event.path[0].innerHTML = img2;
                board[box.id] = players[1].symbol;
                available.push(players[1].symbol);
                nextTurn();
            }
        }

        winner = checkWin();
        if (winner) {
            console.log(winner);
            if (winner == 'X') {
                win.innerText = players[1].name;
            } else {
                win.innerText = players[0].name;
            }

            showWinner.style.display = 'block';
            backdrop.style.display = 'block';
        } else if (available.length === 9 && winner === null) {
            win.innerText = 'Nobody';
            showWinner.style.display = 'block';
            backdrop.style.display = 'block';
        }

        console.log(available)
    })
}

//<img class="symbols" src="asset/X.svg">