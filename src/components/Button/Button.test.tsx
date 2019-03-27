import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
    it('it renders Button', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders children', () => {
        const wrapper = shallow(<Button>button</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders spinner', () => {
        const wrapper = mount(<Button showSpinner={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders tag a', () => {
        const wrapper = mount(<Button href="http://moscow.megafon.ru/" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it calls click handler', () => {
        const onClick = jest.fn();
        const wrapper = mount(<Button href="http://moscow.megafon.ru/" onClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('it passes props to mods', () => {
        const wrapper = shallow(<Button passiveColor={'white'} border={'green'} fontColor={'green'}/>);
        expect(wrapper.find('.mfui-button').hasClass('mfui-button_border_green')).toEqual(true);
        expect(wrapper.find('.mfui-button').hasClass('mfui-button_passive-color_white')).toEqual(true);
        expect(wrapper.find('.mfui-button').hasClass('mfui-button_font-color_green')).toEqual(true);
    });

    it('it renders white styled button', () => {
        const wrapper = mount(<Button passiveColor={'white'} border={'green'} fontColor={'green'}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
