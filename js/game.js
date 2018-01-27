// set DOM handlers
let newGameBtn = document.getElementById('js-newGameButton'),
    newGameElem = document.getElementById('js-newGameElement'),

    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    pickElem = document.getElementById('js-playerPickElement'),

    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),

    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),

    resultsElem = document.getElementById('js-resultsTableElement'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

// set event listeners
newGameBtn.addEventListener('click', () => {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
        player.score = 0;
        computer.score = 0;

        redrawScores();

        gameState = STATE_STARTED;
        setGameElements();

        playerNameElem.innerHTML = player.name;
    }
});
pickRock.addEventListener('click', () => pick(ROCK));
pickPaper.addEventListener('click', () => pick(PAPER));
pickScissors.addEventListener('click', () => pick(SCISSORS));

// set constant values
let STATE_STARTED = 'started',
    STATE_NOT_STARTED = 'not started',
    STATE_ENDED = 'ended',

    MAX_SCORE = 10,
    ROCK = 'rock',
    PAPER = 'paper',
    SCISSORS = 'scissors',
    POSSIBLE_PICKS = [ROCK, PAPER, SCISSORS];

// set game values
let gameState = STATE_NOT_STARTED,
    player = {name: '', score: 0},
    computer = {name: 'computer', score: 0};

/**
 * Based on game state set DOM elements.
 */
function setGameElements() {
    // noinspection FallThroughInSwitchStatementJS
    switch(gameState) {
        case STATE_STARTED:
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case STATE_ENDED:
            newGameBtn.innerText = 'Jeszcze raz';
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'block';
            playerPickElem.innerText = "Player selection";
            computerPickElem.innerText = "Computer selection";
            playerResultElem.innerText = "Player Score";
            computerResultElem.innerText = "Computer Score";
        case STATE_NOT_STARTED:
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}
setGameElements();

/**
 * User pick handler.
 * @param playerPick One of possible picks
 */
function pick(playerPick) {
    let computerPick = POSSIBLE_PICKS[Math.floor(Math.random() * 3)];

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

/**
 * Check who wins in current round.
 * @param playerPick One of possible picks
 * @param computerPick One of possible picks
 * @returns {string}
 */
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    // draw
    if (computerPick === playerPick) {
        return playerResultElem.innerHTML = computerResultElem.innerHTML = "Draw!";
    }

    // computer wins
    if ((computerPick === ROCK &&  playerPick === SCISSORS) ||
        (computerPick === SCISSORS &&  playerPick === PAPER) ||
        (computerPick === PAPER &&  playerPick === ROCK)) {

        computerResultElem.innerHTML = "Win!";
        computer.score++;

        // user wins
    } else {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    }

    redrawScores();

    // check if max score has been reached and game should end
    if (computer.score >= MAX_SCORE || player.score >= MAX_SCORE) {
        let winnerIs;

        if (computer.score >= MAX_SCORE) {
            winnerIs = 'computer';
        } else {
            winnerIs = 'player';
        }

        gameState = STATE_ENDED;
        setGameElements();

        // alert in timeout for non blocking DOM redraw.
        setTimeout(() => alert(winnerIs + ' won!'), 1)
    }
}

/**
 * Redraw DOM elements for player's and computer's scores.
 */
function redrawScores() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}
