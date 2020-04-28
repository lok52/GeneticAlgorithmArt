var DNA_LENGTH = 125;
var MUTATION_RATE = 0.01;
var MUTATION_AMOUNT = 0.1;
var WORKING_CTX = document.getElementById('workingCanvas')
    .getContext('2d');
var REFERENCE_CTX = document.getElementById('inputCanvas')
    .getContext('2d');
var WORKING_SIZE = 75;
var WORKING_DATA = [];
var SELECTION_CUTOFF = 0.15;
export { DNA_LENGTH, MUTATION_RATE, MUTATION_AMOUNT, WORKING_CTX, WORKING_SIZE, REFERENCE_CTX, WORKING_DATA, SELECTION_CUTOFF };
