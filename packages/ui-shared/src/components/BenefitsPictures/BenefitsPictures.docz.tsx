// @ts-ignore
import img from './i/img.png';
// @ts-ignore
import imgShort from './i/img_short.png';

const item = (image) => {
    return {
        title: 'Lorem ipsum',
        text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        img: image,
    };
};

const getItems = (count, image) => new Array(count).fill(item(image));

export const twoItems = getItems(2, img);
export const threeItems = getItems(3, img);
export const fourItems = getItems(4, img);
export const twoItemsWithShortImg = getItems(2, imgShort);
