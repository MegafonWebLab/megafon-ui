import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { shallow, mount } from 'enzyme';
import VideoBanner, { VideoType, ButtonColor, ClassName, TextColor } from './VideoBanner';

const imageMobile = 'imageMobile';
const imageTablet = 'imageTablet';
const imageDesktop = 'imageDesktop';
const imageDesktopWide = 'imageDesktopWide';

const video = 'video.mp4';
const youtubeVideoId = '2Sps5MnvlKM';

const content = {
    title: 'Текст ≈40 симовлов. Короткие слова',
    description:
        'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
    buttonHref: '#',
    buttonTitle: 'Текст в кнопке',
    linkTitle: 'Личный кабинет услуги',
    linkUrl: '#',
    cost: 'oт <b>1000 ₽</b> за сообщение',
};

const breadcrumbs = [
    {
        title: 'МегаФон',
        href: '#',
    },
    {
        title: 'Мобильная связь',
        href: '#',
    },
    {
        title: 'Тарифы',
        href: '#',
    },
];

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
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with pictures and content', () => {
        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
                content={content}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with breadcrumbs', () => {
        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
                content={content}
                breadcrumbs={breadcrumbs}
                classes={{ breadcrumbs: 'breadcrumbs-item-custom-class-name' }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component without button', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { buttonTitle, ...contentWithoutButton } = content;

        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
                content={contentWithoutButton}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with classes', () => {
        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                content={content}
                className="className"
                classes={{
                    root: 'rootClass',
                    button: 'buttonClass',
                    link: 'linkClass',
                }}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with dataAttrs', () => {
        const wrapper = shallow(
            <VideoBanner imageMobile={imageMobile} imageTablet={imageTablet} dataAttrs={{ 'data-test': 'value' }} />,
        );

        expect(wrapper.first().prop('data-test')).toEqual('value');
    });

    it('render component with pictures and non default content text color', () => {
        const localContent = {
            ...content,
            textColor: TextColor.WHITE,
        };
        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
                content={localContent}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with pictures and download links content', () => {
        const localContent = {
            ...content,
            buttonDownload: true,
            linkDownload: true,
        };

        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
                content={localContent}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with non default buttonColor', () => {
        const localContent = {
            ...content,
            buttonColor: ButtonColor.PURPLE,
        };
        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
                content={localContent}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('render component with the different content text color on desktop and mobile resolution', () => {
        const localContent = {
            ...content,
            textColor: TextColor.BLACK,
            textColorMobile: TextColor.WHITE,
        };
        const wrapper = shallow(
            <VideoBanner
                imageMobile={imageMobile}
                imageTablet={imageTablet}
                imageDesktop={imageDesktop}
                imageDesktopWide={imageDesktopWide}
                content={localContent}
            />,
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<VideoBanner imageMobile={imageMobile} imageTablet={imageTablet} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });

    it('should call onButtonClick prop', () => {
        const onButtonClick = jest.fn();
        const contentWithMockFunc = {
            ...content,
            onButtonClick,
        };

        const component = shallow(
            <VideoBanner imageMobile={imageMobile} imageTablet={imageTablet} content={contentWithMockFunc} />,
        );
        const btn = component.find(`.${cn(ClassName.BUTTON)}`);

        btn.simulate('click');
        expect(onButtonClick).toBeCalled();
    });

    it('should call onLinkClick prop', () => {
        const onLinkClick = jest.fn();
        const contentWithMockFunc = {
            ...content,
            onLinkClick,
        };

        const component = shallow(
            <VideoBanner imageMobile={imageMobile} imageTablet={imageTablet} content={contentWithMockFunc} />,
        );
        const link = component.find(`.${cn(ClassName.LINK)}`);

        link.simulate('click');
        expect(onLinkClick).toBeCalled();
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
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render with video', () => {
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.VIDEO}
                    videoSrc={video}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render with video and content', () => {
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.VIDEO}
                    videoSrc={video}
                    content={content}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render video with sounds enabled', () => {
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.VIDEO}
                    videoSrc={video}
                    isMuted={false}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render youtube video with sounds enabled', () => {
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.YOUTUBE}
                    videoSrc={youtubeVideoId}
                    isMuted={false}
                />,
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
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('should not render background image on desktop resolution with video', () => {
            localWindow.innerWidth = 1920;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    videoType={VideoType.YOUTUBE}
                    videoSrc={youtubeVideoId}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render mobile image on relevant resolution', () => {
            localWindow.innerWidth = 320;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render tablet image on relevant resolution', () => {
            localWindow.innerWidth = 768;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render desktop image on relevant resolution', () => {
            localWindow.innerWidth = 1024;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('render wide desktop image on relevant resolution', () => {
            localWindow.innerWidth = 1280;
            const wrapper = mount(
                <VideoBanner
                    imageMobile={imageMobile}
                    imageTablet={imageTablet}
                    imageDesktop={imageDesktop}
                    imageDesktopWide={imageDesktopWide}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });
    });
});
