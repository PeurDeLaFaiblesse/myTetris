'use strict';
let testShape;
let game;
const BLOCK_SIZE = 35;
const gameWidthBlocks = 10;
const gameHeightBlocks = 20;

function setup() {
    window.canvas = createCanvas(800, 800);
    window.canvas.parent('canvas');
    testShape = new Shape(createVector(9.5, 1.5));
    game = new Game(gameWidthBlocks, gameHeightBlocks);
    frameRate(10);
}

function draw() {
    background(100);
    game.draw();
    testShape.draw();
    testShape.moveDown();
}