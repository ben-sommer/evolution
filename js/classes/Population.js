import { Individual } from './Individual.js';

export class Population {
    constructor(size = 100) {
        this.individuals = [];
        for (let i=0;i<size;i++) {
            let individual = new Individual();
            this.individuals.push(individual);
        }
    };

    thinkAll() {
        let lossesThisRound = []
        this.individuals.forEach((x, i) => {
            x.think();
            if (x.game.checkForLoss()) lossesThisRound.push(i);
        });
        let newIndividuals = this.individuals.filter((x, i) => !lossesThisRound.includes(i));
        this.individuals = newIndividuals;
    };

    get size() {
        return this.individuals.length;
    };
};