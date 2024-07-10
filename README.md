# Minesweeper

### Try here 👉 [Minesweeper](https://nanoborg.github.io/wdi-fundamentals-memorygame/)

## Intention

This was a tutorial I had watched on youtube which covers languages such as:

- HTML
- CSS
- JavaScript

## Game Play

The idea is to click all the squares and not hit a bomb.

A square might return a value giving an indication to where the bomb might be around the square. The value comes from looking at all 8 squares surround a clicked square.

Right clicking places a flag on the square, do this to all suspected bombs to win the game.

## Code

The way the code is designed is to use **HTML** to create a basic layout and have **Javascript** target the **HTML** to handle creating elements and game-play logic.

In `app.js`

## Problems

## Extended Features

- I created a new function which creates a button, upon clicking this button it will reload the page using `location.reload()`

- Created a `confirm()` dialogue pop-up to let the player know when they have won or lost the game.
