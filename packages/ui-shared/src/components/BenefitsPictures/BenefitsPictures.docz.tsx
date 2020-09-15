import img from '../../../demo/bg_light_grey.png';

const getItems = (i, image) => Array.from({ length: i }, () => ({
    title: 'Lorem ipsum',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit',
    img: image,
}));

export const twoItems = getItems(2, img);
export const threeItems = getItems(3, img);
export const fourItems = getItems(4, img);
