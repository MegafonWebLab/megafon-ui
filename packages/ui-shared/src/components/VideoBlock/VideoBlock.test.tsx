import * as React from 'react';
import { shallow } from 'enzyme';
import { cnCreate } from '@megafon/ui-core';
import VideoBlock, { VideoTypes } from './VideoBlock';

const content = {
    title: 'Test title',
    description: [
        'Test description',
        'Test description2',
    ],
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
        const component = shallow(
            <VideoBlock videoSrc="video.mp4" content={content} />
        );
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with sound turned on', () => {
        const component = shallow(
            <VideoBlock videoSrc="video" isMuted={false} />
        );
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with youtube media type', () => {
        const component = shallow(
            <VideoBlock videoSrc="youtube" videoType={VideoTypes.YOUTUBE} />
        );
        expect(component).toMatchSnapshot();
    });

    it('it renders VideoBlock with youtube media type and sound turned on', () => {
        const component = shallow(
            <VideoBlock videoSrc="youtube" videoType={VideoTypes.YOUTUBE} isMuted={false}/>
        );
        expect(component).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const onButtonClick = jest.fn();
        const contentWithMockFunc = {
            ...content,
            onButtonClick,
        };
        const component = shallow(
            <VideoBlock videoSrc="video.mp4" content={contentWithMockFunc} />
        );
        const btn = component.find(`.${cn('button')}`);

        btn.simulate('click');
        expect(onButtonClick).toBeCalled();
    });
});
