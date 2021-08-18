import Image1 from './i/1.png';
import Image2 from './i/2.png';
import Image3 from './i/3.png';
import Image4 from './i/4.png';
import Image5 from './i/5.png';
import Video from './i/6.mp4';
import AndroidScreen from './i/androidScreen.png';
import Iphone12Screen from './i/iphone12Screen.png';
import IphoneScreen from './i/iphoneScreen.png';
import LaptopScreen from './i/laptopScreen.png';
import NewIphoneScreen from './i/newIphoneScreen.png';

const instructionTitles = [
    'Авторизуйтесь на сайте сервиса special.megafon.ru, перейдите в магазин и добавьте покупки в корзину',
    'Выберите любой тариф из линейки тарифов «Включайся!», которым хотите пользоваться со скидкой 50% на абонентскую плату.',
    'Оформите заказ и оплатите его удобным способом: онлайн или при получении',
    'Позвоните первому свободному врачу или запишитесь на онлайн-консультацию к конкретному специалисту',
    'Позвоните первому свободному врачу или запишитесь на онлайн-консультацию к конкретному специалисту',
];

const instructionItems = (image, isFirstItemVideo = false) =>
    instructionTitles.map((title, i) => ({
        title,
        mediaUrl: Array.isArray(image) ? image[i] : image,
        isVideo: isFirstItemVideo && i === 0,
    }));

export const items = instructionItems([Image1, Image2, Image3, Image4, Image5]);

export const itemsWithVideo = instructionItems([Video, Image2, Image3, Image4, Image5], true);

export const iphoneInstructionItems = instructionItems(IphoneScreen);

export const androidInstructionItems = instructionItems(AndroidScreen);

export const newIphoneInstructionItems = instructionItems(NewIphoneScreen);

export const iphone12InstructionItems = instructionItems(Iphone12Screen);

export const laptopInstructionItems = instructionItems(LaptopScreen);

export const wrapperStyles = {
    padding: '20px',
};
