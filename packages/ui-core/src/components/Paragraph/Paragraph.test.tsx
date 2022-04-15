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

    it('render with align prop', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);

        wrapper.setProps({ align: 'center' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ align: 'right' });
        expect(wrapper).toMatchSnapshot();
    });

    it('render with hasMargin prop', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);

        wrapper.setProps({ hasMargin: true });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ hasMargin: false });
        expect(wrapper).toMatchSnapshot();
    });

    it('render with space prop', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);

        wrapper.setProps({ space: 'wide' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ space: 'tight' });
        expect(wrapper).toMatchSnapshot();
    });

    it('render with color prop', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);

        wrapper.setProps({ color: 'inherit' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'default' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'gray' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'white' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'green' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'purple' });
        expect(wrapper).toMatchSnapshot();
    });
});
