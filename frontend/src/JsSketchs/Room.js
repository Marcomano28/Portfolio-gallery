import p5 from "p5";
import { calculateLightIntensity, timeToMinutes } from "./utils/utilsSketchs";

const p5SketchRoom = (p, theme, weatherData) => {
    let subdivision;
    let maxPoints = 20;
    let pointCount = 0;
    let newPointProbability = 10;
    let drawFunctions = [drawShapeScaleLinearAndRotate, drawShapeScaleExpAndRotate, drawShapeScaleExp, drawShapeScaleLinear];
    // let drawFunctionsIndex = 0;
    // let doDrawLoadingBar = false;
    let wsz = 150;
    let L = wsz * 2;
    let lastMouse = 0;
    let lerpFactor = 0.3;
    let canvas;
    let strokeW = 0.2;
    let day, onWeather = false;
    let lighter, backCol, dark, light;
    let cloudsAll;
    let colStroke, bgR, bgG, bgB, bgColor;
    let humidity, windAng, windSpeed;
    let isDayCity;
    let pathToDraw = 2; 

    p5.Vector.prototype.equals = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    let t = 0;
    const updateTheme = (newTheme) => {
        if(newTheme === 'dark'){
           dark = 0;
           light = 255;
           lighter = 1;
           day = false;
           backCol = p.color(0,0,0);
        }else if(newTheme === 'light'){
           dark = 255;
           light = 0;
           lighter = 0.3;
           day = true;
           backCol = p.color(2,5,0);
        }
    };
    const updateWeatherData = (weatherData) => {
        if (weatherData) {
            onWeather = true;
            cloudsAll = weatherData.clouds.all;//0,100
            const localTime = weatherData.localTime;
            const temp = weatherData.main.temp;
            humidity = weatherData.main.humidity;//79
            const pressure = weatherData.main.pressure;//1016
            // const rainH = weatherData.rain.1h;//0.75
            windSpeed = weatherData.wind.speed;//4.25
            windAng = weatherData.wind.deg;//190
            const currentTime = timeToMinutes(localTime);
            const sunriseTime = timeToMinutes(weatherData.sunriseHour);
            const sunsetTime = timeToMinutes(weatherData.sunsetHour);
            const { intensity, reddishTone } = calculateLightIntensity(currentTime, sunriseTime, sunsetTime);
            bgColor = p.color(intensity, intensity - reddishTone*0.2, intensity - reddishTone*0.2);
            //console.log(`Color RGB: ${bgColor.levels}`); 
            // traslucid = p.map(humidity, 0, 100, 0, 255);
            colStroke = p.map(intensity, 0, 255, 170, 0)+temp;

            if(currentTime > sunriseTime && currentTime < sunsetTime){
                isDayCity = true;
                pathToDraw = 3;
            }else{
                isDayCity = false;
                windSpeed < 2.5 ? pathToDraw = 2 : pathToDraw = 1;
            }         
            //console.log('en la ciudad es de dia?',isDayCity);
           // console.log(colStroke);
            bgR = colStroke/humidity;
            bgG = colStroke/windSpeed;
            bgB = colStroke/temp;
            // col = weatherData.wind.speed; 
        }
    };
    if (weatherData) {
        updateWeatherData(weatherData);
       
    } else {
        updateTheme(theme);
    }
    p.setup = () => {
        let renderTarget = p._userNode;
        let computedStyle = getComputedStyle(renderTarget);
        let width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
        let height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
        canvas = p.createCanvas(width, height, p.WEBGL);
        initSubdivision();
        p.pixelDensity(p.displayDensity());
        p5.disableFriendlyErrors = true;
        p.smooth();
        lastMouse = p.createVector(p.mouseX, p.mouseY);
    }
    p.draw = () => {
        p.background(onWeather ? bgColor:backCol);
        //p.normalMaterial(); 
        // p.directionalLight(p.color('white'), p.height / 2, p.width / 2, -250); 
        t = p.frameCount * 0.1;
        lastMouse.x = p.lerp(lastMouse.x, p.mouseX, lerpFactor);
        lastMouse.y = p.lerp(lastMouse.y, p.mouseY, lerpFactor);
        let fsc = frst((lastMouse.x - p.width / 2) * 2, (lastMouse.y - p.height / 2) * 2, wsz * 2);
        p.translate(0, 0, -wsz * 2.3);
        if (pointCount < maxPoints && shouldDo(newPointProbability)) {
            let triangleIndex = randomInt(subdivision.size());
            let triangle = subdivision.get(triangleIndex);
            if (triangle.size() > 100) {
                let newPoint = subdivision.get(triangleIndex).center;
                subdivision.add(newPoint, triangleIndex);
                pointCount++;
            }
        }
        if(onWeather){
        // p.ambientMaterial(255);
        let tono = isDayCity ? 0.2:1.7; 
        let r = bgColor.red * tono;
        let g = bgColor.green * tono;
        let b = bgColor.blue * tono;
        p.strokeWeight(1.75);
        p.stroke(r*tono,g*tono,b*tono,180);
        p.noFill();
        p.push();
        p.translate(-L, -L, -L / 2);
        // p.rotateY();
        drawShapes(drawFunctions[pathToDraw], false);
        p.pop();
        p.push();
        p.translate(L, -L, -L / 2);
        p.rotateY(p.PI);
        drawShapes(drawFunctions[pathToDraw], true);
        p.pop();
        p.stroke(210);
        //roof
        p.push();
        p.translate(L, -L, L/2);
        p.rotateY(-p.HALF_PI);
        p.rotateX(-p.HALF_PI );
        p.rotate(p.PI);
        drawShapes(drawFunctions[pathToDraw],false);
        p.pop();
        //floor
        p.push();
        p.rotateY(p.HALF_PI);
        p.rotateX(p.HALF_PI);
        p.translate(-L / 2, -L, -L);
        drawShapes(drawFunctions[3]);
        p.pop();
        //right wall
        p.push();
        p.rotateY(-p.HALF_PI);
        p.translate(-L / 2, -L, -L);
        drawShapes(drawFunctions[pathToDraw],false);
        p.pop();
        //left wall
        p.push();
        p.rotateY(p.HALF_PI);
        p.translate(-L / 2, -L, -L);
        drawShapes(drawFunctions[pathToDraw],false);
        p.pop();
        }else{
            p.strokeWeight(0.75);
            p.stroke(110, 170, 200, 80);
            p.noFill();
            p.push();
            // p.rotateX(p.HALF_PI);
    
            p.translate(-L, -L, -L / 2);
            // p.rotate(p.HALF_PI);
            p.rotateY(0);
            drawShapes(drawFunctions[2]);
            p.pop();
            p.push();
            // p.rotateX(p.HALF_PI);
    
            p.translate(L, -L, -L / 2);
            // p.rotate(p.HALF_PI);
            p.rotateY(p.PI);
            drawShapes(drawFunctions[2]);
            p.pop();
            p.stroke(210);
            p.push();
            p.rotateY(-p.HALF_PI);
            p.rotateX(-p.HALF_PI);
            p.translate(-L / 2, -L, -L);
            drawShapes(drawFunctions[3]);
            p.pop();
            p.push();
            p.rotateY(p.HALF_PI);
            p.rotateX(p.HALF_PI);
            p.translate(-L / 2, -L, -L);
            drawShapes(drawFunctions[3]);
            p.pop();
            p.push();
            p.rotateY(-p.HALF_PI);
            p.translate(-L / 2, -L, -L);
            drawShapes(drawFunctions[3]);
            p.pop();
            p.push();
    
            p.rotateY(p.HALF_PI);
            p.translate(-L / 2, -L, -L);
            drawShapes(drawFunctions[3]);
            p.pop();
        }
    }
    p.keyPressed = () => {
        if (p.key === 's' || p.key === 'S') {
            p.saveCanvas(canvas, 'miImagen4', 'jpg');
        }
    }
    
    function frst(x, y, wsz) {
        let hw = 0;
        let hh = 0;
        let cmoff = p.createVector(-x, -y, 0);
        let cmcoff = p.createVector(-x, -y, 0);
        let cmy = p.createVector(hw, hh, 100.0);
        cmy.add(cmoff);
        let cmc = p.createVector(hw, hh, 90);
        cmc.add(cmcoff);
        let cmup = p.createVector(0, 1, 0);
        p.camera(cmy.x, cmy.y, cmy.z, cmc.x, cmc.y, cmc.z, cmup.x, cmup.y, cmup.z);
        let fnr = 200;
        let ffr = 100000;
        let cmd = cmy.dist(cmc);
        let hypo = p.sqrt(p.pow(cmd + wsz, 2) + p.pow(wsz, 2));
        let tana = p.tan(p.asin(wsz / hypo));
        let woff = (x / wsz) * fnr * tana;
        let hoff = (-y / wsz) * fnr * tana;
        let flft = -fnr * tana + woff;
        let frgt = fnr * tana + woff;
        let ftp = -fnr * tana + hoff;
        let fbt = fnr * tana + hoff;
        p.frustum(flft, frgt, ftp, fbt, fnr, ffr);
        return p.createVector(1, L / p.float(L), (wsz / p.float(L)) / (wsz / cmd));
    }
    function initSubdivision() {
        let margin = 2;
        let bottomLeft = p.createVector(0, L * 2);
        let bottomRight = p.createVector(L, L * 2);
        let top = p.createVector(L / 2, 0);
        subdivision = new Delaunay(top, bottomLeft, bottomRight);
        let left = new Triangle(top, bottomLeft, p.createVector(0, 0));
        let right = new Triangle(top, bottomRight, p.createVector(L, 0));
        left.addNeighbor(subdivision.initialTriangle);
        right.addNeighbor(subdivision.initialTriangle);
        subdivision.add(left);
        subdivision.add(right);
        subdivision.optimize();
        pointCount = 0;
        maxPoints = randomInt(0, 10);//max-rec-20
    }
    function drawShapes(optionalDrawFct, invertScale) {
        let drawFct = optionalDrawFct || drawShape;
        let shapes = getShapesFromDelaunay(subdivision);
        for (let shape of shapes.array) {
            drawFct(shape, invertScale);
        }
    }
    function drawShapeScaleLinear(shape) {
        drawShapeScaleLinearAndRotate(shape, false, false);
    }
    //strokes spider nets
    function drawShapeScaleLinearAndRotate(shape, optionalRotateFlag, optionalCutoffFlag) {
        let doCutOff = optionalCutoffFlag == undefined ? true : optionalCutoffFlag;
        let doRotate = optionalRotateFlag == undefined ? true : optionalRotateFlag;
        let mean = shape.mean;
        let volume = shape.volume;
        let max = onWeather ? 2 + parseInt(volume) % 20 : 2 + parseInt(volume) % 30;
        for (let scaleValue = 1; scaleValue > 0.1; scaleValue -= (1 / max)) {
            if (doCutOff && scaleValue < 1 && volume * scaleValue < (L * 2 * L * 2 * 0.00005)) {
                break;
            }
            let col = p.lerp(p.map(scaleValue, 0, lighter, dark, light), volume, lerpFactor * 1);
            let colight = p.lerp(p.map(scaleValue, 0, 1, 0, 255), volume, lerpFactor * 1);
            let girishCol = p.color((0)* scaleValue + col / 2, col * scaleValue, col * scaleValue - col / 3, 120);
            let onWeatherColor = p.color(bgR+col*scaleValue, bgG+col/colStroke, bgB*scaleValue+colStroke/2);
            if(theme === 'dark'){
            p.strokeWeight(1.4 * strokeW / scaleValue);
            p.stroke(onWeather ? onWeatherColor : girishCol);
            p.push();
            p.translate(mean.x, mean.y,(scaleValue * 30 )-30);
            if (doRotate) {
                p.rotate((1 - scaleValue) * p.PI / 3);
            }
            p.scale(scaleValue);
            drawShapeByMeanOffset(shape, mean);
            p.pop();
          } else {
            p.strokeWeight(strokeW / scaleValue);
            p.stroke(255 * scaleValue + colight / 2, colight * scaleValue, colight * scaleValue - colight / 3);
            p.push();
            p.translate(mean.x, mean.y);
            if (doRotate) {
                p.rotate((1 - scaleValue) * p.PI / 2);
            }
            p.scale(scaleValue);
            drawShapeByMeanOffset(shape, mean);
            p.pop();
          }
        }
    }
    function drawShapeScaleExp(shape, invertScale = false) {
        drawShapeScaleExpAndRotate(shape, false, false, invertScale);
    }
    function drawShapeScaleExpAndRotate(shape, optionalRotateFlag, optionalCutoffFlag, invertScale = false) {
        let doCutOff = optionalCutoffFlag == undefined ? true : optionalCutoffFlag;
        let doRotate = optionalRotateFlag == undefined ? true : optionalRotateFlag;
        let mean = shape.mean;
        let volume = shape.volume;
        let max = 10;
        max = 2 + parseInt(volume) % 20;

        for (let i = 1; i < max; i++) {
            let scaleValue = 1 / i;
            
            let zPosition = -scaleValue;
            let offCorrection = 20;
            if (invertScale) {
                zPosition = scaleValue;  // Invierte la posición en Z
                offCorrection = -20;
            }

            if (doCutOff && scaleValue < 1 && volume * scaleValue < (L * 2 * L * 2 * 0.000002)) {
                break;
            }
            let col = p.lerp(p.map(scaleValue, 0, 1, dark, light), volume/scaleValue, lerpFactor * 1);
            let colight = p.lerp(p.map(scaleValue, 0, 1, 0, 255), volume, lerpFactor * 1);
            // onWeather ? p.fill(scaleValue*windSpeed): p.noFill();
            let girishCol = p.color(25 * scaleValue + col / 2, col * scaleValue, col * scaleValue - col / 3, 80);
            let onWeatherColor = p.color((humidity*scaleValue)+col, windAng/(col)*scaleValue, bgB+col*scaleValue, 120);
            if(theme === 'dark'){
                day ? p.fill((dark*scaleValue)-col): p.noFill();
                p.strokeWeight(1.4*strokeW / scaleValue);
                p.stroke(onWeather ? onWeatherColor : girishCol);
                p.push();
                p.translate(mean.x, mean.y,(zPosition * 20)+ offCorrection);
                if (doRotate) {
                    p.rotate((i - 1) / max * p.PI / 3);
                }
                p.scale(scaleValue);
                drawShapeByMeanOffset(shape, mean);
                p.pop();
            }else{
                p.noFill();
                p.strokeWeight(strokeW / scaleValue);
                p.stroke(255 * scaleValue + col / 2, colight * scaleValue, colight * scaleValue - colight / 2);
                p.push();
                p.translate(mean.x, mean.y);
                if (doRotate) {
                    p.rotate((i - 1) / max * p.PI / 2);
                }
                p.scale(scaleValue);
                drawShapeByMeanOffset(shape, mean);
                p.pop();
            }
          
        }
    }
    function drawShape(shape) {
        p.beginShape();
        for (let edge of shape.edges.array) {
            p.vertex(edge.start.x, edge.start.y);
        }
        p.endShape(p.CLOSE);
    }

    function drawShapeByMeanOffset(shape, optionalMean) {
        let mean = optionalMean || shape.center;
        p.beginShape();
        for (let edge of shape.edges.array) {
            p.vertex(edge.start.x - mean.x, edge.start.y - mean.y);
        }
        p.endShape(p.CLOSE);
    }
    function getShapesFromDelaunay(delaunay) {
        let shapes = new List();
        for (let triangle of delaunay.triangles.array) {
            let center = triangle.center;
            let one = new Edge({ start: center, end: triangle.a });
            let two = new Edge({ start: center, end: triangle.b });
            let three = new Edge({ start: center, end: triangle.c });
            let shapeOne = new Shape(one);
            let shapeTwo = new Shape(two);
            let shapeThree = new Shape(three);
            shapeOne.add(two);
            shapeTwo.add(three);
            shapeThree.add(one);

            let neighborShapeOne = getNeighbor(new Edge({ start: triangle.a, end: triangle.b }), triangle.neighbors);
            let neighborShapeTwo = getNeighbor(new Edge({ start: triangle.b, end: triangle.c }), triangle.neighbors);
            let neighborShapeThree = getNeighbor(new Edge({ start: triangle.c, end: triangle.a }), triangle.neighbors);
            connectToCenter(shapeOne, triangle.a, triangle.b, neighborShapeOne);
            connectToCenter(shapeTwo, triangle.b, triangle.c, neighborShapeTwo);
            connectToCenter(shapeThree, triangle.c, triangle.a, neighborShapeThree);

            if (shapeOne.closed && !shapes.contains(shapeOne)) {
                shapes.add(shapeOne);
            }
            if (shapeTwo.closed && !shapes.contains(shapeTwo)) {
                shapes.add(shapeTwo);
            }
            if (shapeThree.closed && !shapes.contains(shapeThree)) {
                shapes.add(shapeThree);
            }
        }
        return shapes;
    }
    function getNeighbor(neighborEdge, neighborsList) {
        for (let triangle of neighborsList.array) {
            if (triangle.contains(neighborEdge)) {
                return triangle;
            }
        }
        return null;
    }
    function connectToCenter(shape, sharedVectorOne, sharedVectorTwo, triangle) {
        if (triangle == null) {
            return;
        }
        let center = triangle.center;
        let one = new Edge({ start: sharedVectorOne, end: center });
        let two = new Edge({ start: sharedVectorTwo, end: center });
        shape.add(one);
        shape.add(two);
    }
    p.mousePressed = () => {
        initSubdivision();
    }
    function shouldDo(probability) {
        return p.random(10) < probability;
    }
    function randomInt(a, b) {
        let min = b == null ? 0 : a;
        let max = b == null ? a : b;
        return parseInt(p.random(min, max));
    }
    class List {
        constructor() {
            this.values = [];
        }
        get array() {
            return this.values;
        }
        add(newValue, optionalIndex) {
            if (optionalIndex == null) {
                this.values.push(newValue);
            } else {
                this.array.splice(optionalIndex, 0, newValue);
            }
        }
        set(index, newValue) {
            this.values[index] = newValue;
        }
        get(index) {
            return this.values[index];
        }
        remove(option) {
            if (option.index != null) {
                let index = option.index;
                if (index === this.values.length - 1) {
                    this.values.pop();
                } else if (this.values.length > 1) {
                    this.values[index] = this.values.pop();
                }
            } else {
                let value = option.value;
                let index = this.indexOf(value);
                if (index > -1) {
                    this.remove({ index: index });
                }
            }
        }
        clear() {
            this.values = [];
        }
        size() {
            return this.values.length;
        }
        indexOf(value) {
            if (value == null) {
                return -1;
            }
            for (let i = 0; i < this.values.length; i++) {
                if (value.equals(this.values[i])) {
                    return i;
                }
            }
            return -1;
        }
        contains(value) {
            return this.indexOf(value) !== -1;
        }
        toString() {
            return this.values.join("; ");
        }
    }
    class Edge {
        constructor(options) {
            this.start = options.start;
            this.end = options.end || p.createVector(
                options.start.x + Math.cos(options.angle) * options.length,
                options.start.y + Math.sin(options.angle) * options.length
            );
        }
        get angle() {
            return Math.atan2(this.start.y - this.end.y, this.start.x - this.end.x);
        }
        get mean() {
            return p.createVector(
                0.5 * (this.start.x + this.end.x),
                0.5 * (this.start.y + this.end.y)
            );
        }
        get length() {
            return this.start.dist(this.end);
        }
        switchEnds() {
            let temp = this.start;
            this.start = this.end;
            this.end = temp;
        }
        intersection(other) {
            let deltaX = this.start.x - this.end.x;
            let deltaY = this.start.y - this.end.y;
            let deltaXOther = other.start.x - other.end.x;
            let deltaYOther = other.start.y - other.end.y;
            let denominator = deltaX * deltaYOther - deltaY * deltaXOther;
            let subThis = this.start.x * this.end.y - this.start.y * this.end.x;
            let subOther = other.start.x * other.end.y - other.start.y * other.end.x;
            let x = (subThis * deltaXOther - deltaX * subOther) / denominator;
            let y = (subThis * deltaYOther - deltaY * subOther) / denominator;
            return p.createVector(x, y);
        }
        connects(other) {
            return (this.start.equals(other.start) && this.end.equals(other.end))
                || (this.start.equals(other.end) && this.end.equals(other.start));
        }
        equals(other) {
            return (this.start.equals(other.start) && this.end.equals(other.end))
                || (this.start.equals(other.end) && this.end.equals(other.start));
        }
        draw() {
            p.stroke(200, 0, 0);
            p.strokeWeight(1.4);
            p.line(this.start.x, this.start.y, this.end.x, this.end.y);
        }
    }
    class Triangle {
        constructor(a, b, c) {
            let mean = p.createVector((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);
            let thetaA = Math.atan2(a.y - mean.y, a.x - mean.x);
            let thetaB = Math.atan2(b.y - mean.y, b.x - mean.x);
            let thetaC = Math.atan2(c.y - mean.y, c.x - mean.x);
            if (thetaA > thetaB && thetaA > thetaC) {
                this.a = a;
                if (thetaB > thetaC) {
                    this.b = b;
                    this.c = c;
                } else {
                    this.b = c;
                    this.c = b;
                }
            } else if (thetaB > thetaC) {
                this.a = b;
                if (thetaA > thetaC) {
                    this.b = a;
                    this.c = c;
                } else {
                    this.b = c;
                    this.c = a;
                }
            } else {
                this.a = c;
                if (thetaA > thetaB) {
                    this.b = a;
                    this.c = b;
                } else {
                    this.b = b;
                    this.c = a;
                }
            }

            this.edges = [
                new Edge({ start: this.a, end: this.b }),
                new Edge({ start: this.b, end: this.c }),
                new Edge({ start: this.c, end: this.a })
            ];
            this.neighbors = new List();
        }

        get circumcenter() {
            let halfPi = (Math.PI * 0.5);
            let bisectorOne = new Edge({ start: this.edges[0].mean, angle: this.edges[0].angle + halfPi, length: this.edges[0].length });
            let bisectorTwo = new Edge({ start: this.edges[1].mean, angle: this.edges[1].angle + halfPi, length: this.edges[1].length });
            return bisectorOne.intersection(bisectorTwo);
        }

        get radius() {
            return this.a.dist(this.circumcenter);
        }

        registerNeighbor(triangle) {
            if (!this.neighbors.contains(triangle)) {
                this.neighbors.add(triangle);
            }
        }

        addNeighbor(triangle) {
            if (triangle != null) {
                triangle.registerNeighbor(this);
                this.registerNeighbor(triangle);
            }
        }

        addNeighbors(neighbors) {
            neighbors.array.forEach(neighbor => this.addNeighbor(neighbor));
        }

        unRegisterNeighbor(triangle) {
            this.neighbors.remove({ value: triangle });
        }

        removeAllNeighbors() {
            this.neighbors.array.forEach(n => n.unRegisterNeighbor(this));
            this.neighbors.clear();
        }

        size() {
            let aLength = this.edges[0].length;
            let bLength = this.edges[1].length;
            let cLength = this.edges[2].length;
            let s = (aLength + bLength + cLength) / 2;
            return Math.sqrt(s * (s - aLength) * (s - bLength) * (s - cLength));
        }

        get center() {
            return p.createVector(
                (this.a.x + this.b.x + this.c.x) / 3,
                (this.a.y + this.b.y + this.c.y) / 3
            );
        }

        contains(edge) {
            return this.edges[0].equals(edge) || this.edges[1].equals(edge) || this.edges[2].equals(edge);
        }

        complement(neighbor) {
            if (!neighbor.a.equals(this.a) && !neighbor.a.equals(this.b) && !neighbor.a.equals(this.c)) {
                return neighbor.a;
            } else if (!neighbor.b.equals(this.a) && !neighbor.b.equals(this.b) && !neighbor.b.equals(this.c)) {
                return neighbor.b;
            }
            return neighbor.c;
        }

        side(a, b, c) {
            return (b.y - a.y) * (c.x - a.x) + (-b.x + a.x) * (c.y - a.y);
        }

        // source: // http://totologic.blogspot.com/2014/01/accurate-point-in-triangle-test.html
        inSide(p) {
            return this.side(this.a, this.b, p) >= 0 && this.side(this.b, this.c, p) >= 0 && this.side(this.c, this.a, p) >= 0;
        }

        inSideCircle(p) {
            let circumCenter = this.circumcenter;
            return p.dist(circumCenter) < this.a.dist(circumCenter);
        }

        isNeighbor(other) {
            for (let i = 0; i < this.edges.length; i++) {
                for (let j = 0; j < other.edges.length; j++) {
                    if (this.edges[i].equals(other.edges[j])) {
                        return this.edges[i];
                    }
                }
            }
            return false;
        }

        union(other) {
            return this.isNeighbor(other);
        }

        draw() {
        Triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
        }

        equals(other) {
            return this.a.equals(other.a) && this.b.equals(other.b) && this.c.equals(other.c);
        }

        toString() {
            return "[" + this.a.toString() + " " + this.b.toString() + " " + this.c.toString() + "]"
        }
    }
    class Shape {
        constructor(edge) {
            this.edges = new List();
            this.edges.add(edge);
        }

        get volume() {
            if (!this.closed) {
                return 0;
            }
            let volume = 0;
            for (let edge of this.edges.array) {
                volume += edge.length;
            }
            return volume;
        }

        get mean() {
            let mean = p.createVector(0, 0);
            for (let edge of this.edges.array) {
                mean.x += edge.start.x;
                mean.y += edge.start.y;
            }
            mean.x /= this.edges.size();
            mean.y /= this.edges.size();
            return mean;
        }

        get closed() {
            return this.edges.size() > 2 && this.edges.get(0).start.equals(this.edges.get(this.edges.size() - 1).end);
        }

        equals(other) {
            if (this.edges.size() != other.edges.size()) {
                return false;
            }
            for (let i = 0; i < this.edges.size(); i++) {
                if (!other.edges.contains(this.edges.get(i))) {
                    return false;
                }
            }
            return true;
        }

        add(newEdge) {
            let index = this.edges.size() - 1;
            let simpleCopy = new Edge({ start: newEdge.start, end: newEdge.end });
            let connector = this.edges.get(index);
            if (connector.start.equals(simpleCopy.end)) {
                this.edges.add(simpleCopy, index);
            } else if (connector.start.equals(simpleCopy.start)) {
                simpleCopy.switchEnds();
                this.edges.add(simpleCopy, index);
            } else if (connector.end.equals(simpleCopy.start)) {
                this.edges.add(simpleCopy, index + 1);
            } else {
                simpleCopy.switchEnds();
                this.edges.add(simpleCopy, index + 1);
            }
        }
    }
    class Delaunay {
        constructor(a, b, c) {
            this.initialTriangle = new Triangle(a, b, c);
            this.triangles = new List();
            this.clear();
        }
        clear() {
            this.triangles.clear();
            this.triangles.add(this.initialTriangle);
        }
        size() {
            return this.triangles.size();
        }
        get(i) {
            return this.triangles.get(i);
        }
        draw() {
            this.triangles.array.forEach(triangle => triangle.draw());
        }
        findNeighbors(a, sources) {
            let neighbors = new List();
            sources.forEach(source => {
                source.neighbors.array.forEach(sourceTriangle => {
                    if (a.isNeighbor(sourceTriangle)) {
                        neighbors.add(sourceTriangle);
                    }
                });
            });
            return neighbors;
        }
        optimize(index) {
            let startIndex = index || 0;
            let flipped = true;
            for (let attempts = 0; flipped && attempts < 10; attempts++) {
                flipped = false;
                for (let i = startIndex; i < this.triangles.size(); i++) {
                    flipped |= this.optimizeTriangleByIndex(i);
                }
                attempts++;
            }
        }
        optimizeTriangleByIndex(index) {
            let flipped = false;
            let aTriangle = this.triangles.get(index);
            let neighbors = aTriangle.neighbors.array;
            for (let k = 0; k < neighbors.length; k++) {
                let bTriangle = neighbors[k];
                let bExclusiveVector = aTriangle.complement(bTriangle);
                if (!aTriangle.inSideCircle(bExclusiveVector)) {
                    continue;
                }
                flipped = true;
                let unionEdge = aTriangle.union(bTriangle);
                let aExclusiveVector = bTriangle.complement(aTriangle);
                let newTriangleA = new Triangle(bExclusiveVector, aExclusiveVector, unionEdge.start);
                let newTriangleB = new Triangle(bExclusiveVector, aExclusiveVector, unionEdge.end);
                let newTriangleANeighbors = this.findNeighbors(newTriangleA, [aTriangle, bTriangle]);
                let newTriangleBNeighbors = this.findNeighbors(newTriangleB, [aTriangle, bTriangle]);
                newTriangleA.addNeighbors(newTriangleANeighbors);
                newTriangleB.addNeighbors(newTriangleBNeighbors);
                newTriangleA.addNeighbor(newTriangleB);
                aTriangle.removeAllNeighbors();
                bTriangle.removeAllNeighbors();
                this.triangles.set(index, newTriangleA);
                this.triangles.set(this.triangles.indexOf(bTriangle), newTriangleB);
                break;
            }
            return flipped;
        }
        findTriangle(p) {
            for (let i = 0; i < this.triangles.size(); i++) {
                let triangle = this.triangles.get(i);
                if (triangle.inSide(p)) {
                    return i;
                }
            }
            return -1;
        }
        findFirstNeighbor(triangles, triangle) {
            for (let i = 0; i < triangles.length; i++) {
                if (triangle.isNeighbor(triangles[i])) {
                    return triangles[i];
                }
            }
            return null;
        }
        add(newPoint, optionalIndex) {
            let index = optionalIndex || this.findTriangle(newPoint);
            if (index == null || index === -1) {
                return;
            }
            let inside = this.triangles.get(index);
            let a = inside.a;
            let b = inside.b;
            let c = inside.c;
            let neighbors = inside.neighbors.array;
            let newTriangleOne = new Triangle(a, b, newPoint);
            let newTriangleTwo = new Triangle(b, c, newPoint);
            let newTriangleThree = new Triangle(c, a, newPoint);
            let newTriangleOneNeighbor = this.findFirstNeighbor(neighbors, newTriangleOne);
            let newTriangleTwoNeighbor = this.findFirstNeighbor(neighbors, newTriangleTwo);
            let newTriangleThreeNeighbor = this.findFirstNeighbor(neighbors, newTriangleThree);
            inside.removeAllNeighbors();
            newTriangleOne.addNeighbor(newTriangleTwo);
            newTriangleOne.addNeighbor(newTriangleOneNeighbor);
            newTriangleTwo.addNeighbor(newTriangleThree);
            newTriangleTwo.addNeighbor(newTriangleTwoNeighbor);
            newTriangleThree.addNeighbor(newTriangleOne);
            newTriangleThree.addNeighbor(newTriangleThreeNeighbor);
            this.triangles.remove({ index: index });
            this.triangles.add(newTriangleOne);
            this.triangles.add(newTriangleTwo);
            this.triangles.add(newTriangleThree);
            this.optimize(Math.max(this.triangles.size() - 4, 0));
            this.optimize();
        }
    }
    p.updateTheme = updateTheme;
}

export default p5SketchRoom;