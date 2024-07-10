# Minesweeper

### Try here 👉 [Minesweeper](https://nanoborg.github.io/minesweeper/)

## Intention

This was a tutorial I had watched on youtube which covers languages such as:

- HTML
- CSS
- JavaScript

## Game Play

The idea is to click all the squares and not hit a bomb.

A square might return a value giving an indication to where the bomb might be around the square. The value comes from looking at all 8 squares surrounding a clicked square.

Right clicking places a flag on the square, do this to all suspected bombs to win the game.

## Code

The way the code is designed is to use **HTML** to create a basic layout and have **Javascript** target the **HTML** to handle creating elements and game-play logic.

In `app.js`

## Extended Features

- I created a new function which creates a button, upon clicking this button it will reload the page using `location.reload()`

- Created a dialogue pop-up to let the player know when they have won or lost the game using `confirm("BOOM! Game Over")` and `confirm("BOOM! Game Over")`

- Game over resets the board.

## Problems

- I had some issues trying with setting up `confirm()` dialogue boxes, the prompt was showing before the squares were rendered with 💣 values.

Javascript is executes synchronously, meaning that `confirm()` will block the execution of other lines of code till the dialogue is clicked.

The work around was to create a `setTimout(() => {}, 10)` function so that `confirm()` is fired after the squares have been rendered with 💣.

- Had some placement issues with the gameboard. I wanted the board to be placed in the centre of the screen. I used `display:grid; place-items: center;` which worked one way but also had to remember to set `height: 100vh` to the parent element and `height: 100%` of the wrapping element for the board.
