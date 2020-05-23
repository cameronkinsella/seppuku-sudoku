# [Seppuku Sudoku]

[Seppuku Sudoku]: https://seppuku-sudoku.web.app

[![CircleCI](https://circleci.com/gh/cameronkinsella/seppuku-sudoku.svg?style=svg)](https://circleci.com/gh/cameronkinsella/seppuku-sudoku)

## A Sudoku Solver Using Image Recognition

### Overview

Users can either choose to upload an image of a Sudoku game, or manually type in a game.

The former sends the image to a Cloud Function which uses **PyTorch** and **OpenCV**
to capture the board, solve it, and send it back to the frontend. The latter allows the user to input any Sudoku game
and instantly solve it with the press of a button.

### Image Recognition

OpenCV was used to isolate the board and scrape images of the numbers inside. Check out 
[this notebook](https://github.com/cameronkinsella/seppuku-sudoku/blob/master/capture/board_capture.ipynb) 
for more details on the board capture process.

A Convolutional Neural Network was developed with PyTorch for recognizing the images of each number on the board.
Check out [this notebook](https://github.com/cameronkinsella/seppuku-sudoku/blob/master/training/trainer.ipynb)
for more details on the digit recognition CNN.

### Preview

<p align="center">
    <img src="https://i.gyazo.com/12bf2f4ef7ba1cbcf8af3a30c42f1f27.png" alt="preview image"/>
</p>