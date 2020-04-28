import {WORKING_SIZE, REFERENCE_CTX, WORKING_DATA} from './constants.js'

declare function require(path: string): any;

let IMAGE: HTMLImageElement = new Image()

IMAGE.setAttribute('crossOrigin', '*');

// place your image here
IMAGE.src = 'http://localhost:8081/unnamed.jpg'

IMAGE.onload = () => {
  const CANVAS_INPUT = <HTMLCanvasElement>document.getElementById('inputCanvas');
  const CONTEXT_INPUT = CANVAS_INPUT.getContext('2d');

  const IWIDTH: number = IMAGE.width;
  const IHEIGHT: number = IMAGE.height;

  CANVAS_INPUT.setAttribute('width', WORKING_SIZE.toString());
  CANVAS_INPUT.setAttribute('height', WORKING_SIZE.toString());

  CONTEXT_INPUT.drawImage(
    IMAGE,
    0, 0, IWIDTH, IHEIGHT,
    0, 0, WORKING_SIZE, WORKING_SIZE
  );

  const IMAGE_DATA = REFERENCE_CTX.getImageData(0, 0,
    WORKING_SIZE,
    WORKING_SIZE).data;

  const p: number = WORKING_SIZE * WORKING_SIZE * 4;

  for (let i = 0; i < p; i++) {
    WORKING_DATA[i] = IMAGE_DATA[i];
  }

  CANVAS_INPUT.setAttribute('width', IWIDTH.toString());
  CANVAS_INPUT.setAttribute('height', IHEIGHT.toString());
  CONTEXT_INPUT.drawImage(IMAGE, 0, 0, IWIDTH, IHEIGHT);
}
