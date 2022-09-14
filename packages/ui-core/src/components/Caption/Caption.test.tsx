import * as React from 'react';
import { shallow } from 'enzyme';
import Caption, { ICaptionProps } from './Caption';

const props: ICaptionProps = {
    align: 'right',
    space: 'wide',
    hasMargin: false,
    color: 'purple',
    className: 'test',
};

describe('<Caption />', () => {
    it('render Caption with defalut props', () => {
        const wrapper = shallow(<Caption>Test caption text</Caption>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render Caption with passed props', () => {
        const wrapper = shallow(<Caption {...props}>Test caption text</Caption>);
        expect(wrapper).toMatchSnapshot();
    });
});
