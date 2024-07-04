import p5 from "p5";
import {  timeToMinutes, latinAlphabet } from "./utils/utilsSketchs";

import fnt5 from "../assets/images/fnt5.ttf";
import fnt7 from "../assets/images/EraserRegular.ttf";
const p5SketchTeacher = (p , theme, weatherData) => {
    let canvas;
    let body_size = 70;
    let b;
    let t = 0;
    let tension = 0.01;
    const gravity = 0.75;
    const friction = 0.96;
    const subStep = 8;
    const ballAmount = 8;
    const minRadius = 5;
    const maxRadius = 20;
    const speedLimit = 3.4;
    const forceMultiplier = 40;
    const ballArray = [];
    //Función Zeta de Riemann,Identidad de Euler,Integral Gaussiana,Límite Definitorio de e (Número de Euler),
    //Fórmula Integral de Cauchy para Funciones Analíticas
    let letra = "";  
    let pg;
    let fn;
    let fn5;
    let myFont;
    let xx;
    let yy;
    let stp = 5;
    let sz = 0.8;
    let clickCount = 0;
    let maxClicks = 5;
    let alphaValue;
    let cnt = 0;
    let angDist = 0;
    let isActive = false;
    let lighter, col;
    let ballCol, backCol, bodyCol, textCol, frameColor, speedBodyReact, legColor;
    let day;
    let onWeather = false;
    let isDayCity;
    let textFun = false;
    let colorFromTemp;
    let language;
    let desckCol;
    let showBalls=true;
    const updateTheme = (newTheme) => {
      if(newTheme === 'dark'){
         lighter = 1;
         day = false;
         col = 1.2;
         speedBodyReact = 0.01;
         legColor = p.color(255, 100, 0, 180);
         backCol = p.color(0,0,0);
         ballCol = p.color(255,250);
         bodyCol = p.color(220,220,220);
         frameColor = p.color(255, 220);
         textCol = p.color(255,255,5);
         desckCol = p.color(12,12,34,25);
      }else if(newTheme === 'light'){
         lighter = 0.05;
         day = true;
         col = 0.3;
         speedBodyReact = 0.03;
         legColor = p.color(195, 80, 120, 180);
         backCol = p.color(240,250,236);
         ballCol = p.color(120,114,179,250);
         bodyCol = p.color(20,20,10,120);
         frameColor = p.color(55,44,35, 220);
         textCol = p.color(55,35,105);
         desckCol = p.color(120,102,134,25);
      }
  };
  function extractWords(texto) {
    //expresión regular para separar las palabras basadas en la letra mayúscula inicial
    const palabras = texto.match(/\p{Lu}\p{Ll}*/gu) || [];
    const limite = Math.min(20, palabras.length);
    const primerasVeinte = palabras.slice(0, limite);
    return primerasVeinte.join(' ');
  }
  const updateWeatherData = (weatherData) => {
    if (weatherData) {
        onWeather = true;
        console.log(weatherData);
        const cloudsAll = weatherData.clouds.all;//0,100
        const localTime = weatherData.localTime;
        const temp = weatherData.main.temp;
        const tempMin = weatherData.main.temp_min;
        const tempMax = weatherData.main.temp_max;
        const humidity = weatherData.main.humidity;//79
        const pressure = weatherData.main.pressure;//1016
        // const rainH = weatherData.rain.1h;//0.75
        const windSpeed = weatherData.wind.speed;//4.25
        const windAng = weatherData.wind.deg;//190
        const currentTime = timeToMinutes(localTime);
        const sunriseTime = timeToMinutes(weatherData.sunriseHour);
        const sunsetTime = timeToMinutes(weatherData.sunsetHour);
        colorFromTemp = p.color(tempMin, temp, tempMax, humidity);
        language = weatherData.language;
        latinAlphabet.includes(language)? textFun = true : textFun = false; 
        if(currentTime > sunriseTime && currentTime < sunsetTime){
          isDayCity = true;
          //desckCol = windAng;
        }else{
          isDayCity = false;
          //desckCol = humidity;
        } 
        const name = weatherData.name.toUpperCase(); 
        const poem = weatherData.frase.text;
        const text = extractWords(poem);
        console.log(text);
        letra = `You are now in ${name}, having arrived precisely at ${localTime} during the ${isDayCity ? 'day' : 'night'}, when the magic begins. The temperature is around ${temp}°C, and someone is singing: ${text}.`;
    }
};
if (weatherData) {
    updateWeatherData(weatherData);  
} else {
    updateTheme(theme);
    letra ="ζ(s) = Σ(1/n^s), n=1 hasta ∞ | e^πi + 1 = 0 | ∫ e^(-x^2) dx, -∞ a ∞ | lim (n→∞) (1 + 1/n)^n = e | f(z) = 1/(2πi) ∮c f(w)/(w-z) dw";
}     
p.preload = () => {
  fn5 = p.loadFont(fnt5);//**** */
  myFont = p.loadFont(fnt7);
}
 
    let tieX = new Array(6).fill(0);
    let tieY = new Array(6).fill(0);
    let tieLength = 15;
    p.setup = () => {
      const renderTarget = p._userNode;
      const computedStyle = getComputedStyle(renderTarget);
      const width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
      const height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
      p.createCanvas(width, height, p.WEBGL);
      b = new body(body_size);
      p.rectMode(p.CENTER);
      for (let i = 0; i < ballAmount; i++) {
        ballArray.push(new Ball());
      }
      pg = p.createGraphics(780, 550);
      pg.background(weatherData?colorFromTemp:desckCol);
      pg.textAlign(p.LEFT);
      if(onWeather && textFun){
        pg.textFont(myFont);
      } 
      pg.noStroke();
      //pg.fill(255, 220);
      xx = b.handL_mov.x + p.width / 2;
      yy = b.handL_mov.y + p.height / 2;
    };
    function dragSegment(i, xin, yin) {
      let dx = xin - tieX[i];
      let dy = yin - tieY[i];
      let angle = b.rd * 0.25 + p.atan2(dy, dx);
      tieX[i] = xin - p.cos(angle) * tieLength;
      tieY[i] = yin - p.sin(angle) * (tieLength-0.81) + 1.5;
      p.push();
      p.translate(
        tieX[i],
        tieY[i] + body_size * 0.8,
        0,
      );
      p.rotate(angle);
      p.stroke(255, 170);
      p.strokeWeight(4);
      p.line(0, 0, tieLength, 0);
      p.pop();
    }
    p.draw = () => {
      p.background(backCol);
      p.lights();
      t = p.frameCount * 0.01;

        // Dibuja las bolas
        p.push();
        p.translate(0, 0, -40);
        b.update();
        b.shw();
        
        for (let i = 0; i < subStep; i++) {
            communicateBetweenBalls();
            ballArray.forEach((ball) => ball.update());
            ballArray.forEach((ball) => ball.edges());
        }
        ballArray.forEach((ball) => ball.show());
        p.pop();
        
        // Dibuja los segmentos
        for (let k = 0; k < tieLength; k++) {
            dragSegment(0, b.head_pos.x, b.head_pos.y);
            for (let i = 0; i < tieX.length - 1; i++) {
            dragSegment(i + 1, tieX[i], tieY[i]);
          }
        }
      
      if (isActive) {
        let d = p.dist(
          xx,
          yy,
          b.handL_mov.x + p.width / 2,
          b.handL_mov.y + p.height / 2
        );
        alphaValue = p.map(clickCount, 0, maxClicks, 1, 25);
        pg.textSize(sz + d / 2);
        pg.fill(textCol);
        textCol.setAlpha(alphaValue + d);
        // pg.noFill();
        pg.noStroke();
        //pg.stroke(25 + d, alphaValue);
        let nwl = letra.charAt(cnt);
        stp = pg.textWidth(nwl);
        if (d > stp) {
          let ang = p.atan2(
            b.handL_mov.y + (p.height / 2 - yy),
            b.handL_mov.x + (p.width / 2 - xx)
          );
            pg.push();
            pg.translate(xx - 160, yy - 30);
            if (onWeather) {
             if( Math.cos(ang) > 0 ){
              pg.rotate(0);
              pg.strokeWeight(0.4);
              //pg.fill(255,120/d);
              isDayCity? pg.noStroke() && pg.fill(255,40+d):pg.stroke(25+d,alphaValue/d);             
              pg.text(nwl, 0, 0);
             } 
             
            } else {
              pg.rotate(ang + p.random(angDist));
              pg.noStroke();
              //pg.strokeWeight(0.3);
              Math.cos(ang)>0?pg.stroke(20,10,10): pg.stroke(25+d,alphaValue/d);
              pg.text(nwl, 0, 0);
            }
          pg.pop();
          cnt++;
          if (cnt >= letra.length) cnt = 0;
          xx = xx + p.cos(ang) * stp;
          yy = yy + p.sin(ang) * stp;
        }
      }
      p.image(pg, -p.width / 3, -p.height / 2.1);
      p.strokeWeight(2);
      p.stroke(125, 120);
      p.noFill();
      p.fill(240,120,120,20);
      p.rect(75, -72, pg.width, pg.height);
    };
    p.mouseOver = () => {
      xx = b.handL_mov.x + p.width / 2;
      yy = b.handL_mov.y + p.height / 2;
    };
    p.mousePressed = () => {
      isActive = !isActive;
      xx = b.handL_mov.x + p.width / 2;
      yy = b.handL_mov.y + p.height / 2;
      cnt = 0;
      clickCount++;
      if (clickCount > maxClicks) {
        clickCount = 0;
      }
    };
    p.keyPressed = () => {
            if (p.key === 's' || p.key === 'S') {
                //p.saveCanvas(canvas, 'miImagenMan', 'jpg');
                onWeather = !onWeather;
            }
        }
    function communicateBetweenBalls() {
      for (let i = 0; i < ballArray.length; i++) {
        const current = ballArray[i];
        const rest = ballArray.slice(i + 1);
        for (const target of rest) {
          current.checkCollision(target);
        }
      }
    }
    class Ball {
      constructor() {
        this.acc = p.createVector(0, 0, 0);
        this.r = p.random(minRadius, maxRadius);
        this.mass = this.r;
        this.vel = p.createVector(1, 0, 0).rotate(p.random(p.PI));
        this.pos = p.createVector(
          p.random(
            b.position.x - b.bdy_size + this.r,
            b.position.x + b.bdy_size - this.r
          ),
          p.random(
            b.position.y - b.bdy_size + this.r,
            b.position.y + b.bdy_size - this.r
          ),
          p.random(
            b.position.z - b.bdy_size * 0.5 + this.r,
            b.position.z + b.bdy_size * 0.5 - this.r
          )
        );
      }
      update() {
        this.vel.add(this.acc.div(subStep));
        this.vel.limit(speedLimit);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.acc.y = gravity / subStep;
        this.vel.mult(friction);
      }
      checkCollision(target) {
        const difference = this.pos.copy().sub(target.pos);
        const distance = difference.mag();
        const totalRadius = this.r + target.r;
        if (distance < totalRadius) {
          const nonZeroDistance = p.max(distance, 0.1);
          const overlapRatio = totalRadius / nonZeroDistance - 1;
          const force = difference
            .normalize()
            .mult(overlapRatio)
            .mult(forceMultiplier);
          const totalMass = this.mass + target.mass;
          const shareA = target.mass / totalMass;
          const shareB = this.mass / totalMass;
          this.acc.add(force.copy().mult(shareA));
          target.acc.sub(force.copy().mult(shareB));
        }
      }
      edges() {
        if (this.pos.x > b.position.x + b.bdy_size / 2 - this.r) {
          this.pos.x = b.position.x + b.bdy_size / 2 - this.r;
          this.vel.x *= -1;
        } else if (this.pos.x < b.position.x - b.bdy_size / 2 + this.r) {
          this.pos.x = b.position.x - b.bdy_size / 2 + this.r;
          this.vel.x *= -1;
        }
        if (this.pos.y < b.position.y - b.bdy_size + this.r) {
          this.pos.y = b.position.y - b.bdy_size + this.r;
          this.vel.y *= -1;
        } else if (this.pos.y > b.position.y + b.bdy_size - this.r) {
          this.pos.y = b.position.y + b.bdy_size - this.r;
          this.vel.y *= -1;
        }
        if (this.pos.z < b.position.z - b.bdy_size * 0.5 + this.r) {
          this.pos.z = b.position.z - b.bdy_size * 0.5 + this.r;
          this.vel.z *= -1;
        } else if (this.pos.z > b.position.z + b.bdy_size * 0.5 - this.r) {
          this.pos.z = b.position.z + b.bdy_size * 0.5 - this.r;
          this.vel.z *= -1;
        }
      }
  
      show() {
        p.fill(weatherData? colorFromTemp:ballCol);
        p.strokeWeight(0.4);
        p.push();
        p.translate(this.pos.x, this.pos.y, this.pos.z);
        p.sphere(this.r, 5, 5);
        p.pop();
      }
    }
  
    class body {
      constructor(size) {
        this.bdy_size = size;
        this.position = p.createVector(
          p.width / 2,
          p.height / 2 - 2 * this.bdy_size,
          0
        );
        this.velocity = p.createVector(0, 0, 0);
        this.aceleration = p.createVector(0, 0, 0);
        this.target = p.createVector(0, 0, 0);
        this.head_pos = p.createVector(0, 0, 0);
        this.dt = [];
        this.force = 0;
        this.dc = 0;
        this.mrc = 0;
        this.rd = 0;
        this.w = 0;
        this.h = 0;
        this.fs = [1];
        this.legL = [1];
        this.legR = [1];
        this.handL = [1];
        this.handR = [1];
        this.handR_mov = p.createVector(0, 0, 0);
        this.handL_mov = p.createVector(0, 0, 0);
        this.nwL = p.createVector();
        this.nwR = p.createVector();
        this.pupilPL = p.createVector();
        this.pupilPR = p.createVector();
        this.r1 = 0;
        this.rr = 0;
        this.n = 0;
        this.sh = 0;
        this.tm = 0;
        this.foots = [new Foot(), new Foot(), new Foot()];
        this.decay = 0.8;
        this.w = 40;
        this.h = 30;
        for (let i = 0; i < 2; i++) {
          this.dt[i] = [];
          for (let j = 0; j < 2; j++) {
            this.dt[i][j] = [];
            for (let k = 0; k < 2; k++) {
              this.dt[i][j][k] = p.createVector(0, 0, 0);
            }
          }
        }
      }
      update() {
        this.n = p.noise(p.frameCount);
        this.mrc = p.map(p.constrain(this.velocity.x, 0, 25), 0, 25, 1.3, 3.0);
        this.handR_mov = p
          .createVector(
            pointX(1.52 * this.mrc, 40) - this.bdy_size * 3.2,
            pointY(1.42 + this.mrc, 40) - this.bdy_size * 3.4,
            pointZ(0.39 + this.mrc, 10) + this.bdy_size * 0.4
          )
          .add(this.position);
        this.handL_mov = p
          .createVector(
            pointX(0.61 * this.mrc, 10) + this.bdy_size * 1.0,
            pointY(0.81 + this.mrc, 10) - this.bdy_size * 5.6,
            pointZ(0.59 + this.mrc, 10) + this.bdy_size * 0.4
          )
          .add(this.position);
        let osc = p.constrain(this.velocity.mag(), 0, 15);
        this.target.set(
          p.mouseX - p.width / 2,
          p.constrain(
            p.mouseX - p.width / 2,
            p.constrain(
              p.mouseY - p.height / 2,
              p.height / 3 -
                this.bdy_size * 2.8 +
                p.map(osc, 0, 15, -this.bdy_size * 0.2, this.bdy_size * 0.2),
              p.height / 2 - this.bdy_size * 1
            ),
            p.constrain(
              p.mouseY - p.height / 2,
              -p.height / 2 -
                this.bdy_size * 3 +
                p.map(osc, 0, 15, -this.bdy_size * 0.7, this.bdy_size * 0.7),
              -p.height / 2 - this.bdy_size * 2
            )
          ),
          0
        );
        this.aceleration = p5.Vector.sub(this.target, this.position);
        this.force = this.aceleration.mag();
        this.aceleration.normalize();
        this.aceleration.mult(this.force * speedBodyReact);
        this.velocity.add(this.aceleration);
        this.position.add(this.velocity);
        this.velocity.mult(this.decay);
        this.rad = p.map(
          p.constrain(this.velocity.x, -25, 25),
          -25,
          25,
          -p.PI * 0.2,
          p.PI * 0.2
        );
  
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
              this.dt[i][j][k]
                .set(
                  this.bdy_size * (i - 0.5),
                  2 * this.bdy_size * (j - 0.5),
                  (this.bdy_size / 2) * (k - 0.5)
                )
                .rotate(this.rad);
              this.dt[i][j][k].add(this.position);
            }
          }
        }
        if (p.frameCount == 1) {
          for (let i = 0; i < 1; i++) {
            this.foots[i].footL.set(
              mid_point(this.dt[0][1][0], this.dt[0][1][1], 0.5).x +
                p.random(15, 45),
              p.height / 2,
              mid_point(this.dt[0][1][0], this.dt[0][1][1], 0.5).z +
                p.random(-5, +5)
            );
            this.foots[i].footR.set(
              mid_point(this.dt[1][1][0], this.dt[1][1][1], 0.5).x +
                p.random(-45, -15),
              p.height / 2,
              mid_point(this.dt[1][1][0], this.dt[1][1][1], 0.5).z +
                p.random(-5, +5)
            );
            this.foots[i].handL.set(this.handR_mov);
            this.foots[i].handR.set(this.handL_mov);
          }
        }
        for (let i = 0; i < this.legL.length; i++) {
          this.legL[i] = new Leg(
            mid_point(this.dt[0][1][0], this.dt[0][1][1], 0.5),
            1
          );
          this.legR[i] = new Leg(
            mid_point(this.dt[1][1][0], this.dt[1][1][1], 0.5),
            0
          );
          this.handL[i] = new Leg(
            mid_point(this.dt[0][0][0], this.dt[0][0][1], 0.5),
            0
          );
          this.handR[i] = new Leg(
            mid_point(this.dt[1][0][0], this.dt[1][0][1], 0.5),
            1
          );
        }
  
        for (let i = 0; i < 1; i++) {
          this.foots[i].up(
            mid_point(this.dt[0][1][0], this.dt[0][1][1], 0.5).x,
            mid_point(this.dt[1][1][0], this.dt[1][1][1], 0.5).x,
            mid_point(this.dt[0][1][0], this.dt[0][1][1], 0.5).z,
            mid_point(this.dt[1][1][0], this.dt[1][1][1], 0.5).z,
            this.velocity.mag()
          );
        }
        for (let i = 0; i < this.legL.length; i++) {
          this.legL[i].up(this.foots[i].footL);
          this.legR[i].up(this.foots[i].footR);
          this.handL[i].up(this.handR_mov);
          this.handR[i].up(this.handL_mov);
        }
      }
      shw() {
        let hh = p.map(this.velocity.x + this.n, 0, 15, 0, this.h);
        p.stroke(bodyCol);
        p.strokeWeight(1);
  
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
              if (k < 1)
                p.line(
                  this.dt[i][j][k].x,
                  this.dt[i][j][k].y,
                  this.dt[i][j][k].z,
                  this.dt[i][j][k + 1].x,
                  this.dt[i][j][k + 1].y,
                  this.dt[i][j][k + 1].z
                );
              if (j < 1)
                p.line(
                  this.dt[i][j][k].x,
                  this.dt[i][j][k].y,
                  this.dt[i][j][k].z,
                  this.dt[i][j + 1][k].x,
                  this.dt[i][j + 1][k].y,
                  this.dt[i][j + 1][k].z
                );
              if (i < 1)
                p.line(
                  this.dt[i][j][k].x,
                  this.dt[i][j][k].y,
                  this.dt[i][j][k].z,
                  this.dt[i + 1][j][k].x,
                  this.dt[i + 1][j][k].y,
                  this.dt[i + 1][j][k].z
                );
            }
          }
        }
        p.noStroke();
        p.fill(ballCol);
        this.head_pos = p.createVector(
          this.position.x,
          this.position.y - this.bdy_size * 1.8,
          this.position.z
        );
        let rrd = p.map(
          p.constrain(this.velocity.x, -25, 25),
          -25,
          25,
          -p.PI * 0.04,
          p.PI * 0.04
        );
        p.push();
        p.translate(
          this.head_pos.x,
          this.head_pos.y,
          this.head_pos.z - this.bdy_size * 0.03
        );
        p.rotateX(rrd);
        p.sphere(this.bdy_size * 0.45, 10, 10);
        p.pop();
  
        if (this.n < 0.5) {
          this.r1 = p.map(p.constrain(t, 0, 128), 1, 18, this.rr, 0);
        } else {
          this.r1 = this.rr;
        }
        let mouthx = p.map(p.constrain(pointX(1.7, 10.9), 0, 120), 0, 120, 0, 45);
        let mouthy = p.map(p.constrain(pointY(4.7, 10.2), 0, 120), 90, 10, 0, 15);
        p.push();
        p.translate(
          this.head_pos.x,
          this.head_pos.y + this.bdy_size * 0.21,
          this.head_pos.z + this.bdy_size * 0.4
        );
        p.strokeWeight(1);
        p.stroke(0);
        p.fill(255, 220, 120);
        p.ellipse(0, 0, mouthx, mouthy);
        p.pop();
        p.push();
        p.translate(
          this.head_pos.x + this.bdy_size * 0.18,
          this.head_pos.y - this.bdy_size * 0.07,
          this.head_pos.z + this.bdy_size * 0.4
        );
        p.noStroke();
        p.fill(255);
        p.sphere(this.bdy_size * 0.11, 6, 6);
        p.pop();
        p.push();
        p.translate(
          this.head_pos.x - this.bdy_size * 0.18,
          this.head_pos.y - this.bdy_size * 0.07,
          this.head_pos.z + this.bdy_size * 0.4
        );
        p.fill(255);
        p.sphere(this.bdy_size * 0.11, 6, 6);
        p.pop();
        this.pupilPL.set(
          this.head_pos.x + this.bdy_size * 0.13,
          this.head_pos.y - this.bdy_size * 0.03,
          this.head_pos.z + this.bdy_size * 0.48
        );
        this.pupilPR.set(
          this.head_pos.x - this.bdy_size * 0.25,
          this.head_pos.y - this.bdy_size * 0.03,
          this.head_pos.z + this.bdy_size * 0.48
        );
        this.nwL = p5.Vector.sub(this.pupilPL, this.handL_mov);
        this.nwR = p5.Vector.sub(this.pupilPR, this.handL_mov);
        this.nwL.normalize();
        this.nwL.setMag(9);
        this.nwR.normalize();
        this.nwR.setMag(9);
        p.push();
        p.translate(
          this.pupilPL.x - this.nwL.x,
          this.pupilPL.y - this.nwL.y,
          this.pupilPL.z - this.nwL.z
        );
        p.fill(0);
        p.sphere(this.bdy_size * 0.045, 4, 4);
        p.pop();
        p.push();
        p.translate(
          this.pupilPR.x - this.nwR.x,
          this.pupilPR.y - this.nwR.y,
          this.pupilPR.z - this.nwR.z
        );
        p.fill(0);
        p.sphere(this.bdy_size * 0.045, 4, 4);
        p.pop();
        for (let i = 0; i < 1; i++) {
          this.legL[i].shw();
          this.legR[i].shw();
          this.handL[i].shw();
          this.handR[i].shw();
        }
      }
    }
    function mid_point(a, b, r) {
      return p.createVector(
        a.x * r + b.x * (1 - r),
        a.y * r + b.y * (1 - r),
        a.z * r + b.z * (1 - r)
      );
    }
    function pointX(mr, tr) {
      let x = 1251 + mr * p.cos((p.TWO_PI * t) / tr);
      let y = mr * p.sin((p.TWO_PI * t) / tr);
      return 120 * p.noise(x, y);
    }
  
    function pointY(mr, tr) {
      let x = 1151 + mr * p.cos((p.TWO_PI * t) / tr);
      let y = mr * p.sin((p.TWO_PI * t) / tr);
      return 420 * p.noise(x, y);
    }
  
    function pointZ(mr, tr) {
      let x = 1241 + mr * p.cos((p.TWO_PI * t) / tr);
      let y = mr * p.sin((p.TWO_PI * t) / tr);
      return 70 * p.noise(x, y);
    }
    class Leg {
      constructor(v, m) {
        this.vs = v;
        this.vm = p.createVector(0, 0, 0);
        this.ve = p.createVector(0, 0, 0);
        this.l = 1.65 * body_size;
        this.md = m;
      }
  
      up(tg) {
        let df = p5.Vector.sub(tg, this.vs);
        let d = df.mag();
  
        if (d >= 2 * this.l) {
          df.mult(this.l / d);
          this.vm.set(this.vs.x + df.x, this.vs.y + df.y, this.vs.z + df.z);
          this.ve.set(this.vm.x + df.x, this.vm.y + df.y, this.vm.z + df.z);
        } else {
          this.ve.set(tg.x, tg.y, tg.z);
  
          if (this.md == 0) {
            df.set(df.y, -df.x, df.z);
          } else {
            df.set(-df.y, df.x, df.z);
          }
  
          df.mult(p.sqrt(p.sq(this.l) - p.sq(d * 0.5)) / d);
          this.vm.set(
            (this.vs.x + this.ve.x) * 0.5 + df.x,
            (this.vs.y + this.ve.y) * 0.5 + df.y,
            (this.vs.z + this.ve.z) * 0.5 + df.z
          );
        }
      }
  
      shw() {
        p.stroke(bodyCol);
        p.strokeWeight(4);
        p.line(this.vs.x, this.vs.y, this.vs.z, this.vm.x, this.vm.y, this.vm.z);
        p.stroke(legColor);
        p.line(this.ve.x, this.ve.y, this.ve.z, this.vm.x, this.vm.y, this.vm.z);
      }
    }
    class Foot {
      constructor() {
        this.footL = p.createVector(0, 0, 0);
        this.footR = p.createVector(0, 0, 0);
        this.handL = p.createVector(0, 0, 0);
        this.handR = p.createVector(0, 0, 0);
        this.l = 0;
        this.legL = 0;
        this.h = 0;
        this.lx = 0;
        this.rx = 0;
        this.lz = 0;
        this.rz = 0;
        this.fs = 0;
        this.tl = false;
        this.tr = false;
        this.trn = true;
      }
      up(xl, xr, zl, zr, vm) {
        if (this.trn) {
          if (!this.tl && this.footL.x - xl < -100) {
            this.tl = true;
            this.l = xl - this.footL.x + p.random(-100, 10);
            this.h = p.abs(this.l * p.random(0.4, 0.6));
            this.lx = this.footL.x;
            this.fs = 0;
          } else if (!this.tl && this.footL.x - xl > 25) {
            this.tl = true;
            this.l = xl - this.footL.x - p.random(15, 75);
            this.h = p.abs(this.l * p.random(0.4, 0.6));
            this.lx = this.footL.x;
            this.fs = 0;
          }
          if (this.tl) {
            this.stpl(this.footL, this.l, this.ll, this.h, vm);
          }
        } else {
          if (!this.tr && this.footR.x - xr > 100) {
            this.tr = true;
            this.l = xr - this.footR.x + p.random(-10, 100);
            this.h = p.abs(this.l * p.random(0.4, 0.6));
            this.rx = this.footR.x;
            this.fs = 0;
          } else if (!this.tr && this.footR.x - xr < -25) {
            this.tr = true;
            this.l = xr - this.footR.x + p.random(15, 75);
            this.h = p.abs(this.l * p.random(0.4, 0.6));
            this.rx = this.footR.x;
            this.fs = 0;
          }
          if (this.tr) {
            this.stpr(this.footR, this.l, this.ll, this.h, vm);
          }
        }
      }
      stpl(n, l, ll, h, vm) {
        let it = p.map(p.constrain(vm, 0, 15), 0, 15, 0.25, 0.75);
        this.fs = p.lerp(this.fs, p.PI, it);
        n.x = this.lx + (l * this.fs) / p.PI;
        n.y = p.sin(this.fs) * -h + p.height / 2;
        if (this.fs >= p.PI - 0.01) {
          this.fs = p.PI;
          this.tl = false;
          this.trn = !this.trn;
        }
      }
      stpr(n, l, ll, h, vm) {
        let it = p.map(p.constrain(vm, 0, 15), 0, 15, 0.25, 0.75);
        this.fs = p.lerp(this.fs, p.PI, it);
        n.x = this.rx + (l * this.fs) / p.PI;
        n.y = p.sin(this.fs) * -h + p.height / 2;
        if (this.fs >= p.PI - 0.01) {
          this.fs = p.PI;
          this.tr = false;
          this.trn = !this.trn;
        }
      }
    }
    p.updateTheme = updateTheme;
  };
  export default p5SketchTeacher;