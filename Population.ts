import Individual from "./Individual.js";
import {SELECTION_CUTOFF} from './constants.js'

export default class Population {
  private artists: Individual[];

  constructor(size: number) {
    this.artists = [];

    for (let i = 0; i < size; i++)
      this.artists.push(Individual.randomIndividual());
  }

  evolve() {
    const size = this.artists.length;
    let offspring: Individual[] = [];

    let selectCount = Math.floor(this.artists.length * SELECTION_CUTOFF);

    let randCount = Math.ceil(1 / SELECTION_CUTOFF);

    this.artists = this.artists.sort(function (a, b) {
      return b.fitness - a.fitness;
    });

    for (let i = 0; i < selectCount; i++) {

      for (let j = 0; j < randCount; j++) {
        let randIndividual = i;

        // while (randIndividual == i)
          randIndividual = (Math.random() * selectCount) >> 0;

        offspring.push(Individual.mate(
          this.artists[i],
          this.artists[randIndividual]
        ))
      }
    }

    // TODO maybe some error. Track len of this
    this.artists = offspring;

    this.artists.length = size;

  }

  getFittest(): Individual {
    return this.artists.sort(function (a, b) {
      return b.fitness - a.fitness;
    })[0];
  }
}
