
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
// const Colores = [
//     "e3d7a3BF-f5989d33-ea618e40-fce4d6b3-caac7180".split("-").map((a) => "#" + a),
//     "e3d7a3-f5989d-ea618e-fce4d6-caac71".split("-").map((a) => "#" + a + "00"),
//     "6cbbd4BF-5863b140-5282a1BF-fee8f733-c1f29b80".split("-").map((a) => "#" + a),
//     "6cbbd4-5863b1-5282a1-fee8f7-c1f29b".split("-").map((a) => "#" + a + "00"),
//     "1b1b1bBF-29292940-f3f3f3BF-222222b3-ff000080".split("-").map((a) => "#" + a),
//     "1b1b1b-292929-f3f3f3-222222-ff0000".split("-").map((a) => "#" + a + "00"),
//     "70c1b3BF-aaf0d340-50514f33-ffe066b3-247ba080".split("-").map((a) => "#" + a),
//     "70c1b3-aaf0d3-50514f-ffe066-247ba0".split("-").map((a) => "#" + a + "00"),
//     "3c1642BF-38637540-08637533-b2ff9eb3-1dd3b080".split("-").map((a) => "#" + a),
//     "3c1642-386375-086375-b2ff9e-1dd3b0".split("-").map((a) => "#" + a + "00"),
//     "ffffff".split("-").map((a) => "#" - a),
//     "ffffff07".split("-").map((a) => "#" - a),
//     "7fdeea-a3b7f0-a1e4f7-6d7db6-5a6696".split("-").map((a) => "#" + a),
//     "7fdeea-a3b7f0-a1e4f7-6d7db6-5a6696".split("-").map((a) => "#" + a + "00")
// ];

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
  