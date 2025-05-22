# Unbeatable Tic Tac Toe (React + Minimax)

A simple but unbeatable Tic Tac Toe game built in React using the **Minimax algorithm**. The AI always plays perfectly, so you can never beat it — only draw!

## Features

- Human vs AI gameplay
- Minimax-based unbeatable AI
- Scoreboard tracking wins and draws
- Auto-reset and manual reset button
- Winning line highlighting

## Live Demo

> [🔗 Click to Play the Game](https://tictactoe-vert-two.vercel.app/)  

## How It Works

The robot uses the **Minimax algorithm** to calculate all possible future moves and choose the one that leads to the best outcome:

- Win: +1
- Draw: 0
- Lose: -1

This guarantees optimal play every time.

## Tech Stack

- [React](https://reactjs.org)
- JavaScript (ES6)
- CSS Grid

## Setup Instructions

```bash
git clone https://github.com/Juliankimmm/tictactoe.git
cd tictactoe
npm install
npm start
