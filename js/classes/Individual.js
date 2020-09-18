import { NeuralNetwork } from '../libraries/NeuralNetwork.js';
import { Game } from '../game.js';

const moves = ["up", "right", "left", "down"];

export class Individual {
    constructor() {
        this.brain = new NeuralNetwork(16, 16, 4);
        this.game = new Game();
    };

    think() {
        let inputs = this.game.toArray().map(x => parseInt(x)/2048);
        let output = this.brain.predict(inputs);
        let bestMoveIndex = output.indexOf(output.sort().reverse()[0]);
        let bestMove = moves[bestMoveIndex];
        this.game.move(bestMove);
    };
};