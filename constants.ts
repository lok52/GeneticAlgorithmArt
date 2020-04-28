const DNA_LENGTH: number = 125
const MUTATION_RATE: number = 0.01
const MUTATION_AMOUNT: number = 0.1
const WORKING_CTX =
  (<HTMLCanvasElement>document.getElementById('workingCanvas'))
  .getContext('2d')
const REFERENCE_CTX =
  (<HTMLCanvasElement>document.getElementById('inputCanvas'))
  .getContext('2d')
const WORKING_SIZE = 75
const WORKING_DATA: number[] = []
const SELECTION_CUTOFF = 0.15
export {
  DNA_LENGTH,
  MUTATION_RATE,
  MUTATION_AMOUNT,
  WORKING_CTX,
  WORKING_SIZE,
  REFERENCE_CTX,
  WORKING_DATA,
  SELECTION_CUTOFF
}
