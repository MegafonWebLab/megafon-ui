import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';
import ArrowBack from 'icons/arrow-back.svg';

describe('<Button />', () => {
    it('it renders Button', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders children', () => {
        const wrapper = shallow(<Button>button</Button>);
        expect(wrapper).toMatchSnapshot();
    });

    it('it renders icon', () => {
        const wrapper = mount(<Button svgIcon={<ArrowBack />} />);
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
});
