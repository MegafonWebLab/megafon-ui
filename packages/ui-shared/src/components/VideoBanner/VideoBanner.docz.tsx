import { IContent, IImage } from 'components/VideoBanner/VideoBanner';
import desktopImage from '../../../demo/bg_grey_desktop.png';
import mobileImage from '../../../demo/bg_grey_mobile.png';
import video from '../../../demo/video.mp4';

const image: IImage = {
    mobile: mobileImage,
    desktop: desktopImage,
};

const youtubeVideoId = '2Sps5MnvlKM';

const content: IContent = {
    title: 'Текст ≈40 симовлов. Короткие слова',
    description: 'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
    href: '#',
    buttonTitle: 'Текст в кнопке',
    onButtonClick: () => alert('button click'),
};

export { content, image, video, youtubeVideoId };
