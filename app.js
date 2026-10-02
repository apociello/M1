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
}

function prepareRound() {
  currentPhrase = pickRandomPhrase();
  renderPhrase(currentPhrase);
  phraseDisplay.querySelector('span').classList.add('cursor');

  clearInterval(timerId);
  scoreDisplay.textContent = 0;
  gameActive = false;

  typingInput.value = '';
  typingInput.maxLength = currentPhrase.length;
  typingInput.disabled = false;
  typingInput.focus();

  playButton.hidden = true;
}

function startTimer() {
  // placeholder: aquí mediremos el tiempo cuando añadamos WPM
}

function endGame() {
  clearInterval(timerId);
  typingInput.disabled = true;

  const cursorSpan = phraseDisplay.querySelector('.cursor');
  if (cursorSpan) cursorSpan.classList.remove('cursor');

  const finalScore = Number(scoreDisplay.textContent);

  if (finalScore > bestScore) {
    bestScore = finalScore;
    bestDisplay.textContent = bestScore;
  }

  playButton.hidden = false;
}

function updateFeedback() {
  const typedText = typingInput.value;
  const characterSpans = phraseDisplay.querySelectorAll('span');

  let correctCount = 0;

  characterSpans.forEach((span, index) => {
    const typedCharacter = typedText[index];

    span.classList.remove('cursor');

    if (typedCharacter === undefined) {
      span.className = '';
    } else if (typedCharacter === span.textContent) {
      span.className = 'correct';
      correctCount++;
    } else {
      span.className = 'incorrect';
    }

    if (index === typedText.length) {
      span.classList.add('cursor');
    }
  });

  scoreDisplay.textContent = correctCount;

  if (typedText.length === currentPhrase.length) {
    endGame();
  }
}

typingInput.addEventListener('input', () => {
  if (!gameActive) {
    gameActive = true;
    startTimer();
  }

  updateFeedback();
});

playButton.addEventListener('click', prepareRound);

phraseDisplay.addEventListener('click', () => {
  typingInput.focus();
});

prepareRound();
