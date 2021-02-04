import { IContent, TextColor } from '../VideoBanner';
import imageDesktop from './bg_grey_desktop.png';
import imageMobile from './bg_grey_mobile.png';
import video from './video.mp4';

const youtubeVideoId = '2Sps5MnvlKM';

const content: IContent = {
    title: 'Текст ≈40 символов. Короткие слова',
    description: 'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
    href: '#',
    buttonTitle: 'Текст в кнопке',
    textColor: TextColor.CLEAR_WHITE,
};

export { content, imageMobile, video, youtubeVideoId, imageDesktop };
