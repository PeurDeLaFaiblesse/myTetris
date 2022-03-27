'use strict';

class Block {
    constructor(startingGridPos, color) {
        this.startingGridPos = startingGridPos;
        this.currentGridPos = startingGridPos;
        this.color = color;
    }

    draw() {
        push();
        let pos = this.currentGridPos;
        fill(this.color);
        stroke(0);
        strokeWeight(3);
        rect(pos.X*BLOCK_SIZE, pos.Y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        pop();
    }

    moveDown() {
        this.currentGridPos.y++;
    }
}