'use strict';

let game;
let ai;

let nextBrain;
let batchSize = 4;
let currentBatchNumber = 1;

const BLOCK_SIZE = 35;
const gameWidthBlocks = 10;
const gameHeightBlocks = 20;

let paused = false;
let shapeFallRate = 30; // number of fallse per second;

let horizontalMoveEveryXFrames = 2;// the speed the blocks move when the left or right key is down
let horizontalMoveCounter = 0;
let verticalMoveEveryXFrames = 1;// the speed the blocks move when the left or right key is down
let verticalMoveCounter = 0;

function setup() {
    window.canvas = createCanvas(800, 800);
    window.canvas.parent('canvas');
    game = new Game(gameWidthBlocks, gameHeightBlocks);
    ai = new AI(new Brain(true));
    ai.calculateMovementPlan2(game.currentShape, game.heldShape, game.nextShape, game.deadBlocksMatrix);
    frameRate(30);
}

function draw() {
    background(100);

    game.draw();
    ai.brain.writeMultipliers(600,300);
    writeCurrentMatrixStats();
    checkInput();

    update();
}

let leftKeyIsDown = false;
let upKeyIsDown = false;
let rightKeyIsDown = false;
let downKeyIsDown = false;

let replayingMove = false;

function update() {
    for (let i = 0; i < 1; i++) {
        // move the shape down at a rate of (shape Fall Rate) drops per second
        if (!paused && frameCount % int(30 / shapeFallRate) === 0) {
            if(ai.movementPlan === null){
                ai.calculateMovementPlan2(game.currentShape, game.heldShape, game.nextShape, game.deadBlocksMatrix);
            }

            let nextMove = ai.getNextMove();

            switch (nextMove) {
                case "ALL DOWN":
                    let downMoveMultiplier = 2;
                    while (ai.movementPlan.moveHistoryList.length > 0 && downMoveMultiplier > 0) {
                        ai.movementPlan.moveHistoryList.splice(0, 1);
                        game.moveShapeDown();
                        downMoveMultiplier -= 1;
                    }
                    break;
                case "HOLD":
                    game.holdShape();
                    break;
                case "ROTATE":
                    game.rotateShape();
                    break;
                case "RIGHT":
                    game.moveShapeRight();
                    break;
                case "LEFT":
                    game.moveShapeLeft();
                    break;
                case "DOWN":
                    game.moveShapeDown();
                    break;
            }
        }
    }
}

function checkInput() {
    
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
function writeCurrentMatrixStats() {
    let currentMatrix = new BlockMatrix(game.gameWidth, game.gameHeight);

    currentMatrix.copyFromMatrix(game.deadBlocksMatrix);
    currentMatrix.clearFullRows();
    currentMatrix.countHoles();
    currentMatrix.countPillars();
    currentMatrix.calculateMaximumLineHeight();
    currentMatrix.countNumberOfBlocksInRightmostLane();
    currentMatrix.calculateBumpiness();
    currentMatrix.calculateCost();

    let matrixStats = [`Hole Count: ${currentMatrix.holeCount}`,
        `Open Hole Count: ${currentMatrix.openHoleCount}`,
        `Pillar Count: ${currentMatrix.pillarCount}`,
        `Max Height: ${currentMatrix.maximumLineHeight}`,
        `Blocks in Right Lane: ${currentMatrix.blocksInRightLane}`,
        `Blocks above Holes: ${currentMatrix.blocksAboveHoles}`,
        `Bumpiness: ${currentMatrix.bumpiness}`,
        `Total cost: ${currentMatrix.cost}`];


    textAlign(LEFT, CENTER);
    fill(100);
    stroke(0);
    strokeWeight(1);

    let startingY = 300;
    let startingX = 25;
    let textGap = 20;

    textSize(20);
    noStroke();

    text("Current Stats",startingX, startingY);
    textSize(15);
    noStroke();
    for (let i = 0; i < matrixStats.length; i++) {
        text("---" + matrixStats[i],startingX, startingY + (i+1) * textGap);
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