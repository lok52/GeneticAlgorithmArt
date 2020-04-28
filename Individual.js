import { DNA_LENGTH, WORKING_CTX, WORKING_SIZE, WORKING_DATA } from './constants.js';
import GeneT from './Gene.js';
function dotProduct(vecA, vecB) {
    var product = 0;
    for (var i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
    }
    return product;
}
function magnitude(vec) {
    var sum = 0;
    for (var i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}
function cosineSimilarity(vecA, vecB) {
    return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}
var Individual = (function () {
    function Individual(dna) {
        this.dna = dna;
        this.fitness = 0;
        this.calcFitness();
    }
    Individual.mate = function (mother, father) {
        var dna = [];
        for (var i = 0; i < DNA_LENGTH; i++) {
            var inheritedGene = void 0;
            if (Math.random() < 0.5) {
                inheritedGene = mother.dna[i];
            }
            else {
                inheritedGene = father.dna[i];
            }
            var mutatedGene = inheritedGene.mutate(3);
            dna.push(mutatedGene);
        }
        return new Individual(dna);
    };
    Individual.randomIndividual = function () {
        var dna = [];
        for (var g = 0; g < DNA_LENGTH; g++) {
            dna.push(GeneT.randomGene(3));
        }
        return new Individual(dna);
    };
    Individual.prototype.calcFitness = function () {
        this.draw(WORKING_CTX, WORKING_SIZE, WORKING_SIZE);
        var imageData = WORKING_CTX.getImageData(0, 0, WORKING_SIZE, WORKING_SIZE).data;
        var diff = 0;
        for (var p = 0; p < WORKING_SIZE * WORKING_SIZE * 4; p++) {
            var dp = imageData[p] - WORKING_DATA[p];
            diff += dp * dp;
        }
        this.fitness = 1 - diff / (WORKING_SIZE * WORKING_SIZE * 4 * 256 * 256);
    };
    Individual.prototype.draw = function (ctx, w, h) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        for (var _i = 0, _a = this.dna; _i < _a.length; _i++) {
            var gene = _a[_i];
            ctx.beginPath();
            var points = gene.getPoints();
            var color = gene.getColor();
            var numP = 3;
            ctx.moveTo(points[0] * w, points[1] * h);
            for (var i = 1; i < numP; i++) {
                ctx.lineTo(points[i * 2] * w, points[i * 2 + 1] * h);
            }
            ctx.closePath();
            ctx.fillStyle = 'rgba(' +
                ((color[0] * 255) >> 0) + ',' +
                ((color[1] * 255) >> 0) + ',' +
                ((color[2] * 255) >> 0) + ',' +
                color[3] + ')';
            ctx.fill();
        }
    };
    return Individual;
}());
export default Individual;
