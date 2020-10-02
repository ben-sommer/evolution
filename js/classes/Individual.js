import { NeuralNetwork } from '../libraries/NeuralNetwork.js';
import { Game } from '../libraries/game.js';
import { arrayEquals, mutate } from '../utils.js';

const moves = ["up", "right", "left", "down"];

export class Individual {
    constructor(brain) {
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(9, 8, 4);
        };
        
        this.game = new Game();
        this.inactive = false;
        this.previousState = [];
        this.lastMove = "";
        this.inactiveAge = 0;
    };

    think() {
        if (!this.game.checkForLoss() && !this.game.checkForWin()) {
            // const inputs = this.game.toArray().map(x => parseInt(x == 0 ? 1 : x) / 2048);

            let inputs = [];

            moves.forEach(x => {
                let newBoard = new Game(this.game.toArray().map(y => parseInt(y)));
                newBoard.move(x);
                inputs.push(newBoard.toArray().filter(x => x == "0").length/16);
                inputs.push(parseInt(newBoard.toArray().sort().reverse()[0])/2048);
            });

            inputs.push(parseInt(this.game.toArray().sort().reverse()[0]) / 2048);
            
            const output = this.brain.predict(inputs);

            const possibleMoves = output.map((x, i) => ({ index: i, value: x })).sort((a, b) => a.value - b.value).reverse();
            const chosenIndex = possibleMoves[0].index;

            const chosenMove = chosenIndex == 0 ? "up" : chosenIndex == 1 ? "right" : chosenIndex == 2 ? "down" : chosenIndex == 3 ? "left" : "down";

            this.game.move(chosenMove);
            this.lastMove = chosenMove;
            if (arrayEquals(this.game.toArray(), this.previousState)) {
                this.inactive = true;
                this.inactiveAge++;
            };
            this.previousState = this.game.toArray();
        } else {
            this.inactive = true;
        };
    };

    mutate() {
        this.brain.mutate(mutate);
    };

    get fitness() {
        const score = this.game.score == 0 ? 1 : this.game.score;
        let multiplier = 1;
        if (this.game.toArray()[0] == this.game.toArray().sort().reverse()[0]) multiplier *= 2;
        return (multiplier * score) ** 1.5;
    };

    get score() {
        const score = this.game.score == 0 ? 1 : this.game.score;
        return score;
    };
};