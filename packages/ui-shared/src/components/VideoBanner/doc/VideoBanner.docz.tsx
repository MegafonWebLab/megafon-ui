import { IContent, TextColor } from '../VideoBanner';
import imageDesktop from './bg_grey_desktop.png';
import imageMobile from './bg_grey_mobile.png';
import video from './video.mp4';
import imageWhiteDesktop from './image_white_desktop.png';
import imageWhiteMobile from './image_white_mobile.png';

const youtubeVideoId = '2Sps5MnvlKM';

const contentWithDefaultTextColor = {
    title: 'Текст ≈40 символов. Короткие слова',
    description: 'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
    href: '#',
    buttonTitle: 'Текст в кнопке',
};

const content: IContent = {
    ...contentWithDefaultTextColor,
    textColor: TextColor.CLEAR_WHITE,
};

const images = {
    imageMobile: imageWhiteMobile,
    imageTablet: imageWhiteMobile,
    imageDesktop: imageWhiteDesktop,
    imageDesktopWide: imageWhiteDesktop,
};

export { content, contentWithDefaultTextColor, video, youtubeVideoId, imageMobile, imageDesktop, images };
