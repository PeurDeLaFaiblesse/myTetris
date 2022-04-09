'use strict';

class Population {
    constructor(size) {
        this.players = [];
        this.generation = 1;
        this.fitnessSum = 0;
        this.currentBatchNumber = 0;
        for (let i = 0; i < size; i++) {
            let player = new Player(i === 0);
            this.players.push(player);
        }
    }

    show() {
        push();

        push();
        this.players[this.currentBatchNumber].show();
        pop();

        textSize(30);
        fill(100);
        stroke(100);
        textAlign(CENTER,CENTER);
        text("Gen: " + this.generation + "\t\t Batch: " + (this.currentBatchNumber +1) + "\t\tAverage Fitness: " + (this.fitnessSum/this.players.length).toFixed(2),canvas.width/2, 780 );

        this.players[this.currentBatchNumber].brain.writeMultipliers(600, 300);
        if (this.bestPlayer) {     
            textSize(20);       
            text(`Best player multipliers:`, 110, 300);
            this.bestPlayer.brain.writeMultipliers(15, 340)
        }
        pop();

        
    }

    update() {
        this.players[this.currentBatchNumber].update();
        if (this.players[this.currentBatchNumber].isDead) {
            this.currentBatchNumber++;
        }
    }

    naturalSelection() {
        let nextGen = [];
        this.calculatePlayerFitnesses();
        this.calculateFitnessSum();
        //make sure best player makes it to the next gen
        this.setBestPlayer();
        let parent = this.bestPlayer;
        let child = parent.clone();
        child.brain.mutate();
        nextGen.push(child);

        while (nextGen.length < this.players.length) {
            parent = this.selectPlayer();
            child = parent.clone();
            child.brain.mutate();
            nextGen.push(child);
        }


        this.players = nextGen;
        this.generation++;
        this.currentBatchNumber = 0;
    }

    setBestPlayer() {
        this.bestPlayer = this.players[0];
        for (let player of this.players) {
            if (player.fitness > this.bestPlayer.fitness) {
                this.bestPlayer = player;
            }
        }
    }

    //assuming that the fitness sum has been calculated
    selectPlayer() {
        let randomNumber = random(this.fitnessSum);
        let runningSum = 0;
        for (let player of this.players) {
            runningSum += player.fitness;
            if (runningSum > randomNumber) {
                return player;
            }
        }

        return null;//somethings wrong
    }

    calculatePlayerFitnesses() {
        for (let player of this.players) {
            player.calculateFitness();
        }
    }

    calculateFitnessSum() {
        this.fitnessSum = 0;
        for (let player of this.players) {
            this.fitnessSum += player.fitness;
        }
    }

    areAllPlayersDead() {
        for (let player of this.players) {
            if (!player.isDead) {
                return false;
            }
        }
        return true;
    }
}