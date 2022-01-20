type ColorType = {
    name: string;
    code: string;
    border?: string;
    parentColor?: string;
    gradient?: string;
};

type ColorsListType = {
    description: string;
    colors: ColorType[];
};

export type ColorsItemType = {
    title: string;
    colorsList?: ColorsListType;
    colorsGroup?: ColorsListType[];
};

export type ColorsType = {
    [key: string]: ColorsItemType;
};

const colors: ColorsType = {
    basic: {
        title: 'Basic',
        colorsGroup: [
            {
                description: 'Основные цвета бренда',
                colors: [
                    {
                        name: 'Brand Green',
                        code: 'brandGreen',
                    },
                    {
                        name: 'Brand Purple',
                        code: 'brandPurple',
                    },
                ],
            },
            {
                description: 'Градация оттенков серого',
                colors: [
                    {
                        name: 'Base',
                        code: 'base',
                        border: '1px solid var(--spbSky1)',
                    },
                    {
                        name: 'Content',
                        code: 'content',
                        border: '1px solid var(--spbSky1)',
                    },
                    {
                        name: 'Spb Sky 0',
                        code: 'spbSky0',
                        border: '2px solid var(--spbSky1)',
                    },
                    {
                        name: 'Spb Sky 1',
                        code: 'spbSky1',
                    },
                    {
                        name: 'Spb Sky 2',
                        code: 'spbSky2',
                    },
                    {
                        name: 'Spb Sky 3',
                        code: 'spbSky3',
                    },
                ],
            },
        ],
    },
    secondary: {
        title: 'Secondary',
        colorsList: {
            description: 'Акцентные цвета',
            colors: [
                {
                    name: 'Warm Red C',
                    code: 'warmRedC',
                },
                {
                    name: '137C',
                    code: '137C',
                },
                {
                    name: '311C',
                    code: '311C',
                },
                {
                    name: 'Reflex Blue',
                    code: 'reflexBlue',
                },
            ],
        },
    },
    system: {
        title: 'System',
        colorsList: {
            description: 'Системные цвета, используемые для отображения состояний интерфейсов и ссылок',
            colors: [
                {
                    name: 'Fury',
                    code: 'fury',
                },
                {
                    name: 'System Blue',
                    code: 'systemBlue',
                },
                {
                    name: 'Background',
                    code: 'background',
                },
                {
                    name: 'Button Hov. G.',
                    code: 'buttonHoverGreen',
                },
                {
                    name: 'Button Hov. P.',
                    code: 'buttonhoverPurple',
                },
                {
                    name: 'Button Down',
                    code: 'buttonDown',
                },
            ],
        },
    },
    gradientColors: {
        title: 'Gradient',
        colorsList: {
            description: 'Градиентные заливки ',
            colors: [
                {
                    name: 'Basic',
                    code: 'gradientBasic',
                    gradient: 'linear-gradient(90deg, #01873F 0%, #00B956 74%, #14CD6A 100%)',
                },
                {
                    name: 'VIP',
                    code: 'gradientVIP',
                    gradient: 'linear-gradient(90deg, #5B1168 0%, #731982 74%, #821E93 100%)',
                },
                {
                    name: 'Exclusive',
                    code: 'gradientExclusive',
                    gradient: 'linear-gradient(90deg, #2A2674 0%, #444189 74%, #504D93 100%)',
                },
            ],
        },
    },
    staticColors: {
        title: 'Static',
        colorsList: {
            description: 'Цвета не зависящие от темы',
            colors: [
                {
                    name: 'STC White',
                    code: 'stcWhite',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC Black',
                    code: 'stcBlack',
                    border: '1px solid var(--spbSky1)',
                },
            ],
        },
    },
    staticOpacity: {
        title: 'Static Opacity',
        colorsList: {
            description: 'Цвета c прозрачностью не зависящие от темы',
            colors: [
                {
                    name: 'STC White 5%',
                    code: 'stcWhite5',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC White 10%',
                    code: 'stcWhite10',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC White 20%',
                    code: 'stcWhite20',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC White 50%',
                    code: 'stcWhite50',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC Black 5%',
                    code: 'stcBlack5',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC Black 10%',
                    code: 'stcBlack10',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC Black 20%',
                    code: 'stcBlack20',
                    border: '1px solid var(--spbSky1)',
                },
                {
                    name: 'STC Black 50%',
                    code: 'stcBlack50',
                    border: '1px solid var(--spbSky1)',
                },
            ],
        },
    },
    soft: {
        title: 'Soft',
        colorsList: {
            description:
                'Дополнительная (вспомогательная) палитра, образованная от Basic, Secondary и System цветов. Каждый цвет из Soft палитры работает в паре с его родительским цветом.',
            colors: [
                {
                    name: 'Brand Green 80',
                    code: 'brandGreen80',
                    parentColor: 'green',
                },
                {
                    name: 'Brand Purple 80',
                    code: 'brandPurple80',
                    parentColor: 'purple',
                },
                {
                    name: 'Warm Red C 80',
                    code: 'warmRedC80',
                    parentColor: 'warmRedC',
                },
                {
                    name: '137C 80',
                    code: '137C80',
                    parentColor: '137C',
                },
                {
                    name: '311C 80',
                    code: '311C80',
                    parentColor: '311C',
                },
                {
                    name: 'Reflex Blue 80',
                    code: 'reflexBlue80',
                    parentColor: 'reflexBlue',
                },
                {
                    name: 'Fury 80',
                    code: 'fury80',
                    parentColor: 'fury',
                },
                {
                    name: 'Brand Green 20',
                    code: 'brandGreen20',
                    parentColor: 'green',
                },
                {
                    name: 'Brand Purple 20',
                    code: 'brandPurple20',
                    parentColor: 'purple',
                },
                {
                    name: 'Warm Red C 20',
                    code: 'warmRedC20',
                    parentColor: 'warmRedC',
                },
                {
                    name: '137C 20',
                    code: '137C20',
                    parentColor: '137C',
                },
                {
                    name: '311C 20',
                    code: '311C20',
                    parentColor: '311C',
                },
                {
                    name: 'Reflex Blue 20',
                    code: 'reflexBlue20',
                    parentColor: 'reflexBlue',
                },
                {
                    name: 'Fury 20',
                    code: 'fury20',
                    parentColor: 'fury',
                },
            ],
        },
    },
};

export default colors;
