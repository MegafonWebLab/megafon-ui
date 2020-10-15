import * as React from 'react';
import { shallow } from 'enzyme';
import { cnCreate } from '@megafon/ui-core';
import VideoBlock from './VideoBlock';

const content = {
    title: 'Test title',
    description: [
        'Test description',
        'Test description',
    ],
    buttonTitle: 'Button title',
    href: '#',
    onButtonClick: jest.fn(),
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

    it('it renders VideoBlock with youtube media type', () => {
        const component = shallow(
            <VideoBlock videoSrc="youtube" videoType="youtube" />
        );
        expect(component).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const component = shallow(
            <VideoBlock videoSrc="video.mp4" content={content} />
        );
        const btn = component.find(`.${cn('button')}`);

        btn.simulate('click');
        expect(content.onButtonClick).toBeCalled();
    });
});
