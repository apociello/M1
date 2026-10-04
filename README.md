# TypeMaster

A typing speed game built with vanilla HTML, CSS and JavaScript.

🔗 [Live Demo](https://apociello.github.io/M1/)

## Features

- Type directly over the phrase, no visible input box
- Real-time character feedback (correct/incorrect)
- Live WPM calculation
- Best score tracking per session
- Secret dark mode toggle

## Built with

- HTML
- CSS
- JavaScript

## AI usage

I used Claude to help shape the idea and suggest features once I had a
direction. I'd ask it to implement a specific piece of functionality,
then review the code and test it in the browser before accepting it.
Some parts I wrote or adjusted by hand myself.

## Autopsy

1. WPM only counts correct characters, not everything typed. Simpler
   to calculate and explain than tracking total typed + penalties.
   
2. The round ends once the typed length matches the phrase length, rather than requiring every character to be correct.
   This makes the interaction smoother while incorrect characters still affect the final score.
