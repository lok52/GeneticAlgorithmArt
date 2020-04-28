var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { MUTATION_RATE, MUTATION_AMOUNT } from './constants.js';
var Gene = (function () {
    function Gene(rgba, points) {
        this.rgba = rgba;
        this.points = points;
    }
    Gene.randomGene = function (numOfPoints) {
        var points = [];
        for (var i = 0; i < numOfPoints; i++) {
            points.push(Math.random() + Math.random() - 0.5, Math.random() + Math.random() - 0.5);
        }
        return new Gene([
            Math.random(),
            Math.random(),
            Math.random(),
            Math.max(Math.random() * Math.random(), 0.2)
        ], points);
    };
    Gene.prototype.mutate = function (numOfPoints) {
        var newRGBA = __spreadArrays(this.rgba);
        var newPoints = __spreadArrays(this.points);
        for (var i = 0; i < 4; i++) {
            if (Math.random() < MUTATION_RATE) {
                newRGBA[i] += Math.random() * MUTATION_AMOUNT * 2 - MUTATION_AMOUNT;
                newRGBA[i] = Gene.boundCheck(newRGBA[i]);
            }
        }
        for (var i = 0; i < numOfPoints * 2; i++) {
            if (Math.random() < MUTATION_RATE) {
                newPoints[i] += Math.random() * MUTATION_AMOUNT * 2 - MUTATION_AMOUNT;
                newPoints[i] = Gene.boundCheck(newPoints[i]);
            }
        }
        return new Gene(newRGBA, newPoints);
    };
    Gene.boundCheck = function (val) {
        if (val < 0)
            val = 0;
        if (val > 1)
            val = 1;
        return val;
    };
    Gene.prototype.getPoints = function () {
        return this.points;
    };
    Gene.prototype.getColor = function () {
        return this.rgba;
    };
    return Gene;
}());
var GeneTriangle = (function (_super) {
    __extends(GeneTriangle, _super);
    function GeneTriangle(rgba, points) {
        return _super.call(this, rgba, points) || this;
    }
    return GeneTriangle;
}(Gene));
export default GeneTriangle;
