import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { cnCreate } from '@megafon/ui-core';
import VideoBanner from './VideoBanner';

const image = {
    desktop: 'image-desktop.png',
    mobile: 'image-mobile.png',
};

const video = 'video.mp4';

const youtubeVideoId = '2Sps5MnvlKM';

const content = {
    title: 'Текст ≈40 симовлов. Короткие слова',
    description: 'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
    href: '#',
    buttonTitle: 'Текст в кнопке',
};

const cn = cnCreate('mfui-beta-video-banner');
describe('<VideoBanner />', () => {
    it('render component on mobile resolution only with required props', () => {
        const component = shallow(<VideoBanner image={image} />);
        expect(component).toMatchSnapshot();
    });

    it('render component on desktop resolution only with required props', () => {
        const component = mount(<VideoBanner image={image} />);
        expect(component).toMatchSnapshot();
    });

    it('render with content', () => {
        const component = mount(<VideoBanner image={image} content={content} />);
        expect(component).toMatchSnapshot();
    });

    it('render with youtube video', () => {
        const component = mount(<VideoBanner image={image} videoType="youtube" videoSrc={youtubeVideoId}/>);
        expect(component).toMatchSnapshot();
    });

    it('render with video', () => {
        // Props isMuted must be false, if the rendering method is "mount". Otherwise an error will occur.
        // https://github.com/enzymejs/enzyme/issues/2326
        const component = mount(<VideoBanner image={image} videoType="video" videoSrc={video} isMuted={false}/>);
        expect(component).toMatchSnapshot();
    });

    it('render with video and content', () => {
        // Props isMuted must be false, if the rendering method is "mount". Otherwise an error will occur.
        // https://github.com/enzymejs/enzyme/issues/2326
        const component = mount(
            <VideoBanner image={image} videoType="video" videoSrc={video} content={content} isMuted={false}/>
            );
        expect(component).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const onButtonClick = jest.fn();
        const contentWithMockFunc = {
            ...content,
            onButtonClick,
        };

        const component = shallow(<VideoBanner image={image} content={contentWithMockFunc} />);
        const btn = component.find(`.${cn('button')}`);

        btn.simulate('click');
        expect(onButtonClick).toBeCalled();
    });
});
