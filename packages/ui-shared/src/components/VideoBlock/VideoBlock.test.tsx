import * as React from 'react';
import { cnCreate } from '@megafon/ui-helpers';
import { mount, shallow } from 'enzyme';
import VideoBlock, { VideoTypes, IContent } from './VideoBlock';

const content: IContent = {
    title: 'Test title',
    description: 'Test description',
    buttonTitle: 'Button title',
    href: '#',
};

const contentWithoutButton: IContent = {
    title: 'Test title',
    description: 'Test description',
};

const cn = cnCreate('mfui-video-block');
describe('<VideoBlock />', () => {
    it('it renders VideoBlock with default props', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with content', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" content={content} />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with contentPositionRight', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" content={content} contentPositionRight />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with content but without button', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" content={contentWithoutButton} />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with content and button download link', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" content={{ ...content, buttonDownload: true }} />);

        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with classes', () => {
        const component = shallow(
            <VideoBlock
                videoSrc="video.mp4"
                content={content}
                className="className"
                classes={{ root: 'rootClass', button: 'buttonClass', description: 'descriptionClass' }}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with dataAttrs', () => {
        const component = shallow(
            <VideoBlock
                videoSrc="video.mp4"
                content={content}
                dataAttrs={{
                    root: { 'data-testid': 'root-test' },
                    button: { 'data-testid': 'button-test' },
                }}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with sound turned on', () => {
        const component = shallow(<VideoBlock videoSrc="video" isMuted={false} />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with autoplay', () => {
        const component = shallow(<VideoBlock videoSrc="video" isAutoplay />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with poster', () => {
        const component = shallow(<VideoBlock videoSrc="video" poster="site.com/poster.png" />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with youtube media type', () => {
        const component = shallow(<VideoBlock videoSrc="youtube" videoType={VideoTypes.YOUTUBE} />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with youtube media type and sound turned on', () => {
        const component = shallow(<VideoBlock videoSrc="youtube" videoType={VideoTypes.YOUTUBE} isMuted={false} />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with youtube media type and autoplay', () => {
        const component = shallow(<VideoBlock videoSrc="youtube" videoType={VideoTypes.YOUTUBE} isAutoplay />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with video media type and playsinline', () => {
        const component = shallow(<VideoBlock videoSrc="youtube" videoType={VideoTypes.VIDEO} playsinline />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with youtube media type and playsinline', () => {
        const component = shallow(<VideoBlock videoSrc="youtube" videoType={VideoTypes.YOUTUBE} playsinline />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with fixWhiteVideoBackground', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" fixWhiteVideoBackground />);
        expect(component).toMatchSnapshot();
    });

    it('render component with html tags', () => {
        const localContent = {
            ...content,
            title: '<a href="https://moscow.megafon.ru">Текст</a><br><font color="#731982">≈40</font> символов.&nbspКороткие слова',
            description:
                'Описание&nbspдолжно <a href="https://moscow.megafon.ru">быть</a> <font color="#731982">примерно</font> не более 130 символов.<br>Пишите <b>содержательно</b>, кратно и не будет проблем с текстовым контентом.',
        };
        const wrapper = shallow(<VideoBlock content={localContent} videoSrc="video" />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should return reference to root element', () => {
        const ref: React.RefObject<HTMLDivElement> = React.createRef();

        mount(<VideoBlock videoSrc="video" isMuted={false} rootRef={ref} />);

        expect(ref.current).not.toBeNull();
    });

    it('should call onClick props', () => {
        const onButtonClick = jest.fn();
        const contentWithMockFunc = {
            ...content,
            onButtonClick,
        };
        const component = shallow(<VideoBlock videoSrc="video.mp4" content={contentWithMockFunc} />);
        const btn = component.find(`.${cn('button')}`);

        btn.simulate('click');
        expect(onButtonClick).toBeCalled();
    });
});
