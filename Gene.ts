import {MUTATION_RATE, MUTATION_AMOUNT} from './constants.js'
class Gene {
  private readonly rgba: number[];
  // list of x, y values
  // ex: [x1, y1, x2, y2, x3, y3]
  private readonly points: number[];

  constructor(
    rgba: number[],
    points: number[]
  ) {
    this.rgba = rgba
    this.points = points
  }

  static randomGene(numOfPoints: number): Gene {
    let points: number[] = []
    for (let i = 0; i < numOfPoints; i++) {
      points.push(
        Math.random() + Math.random() - 0.5,
        Math.random() + Math.random() - 0.5
      )
    }
    return new Gene(
      [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.max(Math.random() * Math.random(), 0.2)
      ],
      points
    )
  }

  mutate(numOfPoints: number): Gene {
    let newRGBA = [...this.rgba]
    let newPoints = [...this.points]

    for (let i = 0; i < 4; i++) {
      if (Math.random() < MUTATION_RATE) {
        newRGBA[i] += Math.random() * MUTATION_AMOUNT * 2 - MUTATION_AMOUNT

        newRGBA[i] = Gene.boundCheck(newRGBA[i])
      }
    }

    for (let i = 0; i < numOfPoints * 2; i++){
      if (Math.random() < MUTATION_RATE) {
        newPoints[i] += Math.random() * MUTATION_AMOUNT * 2 - MUTATION_AMOUNT

        newPoints[i] = Gene.boundCheck(newPoints[i])
      }
    }

    return new Gene(
      newRGBA,
      newPoints
    )
  }

  private static boundCheck(val: number): number {
    if (val < 0)
      val = 0;

    if (val > 1)
      val = 1;

    return val
  }

  public getPoints() {
    return this.points
  }

  public getColor() {
    return this.rgba
  }
}

export default class GeneTriangle extends Gene {

  constructor(
    rgba: number[],
    points: number[]
  ) {
    super(rgba, points)
  }


}