import Individual from "./Individual.js";
import { SELECTION_CUTOFF } from './constants.js';
var Population = (function () {
    function Population(size) {
        this.artists = [];
        for (var i = 0; i < size; i++)
            this.artists.push(Individual.randomIndividual());
    }
    Population.prototype.evolve = function () {
        var size = this.artists.length;
        var offspring = [];
        var selectCount = Math.floor(this.artists.length * SELECTION_CUTOFF);
        var randCount = Math.ceil(1 / SELECTION_CUTOFF);
        this.artists = this.artists.sort(function (a, b) {
            return b.fitness - a.fitness;
        });
        for (var i = 0; i < selectCount; i++) {
            for (var j = 0; j < randCount; j++) {
                var randIndividual = i;
                randIndividual = (Math.random() * selectCount) >> 0;
                offspring.push(Individual.mate(this.artists[i], this.artists[randIndividual]));
            }
        }
        this.artists = offspring;
        this.artists.length = size;
    };
    Population.prototype.getFittest = function () {
        return this.artists.sort(function (a, b) {
            return b.fitness - a.fitness;
        })[0];
    };
    return Population;
}());
export default Population;
