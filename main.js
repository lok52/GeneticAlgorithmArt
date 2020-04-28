import Population from './Population.js';
var OUTPUT_CTX = document.getElementById('outputCanvas')
    .getContext('2d');
var p;
var highestFitness = 0;
function iterate() {
    p.evolve();
    var fittest = p.getFittest();
    var currentFitness = (fittest.fitness * 100);
    if (currentFitness > highestFitness) {
        highestFitness = currentFitness;
        console.log(highestFitness);
        fittest.draw(OUTPUT_CTX, 200, 200);
    }
}
function start() {
    p = new Population(50);
    var clock = setInterval(iterate, 0);
}
var i_button = document.getElementById('start');
i_button.addEventListener('click', start);
