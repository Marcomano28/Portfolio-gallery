import { calculateLightIntensity, timeToMinutes } from "./utils/utilsSketchs";
import { ColoresA, ColoresB, ColoresC, ColoresNocturnos} from "./utils/utilsSketchs.js";

const p5SketchCurtain = (p , theme, weatherData) => {
    
    const nodes = [];
    let links = [];
    const cuts = [];
    const xGrid = 40;
    const friction = 0.89;
    const moreForce = 0.2;
    const cutRadio = 8;
    const velmax = 8;
    const gravity = 3.9;
    
    let letterIndex = 0;
    let text_size; //18
    let border = 40;
    // let x = 20;
    // let y = 20;
    let canvas;
    let lightMore;
    let darkLight;
    // let night = false;
    let night;
    let bgColor;
    let col, bgR, bgG, bgB;
    let traslucid;
    let backCol;
    let cloudsAll;
    let day, onWeather = false;
    let poem = '';

    //background
    let seed = Math.random() * 1000;
    let mySize, margin;
    let colorbg ;
    let colorbg2 ;

    let filter, grad;
    var xOff, yOff;
    var color1, color2;
    let riverLayers = 12; // Número de capas de río
    let mountainLayers = 3;
    let colors_frames;

    //Weather effects
    let windSpeed;

    const updateTheme = (newTheme) => {
        //poem = "TheDreamGoesOverTimeFloatingLikeASailboatNoOneCanOpenSeedsInTheHeartOfThedreamTimeGoesByOnTheDreamSunkenToTheHairYesterdayAndTomorrowTheyEatDarkFlowersOfMourningOnTheSameColumnEmbracedDreamAnTime".split("");
        if(newTheme ==='dark'){
            night = true;
            lightMore = 200;
            darkLight = 1.21;
            backCol = p.color(10,10,10);
            colorbg2 = "1a237e".split("-").map((a) => "#" + a + "10");
            colorbg = "3949ab".split("-").map((a) => "#" + a + "10");
            colors_frames = "311b92-4527a0-512da8-5e35b1-7e57c2".split("-").map((a) => "#" + a);
        }else if(newTheme ==='light'){
            night = false;
            lightMore = 91.5;
            darkLight = 4.4;
            backCol = p.color(0);
            colorbg = "e3d7a3".split("-").map((a) => "#" + a + "80");
            colorbg2 = "f8f1d3".split("-").map((a) => "#" + a + "80");
            colors_frames= "263238-37474f-455a64-546e7a-78909c".split("-").map((a) => "#" + a);
        }    
    };

    const updateWeatherData = (weatherData) => {
        if (weatherData) {
            onWeather = true;
            cloudsAll = weatherData.clouds.all;//0,100
            const localTime = weatherData.localTime;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;//79
            windSpeed = p.map(weatherData.wind.speed, 0, 10, 50, 5);//4.25
            const windAng = weatherData.wind.deg;//190
            const currentTime = timeToMinutes(localTime);
            const sunriseTime = timeToMinutes(weatherData.sunriseHour);
            const sunsetTime = timeToMinutes(weatherData.sunsetHour);
            const { intensity, reddishTone } = calculateLightIntensity(currentTime, sunriseTime, sunsetTime);
            bgColor = p.color(intensity, intensity - reddishTone*0.2, intensity - reddishTone*0.2);
            //console.log(`Color RGB: ${bgColor.levels}`); 
            traslucid = p.map(humidity, 0, 100, 0, 255);
            // col = p.map(temp, -10, 40, 0.5, 6.5);
            bgR = humidity;
            bgG = cloudsAll;
            bgB = weatherData.main.temp_min;
            col = weatherData.wind.speed; 
            poem = weatherData.frase.text;   
        }
    };
    
    if (weatherData) {
        updateWeatherData(weatherData);
        
    } else {
        updateTheme(theme);
        windSpeed = 25;
        poem = "TheDreamGoesOverTimeFloatingLikeASailboatNoOneCanOpenSeedsInTheHeartOfThedreamTimeGoesByOnTheDreamSunkenToTheHairYesterdayAndTomorrowTheyEatDarkFlowersOfMourningOnTheSameColumnEmbracedDreamAnTime".split("");
    }
    let wind;
    let windAngle;

    p.setup = () => {   
        let renderTarget = p._userNode;
        let computedStyle = getComputedStyle(renderTarget);
        let width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
        let height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
        canvas = p.createCanvas(width, height, p.webgl);
        p.pixelDensity(p.displayDensity());
        p.randomSeed(seed);
        text_size = p.int(p.width / 63);
        color1 = p.random(ColoresNocturnos);
        color2 = p.random(ColoresB);
        xOff = -100;
        margin = 10;
        p.background(ColoresC[1]);
        filter = new makeFilter();
        const yGrid = p.ceil(xGrid / 2);
        for (let j = 0; j <= yGrid; j++) {
            for (let i = 0; i <= xGrid; i++) {
                let xx = p.map(i, 0, xGrid, border, p.width - border);
                let yy = p.map(j, 0, yGrid, border, p.height * (yGrid / xGrid) - border);
                const fix = j == 0 ? true : false;
                nodes.push(new node(xx, yy, fix));
            }
        }
        for (let i = 0; i < nodes.length; i++) {
            const thisOne = nodes[i];
            const others = nodes.slice(i + 1);
            const nexts = others.filter((target) => target.pos.dist(thisOne.pos) <= (p.width / xGrid) * 1.5);
            nexts.forEach((target) => (thisOne.fix && target.fix) || links.push(new link(thisOne, target)));
        }
        wind = p.createVector(0,0);
        windAngle = 0;
        //console.log(weatherData);
    }
    p.draw = () => { 
        p.randomSeed(seed);     
        p.background(backCol);
       //p.background(0);
      // p.fill(0);
	    grad = p.drawingContext.createLinearGradient(0, 0, 0, p.height);
	    grad.addColorStop(0, colorbg);
	    grad.addColorStop(1, colorbg2);
	    p.drawingContext.fillStyle = grad;
	    p.noStroke();
	    p.rectMode(p.CORNER);
	    p.rect(0, 0, p.width, p.height);
        drawRiver(riverLayers);
        drawMountains(mountainLayers);
        updateWind();
        
        nodes.forEach(node => {
            node.windVector = generateWindVector(node.pos.x, node.pos.y);  // Actualiza el viento
            node.update();
            node.show();
        });
        links.forEach((link) => {
            link.update();
            link.show();
        });          
    }

    p.windowResized = () => {
        initializeCanvas();
        text_size = p.int(p.width / 63);
      };
    
      function initializeCanvas() {
        const renderTarget = p._userNode;
        const computedStyle = getComputedStyle(renderTarget);
    
        const width = renderTarget.offsetWidth - (
          parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)
        );
    
        const height = renderTarget.offsetHeight - (
          parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
        );
    
        if (canvas) {
          p.resizeCanvas(width, height);
        } else {
          canvas = p.createCanvas(width, height, p.WEBGL);
        }
      }

    p.updateTheme = (newTheme) => {
        if (!weatherData) {
            updateTheme(newTheme);
        }  
      }
      
    function generateWindVector(x, y) {
        let time = p.frameCount * 0.05;
        let angle = p.noise(x * 0.01 + time, y * 0.01 + time) * p.TWO_PI;
        let magnitude = p.noise(x * 0.1 + time, y * 0.1 + time) * 1.01;
        return p.createVector(p.cos(angle) * magnitude, p.sin(angle) * magnitude);
    }  
    function undo() {
        if (!cuts.length) return;
        const rest = cuts.pop();
        links.push(rest);
    }
    p.mouseDragged = () => {
        const mouse = p.createVector(p.mouseX, p.mouseY);
        links = links.filter((link) => {
            const mid = link.middle();
            const dif = mid.copy().sub(mouse);
            const dist = Math.hypot(dif.x, dif.y);
            if (dist > cutRadio) return true;
            cuts.push(link);
            return false;
        });
    }
    p.mouseMoved = () => {
            const mouseStrength = 1.5; 
            const mouseRadius = 150;
            const mousePos = p.createVector(p.mouseX, p.mouseY);
            nodes.forEach((node) => {
            let distance = p.dist(mousePos.x, mousePos.y, node.pos.x, node.pos.y);
            if (distance < mouseRadius) {
            let windDirection = p.createVector(p.mouseX - p.pmouseX, p.mouseY - p.pmouseY);
             windDirection.normalize(); 
             windDirection.mult(mouseStrength / (distance / mouseRadius)); // Decrease force with distance
             node.force.add(windDirection);
            }
        });
    };
    function updateWind (){
        windAngle +=0.01;
        let windStrength = p.noise(p.frameCount * 0.1) * 2;
        wind.x = p.cos(windAngle) * windStrength;
        wind.y = p.sin(windAngle) * windStrength;
    }
    const node = function (x, y, fix) {
        this.pos = p.createVector(x, y);
        this.vel = p.createVector();
        this.force = p.createVector();
        this.fix = fix;
        this.dis;
        this.text = poem[letterIndex++ % poem.length];
        this.windVector = generateWindVector(x, y); 

        this.show = () => {         
             //p.fill(255, 255, 255);
            night ? p.fill((darkLight*185) + lightMore * this.dis/1.5, (10 * darkLight)+ lightMore * this.dis/4.7, (45*darkLight) * p.pow(lightMore , this.dis/1.9)):
            p.fill((darkLight/20) + lightMore * this.dis, (20 * darkLight)+ lightMore * this.dis, (darkLight) * p.pow(lightMore / 2, this.dis));
            p.strokeWeight(0.4);
            night ? p.stroke(255,20): p.noStroke();
            p.textSize(text_size);
           // p.textStyle(p.BOLD);
           p.textStyle(p.NORMAL);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(this.text, this.pos.x, this.pos.y);
        }
        this.update = () => {
            this.dis = p.constrain(p.map(p.dist(this.pos.x, this.pos.y, p.mouseX, p.mouseY), 0, 250, 1, 0), 0, 1);
            if (this.fix) return;
            let forceWind = this.force.add(wind);
            forceWind.add(this.windVector);
            const a = forceWind.mult(moreForce);
            this.vel.add(a);
            this.vel.limit(velmax);
            this.pos.add(this.vel);
            this.force.mult(0);
            this.force.y = (gravity * p.mouseY / 610);
            this.vel.mult(friction);

            // this.dit = p.map(this.dist, 0, 150, 50, 1);
            if (this.pos.y > p.height) {
                this.pos.y = p.height;
                this.vel.y *= -1;
            }
        };
    };
    const link = function (node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.rest = node1.pos.dist(node2.pos);
        this.middle = () => this.node1.pos.copy().add(this.node1.pos).div(2);
          
        this.update = () => {
            const dif = node2.pos.copy().sub(node1.pos);
            const dist = p.max(0.1, Math.hypot(dif.x, dif.y));
            const k = (dist - this.rest) / dist;
            const force = dif.mult(k);
            this.node1.fix || this.node1.force.add(force);
            this.node2.fix || this.node2.force.sub(force);
        };
        this.show = () =>{
            p.stroke(colors_frames);
            p.strokeWeight(0.2);
            p.line(this.node1.pos.x, this.node1.pos.y, this.node2.pos.x, this.node2.pos.y);
        }
    };
    function drawRiver(layers) {
        let riverHeight = p.height / 3; // El río ocupa el tercio inferior de la pantalla
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
            for (let i = xOff; i < p.width - xOff; i += windSpeed) { // Ajusta este valor para más o menos olas
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
     
	       p.noFill();
	       p.stroke(p.random(colors_frames));
	       p.strokeWeight(margin * 1);
	       p.rectMode(p.CENTER);
	       p.rect(p.width / 2, p.height / 2, p.width, p.height);
	       p.image(p.overAllTexture, 0, 0);
	        //p.noLoop();
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
    p.updateTheme = updateTheme;
}
export default p5SketchCurtain;
