import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { cnCreate } from '@megafon/ui-core';
import VideoBanner, { VideoCategory } from './VideoBanner';
import { image, content, video } from './VideoBanner.docz';

const youtube = {
    src: 'youtube.com/videoId',
    type: VideoCategory.YOUTUBE,
};

const cn = cnCreate('mfui-video-banner');

content.clickHandler = jest.fn();

describe('<VideoBanner />', () => {
    it('render component', () => {
        const component = mount(<VideoBanner image={image} />);
        expect(component).toMatchSnapshot();
    });

    it('render with content', () => {
        const component = mount(<VideoBanner image={image} content={content} />);
        expect(component).toMatchSnapshot();
    });

    it('render with video', () => {
        const component = mount(<VideoBanner image={image} video={video} />);
        expect(component).toMatchSnapshot();
    });

    it('render with youtube video', () => {
        const component = mount(<VideoBanner image={image} video={youtube} />);
        expect(component).toMatchSnapshot();
    });

    it('should call onClick props', () => {
        const component = shallow(<VideoBanner image={image} content={content} />);
        const btn = component.find(`.${cn('button')}`);

        btn.simulate('click');
        expect(content.clickHandler).toBeCalled();
    });
});
