'use strict';

class Shape {
    constructor( startingPos) {
        // this.shapeId = shapeId;
        this.currentGridPos = startingPos;
        this.blocks = [];
        this.setShapeIDs();
        for (let pos of this.squareShape.blockPositions) {
            this.blocks.push(new Block({X: startingPos.x + pos.x, Y: startingPos.y + pos.y}, this.squareShape.color));
        }
    }

    draw() {
        for(let block of this.blocks) {
            block.draw();
        }
    }

    moveDown() {
        for (let block of this.blocks) {
            block.moveDown();
        }
    }



    setShapeIDs() {
        this.squareShape = {
            blockPositions: [createVector(0, 0), createVector(0, 1), createVector(1, 0), createVector(1, 1)],
            rotationPoint: createVector(0.5, 0.5),
            color: color(255, 0, 0),
            name: 'Square'
        };
        this.lShape = {
            blockPositions: [createVector(0, 0), createVector(0, 1), createVector(0, 2), createVector(1, 2)],
            rotationPoint: createVector(0, 1),
            color: color(0, 255, 0),
            name: 'L'
        };
        this.reverseLShape = {
            blockPositions: [createVector(1, 0), createVector(1, 1), createVector(1, 2), createVector(0, 2)],
            rotationPoint: createVector(1, 1),
            color: color(0, 0, 255),
            name: 'ReverseL'
        };
        this.lineShape = {
            blockPositions: [createVector(0, 0), createVector(0, 1), createVector(0, 2), createVector(0, 3)],
            rotationPoint: createVector(0.5, 1.5),
            color: color(200, 200, 0),
            name: 'Line'
        };
        this.tShape = {
            blockPositions: [createVector(1, 0), createVector(0, 1), createVector(1, 1), createVector(1, 2)],
            rotationPoint: createVector(1, 1),
            color: color(80, 160, 240),
            name: 'T'
        };
        this.zShape = {
            blockPositions: [createVector(0, 0), createVector(1, 0), createVector(1, 1), createVector(2, 1)],
            rotationPoint: createVector(1, 1),
            color: color(0, 200, 200),
            name: 'Z'
        };
        this.sShape = {
            blockPositions: [createVector(0, 1), createVector(1, 1), createVector(1, 0), createVector(2, 0)],
            rotationPoint: createVector(1, 1),
            color: color(200, 0, 200),
            name: 'S'
        };
    }
}