import * as React from 'react';
import { shallow } from 'enzyme';
import Paragraph, { IParagraphProps } from './Paragraph';

const props: IParagraphProps = {
    align: 'right',
    size: 'small',
    hasMargin: false,
    color: 'purple',
    className: 'test',
};

describe('<Paragraph />', () => {
    it('default render', () => {
        const wrapper = shallow(<Paragraph>Test paragraph text</Paragraph>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders Paragraph with props', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);
        expect(wrapper).toMatchSnapshot();
    });

    it('testing align props', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);

        wrapper.setProps({ align: 'center' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ align: 'right' });
        expect(wrapper).toMatchSnapshot();
    });

    it('testing color props', () => {
        const wrapper = shallow(<Paragraph {...props}>Test paragraph text</Paragraph>);

        wrapper.setProps({ color: 'green' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'white' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'spbSky0' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'spbSky1' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'spbSky2' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ color: 'default' });
        expect(wrapper).toMatchSnapshot();
    });
});
