import * as React from 'react';
import { shallow } from 'enzyme';
import Paragraph, { IParagraphProps } from './Paragraph';

const props: IParagraphProps = {
    align: 'right',
    size: 'small',
    hasMargin: false,
    color: 'purple',
    className: 'test',
    children: 'Test paragraph text',
};

describe('<Paragraph />', () => {
    it('it renders Paragraph with out props', () => {
        const wrapper = shallow(<Paragraph>Text</Paragraph>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Paragraph with props', () => {
        const wrapper = shallow(<Paragraph {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
