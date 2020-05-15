import * as React from 'react';
import { shallow, mount } from 'enzyme';
import TextareaDeprecated from './TextareaDeprecated';

describe('<TextareaDeprecated />', () => {
    it('it renders TextareaDeprecated', () => {
        const wrapper = shallow(<TextareaDeprecated />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it label and id', () => {
        const wrapper = shallow(<TextareaDeprecated label="label" id="id" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders texts', () => {
        const wrapper = shallow(<TextareaDeprecated commentText="text" successText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without valid icon', () => {
        const wrapper = shallow(<TextareaDeprecated valid={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders without error icon', () => {
        const wrapper = shallow(<TextareaDeprecated error={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders error icon', () => {
        const wrapper = shallow(<TextareaDeprecated error={true} noticeText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders valid icon', () => {
        const wrapper = shallow(<TextareaDeprecated valid={true} noticeText="text" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked shouldComponentUpdate', () => {
        const wrapper = shallow(<TextareaDeprecated error={true} noticeText="text" />);

        wrapper.setProps({ error: true, noticeText: 'text' });
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked shouldComponentUpdate with new props', () => {
        const wrapper = shallow(<TextareaDeprecated error={true} noticeText="text" />);

        wrapper.setProps({ error: false, noticeText: 'text' });
        expect(wrapper).toMatchSnapshot();
    });

    it('is checked focus method', () => {
        const wrapper = mount(<TextareaDeprecated />);
        const instance = wrapper.instance() as TextareaDeprecated;

        expect(() => instance.focus()).not.toThrow();
    });

    it('is checked blur method', () => {
        const wrapper = mount(<TextareaDeprecated />);
        const instance = wrapper.instance() as TextareaDeprecated;

        expect(() => instance.blur()).not.toThrow();
    });
});
