import { Individual } from './Individual.js';
import { chunk } from '../utils.js';

export class Population {
    constructor(size = 100) {
        this.individuals = [];
        this.initialSize = size;
        this.generation = 0;
        for (let i=0;i<size;i++) {
            let individual = new Individual();
            this.individuals.push(individual);
        };
    };

    thinkAll() {
        this.individuals.forEach((x, i) => {
            x.think();
            // if (i == 4) {
            //     console.log(x.lastMove);
            // }
        });
        if (this.activeSize == 0) {
            this.nextGeneration();
        };
    };

    display() {
        document.getElementById("output").innerHTML = this.individuals.map(x => `
            <div class="board board-${x.inactive ? "inactive" : "active"}">
                ${chunk(x.game.toArray(), 4).map(y => `
                    <div class="row">
                        ${y.map(z => `
                            <div class="column column-${z}">
                                ${z}
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `).join('');
    };

    nextGeneration() {
        this.generation++;
        console.log("-- Generation:", this.generation, ("-".repeat(25-this.generation.toString().length)));
        let previousGenHighestScore = this.individuals.sort((a, b) => a.fitness - b.fitness).reverse()[0].score;
        let previousGenAverageScore = this.individuals.map(x => x.score).reduce((a, b) => a + b, 0) / this.initialSize;
        let previousGenLowestScore = this.individuals.sort((a, b) => a.fitness - b.fitness)[0].score;
        console.log("Previous Generation High:   ", previousGenHighestScore);
        console.log("Previous Generation Average:", previousGenAverageScore);
        console.log("Previous Generation Low:    ", previousGenLowestScore);
        console.log("-----------------------------------------")

        console.log("");

        let newIndividuals = [];

        newIndividuals = this.pickIndividuals(this.initialSize, 0.2);

        this.individuals = newIndividuals;
    };

    pickIndividuals(i, randomPercentage) {
        let sortedIndividuals = this.individuals.sort((a, b) => a.fitness - b.fitness).reverse();
        let inactiveIndividuals = this.individuals.filter(x => x.inactiveAge > 0);
        const highestFitness = sortedIndividuals[0].fitness;
        const normalizingFactor = 1 / highestFitness;
        let half_length = sortedIndividuals.length - Math.floor(sortedIndividuals.length * randomPercentage);
        if (half_length > (sortedIndividuals.length - inactiveIndividuals.length)) {
            half_length = sortedIndividuals.length - inactiveIndividuals.length
        }
        let original = [];
        for (let x = 0; x < half_length; x++) {
            let index = 0;

            let r = Math.random();

            while (r > 0 && r < sortedIndividuals.length) {
                r -= (sortedIndividuals[index].fitness * normalizingFactor);
                index += 1;
            };

            const newIndividual = new Individual(sortedIndividuals[index].brain);
            newIndividual.mutate();
            original.push(newIndividual);
        }
        const remaining = Math.floor(sortedIndividuals.length - original.length);
        let random = [];
        for (let x = 0; x < remaining; x++) {
            random.push(new Individual());
        };

        return original.concat(random)
    };

    get size() {
        return this.individuals.length;
    };

    get activeSize() {
        return this.individuals.filter(x => !x.inactive).length;
    };

    get inactiveSize() {
        return this.individuals.filter(x => x.inactive).length;
    };
};