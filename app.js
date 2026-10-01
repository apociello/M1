const timeDisplay = document.querySelector('#time');
const phraseDisplay = document.querySelector('#phrase');
const typingInput = document.querySelector('#typing-input');
const scoreDisplay = document.querySelector('#score');
const bestDisplay = document.querySelector('#best');
const resultMessage = document.querySelector('#result');
const playButton = document.querySelector('#play-btn');

const phrases = [
  'The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant mountains and the cold wind carries the smell of rain across the quiet empty valley below.',
  'Programming is the art of telling another human what one wants the computer to do, and every good programmer knows that clear code is written for people first and machines second.',
  'During that long summer night the streets of the city were almost empty, and the only sound was the distant music drifting from an open window on the top floor of an old building.',
];

let currentPhrase = '';

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

function startGame() {
  currentPhrase = pickRandomPhrase();
  renderPhrase(currentPhrase);

  typingInput.value = '';
  typingInput.disabled = false;
  typingInput.focus();
}

function updateFeedback() {
    const typedText = typingInput.value;
    const characterSpans = phraseDisplay.querySelectorAll("span");

    let correctCount = 0;

    characterSpans.forEach((span, index) => {
        const typedCharacter = typedText[index];

        if (typedCharacter === undefined) {
            span.className = "";
            return;
        }

        if (typedCharacter === span.textContent) {
            span.className = "correct";
            correctCount++;
        } else {
            span.className = "incorrect";
        }
    });

    scoreDisplay.textContent = correctCount;
}

playButton.addEventListener('click', startGame);
typingInput.addEventListener("input", updateFeedback);
