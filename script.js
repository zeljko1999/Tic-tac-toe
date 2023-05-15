const fields = document.querySelectorAll('p')
const buttons = document.querySelectorAll('.field')
const restartButton = document.querySelector('.restart-button')
const resetScore = document.querySelector('.reset-score')
const playerXScore = document.querySelector('.playerXScore')
const playerYScore = document.querySelector('.playerYScore')
const currentTurnText = document.querySelector('.current-turn')
const gameBoard = (() => {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const resetBoard = () => {
    for (let i = 0; i < 9; i++) {
      board[i] = 0
    }
    return board
  }
  const drawBoard = () => {
    for (let i = 0; i < fields.length; i++) {
      if (board[i] === 0) { fields[i].textContent = '' } else if (board[i] === 'X' || board[i] === 'O') { fields[i].textContent = board[i] }
    }
  }

  const gameOver = () => {
    for (let i = 0; i < board.length; i++) {
      if ((i === 0 || i === 3 || i === 6) &&
      (board[i] !== 0 && board[i + 1] !== 0 && board[i + 2] !== 0)) {
        if (board[i] === board[i + 1] && board[i + 1] === board[i + 2]) {
          if (board[i] === 'X') {
            return ('X won')
          } else return ('Y won')
        }
      }
      if ((i === 0 || i === 1 || i === 2) &&
        (board[i] !== 0 && board[i + 3] !== 0 && board[i + 6] !== 0)) {
        if (board[i] === board[i + 3] && board[i + 3] === board[i + 6]) {
          if (board[i] === 'X') {
            return ('X won')
          } else return ('Y won')
        }
      }
      if ((i === 0) &&
        (board[i] !== 0 && board[i + 4] !== 0 && board[i + 8] !== 0)) {
        if (board[i] === board[i + 4] && board[i + 4] === board[i + 8]) {
          if (board[i] === 'X') {
            return ('X won')
          } else return ('Y won')
        }
      }
      if ((i === 2) &&
        (board[i] !== 0 && board[i + 2] !== 0 && board[i + 4] !== 0)) {
        if (board[i] === board[i + 2] && board[i + 2] === board[i + 4]) {
          if (board[i] === 'X') {
            return ('X won')
          } else return ('Y won')
        }
      }
    }
  }
  return { board, resetBoard, drawBoard, gameOver }
})()

const player = sign => {
  let score = 0
  const isTurn = 0
  const win = () => {
    score = score + 1
  }
  const getScore = () => {
    return score
  }
  const resetScore = () => {
    score = 0
  }
  return { isTurn, getScore, win, resetScore }
}

const game = (() => {
  let running = true
  const round = 0
  const gameOver = () => {
    running = !running
  }
  const readyToPlay = () => {
    if (running) { return 1 } else { return 0 }
  }
  const startGame = (player1, player2) => {
    if (player1.isTurn === 0 && player2.isTurn === 0) {
      player1.isTurn = 1
    }
  }
  return { startGame, gameOver, readyToPlay, round }
})()

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    if (game.readyToPlay()) {
      const child = buttons[i].querySelector('p')
      if (playerX.isTurn === 1) {
        currentTurnText.textContent = 'Player Y Turn'
        child.textContent = 'X'
        gameBoard.board[i] = 'X'
        playerX.isTurn = 0
        playerY.isTurn = 1
      } else if (playerY.isTurn === 1) {
        currentTurnText.textContent = 'Player X Turn'
        child.textContent = 'O'
        gameBoard.board[i] = 'Y'
        playerY.isTurn = 0
        playerX.isTurn = 1
      }
      if (gameBoard.gameOver() === 'X won') {
        currentTurnText.textContent = 'Player X WON !!'
        game.gameOver()
        playerX.win()
        playerXScore.textContent = `PLAYER X: ${playerX.getScore()}`
      } else if (gameBoard.gameOver() === 'Y won') {
        currentTurnText.textContent = 'Player Y WON !!'
        game.gameOver()
        playerY.win()
        playerYScore.textContent = `PLAYER Y: ${playerY.getScore()}`
      }
    }
  })
}

restartButton.addEventListener('click', function () {
  gameBoard.resetBoard()
  gameBoard.drawBoard()
  if ((game.round % 2) === 1 && game.round !== 0) {
    playerY.isTurn = 0
    playerX.isTurn = 1
    currentTurnText.textContent = 'Player X Turn'
    game.round++
  } else {
    playerX.isTurn = 0
    playerY.isTurn = 1
    currentTurnText.textContent = 'Player Y Turn'
    game.round++
  }
  if (game.readyToPlay() !== 1) { game.gameOver() }
})

resetScore.addEventListener('click', function () {
  playerX.resetScore()
  playerY.resetScore()
  gameBoard.resetBoard()
  gameBoard.drawBoard()
  playerXScore.textContent = `PLAYER X: ${playerX.getScore()}`
  playerYScore.textContent = `PLAYER Y: ${playerY.getScore()}`
  currentTurnText.textContent = 'Player X Turn'
  game.round = 0
  playerX.isTurn = 1
  playerY.isTurn = 0
  if (game.readyToPlay() !== 1) { game.gameOver() }
})

gameBoard.drawBoard()
const playerX = player('X')
const playerY = player('Y')
game.startGame(playerX, playerY)
