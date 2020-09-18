import { NeuralNetwork } from '../libraries/NeuralNetwork.js';
import { Game } from '../libraries/game.js';

const moves = ["up", "right", "left", "down"];

export class Individual {
    constructor() {
        this.brain = new NeuralNetwork(16, 16, 4);
        // this.game = Math.random() > 0.5 ? new Game(["2", "4", "2", "4", "4", "8", "4", "8", "8", "4", "8", "2", "4", "2", "4", "8"].map(x => parseInt(x))) : new Game();
        this.game = new Game();
    };

    think() {
        if (!this.game.checkForLoss() && !this.game.checkForWin()) {
            let inputs = this.game.toArray().map(x => parseInt(x)/2048);
            let output = this.brain.predict(inputs);
            let bestMoveIndex = output.indexOf(output.sort().reverse()[0]);
            let bestMove = moves[bestMoveIndex];
            this.game.move(bestMove);
        };
    };
};