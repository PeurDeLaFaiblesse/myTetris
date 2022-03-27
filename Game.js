'use strict';

class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

    }

    draw() {
        push();
        {
            fill(240);
            stroke(200);
            strokeWeight(4);
            rect(2, 2, canvas.width - 4, canvas.height - 4);
        }
        pop();

        push();
        {

            //translate so that the game is in the center of the canvas
            let gameWidthInPixels = this.gameWidth * BLOCK_SIZE;
            let gameHeightInPixels = this.gameHeight * BLOCK_SIZE;
            translate((canvas.width - gameWidthInPixels) / 2, (canvas.height - gameHeightInPixels) / 2);

            if (this.timeSinceTetris >= 2) {
                this.checkForClearedLines();
                this.justTetrised = false;


            } else {
                this.timeSinceTetris++;
            }

            //draw the grid
            this.drawGrid();
            //draw the blocks which have already been placed
            // for (let block of this.deadBlocks) {
            //     block.draw(this.justTetrised,this.linesToBeCleared);
            // }


            //draw Tetris font
            textSize(30);
            textAlign(CENTER, CENTER);
            fill(100);
            stroke(0);
            strokeWeight(1);
            text(`Score: ${this.score}\t\t Tetris Rate: ${((this.totalTetrises / Math.max(1, this.totalLineClears)) * 100).toFixed(2)}%`, gameWidthInPixels / 2, -25);

            //draw the current shape
            // this.currentShape.draw();


            //draw a rectangle boarder around the grid
            push();
            {
                noFill();
                stroke(0);
                // if(this.justTetrised)
                //     stroke(255,0,0);
                strokeWeight(4);
                rect(0, 0, this.gameWidth * BLOCK_SIZE, this.gameHeight * BLOCK_SIZE);
            }
            pop();
        }
        pop();

    }

    drawGrid() {
        push();
        noStroke();

        fill(255);
        rect(0, 0, this.gameWidth * BLOCK_SIZE, this.gameHeight * BLOCK_SIZE);
        stroke(200);
        // if(this.justTetrised){
        //     stroke(255,0,0);
        // }
        strokeWeight(1);
        for (let i = 0; i < this.gameWidth; i++) {
            line(i * BLOCK_SIZE, 0, i * BLOCK_SIZE, this.gameHeight * BLOCK_SIZE);
        }
        for (let j = 0; j < this.gameHeight; j++) {
            line(0, j * BLOCK_SIZE, this.gameWidth * BLOCK_SIZE, j * BLOCK_SIZE);
        }
        pop();
    }
}