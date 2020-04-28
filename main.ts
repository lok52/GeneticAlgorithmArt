import Population from './Population.js'

const OUTPUT_CTX =
  (<HTMLCanvasElement>document.getElementById('outputCanvas'))
  .getContext('2d')


let p: Population;
let highestFitness = 0;

function iterate() {
  p.evolve()
  const fittest = p.getFittest();
  const currentFitness = (fittest.fitness * 100);

  if (currentFitness > highestFitness) {
    highestFitness = currentFitness;
    console.log(highestFitness)
    fittest.draw(OUTPUT_CTX, 200, 200);
  }
}

function start() {
  p = new Population(50)
  setInterval(iterate, 0)
}

const i_button = document.getElementById('start')
i_button.addEventListener('click', start)
