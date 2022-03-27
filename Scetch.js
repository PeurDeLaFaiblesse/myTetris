'use strict';
let game;
const BLOCK_SIZE = 35;
const gameWidthBlocks = 10;
const gameHeightBlocks = 20;
let paused = false;
let horizontalMoveEveryXFrames = 2;// the speed the blocks move when the left or right key is down
let horizontalMoveCounter = 0;
let verticalMoveEveryXFrames = 1;// the speed the blocks move when the left or right key is down
let verticalMoveCounter = 0;

function setup() {
    window.canvas = createCanvas(800, 800);
    window.canvas.parent('canvas');
    game = new Game(gameWidthBlocks, gameHeightBlocks);
    frameRate(10);
}

function draw() {
    background(100);
    game.draw();
    if (!paused) checkInput();
}

let leftKeyIsDown = false;
let upKeyIsDown = false;
let rightKeyIsDown = false;
let downKeyIsDown = false;

let replayingMove = false;

function checkInput() {
    game.moveShapeDown(replayingMove);

    if (leftKeyIsDown || rightKeyIsDown) {
        if (horizontalMoveCounter >= horizontalMoveEveryXFrames) {
            leftKeyIsDown ? game.moveShapeLeft() : game.moveShapeRight();
            horizontalMoveCounter = 0;
        }
        horizontalMoveCounter++;
    }

    if (downKeyIsDown) {
        if (verticalMoveCounter >= verticalMoveEveryXFrames) {
            game.moveShapeDown(replayingMove);
            verticalMoveCounter = 0;
        }
        verticalMoveCounter++;
    }

}

function keyPressed() {

    if (keyCode === UP_ARROW) {
        game.rotateShape();
        upKeyIsDown = true;
    } else if (keyCode === DOWN_ARROW) {
        downKeyIsDown = true;
    }
    if (keyCode === LEFT_ARROW) {
        game.moveShapeLeft();
        leftKeyIsDown = true;
        horizontalMoveCounter = 0;
    } else if (keyCode === RIGHT_ARROW) {
        game.moveShapeRight();
        rightKeyIsDown = true;
        horizontalMoveCounter = 0;
    }
    if (key === 'C') {
        game.holdShape();
    }
    if (key === ' ') {
        paused = !paused;
    }
    // if (key === 'A') {
    //     ai.getMove(game.currentShape, game.heldShape, game.nextShape, game.deadBlocksMatrix);
    // }
    if (key == 'R') {
        replayingMove = !replayingMove;
    }
}

function keyReleased() {

    if (keyCode === UP_ARROW) {
        upKeyIsDown = false;
    } else if (keyCode === DOWN_ARROW) {
        downKeyIsDown = false;
    }
    if (keyCode === LEFT_ARROW) {
        leftKeyIsDown = false;
    } else if (keyCode === RIGHT_ARROW) {
        rightKeyIsDown = false;
    }
}