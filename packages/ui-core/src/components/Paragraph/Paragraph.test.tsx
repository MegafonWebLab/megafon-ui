import * as React from 'react';
import { shallow } from 'enzyme';
import Paragraph, { IParagraphProps } from './Paragraph';

const props: IParagraphProps = {
    align: 'right',
    space: 'wide',
    hasMargin: false,
    color: 'purple',
    className: 'test',
};

describe('<Paragraph />', () => {
    it('render Paragraph with defalut props', () => {
        const wrapper = shallow(<Paragraph>Test paragraph text</Paragraph>);
        expect(wrapper).toMatchSnapshot();
    });

    it('render Paragraph with passed props', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);
        expect(wrapper).toMatchSnapshot();
    });
});
