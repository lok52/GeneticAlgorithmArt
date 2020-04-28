import { WORKING_SIZE, REFERENCE_CTX, WORKING_DATA } from './constants.js';
var IMAGE = new Image();
IMAGE.setAttribute('crossOrigin', '*');
IMAGE.src = 'http://localhost:8081/unnamed.jpg';
IMAGE.onload = function () {
    var CANVAS_INPUT = document.getElementById('inputCanvas');
    var CONTEXT_INPUT = CANVAS_INPUT.getContext('2d');
    var IWIDTH = IMAGE.width;
    var IHEIGHT = IMAGE.height;
    CANVAS_INPUT.setAttribute('width', WORKING_SIZE.toString());
    CANVAS_INPUT.setAttribute('height', WORKING_SIZE.toString());
    CONTEXT_INPUT.drawImage(IMAGE, 0, 0, IWIDTH, IHEIGHT, 0, 0, WORKING_SIZE, WORKING_SIZE);
    var IMAGE_DATA = REFERENCE_CTX.getImageData(0, 0, WORKING_SIZE, WORKING_SIZE).data;
    var p = WORKING_SIZE * WORKING_SIZE * 4;
    for (var i = 0; i < p; i++) {
        WORKING_DATA[i] = IMAGE_DATA[i];
    }
    CANVAS_INPUT.setAttribute('width', IWIDTH.toString());
    CANVAS_INPUT.setAttribute('height', IHEIGHT.toString());
    CONTEXT_INPUT.drawImage(IMAGE, 0, 0, IWIDTH, IHEIGHT);
};
