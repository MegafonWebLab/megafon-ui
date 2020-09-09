import mainImage from '../../../demo/bg_grey_desktop.png';
import mobileImage from '../../../demo/bg_grey_mobile.png';
import videoSrc from '../../../demo/video.mp4';
import { VideoCategory } from './VideoBanner';

const image = {
    mobile: mobileImage,
    main: mainImage,
};

const video = {
    src: videoSrc,
    type: VideoCategory.VIDEO,
};

const content = {
    title: 'Текст ≈40 симовлов. Короткие слова',
    text: 'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
    href: '#',
    buttonTitle: 'Текст в кнопке',
    clickHandler: () => alert('button click'),
};

export { content, image, video };
