// // import Colores from "./utils/utilsSketchs.js";
// import { ColoresA, ColoresB, ColoresC } from "./utils/utilsSketchs.js";
// const p5SketchCurtain = (p) => {
//     var seed = Math.random() * 1000;
//     var margin;
//     let colorbg = "e3d7a3".split("-").map((a) => "#" + a + "80");
//     let colorbg2 = "f8f1d3".split("-").map((a) => "#" + a + "80");
//     let filter, grad;
//     var xOff, yOff;
//     var color1, color2;

//     let canvas;
//     p.setup = () => {   
//       let renderTarget = p._userNode;
//       let computedStyle = getComputedStyle(renderTarget);
//       let width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
//       let height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
//       canvas = p.createCanvas(width, height);
//       p.randomSeed(seed);
//          color1 = p.random(ColoresA);
//          color2 = p.random(ColoresB);
//       xOff = -100;
//       margin = 10;
//       p.background(ColoresC[1]);
//       //addWin();
//       filter = new makeFilter();
//     }
//      p.draw = () => {
//     	p.randomSeed(seed);
// 	    // p.background(colorbg);
//         p.background(0);
// 	    p.fill(0);
// 	    grad = p.drawingContext.createLinearGradient(0, 0, 0, p.height);
// 	    grad.addColorStop(0, colorbg);
// 	    grad.addColorStop(1, colorbg2);
// 	    p.drawingContext.fillStyle = grad;
// 	    p.noStroke();
// 	    p.rectMode(p.CORNER);
// 	    p.rect(0, 0, p.width, p.height);
    
// 	    //mountain and river
// 	    p.noStroke();
// 	    let mountain_h = p.height / p.int(p.random(10, 20));
// 	    for (let n = 0; n < p.height; n += mountain_h) {
// 		p.push();
// 		p.translate(0, p.height - n);

// 		if (n > p.height / 3) {
// 			// mountain
// 			grad = p.drawingContext.createLinearGradient(0, -mountain_h, 0, mountain_h);
// 			grad.addColorStop(0, p.random(color1));
// 			grad.addColorStop(1, p.random(color2));
// 			p.drawingContext.fillStyle = grad;
// 			p.beginShape();
// 			p.curveVertex(-n, n)
// 			for (let i = xOff; i < p.width + 210; i += 220) {
// 				let pp = p.random(-100, 100);
// 				p.curveVertex(i, Math.sin(i) * pp)
// 			}
// 			p.curveVertex(p.width + n, n)
// 			p.endShape(p.CLOSE);
// 		} else {
// 			//river
// 			grad = p.drawingContext.createLinearGradient(0, -mountain_h, 0, mountain_h);
//             grad.addColorStop(0, p.random(ColoresC[2]));
//             grad.addColorStop(1, p.random(ColoresC[3]));
// 			p.drawingContext.fillStyle = grad;
// 			p.beginShape();
// 			p.curveVertex(-n, n)
// 			for (let i = xOff; i < p.width - xOff; i += 20) {
// 				let pp = p.random(-1, 1);
// 				p.curveVertex(i, Math.cos(i) * pp * p.random(20));
// 			}
// 			p.curveVertex(p.width + n, n)
// 			p.endShape(p.CLOSE);
// 		}
// 		p.pop();
// 	}

// 	//frame
// 	p.noFill();
// 	let colors_frames = "be132d-980f24-af011c-800000-730d0d".split("-").map((a) => "#" + a);
// 	p.stroke(p.random(colors_frames));
// 	p.strokeWeight(margin * 1);
// 	p.rectMode(p.CENTER);
// 	p.rect(p.width / 2, p.height / 2, p.width, p.height);
// 	p.image(p.overAllTexture, 0, 0);
// 	// noLoop();
// }

// function makeFilter() {
// 	p.colorMode(p.HSB, 360, 100, 100, 100);
// 	p.drawingContext.shadowColor = p.color(48, 33, 76, 10);
// 	p.overAllTexture = p.createGraphics(p.width, p.height);
// 	p.overAllTexture.loadPixels();
// 	for (var i = 0; i < p.width; i++) {
// 		for (var j = 0; j < p.heigh; j++) {
// 			p.overAllTexture.set(
// 				i,
// 				j,
// 				p.color(
// 					48,
// 					13,
// 					86,
// 					p.noise(i / 3, j / 3, (i * j) / 10) * p.random(55, 75)
// 				)
// 			);
// 		}
// 	}
// 	p.overAllTexture.updatePixels();
// }
// }
// export default p5SketchCurtain;

import { ColoresA, ColoresB, ColoresC, ColoresNocturnos} from "./utils/utilsSketchs.js";
const p5SketchCurtain = (p) => {
    var seed = Math.random() * 1000;
    var mySize, margin;
    let colorbg = "e3d7a3".split("-").map((a) => "#" + a + "80");
    let colorbg2 = "f8f1d3".split("-").map((a) => "#" + a + "80");
   // "1a237e-283593-3949ab-5c6bc0-7986cb".split("-").map((a) => "#" + a), 
    // let colorbg2 = "1a237e".split("-").map((a) => "#" + a + "10");
    // let colorbg = "3949ab".split("-").map((a) => "#" + a + "10");
    let filter, grad;
    var xOff, yOff;
    var color1, color2;
    let canvas;
    let riverLayers = 12; // Número de capas de río
    let mountainLayers = 3;
    p.setup = () => {   
      let renderTarget = p._userNode;
      let computedStyle = getComputedStyle(renderTarget);
      let width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
      let height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
      canvas = p.createCanvas(width, height);
      p.randomSeed(seed);
    //   color1 = p.random([colorsA, colorsB, colorsC, colorsD, colorsE]);
    //   color2 = p.random([colorsA2, colorsB2, colorsC2, colorsD2, colorsE2]);
    color1 = p.random(ColoresNocturnos);
    color2 = p.random(ColoresB);
      xOff = -100;
      margin = 10;
    //   p.background(colorbgA);
    p.background(ColoresC[1]);
      //addWin();
      filter = new makeFilter();
    }
     p.draw = () => {
    	p.randomSeed(seed);
	    // p.background(colorbg);
        p.background(0);
	    p.fill(0);
	    grad = p.drawingContext.createLinearGradient(0, 0, 0, p.height);
	    grad.addColorStop(0, colorbg);
	    grad.addColorStop(1, colorbg2);
	    p.drawingContext.fillStyle = grad;
	    p.noStroke();
	    p.rectMode(p.CORNER);
	    p.rect(0, 0, p.width, p.height);
        drawRiver(riverLayers);

        // Dibujar montañas
        drawMountains(mountainLayers);

	}
    function drawRiver(layers) {
        let riverHeight = p.height / 4; // El río ocupa el tercio inferior de la pantalla
        let layerHeight = riverHeight / layers;

        for (let n = 0; n < layers; n++) {
            p.push();
            p.translate(0, p.height - n * layerHeight);

            grad = p.drawingContext.createLinearGradient(0, -layerHeight, 0, layerHeight);
            grad.addColorStop(0, p.random(ColoresC[2]));
            grad.addColorStop(1, p.random(ColoresC[3]));
            p.drawingContext.fillStyle = grad;

            p.beginShape();
            p.curveVertex(-layerHeight, layerHeight);
            for (let i = xOff; i < p.width - xOff; i += 40) { // Ajusta este valor para más o menos olas
                let pp = p.random(-1, 1);
                p.curveVertex(i, Math.cos(i) * pp * p.random(25)); // Ajusta este valor para olas más o menos altas
            }
            p.curveVertex(p.width + layerHeight, layerHeight);
            p.endShape(p.CLOSE);

            p.pop();
        }
    }

    function drawMountains(layers) {
        let mountainHeight = p.height/3; // Las montañas ocupan los dos tercios superiores
        let layerHeight = mountainHeight / layers;

        for (let n = 0; n < layers; n++) {
            p.push();
            p.translate(0, p.height - riverLayers * (p.height / 25) - n * layerHeight);

            grad = p.drawingContext.createLinearGradient(0, -layerHeight, 0, layerHeight);
            grad.addColorStop(0, p.random(color1));
            grad.addColorStop(1, p.random(color2));
            p.drawingContext.fillStyle = grad;

            p.beginShape();
            p.curveVertex(-layerHeight, layerHeight);
            for (let i = xOff; i < p.width + 210; i += 220) {
                let pp = p.random(-200, 200);
                p.curveVertex(i, Math.sin(i) * pp);
            }
            p.curveVertex(p.width + layerHeight, layerHeight);
            p.endShape(p.CLOSE);

            p.pop();
        }
     
	// p.noFill();
	// let colors_frames = "be132d-980f24-af011c-800000-730d0d".split("-").map((a) => "#" + a);
	// p.stroke(p.random(colors_frames));
	// p.strokeWeight(margin * 1);
	// p.rectMode(p.CENTER);
	// p.rect(p.width / 2, p.height / 2, p.width, p.height);
	// p.image(p.overAllTexture, 0, 0);
	// // noLoop();
    }
function makeFilter() {
	p.colorMode(p.HSB, 360, 100, 100, 100);
	p.drawingContext.shadowColor = p.color(48, 33, 76, 10);
	p.overAllTexture = p.createGraphics(p.width, p.height);
	p.overAllTexture.loadPixels();
	for (var i = 0; i < p.width; i++) {
		for (var j = 0; j < p.heigh; j++) {
			p.overAllTexture.set(i,j,p.color(48,13,86,p.noise(i / 3, j / 3, (i * j) / 10) * p.random(55, 75)));
		}
	}
	p.overAllTexture.updatePixels();
  }
}
export default p5SketchCurtain;