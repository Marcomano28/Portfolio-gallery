import { calculateLightIntensity, timeToMinutes } from "./utils/utilsSketchs";

const p5SketchHanuman = (p ,theme, weatherData) => {
    let a;
    let b;
    let range = 1.1;
    let yy = 0;
    let t;
    let canvas;
    let traslucid, col, fact, scalar, perMathR, perMathG, perMathB;
    let day;
    let bgColor;
    let isDayCity;
    let onWeather = false;
    let basicColor = 255;
    let windSpeed;
    let sunriseTime;
    let cloudsAll;
    const updateTheme = (newTheme) => {
           t = 0.35;
        if(newTheme === 'dark'){
           traslucid = 0.3;
           day = false;
           col = 25000;
           fact = 20;
           scalar = 7;
           perMathR = 1;
           perMathB = 1;
           perMathG = 1;
        }else if(newTheme === 'light'){
           traslucid = 1;
           day = true;
           col = 25000;
           fact =128;
           scalar = 8;
           perMathR = 1;
           perMathG = 1;
           perMathB = 1;
        }
    };
    const updateWeatherData = (weatherData) => {
        if (weatherData) {
            t=0.8;
            onWeather = true;
            console.log(weatherData);
            cloudsAll = weatherData.clouds.all;//0,100
            const localTime = weatherData.localTime;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;//79
            const pressure = weatherData.main.pressure;//1016
            // const rainH = weatherData.rain.1h;//0.75
            windSpeed = weatherData.wind.speed;//4.25
            const windAng = weatherData.wind.deg;//190
            const currentTime = timeToMinutes(localTime);
            sunriseTime = timeToMinutes(weatherData.sunriseHour);
            const sunsetTime = timeToMinutes(weatherData.sunsetHour);
         
            const { intensity, reddishTone } = calculateLightIntensity(currentTime, sunriseTime, sunsetTime);
            bgColor = p.color(intensity, intensity - reddishTone*0.2, intensity - reddishTone*0.2);
            //console.log(`Color RGB: ${bgColor.levels}`); 
            if(theme === 'dark'){
               // basicColor = 125;
               traslucid = 0.3;
            }
            if(currentTime > sunriseTime && currentTime < sunsetTime){
                isDayCity = true;
                traslucid = windSpeed;
                scalar = Math.floor(p.map(windAng, 0, 360, 6, 10));
                fact = humidity;
            }else{
                isDayCity = false;
                traslucid = 0.5;
                scalar = Math.floor(p.map(windAng, 0, 360, 2, 4));
            }         
            console.log('en la ciudad es de dia?',isDayCity);
          
            // col = weatherData.wind.speed; 
        }
    };
    if (weatherData) {
        updateWeatherData(weatherData);
        basicColor = 255; 
        col = 100;
         
    } else {
        updateTheme(theme);
        basicColor = 156;
        a = 1/4;
        b = 1/8.6; 
    }
    p.setup = () => {
        let renderTarget = p._userNode;
        let computedStyle = getComputedStyle(renderTarget);
        let width = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
        let height = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
        canvas = p.createCanvas(width, height);
    }
    function f(x, y, n = 0) {
        const d = x * x + y * y;
                
        if (d < 7) {
            return Math.floor(f(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
        } else {
            // return (Math.cos(n / 8) + 1) * 128;
            return (Math.sin(n / scalar + Math.sqrt(x)) + 1) * fact/traslucid;
        }
    }
    function f0(x, y, n = 0) {
        const d = x * x + y * y;
                
        if (d < 7) {
            return Math.floor(f(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
        } else {
            // return (Math.cos(n / 8) + 1) * 128;
            return (Math.sin(n / scalar + Math.sqrt(x)) + 1) * fact/traslucid;
        }
    }
    let ti = p.millis() / 1000; 
    function f1(x, y, n = 0) {
        t = 0.8;
        const d = x * x + y * y;
        if(theme === 'dark'){
            a = 1/4;
            b = 1/6;
            const mx = p.map(p.mouseX, 0, p.width, 1.5, 5.3);  //2.5 ***  
            const my = p.map(p.mouseY,0,p.height,-1.5,1.5);   
            if (d < 9 && n<8) {
                return Math.floor(f1(x * x + y * y - a * x / d*my, my*Math.tan(b*x*y)-1/mx, n + 1));
            } else {
                // return (Math.cos(n / 8) + 1) * 128;
                return (Math.cos(n / 18 + Math.sqrt(x/t)) + 1) * mx/traslucid;
            }
        }else if(theme === 'light'){
            a = 1/4;
            b = 1/9;           
            const mx = p.map(p.mouseX, 0, p.width, 0.2, 0.5);  //2.5 ***        
            const my = p.map(p.mouseY,0,p.height,0.9,1.6);
            const smx  = 41.3;
            const smy = 0.2
            //console.log('mi mx y my:',mx, my);
            if (d < Math.floor(windSpeed) && n < 8) {
                return Math.floor(f1(x * x + y * y - a * 0.5 / d*smy, smy * Math.tan(b*x*smy)-1/1.5, n + 1));              
            } else {          
             return cloudsAll < 50 ?(Math.sin(n / scalar + Math.sqrt(x * my)) + Math.tan(ti/a)) * fact / (2.3*mx):
                (Math.cos(n /(Math.floor(18/smy)) + Math.sqrt(x)) + 1) * smx / traslucid*mx;
            } 
        }    
    }
    function fz(x, y, n = 0) {
        const d = x * x + y * y;
        const mx = p.map(p.mouseX, 0, p.width, -1, 1);
        const my = p.map(p.mouseY, 0, p.height, -1, 1);
        if (d < 9) {
            return Math.floor(f(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
        } else {
            return (Math.sin(n / my + Math.sqrt(x)) - mx) * fact*my;
        }
    }
    function fx(x, y, n = 0) {
        const d = x * x + y * y; 
        if(theme === 'dark'){
            a = 1/4;
            b = 1/6;
            if (d < 9) {
                return Math.floor(f1(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
            } else {
                return (Math.sin(n / scalar + Math.sqrt(x)) + 1) * fact*traslucid;
            }
        } else{
            a = 1/4;
            b = 1/9;
            if (d < 9 && n < 18) {
                return Math.floor(f1(x * x + y * y - a * x / d, 2 * x * y + b * y / d, n + 1));
            } else {
                return (Math.sin(n / scalar + Math.sqrt(x)) + 1) * fact/traslucid;
                
            }
        }
       
    }
    
    p.draw = () => {
        if (yy < p.height) {
            const y = p.map(yy, p.height, 0, -range, range);
            for (let xx = p.width; xx >= -1; xx -= t) {
                const x1 = p.map(xx, p.width, 0, -range, range);
                //const grayScale = onWeather?f1(y, x1):f0(y, x1);
                const grayScale = onWeather?f1(y, x1):f0(y, x1);
                const grayScale2 = onWeather?fx(y, x1):fz(y, x1);
                let distToCenter = p.dist(xx, yy, p.width / 2, p.height / 2);
                let maxDist = p.dist(0, 0, p.mouseX + p.width / 0.9, p.mouseY - p.height / 2);
                
                let darknessFactor = p.map(distToCenter, 0, maxDist, 1, 0);
                let agray0 = grayScale;
                let agray1 = grayScale2 * darknessFactor;
               
                const r = perMathR*(Math.sin(agray1 / 2) ** 2 * basicColor);
                const g = perMathG*((col / agray1) % basicColor*traslucid);
                const b = perMathB*((col / Math.log(agray1)) % basicColor*traslucid);
                const ah = p.map(Math.cos(agray1) ** 2 * 256, 0, 255, 0, 255);

                p.stroke(agray0, agray0, agray0, ah);
                p.line(xx, yy, xx, yy + agray1);
                p.stroke(r, g, b, ah / 2.2);
                // p.stroke(r, g, b, ah);
                p.line(xx, yy, xx, yy + (agray0 / b));
            }
            yy += t;
        }
    }
    p.keyPressed = () => {
        if (p.key === 's' || p.key === 'S') {
            p.saveCanvas(canvas, 'miImagen3', 'jpg');
        }
    }
    p.updateTheme = updateTheme;
}

export default p5SketchHanuman;