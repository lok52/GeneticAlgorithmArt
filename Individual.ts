import {DNA_LENGTH, WORKING_CTX, WORKING_SIZE, WORKING_DATA} from './constants.js'
import GeneT from './Gene.js'


function dotProduct(vecA: Uint8ClampedArray, vecB: Uint8ClampedArray) {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

function magnitude(vec: Uint8ClampedArray) {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(vecA: Uint8ClampedArray, vecB: Uint8ClampedArray) {
  return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

export default class Individual {
  private readonly dna: GeneT[];
  fitness: number;

  constructor(dna: GeneT[]) {
    this.dna = dna
    this.fitness = 0

    this.calcFitness()
  }

  static mate(mother: Individual, father: Individual): Individual {
    let dna: GeneT[] = [];
    for (let i = 0; i < DNA_LENGTH; i++) {

      let inheritedGene: GeneT;
      if (Math.random() < 0.5) {
        inheritedGene = mother.dna[i]
      } else {
        inheritedGene = father.dna[i]
      }

      const mutatedGene = inheritedGene.mutate(3)
      dna.push(mutatedGene)
    }

    return new Individual(dna)
  }

  static randomIndividual(): Individual {
    let dna: GeneT[] = []
    for (let g = 0; g < DNA_LENGTH; g++) {
      dna.push(GeneT.randomGene(3))
    }
    return new Individual(dna)
  }

  calcFitness() {
    this.draw(WORKING_CTX, WORKING_SIZE, WORKING_SIZE)

    const imageData = WORKING_CTX.getImageData(
      0,
      0,
      WORKING_SIZE,
      WORKING_SIZE).data;

    this.fitness = cosineSimilarity(imageData, Uint8ClampedArray.from(WORKING_DATA))

    // let diff = 0;
    //
    // for (let p = 0; p < WORKING_SIZE * WORKING_SIZE * 4; p++) {
    //   const dp = imageData[p] - WORKING_DATA[p];
    //   diff += dp * dp;
    // }
    //
    // this.fitness = 1 - diff / (WORKING_SIZE * WORKING_SIZE * 4 * 256 * 256);

  }

  draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    for (let gene of this.dna) {
      ctx.beginPath()
      const points = gene.getPoints()
      const color = gene.getColor()
      const numP = 3
      ctx.moveTo(points[0] * w, points[1] * h)

      for (let i = 1; i < numP; i++) {
        ctx.lineTo(
          points[i * 2] * w,
          points[i * 2 + 1] * h)
      }

      ctx.closePath()

      ctx.fillStyle = 'rgba(' +
        ((color[0] * 255) >> 0) + ',' + // R - int [0,255]
        ((color[1] * 255) >> 0) + ',' + // G - int [0,255]
        ((color[2] * 255) >> 0) + ',' + // B - int [0,255]
        color[3] + ')'  // A - float [0,1]
      ctx.fill();

    }
  }
}