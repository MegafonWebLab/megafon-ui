import { IContent } from './VideoBlock';
import video from '../../../demo/video.mp4';

const content: IContent = {
    title: 'Lorem ipsum',
    description: [
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    ],
    href: '#',
    buttonTitle: 'Lorem ipsum',
    onButtonClick: () => alert('button click'),
};

const youtubeVideoId = '2Sps5MnvlKM';

export { content, video, youtubeVideoId };
