import { InputButton } from "../components/headtext/HeadTextPageStyled";

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
  
    // get backGrad() {
    //   return `
    //     radial-gradient(${this._g} 100% 25%, ${this._c}) ${this.ss} ${this.ss} / ${this._s},
    //     radial-gradient(${this._g} 0 75%, ${this._c}) ${this.ss} ${this.ss} / ${this._s},
    //     radial-gradient(${this._g} 100% 25%, ${this._c}) 0 0 / ${this._s},
    //     radial-gradient(${this._g} 0 75%, ${this._c}) 0 0 / ${this._s},
    //     repeating-conic-gradient(${this.cc} 0 25%, transparent 0 50%) 0 0 / ${this._s},
    //     radial-gradient(${this._c}) 0 calc(${this.ss} / 2) / ${this.ss} ${this.ss} ${this.cc}
    //   `;
    // },
    backGradDark: `hsla(44, 50%, 49%, 0.3)`,
    backGradLight: `hsla(42, 94%, 96%, 0.97)`,
    
    backgroundImage: () => {
        const {gradDark, gradLight} = lightTheme;
        return `linear-gradient(to top, ${gradDark}, ${gradLight})`;
    },
    gradDark: `hsla(44, 50%, 49%, 0.3)`,
    gradLight: `hsla(42, 94%, 96%, 0.97)`,
    DayOrNight: `true`,
    backGrad: () => {
        const {gradDark, gradLight} = lightTheme;
        return `linear-gradient(to top, ${gradDark}, ${gradLight})`;
    },
    background: 'repeating-conic-gradient(hsla(42, 94%, 36%, 0.4) 0 .00005%, hsl(84, 71%, 106%, 0.3) 0 .00017%) 0 0 / 1300px 6600px',
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
};	


//     backgroundImage: `
//     repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11) 0px, rgba(0, 0, 0, 0.11) 12px, rgba(1, 1, 1, 0.16) 12px, rgba(1, 1, 1, 0.16) 24px, rgba(0, 0, 0, 0.14) 24px, rgba(0, 0, 0, 0.14) 36px, rgba(0, 0, 0, 0.23) 36px, rgba(0, 0, 0, 0.23) 48px, rgba(0, 0, 0, 0.12) 48px, rgba(0, 0, 0, 0.12) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(0, 0, 0, 0.21) 72px, rgba(0, 0, 0, 0.21) 84px, rgba(0, 0, 0, 0.24) 84px, rgba(0, 0, 0, 0.24) 96px, rgba(1, 1, 1, 0.23) 96px, rgba(1, 1, 1, 0.23) 108px, rgba(1, 1, 1, 0.07) 108px, rgba(1, 1, 1, 0.07) 120px, rgba(0, 0, 0, 0.01) 120px, rgba(0, 0, 0, 0.01) 132px, rgba(1, 1, 1, 0.22) 132px, rgba(1, 1, 1, 0.22) 144px, rgba(1, 1, 1, 0.24) 144px, rgba(1, 1, 1, 0.24) 156px, rgba(0, 0, 0, 0) 156px, rgba(0, 0, 0, 0) 168px, rgba(0, 0, 0, 0.12) 168px, rgba(0, 0, 0, 0.12) 180px),
//     repeating-linear-gradient(90deg, rgba(1, 1, 1, 0.01) 0px, rgba(1, 1, 1, 0.01) 12px, rgba(1, 1, 1, 0.15) 12px, rgba(1, 1, 1, 0.15) 24px, rgba(0, 0, 0, 0.09) 24px, rgba(0, 0, 0, 0.09) 36px, rgba(0, 0, 0, 0.02) 36px, rgba(0, 0, 0, 0.02) 48px, rgba(0, 0, 0, 0.1) 48px, rgba(0, 0, 0, 0.1) 60px, rgba(1, 1, 1, 0.07) 60px, rgba(1, 1, 1, 0.07) 72px, rgba(1, 1, 1, 0.15) 72px, rgba(1, 1, 1, 0.15) 84px, rgba(0, 0, 0, 0.18) 84px, rgba(0, 0, 0, 0.18) 96px, rgba(1, 1, 1, 0.15) 96px, rgba(1, 1, 1, 0.15) 108px, rgba(1, 1, 1, 0.09) 108px, rgba(1, 1, 1, 0.09) 120px, rgba(1, 1, 1, 0.07) 120px, rgba(1, 1, 1, 0.07) 132px, rgba(1, 1, 1, 0.05) 132px, rgba(1, 1, 1, 0.05) 144px, rgba(0, 0, 0, 0.1) 144px, rgba(0, 0, 0, 0.1) 156px, rgba(1, 1, 1, 0.18) 156px, rgba(1, 1, 1, 0.18) 168px),
//     repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.24) 16px, rgba(1, 1, 1, 0.06) 16px, rgba(1, 1, 1, 0.06) 32px, rgba(0, 0, 0, 0.16) 32px, rgba(0, 0, 0, 0.16) 48px, rgba(1, 1, 1, 0) 48px, rgba(1, 1, 1, 0) 64px, rgba(1, 1, 1, 0.12) 64px, rgba(1, 1, 1, 0.12) 80px, rgba(1, 1, 1, 0.22) 80px, rgba(1, 1, 1, 0.22) 96px, rgba(0, 0, 0, 0.24) 96px, rgba(0, 0, 0, 0.24) 112px, rgba(0, 0, 0, 0.25) 112px, rgba(0, 0, 0, 0.25) 128px, rgba(1, 1, 1, 0.12) 128px, rgba(1, 1, 1, 0.12) 144px, rgba(0, 0, 0, 0.18) 144px, rgba(0, 0, 0, 0.18) 160px, rgba(1, 1, 1, 0.03) 160px, rgba(1, 1, 1, 0.03) 176px, rgba(1, 1, 1, 0.1) 176px, rgba(1, 1, 1, 0.1) 192px),
//     repeating-linear-gradient(135deg, rgba(1, 1, 1, 0.18) 0px, rgba(1, 1, 1, 0.18) 3px, rgba(0, 0, 0, 0.09) 3px, rgba(0, 0, 0, 0.09) 6px, rgba(0, 0, 0, 0.08) 6px, rgba(0, 0, 0, 0.08) 9px, rgba(1, 1, 1, 0.05) 9px, rgba(1, 1, 1, 0.05) 12px, rgba(0, 0, 0, 0.01) 12px, rgba(0, 0, 0, 0.01) 15px, rgba(1, 1, 1, 0.12) 15px, rgba(1, 1, 1, 0.12) 18px, rgba(0, 0, 0, 0.05) 18px, rgba(0, 0, 0, 0.05) 21px, rgba(1, 1, 1, 0.16) 21px, rgba(1, 1, 1, 0.16) 24px, rgba(1, 1, 1, 0.07) 24px, rgba(1, 1, 1, 0.07) 27px, rgba(1, 1, 1, 0.23) 27px, rgba(1, 1, 1, 0.23) 30px, rgba(0, 0, 0, 0.2) 30px, rgba(0, 0, 0, 0.2) 33px, rgba(0, 0, 0, 0.18) 33px, rgba(0, 0, 0, 0.18) 36px, rgba(1, 1, 1, 0.12) 36px, rgba(1, 1, 1, 0.12) 39px, rgba(1, 1, 1, 0.13) 39px, rgba(1, 1, 1, 0.13) 42px, rgba(1, 1, 1, 0.2) 42px, rgba(1, 1, 1, 0.2) 45px, rgba(1, 1, 1, 0.18) 45px, rgba(1, 1, 1, 0.18) 48px, rgba(0, 0, 0, 0.2) 48px, rgba(0, 0, 0, 0.2) 51px, rgba(1, 1, 1, 0) 51px, rgba(1, 1, 1, 0) 54px, rgba(0, 0, 0, 0.03) 54px, rgba(0, 0, 0, 0.03) 57px, rgba(1, 1, 1, 0.06) 57px, rgba(1, 1, 1, 0.06) 60px, rgba(1, 1, 1, 0) 60px, rgba(1, 1, 1, 0) 63px, rgba(0, 0, 0, 0.1) 63px, rgba(0, 0, 0, 0.1) 66px, rgba(1, 1, 1, 0.19) 66px, rgba(1, 1, 1, 0.19) 69px),
//     linear-gradient(180deg, rgb(21, 30, 12),75%, rgb(49, 22, 22))`,
//    gradDark:`hsl(144, 100%, 89%)` ,
//    gradLight:`hsl(42, 94%, 76%)`,
//    backGrad: `linear-gradient(to bottom, var(--gradDark), var(--gradLight))`,

// backgroundImage: () => {
//     const { trans, sage } = lightTheme;
//     return `repeating-radial-gradient(
//         circle at 0.015em 1.5em,
//         ${trans},
//         ${trans} 0.17em,
//         ${sage} 0.18em,
//         ${sage} 0.20em,
//         ${trans} 0.21em,
//         ${trans} 0.26em),
//     repeating-radial-gradient(
//         circle at 0.185em 0.35em,
//         ${trans},
//         ${trans} 0.17em,
//         ${sage} 0.18em,
//         ${sage} 0.20em,
//         ${trans} 0.21em,
//         ${trans} 0.26em),
//     repeating-radial-gradient(
//         circle at 0.5em 0.85em,
//         ${trans},
//         ${trans} 0.17em,
//         ${sage} 0.18em,
//         ${sage} 0.20em,
//         ${trans} 0.21em,
//         ${trans} 0.26em),
//     repeating-radial-gradient(
//         circle at 10.5em 0.15em,
//         ${trans},
//         ${trans} 0.17em,
//         ${sage} 0.18em,
//         ${sage} 0.20em,
//         ${trans} 0.21em,
//         ${trans} 0.26em)`
// },
        //  backgroundImage: function() {
        //     const { _g, cc, ss, _s , c} = lightTheme;
        //     return `
        //         radial-gradient(${_g}, ${c} 100% 25%, transparent),
        //         radial-gradient(${_g}, ${c} 0 75%, transparent),
        //         radial-gradient(${_g}, ${c} 10% 25%, transparent) 0 0 / ${_s},
        //         radial-gradient(${_g}, ${c} 0 75%, transparent) 0 0 / ${_s},
        //         repeating-conic-gradient(${cc} 0 25%, #0000 0 50%) 0 0 / ${_s},
        //         radial-gradient(${c}) 0 calc(${ss} / 2) / ${ss} ${ss} ${c};
        //     `;
        // } 
         
        // background: () => {
        //     const {grd} = lightTheme;
        //     return`radial-gradient(100% 50% at 100% 0,${grd}),
        //     radial-gradient(100% 50% at 0 50% ,${grd}),
        //     radial-gradient(100% 50% at 100% 100%,${grd})`
        // },
        // backgroundImage: () => {
        //     const { s, g, gradientColors, c } = lightTheme;
        //     return `radial-gradient(${g} 100% 25%, ${gradientColors}) ${s} ${s}/calc(2*${s}) calc(2*${s}), 
        //             radial-gradient(${g} 0 75%, ${gradientColors}) ${s} ${s}/calc(2*${s}) calc(2*${s}), 
        //             radial-gradient(${g} 100% 25%, ${gradientColors}) 0 0/calc(2*${s}) calc(2*${s}), 
        //             radial-gradient(${g} 0 75%, ${gradientColors}) 0 0/calc(2*${s}) calc(2*${s}), 
        //             repeating-conic-gradient(${c} 0 25%, #0000 0 50%) 0 0/calc(2*${s}) calc(2*${s}), 
        //             radial-gradient(${gradientColors}) 0 calc(${s}/2)/${s} ${s} ${c}`;
        // },