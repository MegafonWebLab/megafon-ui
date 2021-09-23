import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { cnCreate } from '@megafon/ui-helpers';
import VideoBlock, { VideoTypes } from './VideoBlock';

const content = {
    title: 'Test title',
    description: ['Test description', 'Test description2'],
    buttonTitle: 'Button title',
    href: '#',
};

const cn = cnCreate('mfui-beta-video-block');
describe('<VideoBlock />', () => {
    it('it renders VideoBlock with default props', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with content', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" content={content} />);
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
                classes={{ root: 'rootClass', button: 'buttonClass' }}
            />,
        );
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with dataAttrs', () => {
        const component = shallow(<VideoBlock videoSrc="video.mp4" dataAttrs={{ 'data-test': 'value' }} />);
        expect(component.first().prop('data-test')).toEqual('value');
    });

    it('it renders VideoBlock with sound turned on', () => {
        const component = shallow(<VideoBlock videoSrc="video" isMuted={false} />);
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with autoplay', () => {
        const component = shallow(<VideoBlock videoSrc="video" isAutoplay />);
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
