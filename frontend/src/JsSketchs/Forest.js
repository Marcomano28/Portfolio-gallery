
import BezierEasing from 'bezier-easing';
import { calculateLightIntensity, timeToMinutes, loadAndModifySVG} from './utils/utilsSketchs';
import { modifications } from './utils/utilsSketchs';

function selectImagesBasedOnTheme(theme) {
    return theme === 'dark' ? modifications.base.dark : modifications.base.light;
}
function getClimateZone(lat) {
    if (lat >= -13.5 && lat <= 13.5) {
        return 'desierto';
    } else if (lat >= -23.5 && lat <= 23.5) {
        return 'calida';
    } else if(lat >= -40 && lat <= 40){
        return 'media';
    }else {
        return 'fria';
    }
}
const p5SketchForest = (p, theme, weatherData) => {
    
    let N = 150;
    let A = 20;
    const num_trees = 102;
    const wordSpeed =1200;
    let cloudsAll;
    let rain;
    if (weatherData) {
        if (weatherData.clouds && typeof weatherData.clouds.all === 'number') {
            cloudsAll = weatherData.clouds.all; // Ejemplo: 0 a 100
            N = Math.ceil(p.map(cloudsAll, 0, 100, 300, 50));
            N > 250 ? A = 1 : 10;
        }
        if (weatherData.rain && typeof weatherData.rain.lh === 'number') {
            rain = Math.ceil(p.map(weatherData.rain.lh, 0, 10, 0, 30)); // Ejemplo: 0.75
            N = N - rain;  // Reducir N en función de rain
            A = A + rain;  // Aumentar A en función de rain
        }
    }
    const grid = Array.from(new Array(N), () => new Array(N).fill(0));
    const agents = Array(A).fill().map(() => ({ x: 0, y: 0 }));
    let glass;
    let mySvg;
    let mySvg1;
    let mySvg2;
    let canvas;
    let col, bgR, bgG, bgB;
    let lastMouseY = 0;
    let lerpFactor = 0.01;
    let day, onWeather = false;
    let isDayCity;
    let traslucid;
    let numDrops;
    let intensity;
    let bgColor;
    const easing = BezierEasing(0.42, 0, 0.58, 1);

    p.preload = () => {
        const baseUrl = '/assets/';
        let svgFileName = '1.svg';
        let modificationSet = modifications.base;
        if(weatherData){
            const climateZone = getClimateZone(weatherData.coord.lat);
            svgFileName = getSvgForClimateZone(climateZone);
            modificationSet = modifications[climateZone];
        }     
        const svgUrl = baseUrl + svgFileName;

        mySvg = p.loadImage(svgUrl, () => {
            //console.log('Original SVG loaded successfully');
        }, (err) => {
            console.error('Failed to load the original SVG:', err);
        });
        p.loadStrings(svgUrl, (svgLines) => {
            let originalSvgText = svgLines.join('\n');

            let modsToApply = weatherData
            ? (isDayCity ? modificationSet.light : modificationSet.dark)
            : selectImagesBasedOnTheme(theme);

            const mod1 = modsToApply[0] || modifications.base.light[0];
            const mod2 = modsToApply[1] || modifications.base.light[1];    
            const modifiedSvg1 = loadAndModifySVG(
                originalSvgText,
                mod1.gradientId,
                mod1.newStops,
                mod1.elementId,
                mod1.newTransform
            );
    
            mySvg1 = p.loadImage(modifiedSvg1, () => {
                URL.revokeObjectURL(modifiedSvg1);
                //console.log('Modified SVG 1 loaded successfully');
            }, (err) => {
                console.error('Failed to load modified SVG 1:', err);
            });

            const modifiedSvg2 = loadAndModifySVG(
                originalSvgText,
                mod2.gradientId,
                mod2.newStops,
                mod2.elementId,
                mod2.newTransform
            );
    
            mySvg2 = p.loadImage(modifiedSvg2, () => {
                URL.revokeObjectURL(modifiedSvg2);
                //console.log('Modified SVG 2 loaded successfully');
            }, (err) => {
                console.error('Failed to load modified SVG 2:', err);
            });
        }, (err) => {
            console.error('Failed to load the original SVG text:', err);
        });
    }   
    function getSvgForClimateZone(zone) {
        switch (zone) {
            case 'desierto': return '5.svg';
            case 'calida': return '2.svg';
            case 'media': return '3.svg';
            case 'fria': return '4.svg';
            default: return '1.svg';
        }
    }
     const updateTheme = (newTheme) => {
        if(newTheme === 'dark'){
           traslucid = 5;
           day = false;
           col = 1.2;
           numDrops = 2;
        }else if(newTheme === 'light'){
           traslucid = 255;
           day = true;
           col = 2.3;
           numDrops = 2;
        }
    };
  
    const updateWeatherData = (weatherData) => {
        if (weatherData) {
            onWeather = true;
            const localTime = weatherData.localTime;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;//79
            const pressure = weatherData.main.pressure;//1016
            // const rainH = weatherData.rain.1h;//0.75
            const windSpeed = weatherData.wind.speed;//4.25
            const windAng = weatherData.wind.deg;//190
            const currentTime = timeToMinutes(localTime);
            const sunriseTime = timeToMinutes(weatherData.sunriseHour);
            const sunsetTime = timeToMinutes(weatherData.sunsetHour);
            
            const { intensity, reddishTone } = calculateLightIntensity(currentTime, sunriseTime, sunsetTime);
            if(currentTime > sunriseTime && currentTime < sunsetTime){
                isDayCity = true;
            }else{
                isDayCity = false;
            } 
            bgColor = p.color(intensity, intensity - reddishTone*0.2, intensity - reddishTone*0.2);
            // const daytime = isCurrentlyDaytime(localTime, sunriseHour, sunsetHour);
            // console.log(daytime ? 'Es de día' : 'Es de noche');
            traslucid = p.map(humidity, 0, 100, 50, 255);
            // col = p.map(temp, -10, 40, 0.5, 6.5);
            bgR = humidity;
            bgG = cloudsAll;
            bgB = weatherData.main.temp_min;
            
            // console.log(col);
            // numDrops = p.map(humidity, 0, 100, 1, 5);
            // day = temp > 20;  // Example: assume day if temp > 20 degrees
        }
    };
    if (weatherData) {
        updateWeatherData(weatherData);
    } else {
        updateTheme(theme);
    }
   
    // updateTheme(theme);
    p.setup = () => {
        let renderTarget = p._userNode;
        let computedStyle = getComputedStyle(renderTarget);
        let width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
        let height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
        canvas = p.createCanvas(width, height);
        p.pixelDensity(p.displayDensity());
        p.noStroke();
        glass = p.createGraphics(N / 2, N / 2);
        bosque.init();
        lastMouseY = p.mouseY;
        let isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobileDevice) {
            canvas.elt.addEventListener("touchmove", handleTouchMove, { passive: false });
        } else {
            canvas.elt.addEventListener("mousemove", handleMouseMove);
        }
        //console.log(weatherData);
    };
    const updateBackground = () => {
        if(!onWeather){
        p.background(day ? p.color(237,240,220,180) : 'black');
        }else{
        // p.background(bgColor);
        // p.background(bgR,bgG,bgB);
        p.background(bgColor);
        }   
    };
    p.draw = () => {
        // p.background(day ? p.color(237,240,220,180) : 'black');
        updateBackground();
        p.updateForest();
        p.updateGlass();
    };

    const handleMouseMove = (event) => {
        if (bosque.isRunning) {
            lastMouseY = event.clientY; 
        }
    };

    const handleTouchMove = (event) => {
        event.preventDefault(); // Prevenir el scroll de la página

        if (bosque.isRunning) {
            const touch = event.touches[0];
            lastMouseY = touch.clientY; // Actualizar `lastMouseY` según la posición del toque
        }
    };
    p.updateTheme = (newTheme) => {
        if (!weatherData) {
            updateTheme(newTheme);
        }
        updateBackground();
    };

    p.updateWeatherData = (newWeatherData) => {
        weatherData = newWeatherData;
        updateWeatherData(newWeatherData);
        updateBackground();
    };
    p.windowResized = () => {
        let renderTarget = p._userNode;
        p.resizeCanvas(renderTarget.offsetWidth, renderTarget.offsetHeight);
    };
    const arbol = (x, y, z) => ({
        x: p.random(p.width) - p.width / 2,
        y: p.random(p.height / 2),
        z: p.random(5),
    });
    const bosque = {
        bosque: [],
        isRunning: true,

        init() {
            for (let i = num_trees; i--;) {
                this.bosque.push(arbol());
            }
        },
        update() {
            if (!this.isRunning) return;
            for (const arbol of this.bosque) {
                arbol.x -= (p.mouseX - p.width / 2) * 0.008;
                if (arbol.x > p.width / 1.8) arbol.x = -p.width / 2;
                if (arbol.x < -p.width / 1.8) arbol.x = p.width / 2;
                const my = p.constrain(lastMouseY, 0, p.height);
                arbol.z -= p.log(1 + my) / wordSpeed;
                if (arbol.z < 0) arbol.z = 6;
            }
            this.bosque.sort((arbol1, arbol2) => (arbol1.z > arbol2.z ? -1 : 1));
        },
        showく() {
            if (!this.isRunning) return;
            p.fill(120, 102);
            lastMouseY = p.lerp(lastMouseY, p.mouseY, lerpFactor);
            for (const arbol of this.bosque) {
                let mx = (lastMouseY - p.width / 2) * 0.3;
                let treeX = arbol.x / arbol.z;
                let treeY = ((68 + mx) / arbol.z) - mx;
                let treeWidth = (arbol.y / arbol.z) * 0.8;
                let treeHeight = arbol.y / arbol.z;
              //sombra
              p.image(mySvg1, treeX-treeWidth * 0.7, treeY-treeHeight*0.06, treeWidth, treeHeight*0.2); 
              //reflejo
              p.image(mySvg2, treeX-treeWidth/5.6, treeY, treeWidth, treeHeight);
            }
        },
        drwく() {
            if (!this.isRunning) return;
            lastMouseY = p.lerp(lastMouseY, p.mouseY, lerpFactor);
            for (const arbol of this.bosque) {
                let mx = ((lastMouseY) - p.width / 2) * 0.3;
                let treeX = arbol.x / arbol.z;
                let treeY = ((76 + mx) / arbol.z) - mx;
                let treeWidth = ((arbol.y * 0.45)/ arbol.z) ;
                let treeHeight = (-arbol.y+mx) / arbol.z;
                //arbol
                p.image(mySvg, treeX, treeY,treeWidth, treeHeight);
            }
        },
    };
    p.updateForest = () => {
        p.push();
        p.translate(p.width / 2, p.height / 2);
        bosque.update();
        bosque.showく();
        bosque.drwく();
        p.pop();
    };
    p.updateGlass = () => {
        for (let i = agents.length; i--;) {
            const agent = agents[i];
            const r = p.noise(i + p.frameCount / 199) * 20;
            agent.x -= (p.mouseX - p.width / 2) * 0.002;
            agent.x = (agent.x + p.cos(r) + N*2) % N;
            agent.y = (agent.y + p.sin(r) + 1 + N) % N;
            grid[p.int(agent.x)][p.int(agent.y)] = 2;
            }
        
        let old = [];
        for (let x = N; x--;) {
            old[x] = grid[x].slice();
        }
        for (let x = N; x--;) {
            for (let y = N; y--;) {
               let sum =
                    +old[x][(y - 1 + N) % N]
                    + old[x][(y + 1) % N]
                    + old[x][y] * 2
                    + old[(x + 1) % N][y]
                    + old[(x - 1 + N) % N][y];
                grid[x][y] = (sum == numDrops) + (sum == 4/col);
            }
        }
        if(onWeather){
            let addLight = isDayCity ? 100 : -20;
            let r = Math.ceil(p.red(bgColor)) + addLight;
            let g = Math.ceil(p.green(bgColor)) + addLight;
            let b = Math.ceil(p.blue(bgColor)) + addLight;
            glass.background(r , g , b , 20);
        }
        glass.background(46 * col , 56 * col , 63 * col , traslucid);
        
        glass.loadPixels();
        for (let x = N; x--;) {
            for (let y = N; y--;) {
                const index = (x + y * N) * 4;
                glass.pixels[index + 3] = grid[x][y] ? 255 : onWeather?10:40*col;
                if (grid[x][y] > p.frameCount % 200) {
                    grid[x][y] = 0; // Reset si la gota ha estado demasiado tiempo
                }
            }
        }
        glass.updatePixels();
        p.image(glass, 0, 0, p.width, p.height);
    };
    p.updateTheme = updateTheme;
}
export default p5SketchForest;