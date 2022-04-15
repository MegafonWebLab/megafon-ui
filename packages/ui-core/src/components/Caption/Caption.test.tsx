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

    it('render with align prop', () => {
        const wrapper = shallow(<Caption {...props}>Test caption text</Caption>);

        wrapper.setProps({ align: 'center' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ align: 'right' });
        expect(wrapper).toMatchSnapshot();
    });

    it('render with hasMargin prop', () => {
        const wrapper = shallow(<Caption {...props}>Test caption text</Caption>);

        wrapper.setProps({ hasMargin: true });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ hasMargin: false });
        expect(wrapper).toMatchSnapshot();
    });

    it('render with space prop', () => {
        const wrapper = shallow(<Caption {...props}>Test caption text</Caption>);

        wrapper.setProps({ space: 'wide' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ space: 'tight' });
        expect(wrapper).toMatchSnapshot();
    });

    it('render with variant prop', () => {
        const wrapper = shallow(<Caption {...props}>Test caption text</Caption>);

        wrapper.setProps({ variant: 'normal' });
        expect(wrapper).toMatchSnapshot();
        wrapper.setProps({ variant: 'medium' });
        expect(wrapper).toMatchSnapshot();
    });

    it('render with color prop', () => {
        const wrapper = shallow(<Caption {...props}>Test caption text</Caption>);

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
