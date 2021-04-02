import megafon from './megafon.png';

const generateItems = (i, href?) => Array.from({ length: i }, () => ({
    href,
    src: megafon,
}));

export const fourItems = generateItems(4, '#');
export const eightItemsWithoutHref = generateItems(8);
export const twelveItems = generateItems(12, '#');
