
export function calculateLightIntensity(currentTime, sunriseTime, sunsetTime) {
    const totalDaylightMinutes = sunsetTime - sunriseTime;
    const minutesSinceSunrise = currentTime - sunriseTime;
    const dayProgress = minutesSinceSunrise / totalDaylightMinutes;
    const clampedDayProgress = Math.max(0, Math.min(1, dayProgress));

    // Uso de seno para crear un easing in & out de la intensidad de la luz
    const intensity = Math.sin(clampedDayProgress * Math.PI);

    // Convertir a valores RGB
    const intensityRGB = Math.round(intensity * 255);

    // Calcular el tono rojizo como inversamente proporcional a la intensidad
    const reddishTone = Math.round(255 * (1 - intensity));
    return {
        intensity: intensityRGB,
        reddishTone: reddishTone
    };
}
export function timeToMinutes(time) {
        // Convertir cualquier entrada a string
        time = String(time);   
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }
export const ColoresA = [ 
    "e3d7a3BF-f5989d33-ea618e40-fce4d6b3-caac7180".split("-").map((a) => "#" + a),
    "6cbbd4BF-5863b140-5282a1BF-fee8f733-c1f29b80".split("-").map((a) => "#" + a),
    "1b1b1bBF-29292940-f3f3f3BF-222222b3-ff000080".split("-").map((a) => "#" + a),
    "70c1b3BF-aaf0d340-50514f33-ffe066b3-247ba080".split("-").map((a) => "#" + a),
    "3c1642BF-38637540-08637533-b2ff9eb3-1dd3b080".split("-").map((a) => "#" + a),
    ] ;
export const ColoresB = [
    "e3d7a3-f5989d-ea618e-fce4d6-caac71".split("-").map((a) => "#" + a + "00"),
    "6cbbd4-5863b1-5282a1-fee8f7-c1f29b".split("-").map((a) => "#" + a + "00"),
    "1b1b1b-292929-f3f3f3-222222-ff0000".split("-").map((a) => "#" + a + "00"),
    "70c1b3-aaf0d3-50514f-ffe066-247ba0".split("-").map((a) => "#" + a + "00"),
    "3c1642-386375-086375-b2ff9e-1dd3b0".split("-").map((a) => "#" + a + "00"),
]; 
export const ColoresC = [
     "ffffff".split("-").map((a) => "#" - a),
    "ffffff07".split("-").map((a) => "#" - a),
    "7fdeea-a3b7f0-a1e4f7-6d7db6-5a6696".split("-").map((a) => "#" + a),
    "7fdeea-a3b7f0-a1e4f7-6d7db6-5a6696".split("-").map((a) => "#" + a + "00")
    ]; 
export const ColoresNocturno = [
        "1a1c2eBF-2c3e5033-3d5a8040-4a7c9eb3-5b9ed280".split("-").map((a) => "#" + a),
        "0c1f3dBF-183c6440-24598bBF-2f76b233-3a93d980".split("-").map((a) => "#" + a),
        "080a0fBF-10141f40-181e2fBF-202a3fb3-28365080".split("-").map((a) => "#" + a),
        "1f2d3dBF-2c404f40-394d6133-465a7333-53677380".split("-").map((a) => "#" + a),
        "150c29BF-291840-3d2456BF-51306cb3-65388280".split("-").map((a) => "#" + a),
    ]; 
export const ColoresNocturnos = [
        "1a237e-283593-3949ab-5c6bc0-7986cb".split("-").map((a) => "#" + a),  // Azules profundos
        "263238-37474f-455a64-546e7a-78909c".split("-").map((a) => "#" + a),  // Grises azulados
        "311b92-4527a0-512da8-5e35b1-7e57c2".split("-").map((a) => "#" + a),  // Púrpuras profundos
        "000a12-001f3f-003366-004080-0059b3".split("-").map((a) => "#" + a),  // Azules noche
        "1a1a1a-333333-4d4d4d-666666-808080".split("-").map((a) => "#" + a),  // Grises para sombras
        "c0c0c0-d8e1e8-e0e8f0-e8f1f8-f0f8ff".split("-").map((a) => "#" + a),
    ];

 export const latinAlphabet = [
    "af", // Afrikaans
    "sq", // Albanian
    "de", // German
    "ca", // Catalan
    "cs", // Czech
    "hr", // Croatian
    "da", // Danish
    "nl", // Dutch
    "en", // English
    "et", // Estonian
    "fi", // Finnish
    "fr", // French
    "gl", // Galician
    "de", // Swiss German
    "el", // Greek
    "hu", // Hungarian
    "is", // Icelandic
    "id", // Indonesian
    "it", // Italian
    "la", // Latin
    "lv", // Latvian
    "lt", // Lithuanian
    "ms", // Malay
    "mt", // Maltese
    "no", // Norwegian
    "pl", // Polish
    "pt", // Portuguese
    "ro", // Romanian
    "sk", // Slovak
    "sl", // Slovenian
    "es", // Spanish
    "sv", // Swedish
    "tl", // Tagalog
    "tr", // Turkish
    "vi", // Vietnamese
  ];
  export function loadAndModifySVG(svgString, gradientId, newStopsString, elementId, newTransform) {
    //svgString = svgString.trim().replace(/^\uFEFF/, ''); // Elimina BOM y espacios en blanco
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    //const svgDoc = parser.parseFromString(svgString, "text/html");
    if (svgDoc.documentElement.nodeName === "parsererror") {
        console.error("Error parsing SVG:", svgDoc.documentElement.textContent);
        return null;
    }
    const gradient = svgDoc.getElementById(gradientId);
    if (!gradient) {
        console.error("Gradient element with id '" + gradientId + "' not found");
        return null;
    }
    gradient.innerHTML = newStopsString;
    // Modificar la transformación de otro elemento
    const svgElement = svgDoc.getElementById(elementId);
    if (svgElement) {
        svgElement.setAttribute('transform', newTransform);
    } else {
        console.error("Element with id '" + elementId + "' not found");
        return null;
    }
    const serializer = new XMLSerializer();
    const newSVGString = serializer.serializeToString(svgDoc.documentElement); 
    const blob = new Blob([newSVGString], {type: 'image/svg+xml'});
    return URL.createObjectURL(blob);
     //return `data:image/svg+xml;base64,${window.btoa(encodeURIComponent(newSVGString))}`;
}
export const modifications = {
  base: { //svg1
    light:[
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="10%" style="stop-color:rgba(92,100,102,0.93);stop-opacity:1" />
                   <stop offset="90%" style="stop-color:rgba(240,230,255,0.13);stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "rotate(-90 0 -4) scale(0.4, 1) translate(8.62 0)"
       },
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="20%" style="stop-color:rgb(165,190,190);stop-opacity:1" />
                   <stop offset="90%" style="stop-color:rgba(120,100,130,0.21);stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "rotate(180 0 0) translate(0 0) scale(0.6 1)"
        }
     ],
    dark:[
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="10%" style="stop-color:rgba(142,180,102,0.73);stop-opacity:1" />
                    <stop offset="90%" style="stop-color:rgba(11,12,55,0.03);stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "rotate(-90 0 -4) scale(0.4, 1) translate(23.62 0)"
        },
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="0%" style="stop-color:rgb(225,160,100);stop-opacity:1" />
                    <stop offset="70%" style="stop-color:rgba(50,80,100,0.1);stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "rotate(-180 0 0) scale(0.7 1)"
         }
     ] 
   },
  calida: { //svg2
    light:[
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="10%" style="stop-color:rgba(155,189,220,0.3); stop-opacity:1" />
                   <stop offset="70%" style="stop-color:rgba(100,64,82,0.05); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(112.00,-324.00) scale(-1.0,-0.70) rotate(90 0 0)"
       },
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="20%" style="stop-color:rgba(210,216,200,0.53); stop-opacity:1" />
                   <stop offset="70%" style="stop-color:rgba(65,80,60,0.08); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate (-44.00, -178.00) scale(0.90,-0.90)"
        }
     ],
    dark: [
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="10%" style="stop-color:rgba(43,57,50,0.5); stop-opacity:1" />
                    <stop offset="70%" style="stop-color:rgba(4,2,9,0.27); stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "translate(80.00,-400.00) scale(0.70,0.90) rotate(-90)"
        },
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="20%" style="stop-color:rgba(50,60,80,0.53); stop-opacity:1" />
                    <stop offset="70%" style="stop-color:rgba(10,22,3,0.93); stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "translate (-45.00,-230.0) scale(0.70,-0.80) rotate(0)"
         }
     ] 
   },
  media: { //svg3
    light:[
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="10%" style="stop-color:rgba(255,245,255,0.19); stop-opacity:1" />
                   <stop offset="70%" style="stop-color:rgba(35,34,43,0.1); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(120,100) scale(1.8,0.38) rotate(-110) skewX(7)"
       },
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="30%" style="stop-color:rgba(120,150,130,0.33); stop-opacity:1" />
                   <stop offset="70%" style="stop-color:rgba(45,50,40,0.22); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(-50.00 -12.00) scale(-0.70 -0.90) "
        }
     ],
    dark: [
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="10%" style="stop-color:rgba(105,115,120,0.3); stop-opacity:1" />
                    <stop offset="70%" style="stop-color:rgba(5,4,3,0.1); stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "translate(100.00,200.00) scale(1.50,0.60) rotate(130)"
        },
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="10%" style="stop-color:rgba(40,55,30,0.93); stop-opacity:1" />
                    <stop offset="70%" style="stop-color:rgba(15,10,10,0.93); stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "translate(-60.000000,-35.000000) scale(0.800000,-0.90000)"
         }
     ] 
   }, 
  fria: { //svg4
    light:[
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="10%" style="stop-color:rgba(215,245,255,0.49); stop-opacity:1" />
                   <stop offset="60%" style="stop-color:rgba(45,34,23,0.03); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(-288.00 -190.00) scale(1.810 -0.30) rotate(-90) skewX(37)"
       },
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="30%" style="stop-color:rgba(170,160,160,0.23); stop-opacity:1" />
                   <stop offset="70%" style="stop-color:rgba(35,60,50,0.22); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(-50.00 -109.00) scale(-0.50 -0.810) "
        }
     ],
    dark: [
        {
        gradientId: 'miGradiente',
        newStops: `<stop offset="10%" style="stop-color:rgba(255,245,255,0.18); stop-opacity:1" />
                   <stop offset="70%" style="stop-color:rgba(35,34,43,0.18); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(-250.00,2.00) scale(-1.92,-0.20) rotate(90)"
        },
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="30%" style="stop-color:rgba(120,150,130,0.33); stop-opacity:1" />
                    <stop offset="70%" style="stop-color:rgba(35,60,50,0.2); stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "translate(-70.00,30.00) scale(0.6,-1.0) rotate(0)"
        }
        
     ] 
   },
   desierto: { //5.svg
    light:[
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="10%" style="stop-color:rgba(115,145,155,0.39); stop-opacity:1" />
                   <stop offset="70%" style="stop-color:rgba(45,34,23,0.01); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(40.00 -20.00) scale(0.62,-0.60) rotate(-90)"
       },
       {
        gradientId: 'miGradiente',
        newStops: `<stop offset="30%" style="stop-color:rgba(50,30,30,0.33); stop-opacity:1" />
                   <stop offset="50%" style="stop-color:rgba(35,60,50,0.00); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(51.00,-900.00) scale(0.5,0.2) rotate(180)"
        }
     ],
    dark: [
        {
        gradientId: 'miGradiente',
        newStops: `<stop offset="10%" style="stop-color:rgba(43,57,70,0.5); stop-opacity:1" />
                    <stop offset="70%" style="stop-color:rgba(44,52,33,0.1); stop-opacity:1" />`,
        elementId: 'Layer_1',
        newTransform: "translate(380.00,-20.00) scale(0.82,0.60) rotate(-90)"
        },
        {
         gradientId: 'miGradiente',
         newStops: `<stop offset="20%" style="stop-color:rgba(25,37,27,0.9);stop-opacity:1" />
                   <stop offset="90%" style="stop-color:rgba(2,6,8,0.21);stop-opacity:1" />`,
         elementId: 'Layer_1',
         newTransform: "translate(15.00,-80.00) scale(0.90,-0.70) rotate(4)"
        }
        
     ] 
   },
   
};