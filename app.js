const phraseDisplay = document.querySelector('#phrase');
const typingInput = document.querySelector('#typing-input');
const scoreDisplay = document.querySelector('#score');
const bestDisplay = document.querySelector('#best');
const playButton = document.querySelector('#play-btn');

const phrases = [
  'The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant mountains and the cold wind carries the smell of rain across the quiet empty valley below.',
  'Programming is the art of telling another human what one wants the computer to do, and every good programmer knows that clear code is written for people first and machines second.',
  'During that long summer night the streets of the city were almost empty, and the only sound was the distant music drifting from an open window on the top floor of an old building.',
];

let currentPhrase = '';
let timerId = null;
let bestScore = 0;
let gameActive = false;
let startTime = 0;
let correctCount = 0;
let characterSpans = [];
let currentWpm = 0;

function pickRandomPhrase() {
  const index = Math.floor(Math.random() * phrases.length);
  return phrases[index];
}

function renderPhrase(phrase) {
  phraseDisplay.textContent = '';

  for (const character of phrase) {
    const span = document.createElement('span');
    span.textContent = character;
    phraseDisplay.appendChild(span);
  }

  characterSpans = phraseDisplay.querySelectorAll('span');
}

function calculateWpm() {
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  return elapsedSeconds > 0
    ? Math.round(correctCount / 5 / (elapsedSeconds / 60))
    : 0;
}

function prepareRound() {
  currentPhrase = pickRandomPhrase();
  renderPhrase(currentPhrase);
  phraseDisplay.querySelector('span').classList.add('cursor');

  clearInterval(timerId);
  correctCount = 0;
  currentWpm = 0;
  scoreDisplay.textContent = 0;
  gameActive = false;

  typingInput.value = '';
  typingInput.maxLength = currentPhrase.length;
  typingInput.disabled = false;
  typingInput.focus();

  playButton.hidden = true;
}

function startTimer() {
  startTime = Date.now();

  timerId = setInterval(() => {
    currentWpm = calculateWpm();
    scoreDisplay.textContent = currentWpm;
  }, 1000);
}

function endGame() {
  clearInterval(timerId);
  typingInput.disabled = true;

  const cursorSpan = phraseDisplay.querySelector('.cursor');
  if (cursorSpan) cursorSpan.classList.remove('cursor');

  if (currentWpm > bestScore) {
    bestScore = currentWpm;
    bestDisplay.textContent = bestScore;
  }

  playButton.hidden = false;
}

function updateFeedback() {
  const typedText = typingInput.value;

  correctCount = 0;

  characterSpans.forEach((span, index) => {
    const typedCharacter = typedText[index];

    span.classList.remove('correct', 'incorrect', 'cursor');

    if (typedCharacter === span.textContent) {
      span.classList.add('correct');
      correctCount++;
    } else if (typedCharacter !== undefined) {
      span.classList.add('incorrect');
    }

    if (index === typedText.length) {
      span.classList.add('cursor');
    }
  });

  currentWpm = calculateWpm();
  scoreDisplay.textContent = currentWpm;

  if (typedText.length === currentPhrase.length) {
    endGame();
  }
}

typingInput.addEventListener('input', () => {
  if (typingInput.value.length === 0) {
    gameActive = false;
    clearInterval(timerId);
    currentWpm = 0;
    scoreDisplay.textContent = 0;
  } else if (!gameActive) {
    gameActive = true;
    startTimer();
  }

  updateFeedback();
});

playButton.addEventListener('click', prepareRound);

phraseDisplay.addEventListener('click', () => {
  typingInput.focus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.body.classList.toggle('dark');
  }
});

prepareRound();
