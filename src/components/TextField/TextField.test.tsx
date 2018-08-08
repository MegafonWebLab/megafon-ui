import * as React from 'react';
import { shallow, mount } from 'enzyme';
import TextField from './TextField';

describe('<TextField />', () => {
    it('it renders TextField', () => {
        const wrapper = shallow(<TextField />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders texts', () => {
        const wrapper = shallow(<TextField commentText="text" successText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without valid icon', () => {
        const wrapper = shallow(<TextField valid={true} isHideIcon={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without error icon', () => {
        const wrapper = shallow(<TextField error={true} isHideIcon={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders mask input', () => {
        const wrapper = shallow(<TextField mask="(999) 999-99-99" maskChar=" " />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders error icon', () => {
        const wrapper = shallow(<TextField error={true} noticeText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders valid icon', () => {
        const wrapper = shallow(<TextField valid={true} noticeText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders custom icon', () => {
        const wrapper = shallow(<TextField customIcon={<img />} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked shouldComponentUpdate', () => {
        const wrapper = shallow(<TextField error={true} noticeText="text" />);

        wrapper.setProps({ error: true, noticeText: 'text' });
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked shouldComponentUpdate with new props', () => {
        const wrapper = shallow(<TextField error={true} noticeText="text" />);

        wrapper.setProps({ error: false, noticeText: 'text' });
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked focus method', () => {
        const wrapper = mount(<TextField />);
        const instance = wrapper.instance() as TextField;

        expect(() => instance.focus()).not.toThrow();
    });

    it('is checked blur method', () => {
        const wrapper = mount(<TextField />);
        const instance = wrapper.instance() as TextField;

        expect(() => instance.blur()).not.toThrow();
    });
});
