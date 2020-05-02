# [Seppuku Sudoku]

[Seppuku Sudoku]: https://seppuku-sudoku.web.app

[![CircleCI](https://circleci.com/gh/cameronkinsella/seppuku-sudoku.svg?style=svg)](https://circleci.com/gh/cameronkinsella/seppuku-sudoku)

### A Sudoku Solver Using Image Recognition

Users can either choose to upload an image of a Sudoku game, or manually type in a game.

The former sends the image to a Cloud Function which uses **PyTorch** and **OpenCV**
to capture the board, solve it, and send it back to the frontend. The latter allows the user to input any Sudoku game
and instantly solve it with the press of a button.