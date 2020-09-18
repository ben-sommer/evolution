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
        this.individuals.forEach(x => {
            x.think();
        });
    };
};