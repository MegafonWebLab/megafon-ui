import img from './bg_light_grey.png';

const getItems = (i, image) =>
    Array.from({ length: i }, () => ({
        title: 'Интернет',
        text: 'Подключение к домашнему интернету осуществляется в удобное для вас время по технологиям Ethernet, Docsis.',
        img: image,
    }));

export const twoItems = getItems(2, img);
export const threeItems = getItems(3, img);
export const fourItems = getItems(4, img);
