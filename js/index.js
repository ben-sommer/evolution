import { Individual } from './classes/Individual.js';
import { Population } from './classes/Population.js';

// Classes
// TODO: Population Class
// TODO: Generation Class
// TODO: Individual Class

// Utils
// TODO: Fitness function
// TODO: Mutation
// TODO: Crossover

let population = new Population(16);

population.display();

window.pop = population;

function go() {
    setInterval(() => {
        population.thinkAll();
        population.display();
    }, 1);
}

go();

// let test = new Population(1);
// test.individuals[0].game.board = [
//     [2, 2, 2, 2],
//     [2, 2, 2, 2],
//     [2, 2, 2, 2],
//     [2, 2, 2, 2]
// ]
// console.log(test.individuals[0].game.getAvailableMoves());
// test.display()