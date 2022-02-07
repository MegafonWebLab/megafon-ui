/* eslint-disable @typescript-eslint/no-use-before-define */
export default (): void => {
    if (!('fonts' in document)) {
        return;
    }
    const isMainHost = window.location.host.search('megafon.ru') !== -1;

    if (__DEV__ || isMainHost) {
        Promise.all([
            loadFont300().load(),
            loadFont400().load(),
            loadFont500().load(),
            loadFont600().load(),
            loadFont700().load(),
            loadFont900().load(),
        ]).then(loadedFonts => {
            loadedFonts.forEach(font => {
                (document as any).fonts.add(font);
            });
        });
    }
};

const loadFont300 = (): typeof FontFace =>
    new FontFace(
        'Graphik',
        `url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Light-Web.woff2') format('woff2'),
        url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Light-Web.woff') format('woff')`,
        { weight: '300', style: 'normal' },
    );
const loadFont400 = () =>
    new FontFace(
        'Graphik',
        `url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Regular-Web.woff2') format('woff2'),
        url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Regular-Web.woff') format('woff')`,
        { weight: '400', style: 'normal' },
    );
const loadFont500 = () =>
    new FontFace(
        'Graphik',
        `url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Medium-Web.woff2') format('woff2'),
        url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Medium-Web.woff') format('woff')`,
        { weight: '500', style: 'normal' },
    );
const loadFont600 = () =>
    new FontFace(
        'Graphik',
        `url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Semibold-Web.woff2') format('woff2'),
        url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Semibold-Web.woff') format('woff')`,
        { weight: '600', style: 'normal' },
    );
const loadFont700 = () =>
    new FontFace(
        'Graphik',
        `url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Bold-Web.woff2') format('woff2'),
        url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Bold-Web.woff') format('woff')`,
        { weight: '700', style: 'normal' },
    );
const loadFont900 = () =>
    new FontFace(
        'Graphik',
        `url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Black-Web.woff2') format('woff2'),
        url('https://static0.megafon.ru/.blocks/fonts/graphik/MegaFonGraphikLC-Black-Web.woff') format('woff')`,
        { weight: '900', style: 'normal' },
    );
