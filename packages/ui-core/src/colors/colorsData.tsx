export default {
    basic: {
        title: 'Basic',
        colorsGroup: [
            {
                description: 'Основные цвета бренда',
                colors: [
                    {
                        name: 'Green',
                        code: '#00B956',
                    },
                    {
                        name: 'Purple',
                        code: '#731982',
                    },
                ],
            },
            {
                description: 'Градация оттенков серого',
                colors: [
                    {
                        name: 'Base',
                        code: '#FFFFFF',
                        border: '1px solid #EDEDED',
                    },
                    {
                        name: 'Content',
                        code: '#333333',
                    },
                    {
                        name: 'Spb Sky 0',
                        code: '#F6F6F6',
                        border: '2px solid #EDEDED',
                    },
                    {
                        name: 'Spb Sky 1',
                        code: '#EDEDED',
                    },
                    {
                        name: 'Spb Sky 2',
                        code: '#D8D8D8',
                    },
                    {
                        name: 'Spb Sky 3',
                        code: '#999999',
                    },
                ],
            },
        ],
    },
    secondary: {
        title: 'Secondary',
        colorsGroup: {
            description: 'Акцентные цвета',
            colors: [
                {
                    name: 'Warm Red C',
                    code: '#EB5A40',
                },
                {
                    name: '137C',
                    code: '#FFA717',
                },
                {
                    name: '311C',
                    code: '#5BD9E5',
                },
                {
                    name: 'Reflex Blue',
                    code: '#444189',
                },
            ],
        },
    },
    system: {
        title: 'System',
        colorsGroup: {
            description: 'Системные цвета, используемые для отображения состояний интерфейсов и ссылок',
            colors: [
                {
                    name: 'Fury',
                    code: '#F62434',
                },
                {
                    name: 'System Blue',
                    code: '#34AAF2',
                },
                {
                    name: 'Background',
                    code: '#FFFFFF',
                },
            ],
        },
    },
    gradientColors: {
        title: 'Gradient',
        colorsGroup: {
            description: 'Градиентные заливки ',
            colors: [
                {
                    name: 'Basic',
                    code: '#01873F #00B956 #14CD6A',
                    gradient: 'linear-gradient(90deg, #01873F 0%, #00B956 74%, #14CD6A 100%)',
                },
                {
                    name: 'VIP',
                    code: '#5B1168 #731982 #821E93',
                    gradient: 'linear-gradient(90deg, #5B1168 0%, #731982 74%, #821E93 100%)',
                },
                {
                    name: 'Exclusive',
                    code: '#2A2674 #444189 #504D93',
                    gradient: 'linear-gradient(90deg, #2A2674 0%, #444189 74%, #504D93 100%)',
                },
            ],
        },
    },
    staticColors: {
        title: 'Static',
        colorsGroup: {
            description: 'Цвета не зависящие от темы',
            colors: [
                {
                    name: 'STC White',
                    code: '#FFFFFFF',
                    border: '1px solid #EDEDED',
                },
                {
                    name: 'STC Black',
                    code: '#333333',
                },
            ],
        },
    },
    staticOpacity: {
        title: 'Static Opacity',
        colorsGroup: {
            description: 'Цвета c прозрачностью не зависящие от темы',
            colors: [
                {
                    name: 'STC White 5%',
                    code: '#FFFFFF0D',
                    border: '1px solid #EDEDED',
                },
                {
                    name: 'STC White 10%',
                    code: '#FFFFFF1A',
                    border: '1px solid #EDEDED',
                },
                {
                    name: 'STC White 20%',
                    code: '#FFFFFF33',
                    border: '1px solid #EDEDED',
                },
                {
                    name: 'STC White 50%',
                    code: '#FFFFFF80',
                },
                {
                    name: 'STC Black 5%',
                    code: '#3333330D',
                },
                {
                    name: 'STC Black 10%',
                    code: '#3333331A',
                },
                {
                    name: 'STC Black 20%',
                    code: '#33333333',
                },
                {
                    name: 'STC Black 50%',
                    code: '#33333380',
                },
            ],
        },
    },
    soft: {
        title: 'Soft',
        colorsGroup: {
            description:
                'Дополнительная (вспомогательная) палитра, образованная от Basic, Secondary и System цветов. Каждый цвет из Soft палитры работает в паре с его родительским цветом.',
            colors: [
                {
                    name: 'Green 80',
                    code: '#0CDC78',
                    parentColor: '#00B956',
                },
                {
                    name: 'Purple 80',
                    code: '#AA67C1',
                    parentColor: '#731982',
                },
                {
                    name: 'Warm Red C 80',
                    code: '#FF765D',
                    parentColor: '#EB5A40',
                },
                {
                    name: '137C 80',
                    code: '#FFB945',
                    parentColor: '#FFB945',
                },
                {
                    name: '311C 80',
                    code: '#62E3FF',
                    parentColor: '#5BD9E5',
                },
                {
                    name: 'Reflex Blue 80',
                    code: '#554FC9',
                    parentColor: '#444189',
                },
                {
                    name: 'Fury 80',
                    code: '#F8505D',
                    parentColor: '#F62434',
                },
                {
                    name: 'Green 20',
                    code: '#DDFFEC',
                    parentColor: '#00B956',
                },
                {
                    name: 'Purple 20',
                    code: '#FFEEFF',
                    parentColor: '#731982',
                },
                {
                    name: 'Warm Red C 20',
                    code: '#FFCFC7',
                    parentColor: '#EB5A40',
                },
                {
                    name: '137C 20',
                    code: '#FFEDD1',
                    parentColor: '#FFB945',
                },
                {
                    name: '311C 20',
                    code: '#E1FAFF',
                    parentColor: '#5BD9E5',
                },
                {
                    name: 'Reflex Blue 20',
                    code: '#EBEAFF',
                    parentColor: '#444189',
                },
                {
                    name: 'Fury 20',
                    code: '#FFC5C9',
                    parentColor: '#F62434',
                },
            ],
        },
    },
};
