import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { cnCreate } from '@megafon/ui-core';
import VideoBanner, { VideoType, TextColor, ClassName } from './VideoBanner';

const imageMobile = 'imageMobile';
const imageTablet = 'imageTablet';
const imageDesktop = 'imageDesktop';
const imageDesktopWide = 'imageDesktopWide';

const video = 'video.mp4';
const youtubeVideoId = '2Sps5MnvlKM';

const content = {
    title: 'Текст ≈40 симовлов. Короткие слова',
    description: 'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
    href: '#',
    buttonTitle: 'Текст в кнопке',
    textColor: TextColor.CLEAR_WHITE,
};

type LocalWindowType = Omit<Window, 'innerWidth'> & {
    innerWidth: number;
};

const cn = cnCreate('mfui-beta-video-banner');
describe('<VideoBanner />', () => {
    it('render component with pictures', () => {
        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with pictures and content', () => {
        const wrapper = shallow(<VideoBanner imageMobile={imageMobile} imageTablet={imageTablet} content={content} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const onButtonClick = jest.fn();
        const contentWithMockFunc = {
            ...content,
            onButtonClick,
        };

        const component = shallow(
            <VideoBanner imageMobile={imageMobile} imageTablet={imageTablet} content={contentWithMockFunc} />);
        const btn = component.find(`.${cn(ClassName.BUTTON)}`);

        btn.simulate('click');
        expect(onButtonClick).toBeCalled();
    });

    describe('tests with local window', () => {
        let localWindow;
        const windowInnerWidth = window.innerWidth;

        beforeEach(() => {
            localWindow = window as LocalWindowType;
        });

        afterEach(() => {
            localWindow.innerWidth = windowInnerWidth;
        });

        it('render with youtube video', () => {
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.YOUTUBE}
                    videoSrc={youtubeVideoId}
                />
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render with video', () => {
            // Props isMuted must be false, if the rendering method is "mount". Otherwise an error will occur.
            // https://github.com/enzymejs/enzyme/issues/2326
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.VIDEO}
                    videoSrc={video}
                    isMuted={false}
                />
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render with video and content', () => {
            // Props isMuted must be false, if the rendering method is "mount". Otherwise an error will occur.
            // https://github.com/enzymejs/enzyme/issues/2326
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.VIDEO}
                    videoSrc={video}
                    content={content}
                    isMuted={false}
                />
            );
            expect(wrapper).toMatchSnapshot();
        });

        it('should not render video on mobile resolution', () => {
            localWindow.innerWidth = 320;
            const wrapper = shallow(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageDesktop}
                    videoType={VideoType.VIDEO}
                    videoSrc={video}
                />
            );
            const videoElement = wrapper.find(`.${cn(ClassName.VIDEO)}`);

            expect(videoElement).toHaveLength(0);
        });

        it('should not render background image on desktop resolution with video', () => {
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.YOUTUBE}
                    videoSrc={youtubeVideoId}
                />
            );
            const backgroundImageElement = wrapper.find(`.${cn(ClassName.BACKGROUND_IMAGE)}`);

            expect(backgroundImageElement).toHaveLength(0);
        });

        it('render mobile image on relevant resolution', () => {
            localWindow.innerWidth = 320;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />
            );
            const backgroundImageElement = wrapper.find(`.${cn(ClassName.BACKGROUND_IMAGE)}`);
            const imageSource = backgroundImageElement.get(0).props.style.backgroundImage;

            expect(imageSource).toBe(`url(${imageMobile})`);
        });

        it('render tablet image on relevant resolution', () => {
            localWindow.innerWidth = 768;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />
            );
            const backgroundImageElement = wrapper.find(`.${cn(ClassName.BACKGROUND_IMAGE)}`);
            const imageSource = backgroundImageElement.get(0).props.style.backgroundImage;

            expect(imageSource).toBe(`url(${imageTablet})`);
        });

        it('render desktop image on relevant resolution', () => {
            localWindow.innerWidth = 1024;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />
            );
            const backgroundImageElement = wrapper.find(`.${cn(ClassName.BACKGROUND_IMAGE)}`);
            const imageSource = backgroundImageElement.get(0).props.style.backgroundImage;

            expect(imageSource).toBe(`url(${imageDesktop})`);
        });

        it('render desktop image on relevant resolution', () => {
            localWindow.innerWidth = 1280;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />
            );
            const backgroundImageElement = wrapper.find(`.${cn(ClassName.BACKGROUND_IMAGE)}`);
            const imageSource = backgroundImageElement.get(0).props.style.backgroundImage;

            expect(imageSource).toBe(`url(${imageDesktopWide})`);
        });
    });
});
