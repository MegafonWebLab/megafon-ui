import { IContent } from '../VideoBlock';
import poster from './poster.png';
import video from './video.mp4';

const content: IContent = {
    title: 'Интернет',
    description:
        'Подключение к домашнему интернету осуществляется в удобное для вас время по технологиям Ethernet, Docsis.',
    href: '#',
    buttonTitle: 'Подключение',
};

const contentWithoutButton: IContent = {
    title: 'Интернет',
    description:
        'Подключение к домашнему интернету осуществляется в удобное для вас время по технологиям Ethernet, Docsis.',
};

const youtubeVideoId = '2Sps5MnvlKM';

export { content, contentWithoutButton, video, youtubeVideoId, poster };
