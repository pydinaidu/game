const board = document.getElementById('game-board');
const messageEl = document.getElementById('result-message');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');

const emojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐸', '🦁'];
let cards = [];
let flippedCards = [];
let matchedCount = 0;
let timer = 0;
let timerInterval;
let gameOver = false;
let timeLimit = 30;

function initGame() {
  // Reset
  cards = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
  board.innerHTML = '';
  flippedCards = [];
  matchedCount = 0;
  timer = 0;
  gameOver = false;
  messageEl.textContent = '';
  messageEl.className = 'message';
  timerDisplay.textContent = '0';
  clearInterval(timerInterval);

  // Create cards
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = '';
    board.appendChild(card);

    card.addEventListener('click', () => {
      if (gameOver || card.classList.contains('flipped')) return;

      if (timer === 0 && matchedCount === 0) startTimer();

      card.classList.add('flipped');
      card.innerText = emoji;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        checkMatch();
      }
    });
  });
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCount++;
    flippedCards = [];

    if (matchedCount === emojis.length) {
      stopTimer();
      endGame(true);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.innerText = '';
      card2.innerText = '';
      flippedCards = [];
    }, 700);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
    if (timer >= timeLimit) {
      stopTimer();
      endGame(false);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function endGame(won) {
  gameOver = true;
  messageEl.style.display = 'block';

  if (won) {
    messageEl.textContent = `🎉 You won in ${timer} seconds!`;
    messageEl.classList.remove('lose');
    messageEl.classList.add('win');
  } else {
    messageEl.textContent = "⏱ Time's up! You lost.";
    messageEl.classList.remove('win');
    messageEl.classList.add('lose');
  }

  // Disable cards
  document.querySelectorAll('.card').forEach(card => {
    card.style.pointerEvents = 'none';
  });
}
messageEl.style.display = 'none';
messageEl.classList.remove('win', 'lose');
messageEl.textContent = '';
restartBtn.addEventListener('click', initGame);

initGame();
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  document.querySelector('.info').style.display = 'block';
  document.getElementById('game-board').style.display = 'grid';
  document.getElementById('restart-btn').style.display = 'inline-block';
  initGame();
});
