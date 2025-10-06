const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const lightTheme = {
    s: "50px",
    c: "#D8E2F8",
    g: "35.36% 35.36% at",
    gradientColors: "#0000 66%, #34271e 68% 70%, #00000000 72%",
    c1: '#4B384C',
    apricot: 						"#FF8652",
    chestnut: 					"#81291F",
    sakura:							"#FFE4E4",
    trans: "transparent",
    sage:								'#87A376',
    limestone:					'#C9C5B5',
    ink:								'#292C31',
    grd: '#0000, #0004 5%',
    ss: '50px',
    cc: "#191b22",
    _g: '35.36% 35.36% at',
    _c: 'rgba(210, 210, 30, 0.1) 66%, #20222a 68% 10%, rgba(130, 80, 40, 0.1) 92%',
  
    get _s() {
      return `calc(2 * ${this.ss}) calc(2 * ${this.ss})`;  // Correcta interpolación
    },
    backGradDark: `hsla(44, 50%, 49%, 0.3)`,
    backGradLight: `hsla(42, 94%, 96%, 0.97)`,
    gradDark: `hsla(44, 50%, 49%, 0.3)`,
    gradLight: `hsla(42, 94%, 96%, 0.97)`,
    DayOrNight: `true`,
    
    backgroundImage: () => {
        const {gradDark, gradLight} = lightTheme;
        return `linear-gradient(to top, ${gradDark}, ${gradLight})`;
    },
    
    backGrad: () => {
        const {gradDark, gradLight} = lightTheme;
        return `linear-gradient(to top, ${gradDark}, ${gradLight})`;
    },
    // background: 'repeating-conic-gradient(hsla(42, 94%, 36%, 0.4) 0 .00005%, hsl(84, 71%, 106%, 0.3) 0 .00017%) 0 0 / 1800px 3000px',
        background: isSafari 
        ? 'repeating-conic-gradient(hsla(42, 94%, 36%, 0.3) 0deg 0.26deg, hsla(84, 71%, 85%, 0.3) 0.16deg 0.58deg) 0 0 / 140px 100px'
        : 'repeating-conic-gradient(hsla(42, 94%, 36%, 0.4) 0 .00005%, hsl(84, 71%, 106%, 0.3) 0 .00017%) 0 0 / 1300px 6600px',
    fill:'rgba(21, 19, 11, 0.12)',
    stroke:"rgba(10, 10, 2, 0.4)",
    boxShadow: '0 0px 16px rgba(169, 77, 65,0.5)',
    btnBack: 'hsla(42, 94%, 96%, 0.97)',
    btnLink: 'hsla(144, 50%, 59%, 0.1)',
    introTextShadow:'-1px -1px 0 hsla(72, 94%, 96%, 0.97), 1px -1px 0 #000,-1px 1px 0 rgba(169, 77, 65,0.5),1px 1px 0 rgba(169, 77, 65,0.5) ',
    boxShadowNav: '0 4px 16px rgba(99, 65, 129, 0.0)',
    backMaravilla: 'radial-gradient(circle at 100% 150%, silver 24%, white 24%, white 28%,silver 28%, silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 0    150%, silver 24%, white 24%, white 28%, silver 28%,silver 36%, white 36%, white 40%, transparent 40%, transparent),radial-gradient(circle at 50%  100%, white 10%, silver 10%, silver 23%, white 23%, white 30%,silver 30%, silver 43%, white 43%, white 50%, silver 50%, silver 63%, white 63%,white 71%, transparent 71%, transparent),radial-gradient(circle at 100% 50%, white 5%, silver 5%, silver 15%, white 15%, white 20%,silver 20%, silver 29%, white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent),radial-gradient(circle at 0    50%, white 5%, silver 5%, silver 15%, white 15%, white 20%, silver 20%, silver 29%,white 29%, white 34%, silver 34%, silver 44%, white 44%, white 49%, transparent 49%, transparent); ',
    modalFormCol: 'rgb(62, 72, 57)',
    inputFormCol: 'rgba(250, 225, 247, 0.5)',
    onHoverBtn: 'rgb(150, 60, 42)',
    onHoverShadow: 'inset 0 8px 10px -8px #e3cfab',
    modalBxShadow:'inset 13px 13px 17px #adaa809d ,inset -13px -13px 7px rgba(87, 63, 63, 0.652),-1px 2px 4px #581818,1px -1px 0 #474040,-1px 1px 0 #514747,1px 1px 0 #141414, 0 15px 10px rgba(203, 169, 169, 0.6), 0px 0px 50px rgba(26, 22, 22, 0.6)',
    colorBtnAbout: 'rgba(100, 109, 83, 1)',
    shadowBtnAbout: ' inset 0px 2px 3px rgba(117, 73, 73, 0.5),inset 0px 4px 5px rgba(187, 102, 102, 0.5),inset 0px 8px 6px rgba(159, 169, 96, 0.5)',
    onHoverColorAbout:'rgba(139, 148, 203, 1)',
    onHoverShadowMainBtn: 'inset 0 8px 10px -6px #757747',
    onHoverColorAboutModalBtn: 'rgba(215, 208, 103,0.9)',
    textShadowKey:' -1px -1px 0 #fcf8f5, 1px -1px 0 #295151,-1px 1px 0 #1e0000,1px 1px 0 #6497b1',
    screenShadow: ' 0 20px 20px rgba(108, 94, 131, 0.717), 0px 0px 140px rgba(219, 235, 211, 0.812)',
    navShadowBox: '0 2px 6px rgba(69, 77, 65,0.9)',
    svgShadow: ' drop-shadow( -10px -6px 4px rgb(12, 4, 35))',
    backVideoMask: 'radial-gradient(ellipse, #2f0505 70%, transparent)',
    backVideoFilter: 'hue-rotate(230deg)',
    textMainOnHover: '1px 1px 8px rgb(161, 209, 216), 0 0 1rem rgba(117, 127, 95, 0.4), 0 0 0.1em rgba(0, 0, 0, 0.3)',
    inputBackground: 'rgba(134,121,180,0.246)',
    inputButtonShadow: 'inset 0 5px 12px -6px #1c0c3a',
    inputButtonShadowOnHover: 'inset 0 8px 10px -7px rgb(8, 9, 16)',
    inputBackgroundOnHover: 'rgba(235, 218, 220, 0.39)', 
    inputColorOnHover: 'rgba(57, 49, 22, 0.617)',
    inputButtonColor: 'rgba(87, 83, 8, 0.617)',
    navButtonColor: 'rgba(215, 214, 187, 0.617)',
    textCityColor: 'linear-gradient(180deg, rgb(225, 163, 96),rgb(24, 50, 88))',
};	