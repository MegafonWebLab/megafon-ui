const COLOR_THEMES = {
    LIGHT: {
        // Basic
        brandGreen: '#00B956',
        brandPurple: '#731982',
        base: '#FFFFFF',
        content: '#333333',
        spbSky0: '#F6F6F6',
        spbSky1: '#EDEDED',
        spbSky2: '#D8D8D8',
        spbSky3: '#999999',

        // Secondary
        warmRedC: '#EB5A40',
        '137C': '#FFA717',
        '311C': '#5BD9E5',
        reflexBlue: '#444189',

        // System
        fury: '#F62434',
        systemBlue: '#34AAF2',
        background: '#FFFFFF',
        buttonHoverGreen: '#10E272',
        buttonHoverGreenSoft: '#B6FFDA',
        buttonHoverPurple: '#A500BF',
        buttonHoverPurpleSoft: '#FFD9FF',
        buttonHoverGrey: '#D6D6D6',
        buttonDown: '#404D46',
        overlay: '#000000CC',

        // Gradients
        gradientBasic: 'linear-gradient(90deg, #01873F 0%, #00B956 74%, #14CD6A 100%)',
        gradientVIP: 'linear-gradient(90deg, #5B1168 0%, #731982 74%, #821E93 100%)',
        gradientExclusive: 'linear-gradient(90deg, #2A2674 0%, #444189 74%, #504D93 100%)',

        // Static
        stcWhite: '#FFFFFF',
        stcBlack: '#333333',

        // Static Opacity
        stcWhite5: '#FFFFFF0D',
        stcWhite10: '#FFFFFF1A',
        stcWhite20: '#FFFFFF33',
        stcWhite50: '#FFFFFF80',
        stcBlack5: '#3333330D',
        stcBlack10: '#3333331A',
        stcBlack20: '#33333333',
        stcBlack50: '#33333380',

        // Soft
        brandGreen80: '#0CDC78',
        brandGreen20: '#DDFFEC',
        brandPurple80: '#AA67C1',
        brandPurple20: '#FFEEFF',
        warmRedC80: '#FF765D',
        warmRedC20: '#FFCFC7',
        '137C80': '#FFB945',
        '137C20': '#FFEDD1',
        '311C80': '#62E3FF',
        '311C20': '#E1FAFF',
        reflexBlue80: '#554FC9',
        reflexBlue20: '#EBEAFF',
        fury80: '#F8505D',
        fury20: '#FFC5C9',
    },

    DARK: {
        // Basic
        brandGreen: '#00B956',
        brandPurple: '#731982',
        base: '#333333',
        content: '#FFFFFF',
        spbSky0: '#3D3D3D',
        spbSky1: '#454545',
        spbSky2: '#595959',
        spbSky3: '#999999',

        // Secondary
        warmRedC: '#EB5A40',
        '137C': '#FFA717',
        '311C': '#5BD9E5',
        reflexBlue: '#444189',

        // System
        fury: '#F62434',
        systemBlue: '#34AAF2',
        background: '#1F1F1F',
        buttonHoverGreen: '#10E272',
        buttonHoverPurple: '#A500BF',
        buttonHoverGrey: '#D6D6D6',
        buttonDown: '#404D46',
        overlay: '#000000CC',

        // Gradients
        gradientBasic: 'linear-gradient(90deg, #01873F 0%, #00B956 74%, #14CD6A 100%)',
        gradientVIP: 'linear-gradient(90deg, #5B1168 0%, #731982 74%, #821E93 100%)',
        gradientExclusive: 'linear-gradient(90deg, #2A2674 0%, #444189 74%, #504D93 100%)',

        // Static
        stcWhite: '#FFFFFF',
        stcBlack: '#333333',

        // Static Opacity
        stcWhite5: '#FFFFFF0D',
        stcWhite10: '#FFFFFF1A',
        stcWhite20: '#FFFFFF33',
        stcWhite50: '#FFFFFF80',
        stcBlack5: '#3333330D',
        stcBlack10: '#3333331A',
        stcBlack20: '#33333333',
        stcBlack50: '#33333380',

        // Soft
        brandGreen80: '#24804E',
        brandGreen20: '#314138',
        brandPurple80: '#5C2C64',
        brandPurple20: '#38273C',
        warmRedC80: '#B85B4A',
        warmRedC20: '#422A26',
        '137C80': '#BC862E',
        '137C20': '#4A3D27',
        '311C80': '#5B9DA3',
        '311C20': '#35484A',
        reflexBlue80: '#4B497C',
        reflexBlue20: '#2F2F3C',
        fury80: '#CA3A43',
        fury20: '#442B2D',
    },
};

const applyTheme = (theme: 'light' | 'dark'): void => {
    const themeData = COLOR_THEMES[theme.toUpperCase()];

    Object.keys(themeData).forEach(propertyName => {
        document.documentElement.style.setProperty(`--${propertyName}`, themeData[propertyName]);
    });
};

export default applyTheme;
