
import BezierEasing from 'bezier-easing';
import { calculateLightIntensity, timeToMinutes, loadAndModifySVG } from './utils/utilsSketchs';
import { modifications } from './utils/utilsSketchs';

function selectImagesBasedOnTheme(theme) {
    return theme === 'dark' ? modifications.base.dark : modifications.base.light;
}
function getClimateZone(lat) {
    if (lat >= -13.5 && lat <= 13.5) {
        return 'desierto';
    } else if (lat >= -23.5 && lat <= 23.5) {
        return 'calida';
    } else if (lat >= -40 && lat <= 40) {
        return 'media';
    } else {
        return 'fria';
    }
}

const rainVert = `
precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

const rainFrag = `
precision mediump float;
varying vec2 vTexCoord;

uniform float uTime;
uniform vec2 uReso;
uniform float uMouseOffset;
uniform float uWind;
uniform float uIsDay;
uniform vec3 uBgColor;
uniform float uRainAmount;

float N12(vec2 p){
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + vec2(34.345));
  return fract(p.x * p.y);
}

vec3 Layer(vec2 uv0, float t, float layerScale){
  // Físicas idénticas a Codrops: Gotículas chicas (layerScale alto) y grandes, pero suavizada
  // la diferencia radical para que la variación no sea tan abrupta
  float windDeflect = mix(0.1, 1.2, (layerScale - 1.0) / 0.57); 
  float gravSpeed = mix(0.65, 0.15, (layerScale - 1.0) / 0.57);
  
  vec2 uvShear = uv0;
  
  // Parabolic wind shear: starts at 0 at the top, curves strongly near bottom (friction effect)
  // Since we flipped uv.y inside main(), top is uv0.y=1.0 and bottom is uv0.y=0.0
  float distanceFromTop = 1.0 - uv0.y;
  uvShear.x += pow(distanceFromTop, 2.0) * uWind * windDeflect;
  
  vec2 asp = vec2(2.0, 1.0);
  // Grid size determines drop dimension. Larger multiplier = smaller drops.
  vec2 uv1 = uvShear * 2.5 * layerScale * asp;
  
  // Base falling speed, relative to layer
  float trailSpeed = 0.25 * (gravSpeed / 0.4);
  uv1.y += t * trailSpeed;
  
  vec2 gv = fract(uv1) - 0.5;
  vec2 id = floor(uv1);
  float n = N12(id);
  t += n * 6.28318530718;
  float w = uvShear.y * 10.0;
  float x = (n - 0.5) * 0.8;
  
  // Surface tension wiggle purely horizontal
  x += (0.4 - abs(x)) * sin(3.0 * w) * pow(abs(sin(w)), 6.0) * 0.45;
  
  // Offsets base aleatorios en Y para romper de una vez por todas la "alineación de grilla" horizontal
  float yOffset = (fract(n * 23.456) - 0.5) * 0.55; 
  
  // Mathematically locked vertical drop con fricción asimétrica
  float y = -sin(t + sin(t)) * (trailSpeed * 0.4) + yOffset;
  y -= (gv.x - x) * (gv.x - x);
  
  // Randomizer filters out drops based on API rain intensity without affecting their timing phase
  float existenceSeed = fract(sin(dot(id, vec2(12.9898, 78.233))) * 43758.5453);
  float activeDrop = step(1.0 - uRainAmount, existenceSeed); 
  
  vec2 dropPos  = (gv - vec2(x, y)) / asp;
  float drop    = smoothstep(0.04, 0.01, length(dropPos)) * activeDrop;
  
  // Estela Estática: eliminamos 't * trailSpeed' para que las gotitas abandonadas se claven en el cristal
  vec2 trailPos = (gv - vec2(x, 0.0)) / asp;
  
  // Frecuencia dinámica y ruido de estela basado en drop.nextSpawn de Codrops
  // Mezclamos un espaciado entre gotas sumamente irregular y añadimos distorsión Seno para ocultar el espaciado paramétrico matematico
  float trailSpacing = mix(5.0, 22.0, fract(n * 98.765)); 
  float warpY = trailPos.y * trailSpacing + sin(trailPos.y * trailSpacing * 1.5) * 0.4;
  
  trailPos.y = (fract(warpY) - 0.5) / trailSpacing;
  
  // Variación aleatoria del tamaño (trailDrop.r = drop.r * random(0.2, 0.5)) de Codrops directamente acoplado a math en el Shader
  float trailSize = mix(0.006, 0.016, fract(n * 34.567));
  float trail = smoothstep(trailSize, trailSize - 0.004, length(trailPos)) * activeDrop;
  
  // Original trail mask logic (requires gv.y calculation which is now fixed by flipped vTexCoords)
  float trailMask = smoothstep(-0.05, 0.05, dropPos.y) * smoothstep(0.9, y, gv.y);
  trail *= trailMask;
  
  vec2 offset = drop * dropPos + trail * trailPos;
  float shapeMask = max(drop, trail);
  return vec3(offset, shapeMask);
}

void main() {
  vec2 uv = vTexCoord;
  
  // CRITICAL FIX: p5.js textures have y=0 at top, but this rain physics assumes y=0 at bottom!
  uv.y = 1.0 - uv.y;
  
  uv.x *= uReso.x / uReso.y; 
  
  // Use natural time speed smoothly scaled by JavaScript to prevent abrupt jumps
  float t = mod(uTime * 2.0, 7200.0);
  
  vec3 drops = Layer(uv, t, 1.0);
  drops += Layer(uv + vec2(0.54, 0.2), t, 1.25);
  drops += Layer(uv - vec2(17.54, 0.1), t, 1.57); // Quitamos la capa intermedia para compensar y tener pocas gotas

  // Isolate mask to properly separate 'center of drop' (xy=0, z>0) from 'outer space' (xy=0, z=0)
  float mask = smoothstep(0.0, 0.1, drops.z); 
  
  // Reconstruct true normal vector of the 3D surface
  // 'drops.xy' behaves as an inward-pushing vector field representing the hemisphere
  vec2 Nxy = drops.xy * 25.0; 
  float Nz = sqrt(max(0.0, 1.0 - dot(Nxy, Nxy)));
  vec3 N = normalize(vec3(Nxy, Nz));
  
  // ====================================================================
  // PARÁMETROS VISUALES (MODIFICAR ESTOS VALORES PARA CAMBIAR EL ESTILO)
  // ====================================================================

  // 1. DENSIDAD DE GOTAS (Dentro del archivo en p.updateGlass también se puede ajustar velocidad)
  // Para cambiar cuántas gotas aparecen, buscar "uvShear * 2.5" más arriba en la función Layer(). Mayor = más pequeñas.

  // 2. ILUMINACIÓN VOLUMÉTRICA
  vec3 lightDir = normalize(vec3(-0.6, 0.8, 1.0)); // Dirección del sol (X, Y, Z).
  float fresnel = pow(1.0 - max(0.0, Nz), 3.0); // Oscurecimiento de los bordes curvas del agua.
  
  // 3. PUNTO DE LUZ BLANCO (Specular Highlight)
  // specularSharpness: Mayor valor (>60) = Punto afilado/cortante. Menor valor (<30) = Luz muy suave y grande.
  // specularIntensity: Brillo del destello (Dramáticamente reducido en la noche).
  float specularSharpness = 25.0; 
  float specularIntensity = mix(0.02, 1.2, uIsDay); // 0.02 casi apagado de noche, 1.2 de día
  float specular = pow(max(0.0, dot(reflect(-lightDir, N), vec3(0.0, 0.0, 1.0))), specularSharpness);
  
  // 4. LUZ INTERNA (Reflejo en la base de la gota por efecto lupa)
  float internalReflect = max(0.0, dot(N, normalize(vec3(0.6, -0.8, -0.1)))); 
  
  // 5. COLORES BASE DEL AGUA
  // Ahora el color base enlaza dinámicamente al fondo del cielo de la API (bgColor).
  // Mantenemos un piso de color (tu color lila nocturno) por si el fondo se vuelve totalmente negro.
  vec3 nightMinimum = vec3(0.21, 0.20, 0.28); 
  vec3 color = max(uBgColor, nightMinimum * (1.0 - uIsDay)); 
  
  // 6. COMPUESTO DE FÍSICA Y BORDES
  // refTone: el brillo interno rebotando en la "panza" de la gota asumiendo el reflejo del cielo ambiental.
  vec3 refTone = uBgColor * 1.3 + mix(vec3(0.0), vec3(0.1, 0.15, 0.2), uIsDay); 
  color += refTone * internalReflect; // Contribución de luz de rebote en la panza de la gota
  color = mix(color, vec3(0.0), fresnel * 0.9); // Bordes oscurecidos
  color += vec3(1.0) * specular * specularIntensity; // Destello blanco aplicado sumando
  
  // 7. OPACIDAD / TRANSPARENCIA
  // baseTransparency: Qué tan invisible es el centro plano de la gota (0.0 = perfecto cristal, 1.0 = sólido).
  // edgeOpacity: Qué tan opaca se hace la gota cerca de los bordes.
  float baseTransparency = 0.25; 
  float edgeOpacity = 0.45; 
  
  float alphaBase = baseTransparency + fresnel * edgeOpacity;
  float alpha = mask * clamp(alphaBase + specular, 0.0, 1.0);
  
  // ====================================================================

  // Mezcla final (Premultiplied blend ready for p5 DOM overdrawing)
  gl_FragColor = vec4(color * alpha, alpha);
}
`;

const p5SketchForest = (p, theme, weatherData, options = {}) => {
    const useShaderGlass = options.isFullscreen === true;
    const getRainValue = (data) => {
        if (!data || !data.rain) return 0;
        return data.rain['1h'] || data.rain.lh || data.rain['3h'] || 0;
    };

    let N = 150;
    let A = 20;
    let divisor = 2;
    const num_trees = 102;
    const wordSpeed = 1200;
    let cloudsAll = 50;
    let rain = 0;
    if (weatherData) {
        if (weatherData.clouds && typeof weatherData.clouds.all === 'number') {
            cloudsAll = weatherData.clouds.all;
            N = Math.ceil(p.map(cloudsAll, 0, 100, 300, 50));
            if (N > 250) A = 1;
        }
        const rainVal = getRainValue(weatherData);
        if (typeof rainVal === 'number' && rainVal > 0) {
            rain = Math.ceil(p.map(rainVal, 0, 10, 0, 30));
            N -= rain;
            A += rain;
        }
    }
    let grid;
    let agents;
    let glass;
    let rainShader;
    let mouseOffsetAccum = 0;
    let rainTimeAccum = 0;
    let smoothedMouseSpeed = 0;
    let rainAmount = 0.6; // Default lluvia sin API vinculada
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
    let isSafari;
    let offset = 220;
    const easing = BezierEasing(0.42, 0, 0.58, 1);
    const resetClassicGlass = () => {
        grid = Array.from(new Array(N), () => new Array(N).fill(0));
        agents = Array(A).fill().map(() => ({ x: 0, y: 0 }));
    };
    resetClassicGlass();

    p.preload = () => {
        const baseUrl = '/assets/';
        let svgFileName = '1.svg';
        let modificationSet = modifications.base;
        if (weatherData) {
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
        if (newTheme === 'dark') {
            traslucid = 5;
            day = false;
            col = 1.2;
            numDrops = 2;
        } else if (newTheme === 'light') {
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
            
            // Extract rainfall correctly natively from API structure mapping into drop chance 
            if (weatherData.rain) {
                let rainVal = getRainValue(weatherData);
                
                if (rainVal === 0) {
                    rainAmount = 0.0; // Absolutamente nada de lluvia si marca explícitamente 0
                } else {
                    // Si existe aunque sea una mínima fracción de lluvia (>0), 
                    // empujamos la densidad minima visible a 0.15 para que se aprecien las gotas
                    rainAmount = p.constrain(p.map(rainVal, 0.01, 8, 0.15, 1.0), 0.15, 1.0);
                }
            } else {
                rainAmount = 0.0; // Si no hay datos de lluvia el cielo está despejado.
            }
            
            const windSpeed = weatherData.wind.speed;//4.25
            const windAng = weatherData.wind.deg;//190
            const currentTime = timeToMinutes(localTime);
            const sunriseTime = timeToMinutes(weatherData.sunriseHour);
            const sunsetTime = timeToMinutes(weatherData.sunsetHour);

            const { intensity, reddishTone } = calculateLightIntensity(currentTime, sunriseTime, sunsetTime);
            if (currentTime > sunriseTime && currentTime < sunsetTime) {
                isDayCity = true;
            } else {
                isDayCity = false;
            }
            bgColor = p.color(intensity, intensity - reddishTone * 0.2, intensity - reddishTone * 0.2);
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
    const initializeForestScene = () => {
        bosque.bosque = [];
        bosque.init();

        if (useShaderGlass) {
            if (!glass) {
                glass = p.createGraphics(p.width, p.height, p.WEBGL);
                rainShader = glass.createShader(rainVert, rainFrag);
            } else {
                glass.resizeCanvas(p.width, p.height);
            }

            rainTimeAccum = 0;
            mouseOffsetAccum = 0;
        } else {
            resetClassicGlass();
            glass = p.createGraphics(N / divisor, N / divisor);
        }

        lastMouseY = p.mouseY;
    };

    p.setup = () => {
        let renderTarget = p._userNode;
        let computedStyle = getComputedStyle(renderTarget);
        let width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
        let height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
        canvas = p.createCanvas(width, height);
        p.pixelDensity(p.displayDensity());
        p.noStroke();
        initializeForestScene();

        // isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        // console.log('Es Safari?', isSafari);

        // let isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        // if (isMobileDevice) {
        //     divisor = 4;
        //     canvas.elt.addEventListener("touchmove", handleTouchMove, { passive: false });
        // } else {
        //     canvas.elt.addEventListener("mousemove", handleMouseMove);
        // }
        //console.log(weatherData);
    };
    const updateBackground = () => {
        if (!onWeather) {
            p.background(day ? p.color(237, 240, 220, 180) : 'black');
        } else {
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

    // const handleMouseMove = (event) => {
    //     if (bosque.isRunning) {
    //         lastMouseY = event.clientY; 
    //     }
    // };

    // const handleTouchMove = (event) => {
    //     event.preventDefault(); // Prevenir el scroll de la página

    //     if (bosque.isRunning) {
    //         const touch = event.touches[0];
    //         lastMouseY = touch.clientY; // Actualizar `lastMouseY` según la posición del toque
    //     }
    // };
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
        const computedStyle = getComputedStyle(renderTarget);
        const width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
        const height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
        p.resizeCanvas(width, height);
        initializeForestScene();
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
                // Multiplicador de velocidad de paneo incrementado de 0.008 a 0.018
                arbol.x -= (p.mouseX - p.width / 2) * 0.018;
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
                let mx = ((lastMouseY + offset) - p.height / 2) * 0.3;
                let treeX = arbol.x / arbol.z;
                let treeY = ((68 + mx) / arbol.z) - mx;
                let treeWidth = (arbol.y / arbol.z) * 0.8;
                let treeHeight = arbol.y / arbol.z;

                if (isSafari) {
                    p.push();
                    //sombra
                    p.image(mySvg1, treeX - treeWidth * 0.09, treeY - treeHeight * 0.01, treeWidth, treeHeight * 0.1);
                    p.translate(treeX, treeY);
                    p.scale(1, -1);
                    //   p.image(mySvg2, treeX-treeWidth/5.6, treeY, treeWidth, treeHeight);

                    p.image(mySvg2, -treeWidth / 8.2, -treeHeight, treeWidth * 0.8, treeHeight);
                    p.pop();
                } else {
                    p.image(mySvg1, treeX - treeWidth * 0.7, treeY - treeHeight * 0.06, treeWidth, treeHeight * 0.2);
                    p.image(mySvg2, treeX - treeWidth / 5.6, treeY, treeWidth, treeHeight);
                }

            }
        },

        drwく() {
            if (!this.isRunning) return;
            lastMouseY = p.lerp(lastMouseY, p.mouseY, lerpFactor);
            for (const arbol of this.bosque) {
                let mx = ((lastMouseY + offset) - p.height / 2) * 0.3;
                let treeX = arbol.x / arbol.z;
                let treeY = ((76 + mx) / arbol.z) - mx;
                let treeWidth = ((arbol.y * 0.45) / arbol.z);
                let treeHeight = (-arbol.y + mx) / arbol.z;
                //arbol
                p.image(mySvg, treeX, treeY, treeWidth, treeHeight);
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
    const updateShaderGlass = () => {
        let targetMouseSpeed = (p.mouseX - p.width / 2) * 0.002;
        // Dampen the reaction to the mouse so it feels more like a physical car turning
        smoothedMouseSpeed = p.lerp(smoothedMouseSpeed, targetMouseSpeed, 0.05);
        mouseOffsetAccum += smoothedMouseSpeed * 0.03;

        // Accelerate the time cleanly proportional to mouse distance from center, but reduced top speed
        let timeDelta = p.deltaTime || 16.6;
        let speedMultiplier = 1.0 + Math.abs(smoothedMouseSpeed) * 3.5;
        rainTimeAccum += (timeDelta / 1000.0) * speedMultiplier;

        // Get actual alpha based on the original logic
        let actualAlpha = onWeather ? 10 : (40 * col);

        // Draw the background color layer on 2D canvas directly
        p.noStroke();
        if (onWeather) {
            let addLight = isDayCity ? 100 : -20;
            let rBg = Math.ceil(p.red(bgColor)) + addLight;
            let gBg = Math.ceil(p.green(bgColor)) + addLight;
            let bBg = Math.ceil(p.blue(bgColor)) + addLight;
            p.fill(rBg, gBg, bBg, actualAlpha);
            p.rect(0, 0, p.width, p.height);
        } else {
            p.fill(46 * col, 56 * col, 63 * col, actualAlpha);
            p.rect(0, 0, p.width, p.height);
        }

        // Calculate wind effect based on mouse distance, drastically reduced force
        let uWind = smoothedMouseSpeed * 0.3; 
        
        // Pass dynamic background color to shader
        let actualBgColor = !onWeather ? (day ? p.color(237, 240, 220) : p.color(0)) : bgColor;
        let uBg = [p.red(actualBgColor) / 255.0, p.green(actualBgColor) / 255.0, p.blue(actualBgColor) / 255.0];

        glass.shader(rainShader);
        rainShader.setUniform('uBgColor', uBg);
        rainShader.setUniform('uRainAmount', rainAmount);
        rainShader.setUniform('uTime', rainTimeAccum);
        rainShader.setUniform('uReso', [p.width, p.height]);
        rainShader.setUniform('uMouseOffset', mouseOffsetAccum);
        rainShader.setUniform('uWind', uWind);
        rainShader.setUniform('uIsDay', day ? 1.0 : 0.0);

        glass.clear();
        glass.noStroke();
        glass.rect(-glass.width / 2, -glass.height / 2, glass.width, glass.height);

        p.image(glass, 0, 0, p.width, p.height);
    };

    const updateClassicGlass = () => {
        for (let i = agents.length; i--;) {
            const agent = agents[i];
            const r = p.noise(i + p.frameCount / 199) * 20;
            agent.x -= (p.mouseX - p.width / 2) * 0.002;
            agent.x = (agent.x + p.cos(r) + N * 2) % N;
            agent.y = (agent.y + p.sin(r) + 1 + N) % N;
            grid[p.int(agent.x)][p.int(agent.y)] = 2;
        }

        let old = [];
        for (let x = N; x--;) old[x] = grid[x].slice();

        for (let x = N; x--;) {
            for (let y = N; y--;) {
                let sum =
                    +old[x][(y - 1 + N) % N]
                    + old[x][(y + 1) % N]
                    + old[x][y] * 2
                    + old[(x + 1) % N][y]
                    + old[(x - 1 + N) % N][y];
                grid[x][y] = (sum == numDrops) + (sum == 4 / col);
            }
        }

        if (onWeather) {
            let addLight = isDayCity ? 100 : -20;
            let r = Math.ceil(p.red(bgColor)) + addLight;
            let g = Math.ceil(p.green(bgColor)) + addLight;
            let b = Math.ceil(p.blue(bgColor)) + addLight;
            glass.background(r, g, b, 20);
        }
        glass.background(46 * col, 56 * col, 63 * col, traslucid);

        glass.loadPixels();
        for (let x = N; x--;) {
            for (let y = N; y--;) {
                const index = (x + y * N) * 4;
                glass.pixels[index + 3] = grid[x][y] ? 255 : onWeather ? 10 : 40 * col;
                if (grid[x][y] > p.frameCount % 200) {
                    grid[x][y] = 0;
                }
            }
        }
        glass.updatePixels();
        p.image(glass, 0, 0, p.width, p.height);
    };

    p.updateGlass = () => {
        if (useShaderGlass) {
            updateShaderGlass();
            return;
        }
        updateClassicGlass();
    };
    p.updateTheme = updateTheme;
}
export default p5SketchForest;
