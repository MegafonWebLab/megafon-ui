import * as React from 'react';
import { shallow } from 'enzyme';
import VideoBanner, { Props } from './VideoBanner';

const props: Props = {
    content: {
       title: 'Test title',
        description: [
            'Test description',
            'Test description',
        ],
        href: '#',
    },
    videoSource: '',
    className: 'test-class-name',
};

describe('<VideoBanner />', () => {
    it('it renders VideoBanner with props', () => {
        const wrapper = shallow(<VideoBanner {...props}>Test paragraph text</VideoBanner>);
        expect(wrapper).toMatchSnapshot();
    });
});
